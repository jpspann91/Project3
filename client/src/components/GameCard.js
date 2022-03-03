import React from "react";
import { useHistory } from "react-router-dom";

const GameCard = ({
  gameType,
  ruleSet,
  count = 1,
  icon,
  path,
  opponent = "",
}) => {
  const history = useHistory();

  console.log(path);
  return (
    <div className="w-screen px-4 mb-5">
      <div className="px-4 pb-4 pt-3  bg-neutral-200 rounded-md flex justify-between">
        <div className="grid content-between">
          <div>
            <div className="text-2xl">{gameType}</div>
            <div className="flex">
              <div className="text-lg font-thin uppercase mr-2">
                {opponent ? `Vs. ${opponent}` : ruleSet}
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full ">
            <button
              className="bg-neutral-800 text-xl text-white px-16 py-2 rounded-sm"
              onClick={() => history.push(path)}
            >
              {opponent ? "Continue" : "Play"}
            </button>
          </div>
        </div>
        <div>
          <img
            className="w-32 h-auto"
            src={`/gameIcons/${icon}`}
            alt={gameType}
          />
        </div>
      </div>
    </div>
  );
};

export default GameCard;
