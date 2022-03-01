import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Button } from "antd";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_MATCH } from '../../utils/queries'

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
  const { gameId } = useParams();
  const { loading, error, data } = useQuery(QUERY_SINGLE_MATCH, { gameId });

  useEffect(() => {
    // Load previous game state if available
    if (loading) return

    const { loadedGameBoard, loadedActiveUser, loadedGameState } =
    fetchGameState(data.match);

    setGameBoard(loadedGameBoard);
    setActiveUser(loadedActiveUser);
    setGameState(loadedGameState);
  }, [loading, data]);

  const fetchGameState = (matchData) => {
    console.log(matchData)
    // Fetch game data from data base
    // TODO create backend route to fetch
    const loadedGameBoard = "";
    const loadedActiveUser = "";
    const loadedGameState = "";

    return {
      loadedGameBoard: loadedGameBoard || DEFAULT_GAME_BOARD,
      loadedActiveUser: loadedActiveUser || DEFAULT_ACTIVE_USER,
      loadedGameState: loadedGameState || DEFAULT_GAME_STATE,
    };
  };

  const saveGameState = () => {
    // Post game data to data base state

    const gameState = {
      gameBoard,
      activeUser,
    };
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

  return (
    <>
      {loading && <p>Loading</p>}
      {!loading && 
        <Card title={`Tic Tac Toe | Game ${gameId}`} className={styles.board}>
          {gameState?.winner && <h2>{gameState.winner} Wins</h2>}
          {gameState?.status === "draw" && <h2>Draw</h2>}
          <div style={gameState?.status !== "ongoing" ? styles.disabled : {}}>
            {renderGameBoard()}
          </div>
        </Card>
      }
    </>
  );
};

export default TicTacToe;
