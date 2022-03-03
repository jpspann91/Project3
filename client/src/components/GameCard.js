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
    <div>
      <div className="w-screen px-4 my-2 h-20">
        <div className=" pb-4 flex justify-between">
          <div>
            <img
              className="w-20 h-auto"
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
                      <div>
                        <div className="text-center font-thin">VS.</div>
                        <div>{opponent}</div>
                      </div>
                    </>
                  ) : (
                    ruleSet
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full ">
              <button
                className="bg-neutral-800 text-xl text-white px-16 py-2 rounded-sm"
                onClick={buttonClickHandler}
              >
                {opponent ? "Continue" : "Play"}
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-neutral-700 text-md uppercase text-white h-20 w-28 px-4 py-2 rounded-sm"
              onClick={() => history.push(path)}
            >
              {opponent ? "Continue" : "Start"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
