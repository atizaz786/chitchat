// ChatBar.js
import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../services/userService';

const ChatBar = ({ socket, onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await fetchUsers();
      console.log(usersData)
      setUsers(usersData);
    };

    getUsers();
  }, []);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h3>Users</h3>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user?.uid} onClick={() => onSelectUser(user)}>
              {user.username}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
