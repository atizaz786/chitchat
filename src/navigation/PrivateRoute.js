// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

export default PrivateRoute;
