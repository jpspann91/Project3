import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";
import FriendBanner from './FriendBanner';
import { ReactComponent as SearchSVG } from './search.svg'
import Auth from '../../utils/auth'
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USERS } from '../../utils/queries';


// ! temporary seeding
import seeds from './friend-seed'

function Friends() {

    return (

        <div style={{height: window.innerHeight}} className='text-neutral-700 w-screen grid content-start px-4 py-5 overflow-y-scroll pb-16'>
            <div className='grid content-between'>
                <div className='text-4xl font-medium pb-5'>Friends List</div>
                <div className='relative'>                    
                    <SearchSVG className="absolute stroke-dark h-full p-1" />

                    <input className='placeholder-neutral-800 text-lg focus:outline-none py-1 px-10 w-full bg-gradient-to-b from-neutral-300  to-neutral-200 rounded-full' placeholder='Find..' type="text"></input>
                </div>
            </div>

            <div className='mt-5'>
                {seeds.filter(data => data.online).map((data, index) => (

                    // ! Online Players
                    <FriendBanner data={data} key={index} />
                ))}

            </div>
            
            <div>
                {seeds.filter(data => !data.online).map((data, index) => (
                    
                    // ! Offline Players
                    <FriendBanner data={data} key={index} />
                ))}
            </div>
        </div>
    );
}

export default Friends;