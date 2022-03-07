import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import 'antd/dist/antd.css';
import { Input, message } from 'antd'
import Auth from '../utils/auth'

const styles = {
    disabled: {
      pointerEvents: "none",
      opacity: 0.7,
    },
    error: {
        backgroundColor: '#fff0f4',
        border: '1px solid #c51244'
    },
    message: {
        color: '#999',
        fontSize: '.75rem',
        marginLeft: '2%',
    }
};

const EMAIL_MATCHER = /.+@.+\..+/;

const validators = {
    password: (pswd) => {
        return pswd.length >= 5;
    },
    email: (email) => {
        return EMAIL_MATCHER.test(email);
    },
    username: (username) => {
        return username.length >= 4 && username.length <= 15;
    },
}

const errorMessages = {
    password: 'Minimum 5 characters',
    email: 'Enter a valid email',
    username: 'Between 4 and 15 characters'
}

const SignupForm = ({ handleformslide }) => {
    const [userFormData, setUserFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        icon:'',
    })

    const [validated] = useState(false)

    const [showAlert, setShowAlert] = useState(false);

    const [isValid, setIsValid] = useState({
        password: true,
        username: true,
        email: true,
    });

    const [hasBlurred, setHasBlurred] = useState({
        password: false,
        username: false,
        email: false,
    })

    const [addUser, { error }] = useMutation(ADD_USER);

    useEffect(() => {
        if (error) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }

        validateInput();

    }, [error, userFormData])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value })

    }

    const validateInput = () => {
        
        setIsValid({
            password: validators.password(userFormData.password),
            email: validators.email(userFormData.email),
            username: validators.username(userFormData.username),
        })
        


    }

    const handleFormSubmit = async (event) => {

        event.preventDefault();

        // Check user input against validators
        let errors = [];
        if (userFormData.email)

        try {
            //Use the mutation here
            const { data } = await addUser({
                variables: {
                    params: JSON.stringify(
                        { 
                            ...userFormData, 
                            icon: userFormData.firstName.substring(0,1) + userFormData.lastName.substring(0,1)  })
                }
            })

            console.log(data)
            Auth.login(data.addUser.token)

            window.location.assign('/')
        } catch (err) {
            message.error({
                content: 'Account creation unsuccessful',
                duration: 2,
            });

            console.log(JSON.stringify(error, null, 2));
        }
    }


    return (
        <>
            <form style={{ transform: 'translateX(100vw)' }} className={'w-screen px-4'} noValidate validated={validated.toString()}
                onSubmit={handleFormSubmit}>
                {/*First Name */}
                <div className='grid' label='First Name'>
                    <label>First Name</label>
                    <Input type='text'
                        placeholder='First Name'
                        name='firstName'
                        onChange={handleInputChange}
                        value={userFormData.firstName}
                        required />

                </div>
                {/*Last Name */}
                <div className='grid' label='Last Name'>
                    <label>Last Name</label>
                    <Input type='text'
                        placeholder='Last Name'
                        name='lastName'
                        onChange={handleInputChange}
                        value={userFormData.lastName}
                        required />
                </div>

                {/*Username */}
                <div className='grid' label='Username'>
                    <label>Username <span style={styles.message}>{!isValid.username && errorMessages.username}</span></label>
                    <Input type='text'
                        placeholder='Username'
                        onChange={handleInputChange}
                        onBlur={() => setHasBlurred(prevBlur => ({ ...prevBlur, username: true }))}
                        name='username'
                        value={userFormData.username}
                        required
                        style={hasBlurred.username && !isValid.username ? styles.error : {}} 
                    />
                </div>

                {/*Email */}
                <div className='grid' label='Email'>
                    <label>Email {hasBlurred.email && <span style={styles.message}>{!isValid.email && errorMessages.email}</span>}</label>
                    <Input type='email'
                        placeholder='Email'
                        name='email'
                        onChange={handleInputChange}
                        onBlur={() => setHasBlurred(prevBlur => ({ ...prevBlur, email: true }))}
                        value={userFormData.email}
                        required
                        style={hasBlurred.email && !isValid.email ? styles.error : {}} 
                    />
                </div>
                {/*Password */}
                <div className='Password' label='Password'>
                    <label className='w-100'>Password <span style={styles.message}>{!isValid.password && errorMessages.password}</span></label>
                    <Input type='password'
                        placeholder='Password'
                        name='password'
                        onChange={handleInputChange}
                        onBlur={() => setHasBlurred(prevBlur => ({ ...prevBlur, password: true }))}
                        value={userFormData.password}
                        required
                        style={hasBlurred.password && !isValid.password ? styles.error : {}}
                    />
                </div>

                <div className='w-full flex justify-between text-lg'>

                    <button
                        onClick={() => handleformslide('signup')}
                        className='bg-gradient-to-t from-neutral-700  to-neutral-600 text-white my-5 px-8 text-md w-4/12 py-2 rounded-lg' type='button'>
                        Login
                    </button>

                    <button
                        className='bg-gradient-to-t from-blue-500  to-blue-400 text-white my-5 px-8 w-7/12 py-2 rounded-lg'
                        style={isValid.password && isValid.username && isValid.email ? {} : styles.disabled}
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