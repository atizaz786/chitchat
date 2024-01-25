// src/App.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import socketIO from "socket.io-client";
import PrivateRoute from "./navigation/PrivateRoute";
import LoginForm from "./components/authentication/LoginForm";
import SignupForm from "./components/authentication/SignUpForm";
import "./App.css";

const socket = socketIO.connect("http://localhost:4000");

function App() {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleToggleForms = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          showSignUp ? (
            <SignupForm onToggleForms={handleToggleForms} />
          ) : (
            <LoginForm onToggleForms={handleToggleForms} />
          )
        }
      />
      <Route 
        path="/chat" 
        element={
          <PrivateRoute>
            <ChatPage socket={socket} />
          </PrivateRoute>
        }
      />
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;
