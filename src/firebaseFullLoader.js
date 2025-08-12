// Lazy load full Firebase auth functions for actions
export async function loadFullAuthFunctions() {
  const authModule = await import("firebase/auth");
  return {
    signInWithEmailAndPassword: authModule.signInWithEmailAndPassword,
    createUserWithEmailAndPassword: authModule.createUserWithEmailAndPassword,
    confirmPasswordReset: authModule.confirmPasswordReset,
    sendPasswordResetEmail: authModule.sendPasswordResetEmail,
    // Add other functions you need here
  };
}
