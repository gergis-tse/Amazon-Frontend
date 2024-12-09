// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
//used for authentication
import { getAuth } from "firebase/auth";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhwiGmMSidZuqztTobXPgMsHyMNTyobwY",
  authDomain: "clone-24a51.firebaseapp.com",
  projectId: "clone-24a51",
  storageBucket: "clone-24a51.firebasestorage.app",
  messagingSenderId: "298717927743",
  appId: "1:298717927743:web:1c15c75b67a032b3d95b8a",
};

// Initialize Firebase
const app =firebase.initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=app.firestore()