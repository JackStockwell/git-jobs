import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { LOGIN_USER } from '../../utils/mutations';
import { redirect, Link } from 'react-router-dom'; // Import useNavigate
import '../SignupForm/RegistrationForm.css';
import '../../pages/styles/login.css'


const LoginForm = () => {
    // States for form data to be used and saved.
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [errorData, setErrorData] = useState({ error: '' });

    // Login in user mutation.
    const [loginUser, { error }] = useMutation(LOGIN_USER);

    // Handles for change input
    const handleInputChange = (event) => {
        // Deconstruct the target with what has changed as name and the value as well value.
        const { name, value } = event.target;

        // Set the change in form data on the change in name and value.
        setUserFormData({ ...userFormData, [name]: value });
    }

    // Submits the form to the server to be processed, includes error handling.
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Error handling.
      if (!userFormData.email) {
          setErrorData({ ...errorData, error: 'You must enter an email!' })
          return
      }

      if (!userFormData.password) {
          setErrorData({ ...errorData, error: 'You must enter a password!' })
          return
      }

      // API request, awaits data.
      try {
          // Returns token and the user.
          const { data } = await loginUser({
              variables: { ...userFormData }
          })
          // Reset form data.
          setUserFormData({
            email: '', 
            password: '' 
          })
          // Login with JWT token.
          const user = Auth.login(data.loginUser.token);
          // Reset form data.
          setUserFormData({
            email: '', 
            password: '' 
          })

      // Error catcher, logs error.
      } catch (err) {
          console.error(err);
          setErrorData({ error: err.message });
          return
      }
    }


    return (
        <div className="login-container">
          <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
              {error && <span>{error.graphQLErrors[0].message}</span>}
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={userFormData.email || ''}
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={userFormData.password || ''}
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </div>
              <button className='w-100' type="submit">Login</button>
              {/* Use Link instead of anchor tag */}
            </form>
            <button className='button w-100'><Link className='link' to="/register">Don't have an account? Register here.</Link></button>
          </div>
        </div>
      );
    };

export default LoginForm;
