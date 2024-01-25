// src/components/Drawer.js
import React from 'react';
import ChatBar from './ChatBar';

const Drawer = ({ socket, onSelectUser }) => {
  return (
    <div className="w-64 bg-gray-200 p-4">
      <ChatBar socket={socket} onSelectUser={onSelectUser} />
    </div>
  );
};

export default Drawer;
