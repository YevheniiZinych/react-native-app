import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAwXhGYFSGWiewnuC939c1ReSDvUnjpYJs",
  authDomain: "social-photo-app-79e3e.firebaseapp.com",
  projectId: "social-photo-app-79e3e",
  storageBucket: "social-photo-app-79e3e.appspot.com",
  messagingSenderId: "151812935321",
  appId: "1:151812935321:web:0fb982e89c9b47188f3208",
  measurementId: "G-H7LBX9PSLR",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
export const authFirebase = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
