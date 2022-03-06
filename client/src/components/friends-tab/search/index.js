import React, { useState, useEffect } from 'react';
import { ReactComponent as SearchSVG } from './search.svg'
import { useQuery } from "@apollo/client";
import { QUERY_USERS, QUERY_USER } from "../../../utils/queries";
import FindFriend from './FindFriend';

function SearchBar({ data }) {
    let isFound = false
    const [username, setusername] = useState('');
    const [list, setList] = useState(data.users)
    const userList = data.users.map(el => el.username)

    console.log(data);


    const handleInputChange = (event) => {
        const { value } = event.target;
        setusername(value);
        if (userList.filter(person => person.toLowerCase().includes(username))) {
            setList(data.users.filter(person => person.username.toLowerCase().includes(username)))
        }
        // console.log(people);
    };
    return (
        <>
            <div className='relative'>
                <SearchSVG className="absolute stroke-dark h-full p-1" />
                <form autoComplete="off">
                    <input className='placeholder-neutral-800 text-lg focus:outline-none py-1 px-10 w-full bg-gradient-to-b from-neutral-300  to-neutral-200 rounded-full'
                        placeholder='Find..'
                        type="text"
                        name="username"
                        onChange={handleInputChange}
                    >
                    </input>

                </form>
                <div className='z-50 absolute mt-6 border-t rounded-lg w-full bg-white shadow-lg max-h-96 overflow-y-scroll shadow-neutral-400 flex flex-col'>

                    {list.length > 0 && list.length < 12 && list.map((data, index) => {
                        return <FindFriend key={index} data={data} />
                    })}
                </div>
            </div>
        </>
    )
}

export default SearchBar