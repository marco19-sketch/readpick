import { useState } from "react";
import { useResetPassword } from "../hooks/useResetPassword";
import "./ResetPassword.css";

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
    <div className="reset-background">
      <div className="reset-page">
        <form className="reset-form" onSubmit={handleSubmit}>
          <h2 className="reset-header">Reset Password</h2>
          <input
            className="reset-input"
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button className="reset-btn" type="submit">
            Send Reset Email
          </button>
        </form>
        {console.log('msgGreen', msgGreen)}
        {message && (
          <p className={`reset-${msgGreen ? 'success' : 'error'}`}>{message}</p>
        )}
      </div>
    </div>
  );
}
