import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Button } from "antd";
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
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
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

const TicTacToe = (props) => {
  let user = Auth.getProfile().data;
  const [gameBoard, setGameBoard] = useState([[], [], []]);
  const [activeUser, setActiveUser] = useState();
  const [gameState, setGameState] = useState();
  const { matchId } = useParams();
  const { loading, error, data } = useQuery(QUERY_SINGLE_MATCH, {
    variables: { matchId },
  });
  const [updateMatch] = useMutation(UPDATE_MATCH);

  useEffect(() => {
    // Load previous game state if available
    if (loading) return;
    console.log(JSON.stringify(error, null, 2));
    if (error) return;

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
            ...gameState
          }),
        },
      });
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  }, [gameBoard, activeUser, gameState, matchId, updateMatch])

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
      formattedBoard.push(gameBoardSpaces.splice(0, 3));
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
            status: gameState.status,
          }),
        },
      });
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  };

  const checkGameState = () => {
    // Logic to check for winner
    // Row and column Checks
    let winner = null;
    let status = "";
    for (let i = 0; i < 3; i++) {
      if (
        gameBoard[i][0] !== " " &&
        gameBoard[i][0] === gameBoard[i][1] &&
        gameBoard[i][0] === gameBoard[i][2]
      ) {
        winner =
          gameBoard[i][0] === "X"
            ? data.match.players[0].username
            : data.match.players[1].username;
      }

      if (
        gameBoard[0][i] !== " " &&
        gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[0][i] === gameBoard[2][i]
      ) {
        winner =
          gameBoard[0][i] === "X"
            ? data.match.players[0].username
            : data.match.players[1].username;
      }
    }

    // Diagonal checks
    if (
      gameBoard[0][0] !== " " &&
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[0][0] === gameBoard[2][2]
    ) {
      winner =
        gameBoard[0][0] === "X"
          ? data.match.players[0].username
          : data.match.players[1].username;
    }
    if (
      gameBoard[2][0] !== " " &&
      gameBoard[2][0] === gameBoard[1][1] &&
      gameBoard[2][0] === gameBoard[0][2]
    ) {
      winner =
        gameBoard[2][0] === "X"
          ? data.match.players[0].username
          : data.match.players[1].username;
    }

    // Check draw
    if (
      [...gameBoard[0], ...gameBoard[1], ...gameBoard[2]].every(
        (el) => el !== " "
      ) &&
      winner === null
    ) {
      status = "draw";
    } else {
      status = winner ? "ended" : "ongoing";
    }

    return { winner, status };
  };

  const renderGameBoard = () => {
    let rows = [];
    for (let i = 0; i < 3; i++) {
      const row = (
        <Row className="w-full grid content-center justify-center" key={i}>
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
      <button
        className="w-24 h-24 border-2 text-5xl text-neutral-700"
        onClick={squareClickHandler}
        key={row * 3 + col}
      >
        {value}
      </button>
    );
  };

  const setSquareValue = async (row, col) => {
    console.log(data.match.players);

    setGameBoard((prevGameBoard) => {
      let newBoard = [...prevGameBoard];
      newBoard[row][col] = activeUser === data.match.players[0]._id ? "X" : "O";
      return newBoard;
    });
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
    // await saveGameState();
  };

  const getPlayerCards = () => {
    return data.match.players.map((player, index) => {
      return (
        <div className="p-5 w-3/6 text-center" key={index}>
          <div className="text-lg font-semibold">
            Player {index === 0 ? "X" : "O"}
          </div>
          <div className="text-xl font-thin">{player?.username}</div>
        </div>
      );
    });
  };
  return (
    <>
      {loading && <p>Loading</p>}
      {!loading && (
        <div>
          <div title={`Tic Tac Toe`} className={styles.board}>
            <div className="grid justify-center content-center text-center">
              <div className="text-4xl">Tic Tac Toe</div>
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

export default TicTacToe;
