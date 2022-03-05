import React from 'react';
import { ReactComponent as SearchSVG } from './search.svg'
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USERS } from '../../utils/queries';

function SearchBar() {

    const {loading, error, data} = useQuery(QUERY_USERS)
    // if(loading) return
    // if(error) return console.log(error);
    // console.log(data);

    return (
        <>
            <SearchSVG className="absolute stroke-dark h-full p-1" />
            {!loading && <input className='placeholder-neutral-800 text-lg focus:outline-none py-1 px-10 w-full bg-gradient-to-b from-neutral-300  to-neutral-200 rounded-full' placeholder='Find..' type="text"></input>
                }
        </>
    )
}

export default SearchBar