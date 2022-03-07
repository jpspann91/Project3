import React, { useContext } from "react";
import FriendBanner from "./FriendBanner";
import { useQuery } from "@apollo/client";
import PendingContext from "../../PendingContext";
import PendingMatchNotice from "../PendingMatchNotice";
import { QUERY_USERS } from "../../utils/queries";
import SearchBar from "./search";

function Friends({data: user, handlePageState}) {
  const { pendingMatch } = useContext(PendingContext);

  const { loading, error, data } = useQuery(QUERY_USERS)
  if (loading) return <p>loading...</p>;
  if (error) {
    console.log(JSON.stringify(error, null, 2)); 
  };


  return (
    <div style={{ height: window.innerHeight }} className='text-neutral-700 w-screen grid content-start px-4 py-5 overflow-y-scroll pb-16'>
      <div className='grid content-between'>
        
        <div className='text-4xl font-medium pb-5'>Friends List</div>
        <div className='relative'>
          <SearchBar data={data} />

        </div>
      </div>
      {pendingMatch.game.gameType && <PendingMatchNotice />}
        <>
          {!user.user.friends.length &&

            <div className=" text-center mt-20 text-lg font-thin">
              You have no friends...
            </div>
          }
          <div className='mt-5'>
            {user.user.friends.filter(data => data.online).map((data, index) => (

              // ! Online Players
              <FriendBanner data={data} key={index} handlePageState={handlePageState} />
            ))}

          </div>

          <div>
            {user.user.friends.filter(data => !data.online).map((data, index) => (

              // ! Offline Players
              <FriendBanner data={data} key={index} handlePageState={handlePageState}/>
            ))}
          </div>
        </>
    </div>
  )
}

export default Friends;
