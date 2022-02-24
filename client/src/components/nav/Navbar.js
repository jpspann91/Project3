import React from 'react';
import { ReactComponent as MenuSVG } from './menu.svg'
import { ReactComponent as SettingsSVG } from './settings.svg'
import { ReactComponent as FriendsSVG } from './friends.svg'

function NavBar() {


    return (

        <div className='h-14 bg-neutral-200 px-4 py-3 flex justify-between'>
            <div className=' flex'>
                <MenuSVG className="stroke-neutral-700 hover:cursor-pointer" />
            </div>
            <p className='flex text-center text-2xl'>NavBar</p>
            <div className=' flex'>
        <FriendsSVG className="fill-neutral-700 hover:cursor-pointer" />
            </div>

        </div>
    );
}

export default NavBar;