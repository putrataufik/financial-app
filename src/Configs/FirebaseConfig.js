// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKq4RC31USsYGbBkHvnLURYhPvsFHYMaU",
  authDomain: "financial-app-2408c.firebaseapp.com",
  projectId: "financial-app-2408c",
  storageBucket: "financial-app-2408c.appspot.com",
  messagingSenderId: "893495352930",
  appId: "1:893495352930:web:dfeb1d72f3ade1b0737b3b",
  measurementId: "G-LBVW5403C4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};