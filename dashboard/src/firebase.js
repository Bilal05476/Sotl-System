// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAovK-dHzoByH9x-olT_w6LoZatXH2vFSI",
  authDomain: "sotl-system-storage.firebaseapp.com",
  projectId: "sotl-system-storage",
  storageBucket: "sotl-system-storage.appspot.com",
  messagingSenderId: "696778553665",
  appId: "1:696778553665:web:e9358301a4d40eb00709c0",
  measurementId: "G-YKX6M150WH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
