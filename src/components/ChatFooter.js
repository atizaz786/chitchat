// src/components/ChatFooter.js
import React, { useState } from 'react';

const ChatFooter = ({ socket, recipientId, currentUser, addMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = e => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        text: message,
        senderId: currentUser.uid,
        recipientId,
        id: `${Date.now()}-${Math.random()}`
      };
      socket.emit('message', newMessage);
      addMessage(newMessage);
      setMessage('');
    }
  };

  return (
    <div className="px-5 py-2.5 bg-gray-100 h-10vh">
      <form className="flex items-center justify-between h-full" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="w-4/5 h-full rounded-lg border border-gray-300 outline-none p-3"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button className="w-36 bg-green-500 py-2 px-4 text-white rounded-lg hover:bg-green-600">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
