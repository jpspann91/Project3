import { useQuery } from "@apollo/client";
import React from "react";
import { QUERY_MATCHES } from "../../utils/queries";
import GameCard from "../GameCard";
import { ReactComponent as Arrow } from '../arrow.svg'
import Auth from "../../utils/auth";

const MatchList = () => {
  let activeUser = Auth.getProfile().data
  const { loading, error, data } = useQuery(QUERY_MATCHES);

  if (loading) return <p>Loading</p>;
  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return error;
  }
  
  const userMatchData = data.matches.filter((match) => {
    return match.players.some((player) => player._id === activeUser._id);
  });

  const getMatchCards = () => {
    return userMatchData.map((match, index) => {
      const opponent =
        match.players[0]._id === activeUser._id
          ? match.players[1]?.username
          : match.players[0]?.username;

      const isTurn = match.activePlayer._id === activeUser._id;

      return (
        <GameCard
          key={`${index}-matchCard`}
          gameType={match.game.gameType}
          ruleSet={match.game.ruleSet}
          count={0}
          gameId={match.game._id}
          icon={match.game.icon}
          path={`games/${match.game.path}/${match._id}`}
          opponent={opponent}
          type="match"
          isTurn={isTurn}
          winner={match.winner}
        />
      );
    });
  };

  return (
    <div>
      <div className="text-2xl px-4 flex justify-between items-center text-neutral-700 bg-gradient-to-t from-neutral-200 to-neutral-100 py-2 font-thin">
        <div className="flex justify-center items-center">
          <Arrow className='mr-2 h-4 w-4 mt-1' />
          Active Matches
        </div>
        <div>( { userMatchData.length } )</div>
      </div>
      {getMatchCards()}
    </div>
  );
};

export default MatchList;
