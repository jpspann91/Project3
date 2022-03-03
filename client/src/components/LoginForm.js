import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

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
        <form  noValidate 
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
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Your email"
              name="email"
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
            <div type="invalid">
              What, no Email?
            </div>
          </div>
  
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Your password"
              name="password"
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
            <div type="invalid">
              What, no passoword?
            </div>
          </div>
          <button
            disabled={!(userFormData.email && userFormData.password)}
            type="submit"
            variant="success"
          >
            Submit
          </button>
        </form>
      </>
    );
  };
  
  export default LoginForm;