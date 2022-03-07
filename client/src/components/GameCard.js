import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import PendingContext from "../PendingContext";
import Auth from "../utils/auth";
import { ADD_MATCH } from "../utils/mutations";
import { getObjectID } from "../utils/utils";

const GameCard = ({
  _id,
  gameType,
  ruleSet,
  count = 1,
  icon,
  path = "",
  opponent = "",
  type,
  isTurn = false,
  winner = "",
  handlePageState = () => {},
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

      handlePageState("friends");
    }
  };

  const getGameStatus = () => {
    if (type === "game") {
      return "";
    }

    if (winner) {
      if (winner === currentUser.username) {
        return <div className="font-bold text-green-300"> You Won</div>;
      } else {
        return <div className="font-bold text-red-300">Game Finished</div>;
      }
    } else {
      if (isTurn) {
        return <div className="font-bold text-amber-500">Your Turn</div>;
      } else {
        return <div className="font-semibold text-green-500">Their Turn</div>;
      }
    }
  };

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
                      <div className="flex">
                        <div className="mr-1">VS.</div>
                        <div className="font-normal text-neutral-500">
                          {opponent}
                        </div>
                      </div>
                    </div>
                    <div className="text-center font-thin">
                      {getGameStatus()}
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
            className="bg-neutral-700 hover:bg-neutral-800 text-md w-20 uppercase h-10 text-white px-4 py-2 rounded-md"
            onClick={buttonClickHandler}
          >
            {opponent ? "Visit" : "New"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
