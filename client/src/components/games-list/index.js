import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { QUERY_GAMES } from "../../utils/queries";
import GameCard from "../GameCard";
import { ReactComponent as Arrow } from "../arrow.svg";
import PendingMatchNotice from "../PendingMatchNotice";
import PendingContext from "../../PendingContext";

const GamesList = ({ handlePageState }) => {
  const { pendingMatch } = useContext(PendingContext);
  const { loading, error, data } = useQuery(QUERY_GAMES);

  if (loading) return <></>;
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
          path={`games/${game.path}`}
          type="game"
          handlePageState={handlePageState}
        />
      );
    });

    return cards;
  };

  return (
    <div>
      <h2 className="text-2xl flex justify-between items-center px-4 font-thin text-neutral-700 bg-gradient-to-t from-neutral-200 to-neutral-100 mb-5 py-2">
        <div className="flex justify-between items-center">
        <Arrow className="mr-2 h-4 w-4 mt-1" />
        Games
        </div>
        <div>( {data.games.length} )</div>
      </h2>
      {pendingMatch.user._id && <PendingMatchNotice />}
      {getGameCards()}
    </div>
  );
};

export default GamesList;
