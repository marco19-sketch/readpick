import { useState } from "react";
import { useResetPassword } from "../../hooks/useResetPassword";
import "./auth.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const resetPassword = useResetPassword();
  const [msgGreen, setMsgGreen] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const { success, error } = await resetPassword(email);
    if (success) {
      setMsgGreen(true);
      setMessage("Password inviata. Controlla la posta in arrivo.");
    } else {
      setMessage(`Email non valida. ${error}`);
      setMsgGreen(false);
    }
  };

  return (
    <div className="auth-background">
      <div className="auth-page">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-header">Reset Password</h2>
          <input
            className="auth-input"
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button className="auth-btn" type="submit">
            Send Reset Email
          </button>
        </form>
        {console.log("msgGreen", msgGreen)}
        {message && (
          <p className={`auth-${msgGreen ? "success" : "error"}`}>{message}</p>
        )}
      </div>
    </div>
  );
}
