// src/services/conversationService.js
import { db } from '../utils/firebase/firebase.utils';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

export const getConversation = async (userId1, userId2) => {
  const conversationsRef = collection(db, 'conversations');
  const q = query(conversationsRef, where('userIds', 'array-contains', userId1));

  const querySnapshot = await getDocs(q);
  let conversation = null;

  querySnapshot.forEach((doc) => {
    if (doc.data().userIds.includes(userId2)) {
      conversation = { id: doc.id, ...doc.data() };
    }
  });

  return conversation;
};

export const createConversation = async (userId1, userId2) => {
  const conversationsRef = collection(db, 'conversations');
  const newConversation = {
    userIds: [userId1, userId2],
    messages: [], // Initialize with empty messages, or add initial message if needed
  };

  const docRef = await addDoc(conversationsRef, newConversation);
  return { id: docRef.id, ...newConversation };
};
