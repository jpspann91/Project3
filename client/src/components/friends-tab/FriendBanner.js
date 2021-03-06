import { useMutation } from '@apollo/client';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PendingContext from '../../PendingContext';
import Auth from '../../utils/auth';
import { ADD_MATCH } from '../../utils/mutations';
import { getObjectID } from '../../utils/utils';

function FriendBanner(friendObject) {
let currentUser = Auth.getProfile().data;
    const history = useHistory();
    const { pendingMatch, setPendingMatch } = useContext(PendingContext);
    const [startMatch] = useMutation(ADD_MATCH);

    const startMatchHandler = async () => {

        if (pendingMatch.game.id) {

            const matchId = getObjectID();

            await startMatch({
                variables: {
                    params: JSON.stringify({
                        _id: matchId,
                        game: pendingMatch.game.id,
                        status: "ongoing",
                        winner: null,
                        score: "0-0",
                        gameBoard: "",
                        players: [currentUser._id, friendObject.data._id],
                        activePlayer: currentUser._id,
                    }),
                },
            });

            history.push(`${pendingMatch.game.path}/${matchId}`);

            setPendingMatch({
                user: {},
                game: {},
            });

        } else {
            await setPendingMatch(prevState => {
                return {
                    ...prevState,
                    user: {
                        ...friendObject.data,
                    }
                }
            });

            friendObject.handlePageState('games');

            // Add slide-right closeRight

            // history.push('/')
        }

    }

    return (

        <div className=' flex justify-between align-center py-2 text-lg border-b'>
            <div className='flex w-full'>
                <div className='relative bg-gradient-to-tr from-neutral-800  to-neutral-500 z-200 bottom-0 text-neutral-100 rounded-full w-10 h-10 mr-4 grid content-center justify-center'>
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
                        <div className='flex'>
                            <div className='text-xs mr-1'>{friendObject.data.firstName}</div>
                            <div className='text-xs'>{friendObject.data.lastName}</div>
                        </div>
                    </div>

                    <div className='opacity-50 text-sm'>#{
                        friendObject.data._id.substring(friendObject.data._id.length - 7, friendObject.data._id.length).toUpperCase()
                    }</div>
                </div>
            </div>

            {!window.location.href.includes('games') &&
                <button onClick={startMatchHandler} className='bg-neutral-700 hover:bg-neutral-600 text-sm  uppercase h-10 text-white px-4 py-2 rounded-md'>Provoke</button>

            }

        </div>
    );
}

export default FriendBanner;