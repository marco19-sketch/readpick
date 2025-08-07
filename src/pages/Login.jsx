import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";

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
    <div className='login-background'>
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className='login-header'>Login</h2>
        <input
          className='login-input'
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <input
          className='login-input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button className='login-btn' type="submit">Login</button>
        {login && <p className='login-success'>Loggato con successo</p>}
        {error && <p className='login-fail' style={{ color: "red" }}>{error}</p>}
      </form>
      
        <NavLink className='forgot-link' to="/reset-password">Forgot password?</NavLink>
      
      <p className="link-register">
        Non hai un account?
        <NavLink className='nav-link-reg' to="/register">Registrati</NavLink>
      </p>
    </div>
    </div>
  );
}
