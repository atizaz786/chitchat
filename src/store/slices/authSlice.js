// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCurrentUser, setError, setLoading } = authSlice.actions;
export default authSlice.reducer;
