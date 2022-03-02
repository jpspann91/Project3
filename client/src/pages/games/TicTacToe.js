import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Button } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_SINGLE_MATCH } from '../../utils/queries'
import { UPDATE_MATCH_GAME_BOARD } from "../../utils/mutations";

const DEFAULT_GAME_BOARD = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];
const DEFAULT_ACTIVE_USER = "X";
const DEFAULT_GAME_STATE = {
  winner: "",
  status: "ongoing",
};

const styles = {
  disabled: {
    pointerEvents: "none",
    opacity: 0.4,
  },
};



const TicTacToe = (props) => {
  const [gameBoard, setGameBoard] = useState([[], [], []]);
  const [activeUser, setActiveUser] = useState();
  const [gameState, setGameState] = useState();
  const { matchId } = useParams();
  const { loading, error, data } = useQuery(QUERY_SINGLE_MATCH, {
    variables: { matchId },
  });
  const [updateGameBoard] = useMutation(UPDATE_MATCH_GAME_BOARD);

  useEffect(() => {
    // Load previous game state if available
    if (loading) return;
    console.log(JSON.stringify(error, null, 2));
    if (error) return;

    console.log(data);

    const { loadedGameBoard, loadedActiveUser, loadedGameState } =
      fetchGameState(data.match);

    setGameBoard(loadedGameBoard);
    setActiveUser(loadedActiveUser);
    setGameState(loadedGameState);
  }, [loading, data, error]);

  const fetchGameState = (matchData) => {
    console.log(matchData);
    // Fetch game data from data base
    // TODO create backend route to fetch
    const loadedGameBoard = readSavedBoard(matchData.gameBoard);
    const loadedActiveUser = "";
    const loadedGameState = "";

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

  const saveGameState = () => {
    // Post game data to data base state

    let stringBoard = "";
    gameBoard.forEach((row) => {
      row.forEach((space) => (stringBoard += space));
    });

    updateGameBoard({
      variables: { gameBoard: stringBoard, matchId: matchId },
    });
  };

  const checkGameState = () => {
    // Logic to check for winner
    // Row and column Checks
    let winner = "";
    let status = "";
    for (let i = 0; i < 3; i++) {
      if (
        gameBoard[i][0] !== " " &&
        gameBoard[i][0] === gameBoard[i][1] &&
        gameBoard[i][0] === gameBoard[i][2]
      ) {
        winner = gameBoard[i][0];
      }

      if (
        gameBoard[0][i] !== " " &&
        gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[0][i] === gameBoard[2][i]
      ) {
        winner = gameBoard[0][i];
      }
    }

    // Diagonal checks
    if (
      gameBoard[0][0] !== " " &&
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[0][0] === gameBoard[2][2]
    ) {
      winner = gameBoard[0][0];
    }
    if (
      gameBoard[2][0] !== " " &&
      gameBoard[2][0] === gameBoard[1][1] &&
      gameBoard[2][0] === gameBoard[0][2]
    ) {
      winner = gameBoard[2][0];
    }

    // Check draw
    if (
      [...gameBoard[0], ...gameBoard[1], ...gameBoard[2]].every(
        (el) => el !== " "
      ) &&
      winner === ""
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
        <Row key={i}>
          {gameBoard[i].map((value, j) => getGameSquare(value, i, j))}
        </Row>
      );

      rows.push(row);
    }

    return <Card>{rows}</Card>;
  };

  const getGameSquare = (value, row, col) => {
    const squareClickHandler = () => {
      if (value !== " " || gameState === "ended") {
        return () => {};
      } else {
        return setSquareValue(row, col);
      }
    };

    return (
      <Button
        onClick={squareClickHandler}
        key={row * 3 + col}
        style={{ width: 50, height: 50 }}
      >
        {value}
      </Button>
    );
  };

  const setSquareValue = (row, col) => {
    setGameBoard((prevGameBoard) => {
      let newBoard = [...prevGameBoard];
      newBoard[row][col] = activeUser;
      return newBoard;
    });
    setActiveUser(activeUser === "X" ? "O" : "X");
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        ...checkGameState(),
      };
    });
  };

  const getPlayerCards = () => {
    return data.match.players.map((player, index) => {
      return (
        <Card key={index}>
          <h3>Player {index + 1}</h3>
          <p>{player.username}</p>
          <p>{player._id}</p>
        </Card>
      );
    });
  };

  return (
    <>
      {loading && <p>Loading</p>}
      {!loading && (
        <div>
          <Card
            title={`Tic Tac Toe | Game ${matchId}`}
            className={styles.board}
          >
            {gameState?.winner && <h2>{gameState.winner} Wins</h2>}
            {gameState?.status === "draw" && <h2>Draw</h2>}
            <div style={gameState?.status !== "ongoing" ? styles.disabled : {}}>
              {renderGameBoard()}
            </div>
            <Button onClick={saveGameState}>Save</Button>
          </Card>
          {getPlayerCards()}
        </div>
      )}
    </>
  );
};

export default TicTacToe;
