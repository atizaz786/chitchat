// src/components/ChatPage.js
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  getConversation,
  createConversation,
} from "../services/conversationService";
import Header from "./Header";
import Drawer from "./Drawer";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({ socket }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [showDrawer, setShowDrawer] = useState(true);
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState(null); // Added state for selected recipient
  const lastMessageRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = async (user) => {
    if (currentUser && user) {
      console.log(currentUser, "currentUser");
      console.log(user, "user");
      if (user?.uid === currentUser?.uid) return;
      setSelectedUser(user);
      setMessages([]);
      // Additional logic to retrieve or create a conversation with the selected user
      // Check if a conversation exists between currentUser and selectedUser
      const conversation = await getConversation(
        currentUser.uid,
        selectedUser.uid
      );
      console.log(conversation, "conversation");

      if (conversation) {
        // Load existing messages
        setMessages(conversation.messages);
      } else {
        // Optionally, create a new conversation
        await createConversation(currentUser.uid, selectedUser.uid);
        // Depending on your app's needs, you might set this new conversation as the active one
      }
    }
  };

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      if (
        selectedUser &&
        data.senderId === currentUser.uid &&
        data.recipientId === selectedUser.uid
      ) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      socket.off("messageResponse");
    };
  }, [socket, selectedUser, currentUser]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  const handleToggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header onToggleDrawer={handleToggleDrawer} />
      <div className="flex flex-grow">
        {showDrawer && (
          <Drawer socket={socket} onSelectUser={handleSelectUser} />
        )}
        <div className="flex-grow flex flex-col">
          <ChatBody
            messages={messages}
            typingStatus={typingStatus}
            lastMessageRef={lastMessageRef}
            currentUser={currentUser}
          />
          {selectedUser && (
            <ChatFooter
              socket={socket}
              recipientId={selectedUser.uid}
              currentUser={currentUser}
              addMessage={addMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
