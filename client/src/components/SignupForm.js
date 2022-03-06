import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import 'antd/dist/antd.css';
import { Input, Button, Alert, Form } from 'antd'
import Auth from '../utils/auth'
import { useHistory } from 'react-router-dom';



const SignupForm = ({handleformslide}) => {
    const history = useHistory();

    const [userFormData, setUserFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: ''
    })

    const [validated] = useState(false)

    const [showAlert, setShowAlert] = useState(false);

    const [addUser, { error }] = useMutation(ADD_USER);

    useEffect(() => {
        if (error) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [error])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value })
    }

    const handleFormSubmit = async (event) => {

        console.log(event.currentTarget);
        // if (form.checkValidity() !== false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        try {
            //Use the mutation here
            const { data } = await addUser({
                variables: {
                    params: JSON.stringify({ ...userFormData })
                }
            })
            console.log(data)
            Auth.login(data.addUser.token)
        } catch (err) {
            console.log(JSON.stringify(error, null, 2));
        }
    }


    return (
        <>
            <form style={{ transform: 'translateX(100vw)' }} className={'w-screen px-4'} noValidate validated={validated.toString()}
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
                <div className='w-full flex justify-between text-lg'>

                    <button 
                    onClick={() => handleformslide('signup')}
                    className='bg-gradient-to-t from-neutral-700  to-neutral-600 text-white my-5 px-8 text-md w-4/12 py-2 rounded-lg' type='button'>
                        Login
                    </button>

                    <button 
                    className=' bg-gradient-to-t from-blue-500  to-blue-400 text-white my-5 px-8 w-7/12 py-2 rounded-lg' 
                    type="submit" >
                        Create Account
                    </button>

                    {/* <Alert className='opacity-0  h-8'
                        dismissible
                        onClose={() => setShowAlert(false)}
                        show={showAlert}
                    >Something went wrong with your singup!</Alert> */}

                </div>

            </form>

        </>
    );
};

export default SignupForm;