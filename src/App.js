import {  Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";
import socketIO from "socket.io-client";
import PrivateRoute from "./navigation/PrivateRoute";
import LoginForm from "./components/authentication/LoginForm";
import "./App.css";

const socket = socketIO.connect("http://localhost:4000");
function App() {
  return (
  
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
      </Routes>
   
  );
}

export default App;
