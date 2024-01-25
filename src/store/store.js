// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './slices/authSlice';
// Import other reducers

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Add the slices you want to persist here
};

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
