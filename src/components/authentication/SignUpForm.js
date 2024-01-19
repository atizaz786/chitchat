// src/components/SignupForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import signUpSchema from './validationSchema';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setError, setLoading } from '../../store/slices/authSlice';
import { authService } from '../../services/authService';

const SignupForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch(setLoading(true));
      const userCredential = await authService.signUp(values.email, values.password);
      dispatch(setCurrentUser(userCredential.user));
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={signUpSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
