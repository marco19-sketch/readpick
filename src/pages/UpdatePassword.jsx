import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase";
import {validatePassword} from "../utils/validatePassword";
import './UpdatePassword.css';

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [message, setMessage] = useState(null);
  const [oobCode, setOobCode] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
      setMessage("Please fix password issues before submitting.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Password updated successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="update-password-page">
      <h2>Set New Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          onBlur={() => setPasswordTouched(true)}
          required
        />

        {/* Password requirements list */}
        {passwordTouched && !isValid && (
          <ul className="password-rules">
            {errors.map((err, index) => (
              <li key={index} style={{ color: "red" }}>
                {err}
              </li>
            ))}
          </ul>
        )}

        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}
