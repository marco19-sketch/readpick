import { AuthContext } from "./AuthContext";
import { useMinimalAuth } from "../firebaseMinimal";

export function AuthProvider({ children }) {
  const { user, loading, isAuthInitialized } = useMinimalAuth();

  if (!isAuthInitialized) {
    return <p>Loading authentication...</p>;
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAuthInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}
