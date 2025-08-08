import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import './auth.css';
import './login.css';

export default function Login({ setLogin, login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();

    setLogin(false);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);

      setLogin(true);
      navigate("/");
      console.log({ email, password, login });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='auth-background'>
    <div className="auth-page">
      <form onSubmit={handleLogin} className="auth-form">
        <h2 className='auth-header'>Login</h2>
        <input
          className='auth-input'
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <input
          className='auth-input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button className='auth-btn' type="submit">Login</button>
        {login && <p className='auth-success'>Loggato con successo</p>}
        {error && <p className='auth-fail' style={{ color: "red" }}>{error}</p>}
      </form>
      
        <NavLink className='auth-link' to="/reset-password">Forgot password?</NavLink>
      
      <p className="auth-p-link">
        Non hai un account?
        <NavLink className='auth-nav-link' to="/register">Registrati</NavLink>
      </p>
    </div>
    </div>
  );
}
