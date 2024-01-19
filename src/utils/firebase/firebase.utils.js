// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVgaFvJGPCN8ttE5M9CM_6sby6WUq3L_c",
  authDomain: "chitchat-52721.firebaseapp.com",
  projectId: "chitchat-52721",
  storageBucket: "chitchat-52721.appspot.com",
  messagingSenderId: "57801798441",
  appId: "1:57801798441:web:bf890ede1222e0a9663d38",
  measurementId: "G-8HPVKNHE31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();