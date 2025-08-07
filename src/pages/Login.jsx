import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";

export default function Login({setLogin, login}) {
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
      navigate('/')
      console.log({ email, password, login });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
        {login && <p>Loggato con successo</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p className="forgot-password-link">
       
        <NavLink to="/reset-password">Forgot password?</NavLink>
        </p>
        <p className='login-to-register'>Non hai un account?
        <NavLink to='/register'>Registrati</NavLink>
      </p>
    </>
  );
}
