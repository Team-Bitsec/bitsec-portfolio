import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration — public keys (safe to expose in client bundles)
const firebaseConfig = {
    apiKey: 'AIzaSyAMkFFz-wCs1n90Rvp04AnHfkFd8EbrJTQ',
    authDomain: 'bitsecit-8ab24.firebaseapp.com',
    projectId: 'bitsecit-8ab24',
    storageBucket: 'bitsecit-8ab24.firebasestorage.app',
    messagingSenderId: '729050414230',
    appId: '1:729050414230:web:3a6810628df4eb5cac56b7',
    measurementId: 'G-F966LBNL4N',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
