import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBRyxiBkDIfp77eOuPQD8gHQPJAxY6WJm0",
  authDomain: "miniblog-fa454.firebaseapp.com",
  projectId: "miniblog-fa454",
  storageBucket: "miniblog-fa454.firebasestorage.app",
  messagingSenderId: "800209961686",
  appId: "1:800209961686:web:dfec828a98b88e6c9e3f77"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, app };