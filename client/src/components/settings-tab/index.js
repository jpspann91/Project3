import React, {useState, useEffect} from 'react';


function Settings(profile) {

    return (

        <div className='w-screen grid content-start px-4 py-4'>
            <div className='grid content-start'>
                <div className='text-4xl font-medium pb-5'>Profile</div>
                <div className='flex items-center justify-between text-2xl'>
                    <div className='mr-2 font-thin'>Full Name</div>
                    <div className='font-medium'>{profile.data.fullName}</div>
                </div>
                <div className='flex items-center justify-between text-2xl'>
                    <div className='mr-2 font-thin'>User Name</div>
                    <div className='font-medium'>{profile.data.userName}</div>
                </div>
                <div className='flex items-center justify-between text-2xl'>
                    <div className='mr-2 font-thin'>ID</div>
                    <div className='font-medium'>{profile.data.id}</div>
                </div>
            </div>
            <hr className='my-5'></hr>
            <div className='grid content-start gap-y-2'>
                <div className='text-4xl font-medium pb-5'>Settings</div>
                <div className='flex items-center justify-between text-2xl'>
                    <div className='mr-2 font-normal'>Color Blind Mode</div>
                    <div className=' h-6 w-12 bg-neutral-700 rounded-full hover:cursor-pointer'>
                        <div className={'h-6 w-6 scale-90 rounded-full bg-white pointer-events-none'}></div>
                    </div>
                </div>
                <div className='flex items-center justify-between text-2xl'>
                    <div className='mr-2 font-normal'>Notifications</div>
                    <div className=' h-6 w-12 bg-green-500 rounded-full hover:cursor-pointer flex justify-end'>
                        <div className={'h-6 w-6 scale-90 rounded-full bg-white pointer-events-none'}></div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Settings;