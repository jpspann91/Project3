import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import 'antd/dist/antd.css';
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
            //Use the mutation here
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
            <Form noValidate
                validated={validated}
                onSubmit={handleFormSubmit}>
                <Alert
                    dismissible
                    onClose={() => setShowAlert(false)}
                    show={showAlert}
                >Soemthing went wrong with your singup!</Alert>


                {/*Username */}
                <Form.Item label='Username'>
                    <Input placeholder='Username'
                        onChange={handleInputChange}
                        value={userFormData.username}
                        required />
                </Form.Item>

                {/*Email */}
                <Form.Item label='Email'>
                    <Input placeholder='Email'
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required />
                </Form.Item>
                {/*Password */}
                <Form.Item label='Password'>
                    <Input placeholder='Password'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required />
                </Form.Item>
                {/*Full Name */}
                <Form.Item label='Full Name'>
                    <Input placeholder='Full Name'
                        onChange={handleInputChange}
                        value={userFormData.fullName}
                        required />
                </Form.Item>

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