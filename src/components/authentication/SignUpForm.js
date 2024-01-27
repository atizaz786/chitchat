// src/components/authentication/SignupForm.js
import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpSchema } from "./validationSchema";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCurrentUser,
  setError,
  setLoading,
} from "../../store/slices/authSlice";
import { signUp } from "../../services/authService";
import { signUpErrorMessages } from "./ErrorMesages";
import { handleAuth } from "../../utils/auth/auth.utils";
import Snackbar from "../Snackbar";

const SignupForm = ({ onToggleForms }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  // const handleSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     dispatch(setLoading(true));
  //     const user = await signUp(values.email, values.password, values.username);
  //     dispatch(setCurrentUser(user));
  //     dispatch(setError(null));
  //     // In your sign-up logic
  //     localStorage.setItem("userName", values?.username); // Store the username

  //     dispatch(setError(null));
  //   } catch (error) {
  //     console.log(error);
  //     let errorCode = signUpErrorMessages(error.code);

  //     alert(errorCode);
  //     dispatch(setError(error.message));
  //   } finally {
  //     dispatch(setLoading(false));
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (values, { setSubmitting }) => {
    await handleAuth('signup', values, dispatch, setError, setLoading, setCurrentUser, navigate, setMessage);
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
          <h2 className="text-xl font-semibold text-center">
            Create Your Account
          </h2>
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={signUpSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <Field
                  type="text"
                  className="w-full p-2 border rounded"
                  name="username"
                  placeholder="Username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm"
                />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center">
            Already have an account?{" "}
            <button
              onClick={onToggleForms}
              className="text-blue-500 hover:text-blue-600"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
      <Snackbar message={message} setMessage={setMessage} />
    </div>
  );
};

export default SignupForm;
