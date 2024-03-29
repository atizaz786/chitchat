import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChatBody = ({ messages, lastMessageRef, typingStatus, currentUser }) => {
    const navigate = useNavigate();

  const handleLeaveChat = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {currentUser && messages.map((message) => (
         <div className="message__chats" key={message.timestamp}>
          <p className="sender__name">{message.senderId === currentUser.uid ? 'You' : message.name}</p>

            <div className={message.senderId === currentUser?.uid ? 'message__sender' : 'message__recipient'}>
              <p>{message.text}</p>
            </div>
          </div>
        ))}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
