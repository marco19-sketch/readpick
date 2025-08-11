import { useEffect, useState } from "react";
// Remove this line: import { onAuthStateChanged } from "firebase/auth";
// Remove this line: import { auth } from "../firebase";
import { AuthContext } from './AuthContext';

// export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We use a dynamic import here to lazy-load the Firebase auth module
    let unsub;
    import("../firebase")
      .then(module => {
        const { auth } = module;

        // Now that auth is loaded, we can set up the state change listener
        unsub = auth.onAuthStateChanged(currentUser => {
          setUser(currentUser);
          setLoading(false);
        });
      })
      .catch(err => {
        console.error("Failed to load Firebase auth module:", err);
        setLoading(false);
      });

    // Cleanup function to unsubscribe from the listener
    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
