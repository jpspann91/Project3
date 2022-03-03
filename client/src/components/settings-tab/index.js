
import React, { useState, useEffect } from 'react';
import { QUERY_ME } from '../../utils/mutations'
import Auth from '../../utils/auth'




function Settings(profile) {

    let user = Auth.getProfile().data.user
    console.log(user);

    return (

        <div className='text-neutral-700 w-screen  grid content-start bg-white'>
            <div className='text-4xl font-medium py-5 px-4'>Settings</div>
            <label className='px-4 text-lg font-semibold h-12 bg-gradient-to-bl from-neutral-200 to-neutral-100 flex items-center uppercase'>profile</label>
            <div className='px-4 grid content-start content-start '>
                <div className='flex text-2xl h-12 border-b flex justify-between items-center w-full  '>
                    <div className='mr-2 font-thin uppercase text-lg '>Username</div>
                    <div className='font-normal '>{user.username}</div>
                </div>
                <div className='flex text-2xl h-12 border-b flex justify-between items-center w-full  '>
                    <label className='mr-2 font-thin uppercase text-lg'>Name</label>
                    <div className='font-normal'>{user.fullName}</div>
                </div>
                <div className='flex text-2xl h-12 border-b flex justify-between items-center w-full'>
                    <div className='mr-2 font-thin uppercase text-lg'>Email</div>
                    <div className='font-normal flex justify-end  items-center w-full '>{user.email}</div>
                </div>
                <div className='flex text-2xl h-12 flex justify-between items-center w-full'>
                    <div className='mr-2 font-thin uppercase text-lg'>ID#</div>
                    <div className='font-thin'>{user._id}</div>

                </div>
            </div>
            
            <div className='grid content-start'>
            <label className='px-4 text-lg font-semibold bg-gradient-to-bl from-neutral-200 to-neutral-100 uppercase h-12 flex justify-start items-center'>General</label>
                <div className='px-4 flex items-center justify-between text-2xl h-12 border-b text-lg'>
                    <div className='mr-2 font-normal'>Dark Mode</div>
                    <div className=' h-6 w-12 bg-neutral-700 rounded-full hover:cursor-pointer'>
                        <div className={'h-6 w-6 scale-90 rounded-full bg-white pointer-events-none'}></div>
                    </div>
                </div>
                <div className='px-4 flex items-center justify-between text-2xl h-12 border-b text-lg'>
                    <div className='mr-2 font-normal '>Notifications</div>
                    <div className=' h-6 w-12 bg-green-500 rounded-full hover:cursor-pointer flex justify-end'>
                        <div className={'h-6 w-6 scale-90 rounded-full bg-white pointer-events-none'}></div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Settings;