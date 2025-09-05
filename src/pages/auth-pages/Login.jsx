import { useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./auth.css";
import mobileBg from "../../assets/images/girl-907x700.avif";
import desktopBg from "../../assets/images/girl-1280-cropped.avif";
import { useTranslation } from "react-i18next";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { auth, signInWithEmailAndPassword } from "../../firebaseMinimal";
import GoogleLoginButton from "../../components/GoogleLoginButton";

export default function Login({ setLogin, login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [retryMsg, setRetryMsg] = useState(false);
 

  const handleVisibility = useCallback(() => {
    setPasswordVisibility(!passwordVisibility);
  }, [passwordVisibility]);

  const handleLogin = async e => {
    e.preventDefault();

    if (!email || !password) {
      setError(
        t("missingCredentials", { defaultValue: "Inserisci email e password" })
      );
      return;
    }
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);

      setLogin(true);
      setTimeout(() => {
        navigate("/");
        setLoading(false);
      }, 2000);
    } catch (err) {
      console.error("error", err);
      setError(
        t("loginError", {
         
          defaultValue: "Credenziali errate, riprova",
        })
      );
    
      setEmail('');
      setPassword('');
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
          <h2 className="auth-header">{t("login")}</h2>
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <br />
          <div className="auth-input-container">
            <input
              className="auth-input password"
              type={passwordVisibility ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              className="auth-toggle-visibility"
              type="button"
              onClick={handleVisibility}>
              {passwordVisibility ? <IoEye /> : <IoMdEyeOff />}
              {/* {passwordVisibility ? "👁️" : "🙈"} */}
            </button>
            {/* {retryMsg && (
              <p className='retry-msg'>Email o password errate, riprova</p>
            )} */}
          </div>
          {login && (
            <p className="auth-success">
              {t("loggedSuccess", { defaultValue: "Accesso in corso..." })}
            </p>
          )}
          {error && (
            <p className="auth-error" style={{ color: "red" }}>
              {error}
            </p>
          )}
          <br />
          <button
            disabled={error === "" && loading}
            className="auth-btn"
            type="submit">
            {/* <button disabled={!retryMsg && loading} className="auth-btn" type="submit"> */}
            {t("login", { defaultValue: "Accedi" })}
          </button>
        </form>

        <NavLink className="auth-link" to="/reset-password">
          {t("forgotPassword", { defaultValue: "Password dimenticata?" })}
        </NavLink>

        <p className="auth-p-link">
          {t("noAccount") || "Non hai un account?"}{" "}
          <NavLink className="auth-nav-link" to="/register">
            {t("signIn", { defaultValue: "Registrati" })}
          </NavLink>
        </p>
        <p className="oppure">{t('or', {defaultValue: 'or'})}</p>
        <GoogleLoginButton
          loading={loading}
          // loading={error === "" && loading}
          error={error}
          setLoading={setLoading}
          setLogin={setLogin}
        />
      </div>
    </div>
  );
}
