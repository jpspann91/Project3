import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Input, Button, Alert, Form } from 'antd'


const SignupForm = () => {
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
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await addUser({
                variables: { ...userFormData },
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
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert
                    dismissible
                    onClose={()=> setShowAlert(false)}
                    show={showAlert}
                    >Soemthing went wrong with your singup!</Alert>
                <Form.Group>

                    {/*Username */}
                    <Form.Label htmlFor='username'>Username</Form.Label>
                    <Input placeholder='Username'
                        name='username'
                        onChange={handleInputChange}
                        value={userFormData.username}
                        required />
                    {/*Email*/}
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Input placeholder='Email'
                        name='email'
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required />
                    {/*Password */}
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Input placeholder='Password'
                        name='password'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required />
                    {/*Full Name */}
                    <Form.Label htmlFor='fullName'>Full Name</Form.Label>
                    <Input placeholder='Full Name'
                        name='fullName'
                        onChange={handleInputChange}
                        value={userFormData.fullName}
                        required />
                </Form.Group>
                <Button
                    disabled={
                        !(
                            userFormData.username &&
                            userFormData.email &&
                            userFormData.password &&
                            userFormData.fullName 
                        )
                    }
                    type='submit'
                    variant='success'
                    >Submit</Button>
            </Form>
        </>
    );
};

export default SignupForm;