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

    const [addUser, { error, data }] = useMutation(ADD_USER);

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
        console.log('submit')

        // const form = event.currentTarget;
        // if (form.checkValidity() !== false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        console.log('after')
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
            <Form noValidate validated={validated}
                onSubmit={(e) => e.preventDefault() }
                onFinish={handleFormSubmit}>
                <Alert
                    dismissible
                    onClose={() => setShowAlert(false)}
                    show={showAlert}
                >Something went wrong with your singup!</Alert>


                {/*Username */}
                <Form.Item label='Username'>
                    <Input type='text' 
                        placeholder='Username'
                        onChange={handleInputChange}
                        defaultValue={userFormData.username}
                        required />
                </Form.Item>

                {/*Email */}
                <Form.Item label='Email'>
                    <Input type='email' 
                        placeholder='Email'
                        onChange={handleInputChange}
                        defaultValue={userFormData.email}
                        required />
                </Form.Item>
                {/*Password */}
                <Form.Item label='Password'>
                    <Input type='password' 
                        placeholder='Password'
                        onChange={handleInputChange}
                        defaultValue={userFormData.password}
                        required />
                </Form.Item>
                {/*Full Name */}
                <Form.Item label='Full Name'>
                    <Input type='text' 
                        placeholder='Full Name'
                        onChange={handleInputChange}
                        defaultValue={userFormData.fullName}
                        required />
                </Form.Item>

                <Button type="primary" htmlType="submit"
                    // disabled={
                    //     !(
                    //         userFormData.username &&
                    //         userFormData.email &&
                    //         userFormData.password &&
                    //         userFormData.fullName
                    //     )
                    // }
                >Submit</Button>
            </Form>
        </>
    );
};

export default SignupForm;