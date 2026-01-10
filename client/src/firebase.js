import { initializeApp } from "firebase/app";

const firebaseConfig = {
  
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: "mern-estate2-7406a.firebaseapp.com",
  projectId: "mern-estate2-7406a",
  storageBucket: "mern-estate2-7406a.appspot.com",
  messagingSenderId: "513364969245",
  appId: "1:513364969245:web:8651c6670868f025463f69"
};

export const app = initializeApp(firebaseConfig);