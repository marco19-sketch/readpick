import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import './auth.css';
import mobileBg from '../../assets/images/girl-907x700.avif';
import desktopBg from '../../assets/images/girl-1280-cropped.avif'
import { useTranslation } from "react-i18next";

export default function Login({ setLogin, login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();


  const handleLogin = async e => {
    e.preventDefault();

    setLogin(false);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);

      setLogin(true);
      setTimeout(() =>
      navigate("/"),
      2000);

      console.log({ email, password, login });
    } catch (err) {
      setError(
        t("loginError", {
          error: err.message,
          defaultValue: `Credenziali errate: ${err.message}`,
        })
      );

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
        <form onSubmit={handleLogin} className="auth-form">
          <h2 className="auth-header">{t('login')}</h2>
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <br />
          <button className="auth-btn" type="submit">
            {t("login") || "Accedi"}
          </button>
          {login && (
            <p className="auth-success">
              {t("loggedSuccess") || "Accesso eseguito"}
            </p>
          )}
          {error && (
            <p className="auth-error" style={{ color: "red" }}>
              {error}
            </p>
          )}
        </form>

        <NavLink className="auth-link" to="/reset-password">
          {t("forgotPassword", { defaultValue: "Password dimenticata?"})}
        </NavLink>

        <p className="auth-p-link">
          {t("noAccount") || "Non hai un account?"}{' '}
          <NavLink className="auth-nav-link" to="/register">
            {t("signIn", { defaultValue: "Registrati" })}
          </NavLink>
        </p>
      </div>
    </div>
  );
}
