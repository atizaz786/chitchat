import { useEffect, useState, useRef } from "react";
import { getConversation, createConversation } from "../services/conversationService";

const ChatManager = ({ socket, selectedUser, onSelectUser, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  const handleSelectUser = async (user) => {
    if (currentUser && user && user.uid !== currentUser.uid) {
      onSelectUser(user);
      setMessages([]);
      const conversation = await getConversation(currentUser.uid, user.uid);
      if (conversation) {
        setMessages(conversation.messages);
      } else {
        await createConversation(currentUser.uid, user.uid);
      }
    }
  };

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    socket.emit('newUser', { userId: currentUser.uid, username: currentUser.username });

    socket.on("messageResponse", (data) => {
      if (selectedUser && 
          (data.senderId === currentUser.uid || data.senderId === selectedUser.uid) &&
          (data.recipientId === currentUser.uid || data.recipientId === selectedUser.uid)) {
        addMessage(data);
      }
    });

    return () => {
      socket.off("messageResponse");
    };
  }, [socket, currentUser, selectedUser, addMessage]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
    return () => {
      socket.off("typingResponse");
    };
  }, [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return { messages, typingStatus, lastMessageRef, handleSelectUser, addMessage };
};

export default ChatManager;
