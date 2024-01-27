import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatManager from "./ChatManager";

const ChatPage = ({ socket }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [showDrawer, setShowDrawer] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const { messages, typingStatus, lastMessageRef, handleSelectUser, addMessage } = ChatManager({
    socket,
    selectedUser,
    onSelectUser: setSelectedUser,
    currentUser
  });

  const handleToggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header onToggleDrawer={handleToggleDrawer} />
      <div className="flex flex-grow">
        {showDrawer && (
          <ChatBar socket={socket} onSelectUser={handleSelectUser} />
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
