import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";
import { useLogout } from "../hooks/useLogout";
import { FaHome } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { IoLogIn } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import useIsMobile from "../hooks/useIsMobile";

export default function NavBar({ t, favorites, login, setLogin }) {
  const logout = useLogout();
  const isMobile = useIsMobile();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <nav>
      <NavLink
        aria-label='link to home page'
        className={({ isActive }) => (isActive ? "home-active-link" : "home")}
        to="/">
        {isMobile ? <FaHome /> : "Home"}
      </NavLink>
      <NavLink
        aria-label='link to favorites page'
        className={({ isActive }) =>
          isActive ? "favorites-active-link" : "favorites"
        }
        to="/favorites">
        {isMobile ? <MdFavorite /> : `${t("favorites")} (${favorites.length})`}
      </NavLink>

      {login ? (
        <button
        aria-label={t('logout')}
          className="logout"
          onClick={() => {
            logout();
            setLogin(false);
          }}>
          {isMobile ? <IoLogOut /> : t("logout") || "Esci"}
        </button>
      ) : isLoginPage ? (
        ""
      ) : (
        <NavLink 
        aria-label={t('login')}
        className="login" to="/login">
          {isMobile ? <IoLogIn /> : t("login", {defaultValue: "Accedi"})}
        </NavLink>
      )}
    </nav>
  );
}
