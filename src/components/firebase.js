// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, RecaptchaVerifier, PhoneAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhmEnZ2C_YfVfNZreIuWYZcjbIG0t0wQQ",
  authDomain: "trix-46459.firebaseapp.com",
  projectId: "trix-46459",
  storageBucket: "trix-46459.appspot.com",
  messagingSenderId: "1570615262",
  appId: "1:1570615262:web:9cf3e1f9fec6c05746b74f",
  measurementId: "G-XR0KMLKS5F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, db, RecaptchaVerifier, PhoneAuthProvider };
