import React from 'react';

function FriendBanner(friendObject) {

    let inviteButton = undefined


    if (friendObject.data.online) {
        inviteButton = <button className='bg-blue-500 px-4 py-2 rounded-md font-medium text-white text-xs'>INVITE</button>
    }

    return (

        <div className=' flex justify-between align-center py-2'>
            <div className='flex'>
                <div className='bg-neutral-500 text-neutral-200 rounded-full w-10 h-10 mr-4  grid content-center justify-center'>
                    {friendObject.data.icon}
                </div>

                <div>
                    <div className='flex'>
                        <div className='mr-2'>{friendObject.data.gamerName}</div>
                        <div className='opacity-50'>#{friendObject.data.id}</div>
                    </div>

                    <div className='text-xs opacity-75'>{friendObject.data.fullName}</div>
                </div>
            </div>

            {inviteButton}

        </div>
    );
}

export default FriendBanner;