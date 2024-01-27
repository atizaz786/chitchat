// src/services/conversationService.js
import { db } from '../utils/firebase/firebase.utils';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';

export const getConversation = async (userId1, userId2) => {
  const conversationId = [userId1, userId2].sort().join('_');
  const docRef = doc(db, 'conversations', conversationId);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return { id: docSnapshot.id, ...docSnapshot.data() };
  } else {
    return null; // Conversation does not exist
  }
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
