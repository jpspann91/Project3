import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Input } from 'antd';

import { ReactComponent as Arrow } from "../components/nav/close-left.svg"

const LoginForm = ({handleformslide}) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [form, setForm] = useState(' px-4 w-screen')

  const [login, { error }] = useMutation(LOGIN_USER);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('submit')
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    try {
      const { data } = await login({

        variables: { ...userFormData }

      });

      console.log(data)

      console.log('done')

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }


    setUserFormData({
      email: '',
      password: '',
    });
  };



  return (
    <>
      <form style={{ transform: 'translateX(100vw)' }} className={form}
        noValidate
        validated={validated.toString()}
        onSubmit={handleFormSubmit}>
        {/* <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
          >
            Something went wrong with your login credentials!
          </Alert> */}
        <div className='grid'>
          <label htmlFor="email">Email</label>
          <Input
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
        </div>
        <div className='w-full flex justify-between text-lg'>

          <button
            className='w-7/12 mt-5 bg-blue-500 hover:bg-blue-600 text-white  font-thin py-2 rounded-lg'
            disabled={!(userFormData.email && userFormData.password)}
            type="submit"
            variant="success">
            Login
          </button>

          <button
            onClick={() => handleformslide('login')}
            className=' flex justify-center items-center mt-5 bg-neutral-700 hover:bg-neutral-800 font-thin text-white  py-2 w-4/12 rounded-lg'
            type='button'>
            Sign Up
          </button>
        </div>

      </form>
    </>
  );
};

export default LoginForm;