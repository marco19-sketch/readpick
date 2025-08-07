import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { validatePassword } from "../utils/validatePassword";
import "./Register.css";

export default function Register({ setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const { rules, isValid } = validatePassword(password);

  // const isValid =
  //   rules.length && rules.uppercase && rules.number && rules.symbol;

  const handleRegister = async e => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      setSuccess(true);
      setLogin(true);
      // Firebase fa già il login automatico dopo la registrazione
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="register-form">
      <h2>Registrati</h2>
      <input
        className="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br />
      <input
        className="password"
        type="password"
        placeholder="Password (inserisci un password forte)"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onBlur={() => setPasswordTouched(true)}
      />

      {passwordTouched && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ color: rules.length ? "green" : "red" }}>
            {rules.length ? "✅" : "❌"} Almeno 8 caratteri
          </li>
          {/* <li style={{ color: rules.uppercase ? "green" : "red" }}>
            {rules.uppercase ? "✅" : "❌"} Almeno un lettera maiuscola
          </li>
          <li style={{ color: rules.number ? "green" : "red" }}>
            {rules.number ? "✅" : "❌"} Almeno un numero
          </li>
          <li style={{ color: rules.symbol ? "green" : "red" }}>
            {rules.symbol ? "✅" : "❌"} One special symbol (e.g. !, @, #)
          </li> */}
        </ul>
      )}
      <br />
      <button type="submit" disabled={!isValid}>
        Crea account
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p>Registration successful! You are logged in.</p>}
    </form>
  );
}
