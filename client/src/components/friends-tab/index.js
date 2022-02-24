import React from 'react';
import FriendBanner from './FriendBanner';
import { ReactComponent as SearchSVG } from './search.svg'


// ! temporary seeding
import seeds from './friend-seed'

function Friends() {
    
    

    return (

        <div style={{height: window.innerHeight}} className='w-screen grid content-start px-4 py-4 bg-neutral-200'>
            <div className='grid content-between'>
                <div className='text-4xl font-medium pb-5'>Friends List</div>
                <div className='relative'>                    
                    <SearchSVG className="absolute stroke-neutral-500 h-full p-1" />

                    <input className='focus:outline-none py-1 px-10 w-full bg-white rounded-full' placeholder='Find..' type="text"></input>
                </div>
            </div>

            <div className='my-5'>
                <div className='text-2xl font-medium pb-5'>Online</div>
                {seeds.filter(data => data.online).map((data, index) => (

                    // ! Online Players
                    <FriendBanner data={data} key={index} />
                ))}

            </div>

            <hr className='mb-5'></hr>
            
            <div className='opacity-70'>
                <div className='text-2xl font-medium pb-5'>Offline</div>
                {seeds.filter(data => !data.online).map((data, index) => (
                    
                    // ! Offline Players
                    <FriendBanner data={data} key={index} />
                ))}
            </div>
        </div>
    );
}

export default Friends;