import React, { useContext } from 'react';
import PendingContext from '../../PendingContext';

function FriendBanner(friendObject) {

    const { pendingMatch, setPendingMatch } = useContext(PendingContext);

    const startMatchHandler = () => {

        if (pendingMatch.game.id) {

        } else {
            setPendingMatch(prevState => {
                return {
                    ...prevState,
                    user: {
                        
                    }
                }
            })
        }

    }

    let inviteButton = undefined


    if (friendObject.data.online) {
        inviteButton = <button onClick={startMatchHandler} className='bg-neutral-700 px-4 py-3  rounded-md font-medium text-white text-xs'>INVITE</button>
    }

    return (

        <div className=' flex justify-between align-center py-2 text-lg border-b'>
            <div className='flex w-full'>
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

                <div className='flex justify-between' >
                    <div className='flex flex-col'>
                        <div className='mr-2'>{friendObject.data.username}</div>
                    <div className='text-xs'>{friendObject.data.fullName}</div>
                    </div>

                        <div className='opacity-50 text-sm'>#{friendObject.data.id}</div>
                </div>
            </div>

            <button className='bg-gradient-to-t from-blue-500  to-blue-400 px-4 py-3  rounded-md font-medium text-white text-xs'>Challenge</button>

        </div>
    );
}

export default FriendBanner;