import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useLogout } from "../hooks/useLogout";

export default function NavBar({ t, favorites, login, setLogin }) {
  const logout = useLogout();

  return (
    <nav>
      <NavLink
        className={({ isActive }) => (isActive ? "home-active-link" : "home")}
        to="/">
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "favorites-active-link" : "favorites"
        }
        to="/favorites">
        {t("favorites")} ({favorites.length})
      </NavLink>
      {/* <NavLink className='login' to="/login"> */}

      {/*maybe move register link into login page*/}
      <NavLink className="register" to="/register">
        Register
      </NavLink>
      {/* <button className="logout" onClick={logout}> */}
      {login ? (
        <button className="logout" onClick={() => {logout();
          setLogin(false);}
        }>
        {/* <button className="logout" onClick={logout}> */}
          Logout
        </button>
      ) : (
        <NavLink className="login" to="/login">
          Login
        </NavLink>
      )}
    </nav>
  );
}
