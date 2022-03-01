import React, { useState } from 'react';
import { ReactComponent as MenuSVG } from './menu.svg'
import { ReactComponent as SettingsSVG } from './settings.svg'
import { ReactComponent as FriendsSVG } from './friends.svg'
import { ReactComponent as CloseSVG } from './close.svg'
import { ReactComponent as CloseLeftSVG } from './close-left.svg'
import { ReactComponent as CloseRightSVG } from './close-right.svg'

function NavBar(props) {

    const [state, setstate] = useState({
        settings: <SettingsSVG onClick={() => setState('settings')} className="fill-neutral-100 hover:cursor-pointer h-full w-full" />,
        friends: <FriendsSVG onClick={() => setState('friends')} className="fill-neutral-100 hover:cursor-pointer h-full w-full" />,
    })

    function setState(x) {
        props.handlePageState(x)
        switch (x) {
            case 'friends':
                setstate({
                    settings: <SettingsSVG onClick={() => setState('settings')} className="fill-neutral-100 hover:cursor-pointer h-full w-full" />,
                    friends: <CloseRightSVG onClick={() => setState('games')} className="fill-neutral-100 hover:cursor-pointer h-full w-full" />
                })
                break;
            case 'settings':
                setstate({
                    settings: <CloseLeftSVG onClick={() => setState('games')} className="fill-neutral-100 hover:cursor-pointer h-full w-full" />,
                    friends: <FriendsSVG onClick={() => setState('friends')} className="fill-neutral-100 hover:cursor-pointer h-full w-full" />
                })
                break;
            case 'games':
                setstate({
                    settings: <SettingsSVG onClick={() => setState('settings')} className="fill-neutral-100 hover:cursor-pointer h-full w-full" />,
                    friends: <FriendsSVG onClick={() => setState('friends')} className="fill-neutral-100 hover:cursor-pointer h-full w-full" />
                })
                break;

            default:
                break;
        }

    }

    return (

        <div className='fixed w-screen h-14 bg-neutral-800 px-4 py-3 flex justify-between'>
            <div className=' flex'>
                {state.settings}
            </div>
            <p className='flex text-center text-3xl uppercase font-medium text-neutral-100'>Nexus</p>
            <div className=' flex'>
                {state.friends}
            </div>

        </div>
    );
}

export default NavBar;