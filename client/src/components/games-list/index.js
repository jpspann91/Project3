import { useQuery } from "@apollo/client";
import React from "react";
import { QUERY_GAMES } from "../../utils/queries";
import GameCard from "../GameCard";

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
      <h2 className="text-2xl text-center">All Games</h2>
      {getGameCards()}
    </div>
  );
};

export default GamesList;
