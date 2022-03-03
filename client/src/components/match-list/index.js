import { useQuery } from "@apollo/client";
import React from "react";
import { QUERY_MATCHES } from "../../utils/queries";
import GameCard from "../GameCard";

const userId = "621d90a76742d2938ffd5a00";

const MatchList = () => {
  const { loading, error, data } = useQuery(QUERY_MATCHES);

  if (loading) return <p>Loading</p>;
  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return error;
  }

  const getMatchCards = () => {
    const userMatchData = data.matches.filter((match) => {
      console.log(match);
      return match.players.some((player) => player._id === userId);
    });

    console.log(data.matches);
    return userMatchData.map((match, index) => {
      const opponent =
        match.players[0]._id === userId
          ? match.players[1].username
          : match.players[0].username;

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
        />
      );
    });
  };

  return (
    <div>
      <h2 className="text-2xl text-center">Your Matches</h2>
      {getMatchCards()}
    </div>
  );
};

export default MatchList;
