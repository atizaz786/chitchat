// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// Import other slices

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Other slice reducers
  },
});
