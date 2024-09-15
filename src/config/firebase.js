// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVH-WjJRvvN0gpv6Zbtrdup3YegHRH4Xg",
  authDomain: "fir-course-57215.firebaseapp.com",
  projectId: "fir-course-57215",
  storageBucket: "fir-course-57215.appspot.com",
  messagingSenderId: "863763939454",
  appId: "1:863763939454:web:388ebfc6007bc115bed82f",
  measurementId: "G-78Z1CR5HTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 