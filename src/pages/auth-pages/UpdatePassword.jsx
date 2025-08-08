import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../../firebase";
import { validatePassword } from "../../utils/validatePassword";
import "./auth.css";

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [message, setMessage] = useState(null);
  const [oobCode, setOobCode] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [msgGreen, setMsgGreen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("oobCode");
    if (code) {
      setOobCode(code);
    } else {
      setMessage("Invalid or missing reset code.");
    }
  }, [location.search]);

  const { isValid, errors } = validatePassword(newPassword);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isValid) {
      setMsgGreen(false);
      setMessage("Please fix password issues before submitting.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMsgGreen(true);
      setMessage("Password updated successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setMsgGreen(false);
    }
  };

  return (
    <div className="auth-background">
      <div className="auth-page">
        <form className='auth-form' onSubmit={handleSubmit}>
          <h2 className='auth-header'>Set New Password</h2>
          <input
            className='auth-input'
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            onBlur={() => setPasswordTouched(true)}
            required
          />

          {/* Password requirements list */}
          {passwordTouched && !isValid && (
            <ul className="auth-rules">
              {errors.map((err, index) => (
                <li 
                className='auth-msgs'
                key={index} style={{ color: "red" }}>
                  {err}
                </li>
              ))}
            </ul>
          )}

          <button className='auth-btn' type="submit">Update Password</button>
          {message && <p className={`auth-${msgGreen ? 'success' : 'error'}`}>{message}</p>}
        </form>
      </div>
    </div>
  );
}
