import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import PendingContext from "../PendingContext";
import Auth from "../utils/auth";
import { ADD_MATCH } from "../utils/mutations";
import { getObjectID } from "../utils/utils";


// const currentUser = {
//   _id: "621d90a76742d2938ffd5a00",
//   username: "BriKernighan",
// };

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
  let currentUser = Auth.getProfile().data;
  const history = useHistory();
  const { pendingMatch, setPendingMatch } = useContext(PendingContext);
  const [startMatch] = useMutation(ADD_MATCH);

  const buttonClickHandler = async (e) => {
    if (type === "match") {
      return history.push(path);
    } else {
      if (pendingMatch.user._id) {
        const matchId = getObjectID();
        console.log(matchId);

        await startMatch({
          variables: {
            params: JSON.stringify({
              _id: matchId,
              game: _id,
              status: "ongoing",
              winner: null,
              score: "0-0",
              gameBoard: "",
              players: [currentUser._id, pendingMatch.user._id],
              activePlayer: currentUser._id,
            }),
          },
        });
        console.log(path)
        console.log(matchId)

        history.push(`${path}/${matchId}`);

        setPendingMatch({
          user: {},
          game: {},
        });

        return;
      }

      setPendingMatch((prevState) => {
        return {
          ...prevState,
          game: {
            id: _id,
            gameType,
            ruleSet,
            icon,
            path,
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
