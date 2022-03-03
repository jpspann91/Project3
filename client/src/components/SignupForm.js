import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import 'antd/dist/antd.css';
import { Input, Button, Alert, Form } from 'antd'
import Auth from '../utils/auth'



const SignupForm = () => {

    const [userFormData, setUserFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: ''
    })

    const [validated] = useState(false)

    const [showAlert, setShowAlert] = useState(false);

    const [addUser, { error}] = useMutation(ADD_USER);

    // useEffect(() => {
    //     if (error) {
    //         setShowAlert(true);
    //     } else {
    //         setShowAlert(false);
    //     }
    // }, [error])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value })
    }

    const handleFormSubmit = async (event) => {
        console.log('submit')

        // const form = event.currentTarget;
        // if (form.checkValidity() !== false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        try {
            //Use the mutation here
            const { data } = await addUser({
                variables: { 
                    params: JSON.stringify({...userFormData})
                }
            })
            console.log(data)
            Auth.login(data.addUser.token)
        } catch (err) {
            console.log(err)
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
            fullName: '',
        });
    }

    return (
        <>
            <form className='px-4' noValidate validated={validated.toString()}
                onSubmit={handleFormSubmit}>



                {/*Username */}
                <div className='grid' label='Username'>
                    <label>Username</label>
                    <Input type='text' 
                        placeholder='Username'
                        onChange={handleInputChange}
                        name='username'
                        value={userFormData.username}
                        required />
                </div>

                {/*Email */}
                <div className='grid' label='Email'>
                    <label>Email</label>
                    <Input type='email' 
                        placeholder='Email'
                        name='email'
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required />
                </div>
                {/*Password */}
                <div className='Password' label='Password'>
                    <label>Password</label>
                    <Input type='password' 
                        placeholder='Password'
                        name='password'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required />
                </div>
                {/*Full Name */}
                <div className='grid' label='Full Name'>
                    <label>Name</label>
                    <Input type='text' 
                        placeholder='Full Name'
                        name='fullName'
                        onChange={handleInputChange}
                        value={userFormData.fullName}
                        required />
                </div>
                <div className='w-full grid'>
                <button className='bg-neutral-700 text-white my-5 px-8 text-md w-full py-2 rounded-lg' type="primary" htmltype="submit"
                    // disabled={
                    //     !(
                        //         userFormData.username &&
                    //         userFormData.email &&
                    //         userFormData.password &&
                    //         userFormData.fullName
                    //     )
                    // }
                >Sign Up</button>
                        <Alert className=' bg-white  h-8'
                            dismissible
                            onClose={() => setShowAlert(false)}
                            show={showAlert}
                        >Something went wrong with your singup!</Alert>
                    
                </div>

            </form>
        </>
    );
};

export default SignupForm;