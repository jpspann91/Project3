import React from 'react';

function FriendBanner(friendObject) {



    return (

        <div className=' flex justify-between align-center py-2 text-lg border-b'>
            <div className='flex'>

                {friendObject.data.online}
                <div className='relative bg-gradient-to-tr from-neutral-800  to-neutral-500 z-50 bottom-0 text-neutral-100 rounded-full w-10 h-10 mr-4 grid content-center justify-center'>
                    {friendObject.data.icon}
                    {
                        friendObject.data.online &&
                        <>
                            <div className=' absolute h-2 w-2 bg-white scale-125 rounded-full bottom-1'></div>
                            <div className='animate-ping absolute h-2 w-2 bg-green-500 rounded-full bottom-1'></div>
                            <div className='absolute h-2 w-2 bg-green-500 rounded-full bottom-1'></div>
                        </>
                    }
                </div>

                <div>
                    <div className='flex'>
                        <div className='mr-2'>{friendObject.data.username}</div>
                        <div className='opacity-50 text-sm'>#{friendObject.data.id}</div>
                    </div>

                    <div className='text-xs'>{friendObject.data.fullName}</div>
                </div>
            </div>

            <button className='bg-blue-500 px-4 py-3  rounded-md font-medium text-white text-xs'>Challenge</button>

        </div>
    );
}

export default FriendBanner;