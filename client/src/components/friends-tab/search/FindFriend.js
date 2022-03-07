

import { ReactComponent as AddSVG } from './add.svg'
import { ADD_FRIEND } from "../../../utils/mutations";
import { useMutation } from '@apollo/client';

function FindFriend(props) {

    const [addFriend] = useMutation(ADD_FRIEND)
    const handleAddFriend = (event) => {
        try {
            addFriend({
                variables: { userId: event }
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="relative text-neutral-800 text-xl flex justify-between items-center px-4 border-b">
            <div className='absolute pointer-events-none right-0 w-full h-full bg-gradient-to-t from-neutral-300 opacity-10  to-transparent'></div>
            <div className="flex justify-center items-center">
                <div className="h-12 w-12 my-4 text-white font-semibold rounded-full bg-gradient-to-tr from-neutral-700  to-neutral-600 mr-2 flex justify-center items-center">
                    {props.data.icon}
                </div>
                <div className="h-full flex flex-col justify-evently items-start text-neutral-700">
                    <div>{props.data.username}</div>
                    <div className='flex'>
                    <div className="font-thin text-lg pr-1">{props.data.firstName}</div>
                    <div className="font-thin text-lg pr-1">{props.data.lastName}</div>
                    </div>
                        
                </div>
            </div>
            <button onClick={(e) => handleAddFriend(e.target.id)} id={props.data._id} className="flex justify-center items-center bg-gradient-to-t from-green-500 to-green-400 py-3 px-3 rounded-lg text-white">
                <div className='pointer-events-none'>
                <AddSVG />
                </div>

            </button>
        </div>

    )
}

export default FindFriend