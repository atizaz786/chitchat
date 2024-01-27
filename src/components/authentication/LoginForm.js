// src/components/authentication/LoginForm.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from './validationSchema';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setError, setLoading } from '../../store/slices/authSlice';
import { logIn } from '../../services/authService';
import { fetchUserData } from '../../services/userService';
import GoogleSignInButton from './SignInWithGoogle';
import { handleAuth } from '../../utils/auth/auth.utils'; // Ensure this component is correctly implemented

const LoginForm = ({ onToggleForms }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     dispatch(setLoading(true));
  //     const userCredential = await logIn(values.email, values.password);
  //     const additionalUserData = await fetchUserData(userCredential.uid); // Fetch additional user data
  //     dispatch(setCurrentUser({ ...userCredential.user, ...additionalUserData }));
  //     navigate('/chat');
  //     dispatch(setError(null));
  //   } catch (error) {
  //     console.log(error)
  //     dispatch(setError(error.message));
  //   } finally {
  //     dispatch(setLoading(false));
  //     setSubmitting(false);
  //   }
  // };
  const handleSubmit = async (values, { setSubmitting }) => {
    await handleAuth('login', values, dispatch, setError, setLoading, setCurrentUser, navigate);
    setSubmitting(false);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        {/* Replace with your logo */}
        <img src="logo.png" alt="Logo" className="max-w-xs" />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-center">Login to Your Account</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <Field 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  className="w-full p-2 border rounded" 
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                <Field 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  className="w-full p-2 border rounded" 
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <GoogleSignInButton />
          <p className="text-center">
            Don't have an account?{' '}
            <button 
              onClick={onToggleForms} 
              className="text-blue-500 hover:text-blue-600"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
