import React from 'react';
import { useParams } from 'react-router-dom';

const TestGame1 = (props) => {
  const { gameId } = useParams();
  

  return (
    <div>
      This is another game wow!
      <p>Game match: {gameId}</p>
    </div>
  )
}

export default TestGame1;