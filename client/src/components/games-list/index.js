import { useQuery } from "@apollo/client";
import React from "react";
import { QUERY_GAMES } from "../../utils/queries";
import GameCard from "../GameCard";
import {ReactComponent as Arrow} from '../arrow.svg'

const GamesList = (props) => {
  const { loading, error, data } = useQuery(QUERY_GAMES);

  if (loading) return <p>Loading</p>;
  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return error;
  }

  const getGameCards = () => {
    const cards = data.games.map((game, index) => {
      return (
        <GameCard
          {...game}
          key={`${index}-gameCard`}
          path={`games/${game._id}/${game.name}`}
        />
      );
    });

    return cards;
  };

  return (
    <div>
      <h2 className="text-2xl flex justify-start items-center px-4 font-thin text-neutral-700 bg-gradient-to-t from-neutral-200 to-neutral-100 mb-5 py-2">
      <Arrow className='mr-2 h-4 w-4 mt-1' />
        Games
        </h2>
      {getGameCards()}
    </div>
  );
};

export default GamesList;
