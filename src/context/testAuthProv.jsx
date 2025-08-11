import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [unsub, setUnsub] = useState(null);

  const initAuth = async () => {
    if (unsub) return;

    try {
      const firebaseModule = await import("../firebase");
      const { auth, onAuthStateChanged } = firebaseModule;

      const newUnsub = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
      });
      setUnsub(() => newUnsub);
    } catch (err) {
      console.error("Failed to load Firebase auth module:", err);
    }
  };

  useEffect(() => {
    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, [unsub]);

  return (
    <AuthContext.Provider value={{ user, initAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
