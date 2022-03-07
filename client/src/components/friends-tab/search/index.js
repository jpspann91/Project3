import React, { useState, useEffect } from 'react';
import { ReactComponent as SearchSVG } from './search.svg'
import FindFriend from './FindFriend';
import Auth from '../../../utils/auth'

const CLOSE_SEARCH_DELAY = 50;

function SearchBar({ data }) {
    const activeUser = Auth.getProfile().data.username
    const [username, setusername] = useState('');
    const [list, setList] = useState(data.users.filter(data => data.username != activeUser))
    const [hasFocus, setFocus] = useState(false);

    let userList = data.users.map(el => el.username);

    userList.length = Math.min(userList.length, 12);


    const handleInputChange = (event) => {
        const { value } = event.target;

        setusername(value);

        let temp = data.users.filter(person => person.username.toLowerCase().includes(value.toLowerCase())).filter(data => data.username != activeUser)

        if (!temp) return

        setList(temp)
    };

    const handleBlur = (e) => {
        setTimeout(() => setFocus(false), CLOSE_SEARCH_DELAY)
    }

    return (
        <>
            <div className='relative'>
                <SearchSVG className="absolute stroke-dark h-full p-1" />
                <form autoComplete="off">
                    <input className='placeholder-neutral-800 text-lg focus:outline-none py-1 px-10 w-full bg-gradient-to-b from-neutral-200  to-white rounded-t-lg'
                        placeholder='Find..'
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                        onFocus={() => setFocus(true)}
                        onBlur={handleBlur}
                    >
                    </input>

                </form>
                {hasFocus &&
                    <div className='z-50 absolute mt-6 border-t rounded-lg w-full bg-white shadow-lg max-h-80 overflow-y-scroll shadow-neutral-400 flex flex-col'>

                        {list.length > 0 && list.map((data, index) => {
                            return <FindFriend key={index} data={data} />
                        })}

                    </div>
                }

            </div>
        </>
    )
}

export default SearchBar