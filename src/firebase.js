import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKPnBeEbzUGUCbmdpvPNcxPFlwV8NixkY",
  authDomain: "arka-flowers.firebaseapp.com",
  projectId: "arka-flowers",
  storageBucket: "arka-flowers.firebasestorage.app",
  messagingSenderId: "389000103203",
  appId: "1:389000103203:web:4bb9ceb9e6205858d13896",
  measurementId: "G-8428BLYPL3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
