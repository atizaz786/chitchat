// src/services/authService.js
import { auth, db } from '../utils/firebase/firebase.utils';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Helper function to save user data to Firestore
const saveUserDataToFirestore = async (user) => {
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || 'Guest', // Use displayName for Google Sign-In
    // Add other fields as needed
  });
};

export const signUp = async (email, password, username) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await saveUserDataToFirestore({ ...user, displayName: username }); // Save with custom username
  return user;
};

export const logIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logOut = async () => {
  return await signOut(auth);
};

export const signInWithGooglePopUp = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  await saveUserDataToFirestore(userCredential.user); // Save user data from Google Sign-In
  return userCredential.user;
};
