// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "revents-24a63.firebaseapp.com",
    projectId: "revents-24a63",
    storageBucket: "revents-24a63.appspot.com",
    messagingSenderId: "98300442331",
    appId: "1:98300442331:web:6118d4b55d90ec29067efe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);