// src/components/GoogleSignInButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setError, setLoading } from '../../store/slices/authSlice';
import { signInWithGooglePopUp } from '../../services/authService';

const GoogleSignInButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    try {
      dispatch(setLoading(true));
      const userCredential = await signInWithGooglePopUp();
      console.log(userCredential)
      dispatch(setCurrentUser(userCredential));
      dispatch(setError(null));
      navigate('/chat');
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
