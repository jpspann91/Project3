import React from 'react';
import { useParams } from 'react-router-dom';

const TicTacToe = (props) => {
  const { gameId } = useParams();


  const getGameState = () => {

  }

  const saveGameState = () => {

  }

  return (
   
    <div>
      <h2>Tic Tac Toe</h2>
      <h3>Game ID {gameId}</h3>
    </div>
  )



}

export default TicTacToe;