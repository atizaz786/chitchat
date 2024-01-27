// ChatBar.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector hook
import { fetchUsers } from '../services/userService';

const ChatBar = ({ socket, onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser); // Get current user from Redux store

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await fetchUsers();
      // Filter out the current user
      const filteredUsers = usersData.filter(user => user.uid !== currentUser.uid);
      setUsers(filteredUsers);
    };

    getUsers();
  }, [currentUser]); // Add currentUser to the dependency array

  return (
    <div className="bg-gray-800 text-white w-64 p-4">
      <h2 className="text-xl font-bold mb-4">Open Chat</h2>
      <div>
        <h3 className="text-lg font-semibold mb-2">Users</h3>
        <div className="chat__users space-y-2">
          {users && users.map((user) => (
            <p
              key={user?.uid}
              onClick={() => onSelectUser(user)}
              className="cursor-pointer text-white hover:bg-gray-700 p-2 rounded-md"
            >
              {user.username || user.displayName}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
