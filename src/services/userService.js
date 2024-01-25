// src/services/userService.js
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase/firebase.utils';

export const fetchUsers = async () => {
  const usersCollectionRef = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCollectionRef);
  const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return usersList;
};

export const fetchUserData = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userRef);
  
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      console.log('User not found in Firestore');
      return null; // or handle the user not found case as needed
    }
  };
