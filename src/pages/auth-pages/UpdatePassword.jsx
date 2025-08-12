import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validatePassword } from "../../utils/validatePassword";
import { useTranslation } from "react-i18next";
import "./auth.css";
import mobileBg from "../../assets/images/leaves-640.avif";
import desktopBg from "../../assets/images/leaves-1280.avif";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { auth, confirmPasswordReset } from "../../firebaseMinimal";

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [message, setMessage] = useState(null);
  const [oobCode, setOobCode] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [msgGreen, setMsgGreen] = useState(false);
  const { t } = useTranslation();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleVisibility = useCallback(() => {
    setPasswordVisibility(!passwordVisibility);
  }, [passwordVisibility]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("oobCode");
    if (code) {
      setOobCode(code);
    } else {
      setMessage(
        t("invalidCode", { defaultValue: "Codice reset non valido o mancante" })
      );
    }
  }, [t, location.search]);

  const { isValid, errors } = validatePassword(newPassword);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isValid) {
      setMsgGreen(false);
      setMessage(
        t("fixPassword", { defaultValue: "Crea una password adeguata" })
      );
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);

      setMsgGreen(true);
      setMessage(
        t("updateSuccess", {
          defaultValue:
            "Password aggiornata con successo. Reindirizzamento al login...",
        })
      );
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setMessage(
        t("errorUpdating", { error, defaultValue: `Errore: ${error.message}` })
      );
      setMsgGreen(false);
    }
  };

  return (
    <div className="auth-background">
      <img
        className="auth-bg-auto-size"
        src={mobileBg}
        srcSet={`${mobileBg} 907w, ${desktopBg} 1280w`}
        sizes="(max-width: 640px) 100vw, 1280px"
        alt=""
        aria-hidden="true"
        decoding="auto"
      />
      <div className="auth-page">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-header">
            {t("setNewPass", { defaultValue: "Crea nuova password" })}
          </h2>
          <div className="auth-input-container">
            <input
              className="auth-input password"
              type={passwordVisibility ? "text" : "password"}
              placeholder={t("enterNewPass", {
                defaultValue: "Inserisci nuova password...",
              })}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
              required
            />
            <button
              className="auth-toggle-visibility"
              type="button"
              onClick={handleVisibility}>
              {passwordVisibility ? <IoEye /> : <IoMdEyeOff />}
              {/* {passwordVisibility ? "👁️" : "🙈"} */}
            </button>
          </div>
          {/* Password requirements list */}
          {passwordTouched && !isValid && (
            <ul className="auth-rules">
              {errors.map((err, index) => (
                <li className="auth-msgs" key={index} style={{ color: "red" }}>
                  {err}
                </li>
              ))}
            </ul>
          )}

          <button className="auth-btn" type="submit">
            Update Password
          </button>
          {message && (
            <p className={`auth-${msgGreen ? "success" : "error"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
