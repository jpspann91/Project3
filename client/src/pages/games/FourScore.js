import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Col, Row } from "antd";
import { gql, useMutation, useQuery } from "@apollo/client";
import { QUERY_SINGLE_MATCH } from "../../utils/queries";
// import { UPDATE_MATCH } from "../../utils/mutations";
import Auth from "../../utils/auth";

const UPDATE_MATCH = gql`
  mutation updateMatch($matchId: ID!, $params: String!) {
    updateMatch(matchId: $matchId, params: $params) {
      gameBoard
    }
  }
`;

const DEFAULT_GAME_BOARD = [
  [" ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " "],
];

const DEFAULT_ACTIVE_USER = "";
const DEFAULT_GAME_STATE = {
  winner: null,
  status: "ongoing",
};

const styles = {
  disabled: {
    pointerEvents: "none",
    opacity: 0.4,
  },
};

const FourScore = () => {
  const history = useHistory();
  let user = Auth.getProfile().data;
  const [gameBoard, setGameBoard] = useState([[], [], []]);
  const [activeUser, setActiveUser] = useState();
  const [gameState, setGameState] = useState();
  const { matchId } = useParams();
  const { loading, error, data } = useQuery(QUERY_SINGLE_MATCH, {
    variables: { matchId },
    pollInterval: 300,
  });
  const [updateMatch] = useMutation(UPDATE_MATCH);

  useEffect(() => {
    // Load previous game state if available
    if (loading) return;
    console.log(JSON.stringify(error, null, 2));
    if (error) {
      history.push("/");
    }

    const { loadedGameBoard, loadedActiveUser, loadedGameState } =
      fetchGameState(data.match);

    console.log(data.match);
    console.log(loadedActiveUser);

    console.log(activeUser);

    setGameBoard(loadedGameBoard);
    setActiveUser(loadedActiveUser);
    setGameState(loadedGameState);
  }, [loading, data, error]);

  useEffect(() => {
    let stringBoard = "";
    gameBoard.forEach((row) => {
      row.forEach((space) => (stringBoard += space));
    });

    try {
      updateMatch({
        variables: {
          matchId,
          params: JSON.stringify({
            gameBoard: stringBoard,
            activePlayer: activeUser,
            status: gameState.status,
            winner: gameState.winner,
          }),
        },
      });
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  }, [gameBoard, activeUser, gameState, matchId, updateMatch]);

  const fetchGameState = (matchData) => {
    // Fetch game data from data base
    // TODO create backend route to fetch
    let loadedGameBoard;
    if (matchData.gameBoard !== "") {
      loadedGameBoard = readSavedBoard(matchData.gameBoard);
    }

    const loadedActiveUser = matchData.activePlayer._id;
    const loadedGameState = {
      status: matchData.status,
      winner: matchData.winner,
    };

    return {
      loadedGameBoard: loadedGameBoard || DEFAULT_GAME_BOARD,
      loadedActiveUser: loadedActiveUser || DEFAULT_ACTIVE_USER,
      loadedGameState: loadedGameState || DEFAULT_GAME_STATE,
    };
  };

  const readSavedBoard = (gameBoard) => {
    const gameBoardSpaces = [...gameBoard];
    const formattedBoard = [];
    while (gameBoardSpaces.length)
      formattedBoard.push(gameBoardSpaces.splice(0, 7));
    return formattedBoard;
  };

  const saveGameState = async () => {
    // Post game data to data base state

    let stringBoard = "";
    gameBoard.forEach((row) => {
      row.forEach((space) => (stringBoard += space));
    });

    try {
      await updateMatch({
        variables: {
          matchId,
          params: JSON.stringify({
            gameBoard: stringBoard,
            activePlayer: activeUser,
            ...gameState,
          }),
        },
      });
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  };

  const getWinner = () => {
    const sliceCheck = (slice) => {
      if (slice.every((piece) => piece === slice[0])) {
        return slice[0] === "X"
          ? data.match.players[0].username
          : data.match.players[1].username;
      }
      return null;
    };

    //Horizontal Checks
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length - 3; j++) {
        const currentPiece = gameBoard[i][j];
        if (currentPiece === " ") {
          continue;
        }

        const slice = gameBoard[i].slice(j, j + 4);
        const winner = sliceCheck(slice);

        if (winner) return winner;
      }
    }

    //Vertical Checks
    for (let i = 0; i < gameBoard.length - 3; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        const currentPiece = gameBoard[i][j];
        if (currentPiece === " ") {
          continue;
        }

        const slice = gameBoard.slice(i, i + 4).map((row) => row[j]);
        const winner = sliceCheck(slice);

        if (winner) return winner;
      }
    }

    //Diagonal Checks
    for (let i = 0; i < gameBoard.length - 3; i++) {
      for (let j = 0; j < gameBoard[i].length - 3; j++) {
        const currentPiece = gameBoard[i][j];
        if (currentPiece === " ") {
          continue;
        }

        let slice = gameBoard.slice(i, i + 4).map((row, idx) => row[j + idx]);
        let winner = sliceCheck(slice);

        if (winner) return winner;

        slice = gameBoard.slice(i, i + 4).map((row, idx) => row[j + 3 - idx]);
        winner = sliceCheck(slice);

        if (winner) return winner;
      }
    }

    return "";
  };

  const checkDraw = () => {
    return gameBoard.every((row) => row.every((el) => el !== " "));
  };

  const checkGameState = () => {
    let winner = getWinner();

    if (winner) {
      return { status: "ended", winner };
    }

    let isDraw = checkDraw();

    let status = isDraw ? "draw" : "ongoing";

    return { status, winner };
  };

  const renderGameBoard = () => {
    let rows = [];
    for (let i = 0; i < gameBoard.length; i++) {
      const row = (
        <Row
          className="w-full grid content-center justify-center"
          key={i}
          gutter={[6, 6]}
          style={{ display: 'flex'}}
        >
          {gameBoard[i].map((value, j) => getGameSquare(value, i, j))}
        </Row>
      );

      rows.push(row);
    }

    return <div className="py-4">{rows}</div>;
  };

  const getGameSquare = (value, row, col) => {
    const squareClickHandler = async () => {
      if (value !== " " || gameState === "ended") {
        return () => {};
      } else {
        return await setSquareValue(row, col);
      }
    };

    return (
      <Col span={3}>
        <button
          className="w-12 h-12 border-2 text-5xl text-neutral-700 flex justify-center align-center"
          onClick={squareClickHandler}
          key={row * 3 + col}
        >
          {value === "X" && (
            <div className="w-10 h-10 rounded-full bg-red-400"></div>
          )}
          {value === "O" && (
            <div className="w-10 h-10 rounded-full bg-black"></div>
          )}
          {value === "" && <div>' '</div>}
        </button>
      </Col>
    );
  };

  const getActivePiece = () => {
    const activePiece = activeUser === data.match.players[0]._id ? "X" : "O";

    return activePiece;
  };

  const addPieceToColumn = (col) => {
    for (let i = gameBoard.length - 1; i >= 0; i--) {
      if (gameBoard[i][col] === " ") {
        setGameBoard((prevBoard) => {
          prevBoard[i][col] = getActivePiece();
          return prevBoard;
        });
        return 1;
      }
    }

    return -1;
  };

  const setSquareValue = async (row, col) => {
    const status = addPieceToColumn(col);

    // Invalid move detected
    if (status === -1) {
      return;
    }

    setActiveUser((prevUser) => {
      return prevUser === data.match.players[0]._id
        ? data.match.players[1]._id
        : data.match.players[0]._id;
    });
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        ...checkGameState(),
      };
    });
  };

  const handleError = () => {
    history.push("/");
    return <></>;
  };

  const getPlayerCards = () => {
    return data.match.players.map((player, index) => {
      return (
        <div className="p-5 w-3/6 text-center" key={index}>
          <div className="text-lg font-semibold flex justify-center align-center">
            Player{" "}
            {index === 0 ? (
              <div className="ml-2 w-4 h-4 rounded-full bg-red-400"></div>
            ) : (
              <div className="ml-2 w-4 h-4 rounded-full bg-black"></div>
            )}
          </div>
          <div className="text-xl font-thin">{player?.username}</div>
        </div>
      );
    });
  };
  return (
    <>
      {error && handleError()}
      {loading && !error && <p>Loading</p>}
      {!loading && !error && (
        <div>
          <div title={`Four Score`} className={styles.board}>
            <div className="grid justify-center content-center text-center">
              <div className="text-4xl">Four Score</div>
              <div className="text-neutral-400">{matchId}</div>
            </div>
            {gameState?.winner && (
              <>
                <div
                  style={{
                    height: window.innerHeight,
                    width: window.innerWidth,
                    transform: `translateX(${window.innerWidth}px)`,
                  }}
                  className="absolute animate-blur top-0 left-0  z-40 grid content-center justify-center text-5xl pb-24"
                >
                  {gameState.winner} Wins
                </div>
                {/* <a className="w-12 h-8 bg-green-500" href='/'>Return</a> */}
              </>
            )}
            {gameState?.status === "draw" && (
              <>
                <div
                  style={{
                    height: window.innerHeight,
                    width: window.innerWidth,
                    transform: `translateX(${window.innerWidth}px)`,
                  }}
                  className="absolute animate-blur top-0 left-0  z-40 grid content-center justify-center text-5xl pb-24 italic"
                >
                  Draw
                </div>
              </>
            )}
            <div
              style={
                gameState?.status !== "ongoing" || user._id !== activeUser
                  ? styles.disabled
                  : {}
              }
            >
              {renderGameBoard()}
            </div>
          </div>
          <div className="flex justify-between">{getPlayerCards()}</div>
          <button
            className="font-thin w-full bg-gradient-to-t from-emerald-500  to-emerald-400 text-xl text-white py-2 rounded-sm"
            onClick={saveGameState}
          >
            Notify{" "}
            {data.match.activePlayer?.username ===
            data.match.players[0]?.username
              ? data.match.players[1]?.username
              : data.match.players[0]?.username}
          </button>
        </div>
      )}
    </>
  );
};

export default FourScore;
