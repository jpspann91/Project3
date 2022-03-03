import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Input } from 'antd';

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
  
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

          variables: { ...userFormData}
  
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
        <form className='px-4'  
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
          <button className='w-full mt-5 bg-neutral-700 text-white text-xl py-2 rounded-lg'
            disabled={!(userFormData.email && userFormData.password)}
            type="submit"
            variant="success"
          >
            Login
          </button>
        
        </form>
      </>
    );
  };
  
  export default LoginForm;