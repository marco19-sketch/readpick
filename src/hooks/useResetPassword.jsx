// src/hooks/useResetPassword.js
import { useCallback } from "react";
import useLazyFirebaseAuth from "./useLazyFirebaseAuth";

export function useResetPassword() {
  const loadAuthFunction = useLazyFirebaseAuth();

  const resetPassword = useCallback(
    async email => {
      try {
        const { auth, func: sendPasswordResetEmail } = await loadAuthFunction(
          "sendPasswordResetEmail"
        );
        await sendPasswordResetEmail(auth, email);

        return { success: true };
      } catch (error) {
        console.error("Reset password error:", error.message);
        return { success: false, error: error.message };
      }
    },
    [loadAuthFunction]
  );

  return resetPassword;
}
