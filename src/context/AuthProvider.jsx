import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unsub, setUnsub] = useState(null);

  const initAuth = async () => {
    if (unsub) return; // Prevent multiple subscriptions

    try {
      const firebaseModule = await import("../firebase");
      const { auth } = firebaseModule;

      const authFunctions = await import("firebase/auth");
      const { onAuthStateChanged } = authFunctions;

      const newUnsub = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false);
      });
      setUnsub(() => newUnsub);
    } catch (err) {
      console.error("Failed to load Firebase auth module:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // This cleanup function will run when the component unmounts
    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, [unsub]); // The useEffect hook depends on 'unsub' state

  return (
    <AuthContext.Provider value={{ user, initAuth, loading }}>
      { children}
      {/* {!loading && children} */}
    </AuthContext.Provider>
  );
}
