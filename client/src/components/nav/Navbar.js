
import React, { useState } from 'react';
import { ReactComponent as MenuSVG } from './menu.svg'
import { ReactComponent as SettingsSVG } from './settings.svg'
import { ReactComponent as FriendsSVG } from './friends.svg'
import { ReactComponent as CloseSVG } from './close.svg'
import { ReactComponent as CloseLeftSVG } from './close-left.svg'
import { ReactComponent as CloseRightSVG } from './close-right.svg'
import Auth from '../../utils/auth';

function NavBar(props) {


    const [state, setstate] = useState({
        settings: <SettingsSVG onClick={() => setState('settings')} className="fill-neutral-100 hover:cursor-pointer h-9 w-9" />,
        friends: <FriendsSVG onClick={() => setState('friends')} className="stroke-neutral-100 hover:cursor-pointer h-9 w-9" />,
    })

    function setState(x) {
        props.handlePageState(x)
        switch (x) {
            case 'friends':
                setstate({
                    settings: <SettingsSVG onClick={() => setState('settings')} className="fill-neutral-100 hover:cursor-pointer h-9 w-9" />,
                    friends: <CloseLeftSVG onClick={() => setState('games')} className="stroke-neutral-100 hover:cursor-pointer h-9 w-9" />
                })
                break;
            case 'settings':
                setstate({
                    settings: <CloseRightSVG onClick={() => setState('games')} className="stroke-neutral-100 hover:cursor-pointer h-9 w-9" />,
                    friends: <FriendsSVG onClick={() => setState('friends')} className="stroke-neutral-100 hover:cursor-pointer h-9 w-9" />
                })
                break;
            case 'games':
                setstate({
                    settings: <SettingsSVG onClick={() => setState('settings')} className="fill-neutral-100 hover:cursor-pointer h-9 w-9" />,
                    friends: <FriendsSVG onClick={() => setState('friends')} className="stroke-neutral-100 hover:cursor-pointer h-9 w-9" />
                })
                break;

            default:
                break;
        }
    }

    return (

        <div className='fixed w-screen h-14 bg-gradient-to-t from-neutral-800  to-neutral-700 px-4 py-3 flex justify-between  shadow-neutral-500'>
            <div className=' flex'>
                {Auth.loggedIn && state.settings}
            </div>
            <p className='flex text-center text-3xl uppercase font-medium text-neutral-100'>
                Nexus
            </p>
            <div className=' flex'>
                {Auth.loggedIn && state.friends}
            </div>

        </div>
    );
}

export default NavBar;
