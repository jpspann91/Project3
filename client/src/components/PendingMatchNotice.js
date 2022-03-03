import { Button } from "antd";
import React, { useContext } from "react";
import PendingContext from "../PendingContext";

const PendingMatchNotice = () => {
  const { pendingMatch, setPendingMatch } = useContext(PendingContext);

  if (!pendingMatch.game.id && !pendingMatch.user.id) return <></>;

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
      return `Select an opponent for ${pendingMatch.game.gameType}`;
    } else if (pendingMatch.user.id) {
      return `Select game type to play against ${pendingMatch.user.username}`;
    }
    return "";
  };

  return (
    <div className="text-2xl text-center">
      <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span class="block sm:inline">{getMessage()}</span>
        <Button onClick={closeNoticeHandler}>Cancel</Button>
      </div>
    </div>
  );
};

export default PendingMatchNotice;
