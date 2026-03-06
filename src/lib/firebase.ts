// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMkFFz-wCs1n90Rvp04AnHfkFd8EbrJTQ",
    authDomain: "bitsecit-8ab24.firebaseapp.com",
    projectId: "bitsecit-8ab24",
    storageBucket: "bitsecit-8ab24.firebasestorage.app",
    messagingSenderId: "729050414230",
    appId: "1:729050414230:web:3a6810628df4eb5cac56b7",
    measurementId: "G-F966LBNL4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

// Initialize Firebase Authentication and get a reference to the service
import { getAuth } from "firebase/auth";
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
import { getFirestore } from "firebase/firestore";
export const db = getFirestore(app);