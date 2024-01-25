import React, { useState } from 'react';

const ChatFooter = ({ socket, recipientId, currentUser, addMessage }) => {
  const [message, setMessage] = useState('');

  const handleTyping = () =>
    socket.emit('typing', `${localStorage.getItem('userName')} is typing`);

    const handleSendMessage = (e) => {
      e.preventDefault();
      if (message.trim()) {
        const newMessage = {
          text: message,
          senderId: currentUser.uid,
          recipientId: recipientId,
          id: `${socket.id}${Math.random()}`,
        };
        socket.emit('message', newMessage);
        addMessage(newMessage); // Update local state
        setMessage('');
      }
    };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
                  
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;




