import React from "react";
import { ReactComponent as SettingsSVG } from "./settings.svg";
import { ReactComponent as FriendsSVG } from "./friends.svg";
import { ReactComponent as CloseLeftSVG } from "./close-left.svg";
import { ReactComponent as CloseRightSVG } from "./close-right.svg";
import Auth from "../../utils/auth";

function NavBar({ handlePageState, page }) {
  const getLeftIcon = () => {
    if (page === "settings") {
      return (
        <CloseRightSVG
          onClick={() => handlePageState("games")}
          className="stroke-neutral-100 hover:cursor-pointer h-9 w-9"
        />
      );
    } else {
      return (
        <SettingsSVG
          onClick={() => handlePageState("settings")}
          className="fill-neutral-100 hover:cursor-pointer h-9 w-9"
        />
      );
    }
  };

  const getRightIcon = () => {
    if (page === "friends") {
      return (
        <CloseLeftSVG
          onClick={() => handlePageState("games")}
          className="stroke-neutral-100 hover:cursor-pointer h-9 w-9"
        />
      );
    } else {
      return (
        <FriendsSVG
          onClick={() => handlePageState("friends")}
          className="stroke-neutral-100 hover:cursor-pointer h-9 w-9"
        />
      );
    }
  };

  return (
    <div className="fixed w-screen h-14 bg-gradient-to-t from-neutral-800  to-neutral-700 px-4 py-3 flex justify-between  shadow-neutral-500">
      <div className=" flex">{Auth.loggedIn && getLeftIcon()}</div>
      <a href="/">
        <p className="flex text-center text-3xl uppercase font-medium text-neutral-100">
          Nexus
        </p>
      </a>
      <div className=" flex">{Auth.loggedIn && getRightIcon()}</div>
    </div>
  );
}

export default NavBar;
