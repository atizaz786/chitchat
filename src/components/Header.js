// src/components/Header.js
import React from 'react';
import { MdMenu } from 'react-icons/md'; // Importing the menu icon from Material Design Icons

const Header = ({ onToggleDrawer }) => {
  return (
    <header className="bg-gray-800 text-white flex justify-between items-center p-4">
      <div className="flex items-center">
        <button onClick={onToggleDrawer} className="mr-4">
          <MdMenu className="h-6 w-6" /> {/* Using the MdMenu icon */}
        </button>
        {/* <img src="logo.png" alt="Logo" className="h-8" /> Replace with your logo */}
      </div>
      <nav>
        <a href="#about" className="text-white px-4 hover:text-gray-300">About Us</a>
        <a href="#profile" className="text-white px-4 hover:text-gray-300">Profile Settings</a>
      </nav>
    </header>
  );
};

export default Header;
