import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import PendingContext from "../PendingContext";

const GameCard = ({
  _id,
  gameType,
  ruleSet,
  count = 1,
  icon,
  path = "",
  opponent = "",
  type,
}) => {
  const history = useHistory();
  const { setPendingMatch } = useContext(PendingContext);

  const buttonClickHandler = (e) => {
    if (type === "match") {
      return history.push(path);
    } else {
      setPendingMatch((prevState) => {
        return {
          ...prevState,
          game: {
            id: _id,
            gameType,
          },
        };
      });
    }
  };

  console.log(path);
  return (
    <div className="w-screen px-4 py-2 border-b">
      <div className="flex justify-between items-center">
        <div>
          <img
            className="w-14 h-auto"
            src={`/gameIcons/${icon}`}
            alt={gameType}
          />
        </div>
        <div className="flex">
          <div>
            <div className="text-2xl font-normal text-center">{gameType}</div>
            <div>
              <div className="text-sm font-normal uppercase mr-2">
                {opponent ? (
                  <>
                    <div className="text-center font-thin">
                      You VS. {opponent}
                    </div>
                  </>
                ) : (
                  ruleSet
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            className="bg-gradient-to-t from-neutral-700 to-neutral-600 text-md uppercase h-10 text-white px-4 py-2 rounded-sm"
            onClick={buttonClickHandler}
          >
            {opponent ? "Continue" : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
