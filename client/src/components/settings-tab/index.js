import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from '../../utils/mutations'
import Slider from "./slider";

function Settings({data}) {
    const [logout] = useMutation(LOGOUT_USER);
    // console.log(data.user);

    const handleLogout = async () => {
        try {
            await logout({
                variables: { userId: data.user._id }
            })
        } catch(error) { console.log(JSON.stringify(error, null, 2));}

        Auth.logout();
    }


    return (
        <div className="text-neutral-700 w-screen  grid content-start bg-white">
            <div className="text-4xl font-medium py-5 px-4">Settings</div>
            <label className="px-4 text-lg font-semibold h-12 bg-gradient-to-bl from-neutral-200 to-neutral-100 flex items-center uppercase">
                profile
            </label>
            <div className="px-4 grid content-start content-start ">
                <div className="flex text-2xl h-12 border-b flex justify-between items-center w-full  ">
                    <div className="mr-2 font-thin uppercase text-lg ">Username</div>
                    <div className="font-normal ">{data.user.username}</div>
                </div>
                <div className="flex text-2xl h-12 border-b flex justify-between items-center w-full  ">
                    <label className="mr-2 font-thin uppercase text-lg">Name</label>
                    <div className="font-normal">{data.user.firstName + ' '+ data.user.lastName}</div>
                </div>
                <div className="flex text-2xl h-12 border-b flex justify-between items-center w-full">
                    <div className="mr-2 font-thin uppercase text-lg">Email</div>
                    <div className="font-normal flex justify-end  items-center w-full ">
                        {data.user.email}
                    </div>
                </div>
                <div className="flex text-2xl h-12 flex justify-between items-center w-full">
                    <div className="mr-2 font-thin uppercase text-lg">ID#</div>
                    <div className="font-thin">{data.user._id}</div>
                </div>
                <div className="pb-5 w-full flex justify-end px-24 pt-2">
                    <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-600 text-white text-lg py-2 px-4 rounded-lg font-semibold w-full">Sign Out</button>
                </div>

            </div>

            <div className="grid content-start">
                <label className="px-4 text-lg font-semibold bg-gradient-to-bl from-neutral-200 to-neutral-100 uppercase h-12 flex justify-start items-center">
                    General
                </label>
                <Slider data={{title: 'Show Online Status', anim: 'animate-on'}} />
                <Slider data={{title: 'Dark Mode', anim: 'animate-off'}} />
                <Slider data={{title: 'Notifications', anim: 'animate-on'}} />
            </div>
        </div>
    );
}

export default Settings;
