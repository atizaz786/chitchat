import React from 'react';
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../../store/slices/authSlice';

const GoogleSignInButton = () => {
  const dispatch = useDispatch();

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
