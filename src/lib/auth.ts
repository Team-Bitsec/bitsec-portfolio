import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from 'firebase/auth';

export const loginAdmin = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutAdmin = async () => {
    return await signOut(auth);
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};
