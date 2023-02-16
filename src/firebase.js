// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkFqbdOHZ4B4ZONJicAe5DgKJJcBqojz8",
  authDomain: "score-react-app.firebaseapp.com",
  projectId: "score-react-app",
  storageBucket: "score-react-app.appspot.com",
  messagingSenderId: "927428783930",
  appId: "1:927428783930:web:43791fd9c6906114ff2a03",
  measurementId: "G-X68RTTPTRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);