import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import router from "next/router";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Här initierar vi kopplingen till databasen
const firebase = initializeApp(firebaseConfig);

// Denna variabel används för att se om vi är inloggade eller ej. Lägg senare in i context.
export const auth = getAuth(firebase);

/**
 * Use this function to sign in a user.
 * @param email The email for the user.
 * @param password The password for the user.
 * @returns A promise which can be resolved to get the result of the sign in attempt.
 */
export const signIn = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Används för att skapa en användare, tar emot email och lösenord.
/**
 * Use this function to sign up a user.
 * @param email The email for the user.
 * @param password The password for the user.
 * @returns A promise which can be resolbved to get the result of the sign up attempt.
 */
export const signUp = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Use this function to log out a user.
 * @returns
 */
export const logOut = () =>
  signOut(auth)
    .then(() => {
      router.push("/");
    })
    .catch((error: unknown) => {
      console.log(error);
    });

export default firebase;
