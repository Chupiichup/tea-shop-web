import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Cấu hình Firebase do bạn cung cấp
const firebaseConfig = {
  apiKey: 'AIzaSyA2mWDsNSDW4oTYmfUFYGcMVFFNkd73PWw',
  authDomain: 'chuleaf-17611.firebaseapp.com',
  projectId: 'chuleaf-17611',
  storageBucket: 'chuleaf-17611.firebasestorage.app',
  messagingSenderId: '349244563602',
  appId: '1:349244563602:web:f8fc22665404e18a01064b',
  measurementId: 'G-NVNFT00418',
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore với tên biến db
export const db = getFirestore(app);

// Khởi tạo Firebase Auth
export const auth = getAuth(app);

// Hàm test ghi document vào collection test_connection
export async function writeTestConnectionDocument() {
  try {
    await addDoc(collection(db, 'test_connection'), {
      message: 'Kết nối thành công!',
      // Dùng Timestamp.fromDate để Firestore lưu đúng kiểu timestamp
      timestamp: Timestamp.fromDate(new Date()),
    });
    console.log('Đã ghi document test_connection thành công.');
  } catch (error) {
    console.error('Lỗi khi ghi document test_connection:', error);
  }
}


