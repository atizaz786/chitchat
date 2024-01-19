// src/services/authService.js
import { auth } from '../utils/firebase/firebase.utils';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const authService = {
  signUp: async (email, password) => {
    return await auth.createUserWithEmailAndPassword(email, password);
  },

  logIn: async (email, password) => {
    return await auth.signInWithEmailAndPassword(email, password);
  },

  logOut: async () => {
    return await auth.signOut();
  },

  signInWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  },

  // Other authentication-related functions
};
