import React, { useContext } from "react";
import FriendBanner from "./FriendBanner";
import { ReactComponent as SearchSVG } from "./search.svg";
import Auth from '../../utils/auth'
import { useQuery } from "@apollo/client";
import PendingContext from "../../PendingContext";
import PendingMatchNotice from "../PendingMatchNotice";
import { QUERY_USER } from "../../utils/queries";

// const activeUser = {
//     ...Auth.getProfile()
// }

// Auth.getProfile()

function Friends() {
  let activeUser = Auth.getProfile().data
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
  console.log(data);

  return (
    <div style={{height: window.innerHeight}} className='text-neutral-700 w-screen grid content-start px-4 py-5 overflow-y-scroll pb-16'>
    <div className='grid content-between'>
    {pendingMatch.game.gameType && <PendingMatchNotice />}
        <div className='text-4xl font-medium pb-5'>Friends List</div>
        <div className='relative'>                    
            <SearchSVG className="absolute stroke-dark h-full p-1" />

            <input className='placeholder-neutral-800 text-lg focus:outline-none py-1 px-10 w-full bg-gradient-to-b from-neutral-300  to-neutral-200 rounded-full' placeholder='Find..' type="text"></input>
        </div>
    </div>
    {!loading && (
        <>
        
    <div className='mt-5'>
        {data.user.friends.filter(data => data.online).map((data, index) => (

            // ! Online Players
            <FriendBanner data={data} key={index} />
        ))}

    </div>
    
    <div>
        {data.user.friends.filter(data => !data.online).map((data, index) => (
            
            // ! Offline Players
            <FriendBanner data={data} key={index} />
        ))}
    </div>
    </>
    )}
    </div>
  )
}

export default Friends;
