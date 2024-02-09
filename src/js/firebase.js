// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0XxSsUMZ5XmiNvNFC1uVZ25Km5BnfHUM",
  authDomain: "global-notes-463d2.firebaseapp.com",
  projectId: "global-notes-463d2",
  storageBucket: "global-notes-463d2.appspot.com",
  messagingSenderId: "475829401098",
  appId: "1:475829401098:web:8feb4f8db406a9e11451f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
