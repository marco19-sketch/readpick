// src/firebaseMinimal.js
import { useState, useEffect } from "react";

let authInstance = null;
let onAuthStateChangedRef = null;

export async function loadMinimalAuth() {
  if (authInstance) {
    return { auth: authInstance, onAuthStateChanged: onAuthStateChangedRef };
  }

  const { initializeApp } = await import("firebase/app");
  const {
    getAuth,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
  } = await import("firebase/auth");

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
  const auth = getAuth(app);

  await setPersistence(auth, browserLocalPersistence);

  authInstance = auth;
  onAuthStateChangedRef = onAuthStateChanged;

  return { auth, onAuthStateChanged };
}

// Hook to subscribe to auth state with minimal Firebase
export function useMinimalAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    let unsubscribe;

    loadMinimalAuth()
      .then(({ auth, onAuthStateChanged }) => {
        unsubscribe = onAuthStateChanged(auth, currentUser => {
          setUser(currentUser);
          setLoading(false);
          setIsAuthInitialized(true);
        });
      })
      .catch(err => {
        console.error("Failed to load minimal Firebase auth:", err);
        setLoading(false);
        setIsAuthInitialized(true);
      });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { user, loading, isAuthInitialized };
}
