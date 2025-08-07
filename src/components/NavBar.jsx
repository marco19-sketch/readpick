import { NavLink } from "react-router-dom";
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

  return (
    <nav>
      <NavLink
        className={({ isActive }) => (isActive ? "home-active-link" : "home")}
        to="/">
        {isMobile ? <FaHome /> : "Home"}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "favorites-active-link" : "favorites"
        }
        to="/favorites">
        {isMobile ? <MdFavorite /> : `${t("favorites")} (${favorites.length})`}
      </NavLink>

      {login ? (
        <button
          className="logout"
          onClick={() => {
            logout();
            setLogin(false);
          }}>
         {isMobile ? <IoLogOut /> : (t('logout') || 'Esci')}
        </button>
      ) : (
        <NavLink className="login" to="/login">
          {isMobile ? <IoLogIn /> : (t("login") || "Accedi")}
        </NavLink>
      )}
    </nav>
  );
}
