// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDelE-cJpyTt9K-U8D4NKuW5Ry74X8UzcU",
  authDomain: "dashboard-a01c9.firebaseapp.com",
  projectId: "dashboard-a01c9",
  storageBucket: "dashboard-a01c9.firebasestorage.app",
  messagingSenderId: "737317099552",
  appId: "1:737317099552:web:c6967450ab33f6d784c445",
  measurementId: "G-DQBZY3TSP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()