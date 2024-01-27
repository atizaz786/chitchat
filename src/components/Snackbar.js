// src/components/Snackbar.js
import React, { useEffect, useState } from 'react';

const Snackbar = ({ message, setMessage }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setMessage('');
      }, 3000);
    }
  }, [message, setMessage]);

  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 z-50 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300">
      {message}
    </div>
  );
};

export default Snackbar;
