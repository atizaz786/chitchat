// src/utils/authUtils.js
import {
  signUp,
  logIn,
  signInWithGooglePopUp,
} from "../../services/authService";
import { fetchUserData } from "../../services/userService";
import {
  signUpErrorMessages,
  loginErrorMessages,
} from "../../components/authentication/ErrorMesages";
import Snackbar from "../../components/Snackbar";

export const handleAuth = async (
  type,
  values,
  dispatch,
  setError,
  setLoading,
  setCurrentUser,
  navigate,
  setMessage
) => {
  try {
    setLoading(true);
    let userCredential;

    if (type === "signup") {
      userCredential = await signUp(
        values.email,
        values.password,
        values.username
      );
    } else if (type === "login") {
      userCredential = await logIn(values.email, values.password);
    } else if (type === "googleSignIn") {
      userCredential = await signInWithGooglePopUp();
    }

    const additionalUserData =
      type !== "googleSignIn" ? await fetchUserData(userCredential.uid) : {};
    dispatch(setCurrentUser({ ...userCredential.user, ...additionalUserData }));
    navigate(type === "login" ? "/chat" : "/");
    setError(null);
  } catch (error) {
    let errorMessage;
    if (type === "login") {
      errorMessage = loginErrorMessages(error.code);
    } else {
      errorMessage = signUpErrorMessages(error.code);
    }
    setMessage(errorMessage);
    console.error(error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
