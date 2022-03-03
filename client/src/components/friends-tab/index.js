import React, { useContext } from "react";
import FriendBanner from "./FriendBanner";
import { ReactComponent as SearchSVG } from "./search.svg";
import FriendBanner from './FriendBanner';
import { ReactComponent as SearchSVG } from './search.svg'
import Auth from '../../utils/auth'
import { useQuery } from "@apollo/client";


// ! temporary seeding
import PendingContext from "../../PendingContext";
import PendingMatchNotice from "../PendingMatchNotice";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";

const activeUser = {
  username: "BriKernighan",
};

function Friends() {
  const { pendingMatch } = useContext(PendingContext);
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: {
      username: activeUser.username,
    },
  });

  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return error;
  }

  console.log(pendingMatch);

  return (
    <>
      <div
        style={{ height: window.innerHeight }}
        className="text-dark w-screen grid content-start px-4 py-4 bg-white overflow-y-scroll pb-16"
      >
        <div className="grid content-between">
          {pendingMatch.game.gameType && <PendingMatchNotice />}
          <div className="text-4xl font-medium pb-5">Friends List</div>
          <div className="relative">
            <SearchSVG className="absolute stroke-dark h-full p-1" />

            <input
              className="placeholder-neutral-700 focus:outline-none py-1 px-10 w-full bg-neutral-200 rounded-full"
              placeholder="Find.."
              type="text"
            ></input>
          </div>
        </div>
        {!loading && (
          <>
            <div className="my-5">
              <div className="text-2xl font-medium pb-5">Online</div>
              {data.user.friends
                .filter((data) => data.online)
                .map((data, index) => (
                  // ! Online Players
                  <FriendBanner data={data} key={index} />
                ))}
            </div>

            <hr className="mb-5"></hr>

            <div className="opacity-70">
              <div className="text-2xl font-medium pb-5">Offline</div>
              {data.user.friends
                .filter((data) => !data.online)
                .map((data, index) => (
                  // ! Offline Players
                  <FriendBanner data={data} key={index} />
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Friends;
