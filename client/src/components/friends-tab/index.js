import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";
import FriendBanner from './FriendBanner';
import SearchBar from './SearchBar';

import Auth from '../../utils/auth'
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USERS } from '../../utils/queries';


// ! temporary seeding
import seeds from './friend-seed'
import CheckableTag from 'antd/lib/tag/CheckableTag';

function Friends() {


    return (

        <div style={{height: window.innerHeight}} className='text-neutral-700 w-screen grid content-start px-4 py-5 overflow-y-scroll pb-16'>
            <div className='grid content-between'>
                <div className='text-4xl font-medium pb-5'>Friends List</div>
                <div className='relative'>                    
                    <SearchBar />
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