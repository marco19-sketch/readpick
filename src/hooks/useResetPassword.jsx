// src/hooks/useResetPassword.js
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export function useResetPassword() {
  const resetPassword = async email => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent");
      return { success: true };
    } catch (error) {
      console.error("Reset password error:", error.message);
      return { success: false, error: error.message };
    }
  };

  return resetPassword;
}
