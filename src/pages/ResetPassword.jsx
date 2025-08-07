import { useState } from "react";
import { useResetPassword } from "../hooks/useResetPassword";
import './ResetPassword.css';

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const resetPassword = useResetPassword();

  const handleSubmit = async e => {
    e.preventDefault();
    const { success, error } = await resetPassword(email);
    if (success) {
      setMessage("Password reset email sent. Check your inbox.");
    } else {
      setMessage(`Error: ${error}`);
    }
  };

  return (
    <div className="reset-password-page">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Email</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
