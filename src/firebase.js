// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3DdjjO7VoWN1cXThbIyfWBJMAGcluDrQ",
  authDomain: "bookfinderauth.firebaseapp.com",
  projectId: "bookfinderauth",
  storageBucket: "bookfinderauth.firebasestorage.app",
  messagingSenderId: "444728893426",
  appId: "1:444728893426:web:af679b9a99646ef834556b",
  measurementId: "G-Z4MP8RN7S4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// if (location.hostname === 'localhost') { //this connect to the emulator , the port could be 9099, check
//     connectAuthEmulator(auth, 'http://localhost:4000');
// }