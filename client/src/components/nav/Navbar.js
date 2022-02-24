import React, { useState } from 'react';
import { ReactComponent as MenuSVG } from './menu.svg'
import { ReactComponent as SettingsSVG } from './settings.svg'
import { ReactComponent as FriendsSVG } from './friends.svg'
import { ReactComponent as CloseSVG } from './close.svg'

function NavBar(props) {

    const [state, setstate] = useState({
        settings: <SettingsSVG onClick={() => setState('settings')} className="stroke-neutral-700 hover:cursor-pointer" />,
        friends: <FriendsSVG onClick={() => setState('friends')} className="fill-neutral-700 hover:cursor-pointer" />,
        // close:<CloseSVG onClick={() => setState('friends')} className="fill-red-500 hover:cursor-pointer" />,
    })

    function setState(x) {
        props.handlePageState(x)
        switch (x) {
            case 'friends':
                setstate({
                    settings: <SettingsSVG onClick={() => setState('settings')} className="stroke-neutral-700 hover:cursor-pointer" />,
                    friends: <CloseSVG onClick={() => setState('games')} className="fill-neutral-700 hover:cursor-pointer" />
                })
                break;
            case 'settings':
                setstate({
                    settings: <CloseSVG onClick={() => setState('games')} className="fill-neutral-700 hover:cursor-pointer" />,
                    friends: <FriendsSVG onClick={() => setState('friends')} className="fill-neutral-700 hover:cursor-pointer" />
                })
                break;
            case 'games':
                setstate({
                    settings: <SettingsSVG onClick={() => setState('settings')} className="stroke-neutral-700 hover:cursor-pointer" />,
                    friends: <FriendsSVG onClick={() => setState('friends')} className="fill-neutral-700 hover:cursor-pointer" />
                })
                break;

            default:
                break;
        }

    }

    return (

        <div className='fixed w-screen h-14 bg-neutral-200 px-4 py-3 flex justify-between'>
            <div className=' flex'>
                {state.settings}
            </div>
            <p className='flex text-center text-3xl uppercase font-medium text-neutral-700'>Nexus</p>
            <div className=' flex'>
                {state.friends}
            </div>

        </div>
    );
}

export default NavBar;