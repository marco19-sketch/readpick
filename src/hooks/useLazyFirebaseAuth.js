import { useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useLazyFirebaseAuth() {
  const { initAuth } = useContext(AuthContext);

  /**
   * loadAuthFunction:
   * @param {string} funcName - the exact Firebase auth function name to load,
   *   e.g. "signInWithEmailAndPassword" or "createUserWithEmailAndPassword"
   * @returns {Promise<{auth: import("firebase/auth").Auth, func: Function}>}
   */
  const loadAuthFunction = useCallback(
    async funcName => {
      // Initialize Firebase auth and context
       console.log("loadAuthFunction called with", funcName);
      await initAuth();

      // Import auth instance
      const { auth } = await import("../firebase");
      // Import only the requested function from firebase/auth
      const module = await import("firebase/auth");
      console.log(module);
      const func = module[funcName];

      if (typeof func !== "function") {
        throw new Error(`Firebase auth function "${funcName}" not found`);
      }

      return { auth, func };
    },
    [initAuth]
  );

  return loadAuthFunction;
}
