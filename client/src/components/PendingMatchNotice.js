
import React, { useContext } from "react";
import PendingContext from "../PendingContext";
import {ReactComponent as CloseSVG} from './close.svg'

const PendingMatchNotice = () => {
  const { pendingMatch, setPendingMatch } = useContext(PendingContext);

  if (!pendingMatch.game.id && !pendingMatch.user._id) return <></>;

  const closeNoticeHandler = () => {
    setPendingMatch({
      game: {
        id: "",
        gameType: "",
      },
      user: {
        id: "",
        username: "",
      },
    });
  };

  const getMessage = () => {
    if (pendingMatch.game.id) {
      return <div className="text-sm">Select an opponent for {pendingMatch.game.gameType}</div>;
    } else if (pendingMatch.user._id) {
      return <div className="text-sm">Select a game to play against {pendingMatch.user.username}</div>
    }
    return "";
  };

  return (
    <div className="text-2xl text-center pt-2">
      <div
        className=" flex justify-between items-center bg-amber-100 border-l-2 border-amber-400 text-amber-700 px-4 py-3 relative"
        role="alert">
        <span className=" mr-2">{getMessage()}</span>
        <CloseSVG onClick={closeNoticeHandler} />
      </div>
    </div>
  );
};

export default PendingMatchNotice;
