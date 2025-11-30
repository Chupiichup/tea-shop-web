import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA2mWDsNSDW4oTYmfUFYGcMVFFNkd73PWw',
  authDomain: 'chuleaf-17611.firebaseapp.com',
  projectId: 'chuleaf-17611',
  storageBucket: 'chuleaf-17611.firebasestorage.app',
  messagingSenderId: '349244563602',
  appId: '1:349244563602:web:f8fc22665404e18a01064b',
  measurementId: 'G-NVNFT00418',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

