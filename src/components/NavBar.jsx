import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useLogout } from "../hooks/useLogout";

export default function NavBar({ t, favorites }) {
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

      <button className="logout" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}
