import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Suspense, lazy } from "react";
const Favorites = lazy(() => import("./pages/Favorites"));
const Home = lazy(() => import("./pages/Home"));
const Footer = lazy(() => import("./components/Footer"));
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import BackToTop from "./components/BackToTop";
import NavBar from "./components/NavBar";
// import FooterLoader from "./components/FooterLoader";
import useGoogleAnalytics from "./hooks/useGoogleAnalytics";
import Login from "./pages/auth-pages/Login";
import Register from "./pages/auth-pages/Register";
import ResetPassword from "./pages/auth-pages/ResetPassword";
import UpdatePassword from "./pages/auth-pages/UpdatePassword";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [login, setLogin] = useState(false);
  const location = useLocation();
  const authPaths = [
    "/login",
    "/register",
    "/reset-password",
    "/update-password",
  ];

  const isAuthPage = authPaths.includes(location.pathname);
  const isFavoritesPage = location.pathname === "/favorites";

  useGoogleAnalytics();
  const [fetchedBooks, setFetchedBooks] = useState(() => {
    const saved = localStorage.getItem("cachedBooks");
    return saved ? JSON.parse(saved) : [];
  });
  //stores fetched results when moving away from Home and returning
  useEffect(() => {
    localStorage.setItem("cachedBooks", JSON.stringify(fetchedBooks));
  }, [fetchedBooks]);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const { t } = useTranslation();

  useEffect(() => {
    localStorage.setItem("cachedBooks", JSON.stringify(fetchedBooks));
  }, [fetchedBooks]);

  // Save favorites in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = book => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === book.id);

    if (isAlreadyFavorite) {
      if (isFavoritesPage) {
        //flag book for removal and animation
        setFavorites(prev =>
          prev.map(fav =>
            fav.id === book.id ? { ...fav, removing: true } : fav
          )
        );
        //physical removal after delay
        setTimeout(() => {
          setFavorites(prev => prev.filter(fav => fav.id !== book.id));
        }, 300);
      } else {
        //remove immediately in Home
        setFavorites(prev => prev.filter(f => f.id !== book.id));
      }
    } else {
      //adding the book
      setFavorites(prev => [...prev, book]);
    }
  };

  return (
    <div className="root">
      <a href="#main-content" className="skip-link">
        {t("skipToMain")}
      </a>

      <div
        fetchPriority="high"
        className={`page-wrapper ${
          isFavoritesPage
            ? "favorites-page"
            : isAuthPage
            ? "auth-page-wrapper"
            : "home-page"
        }`}>
        <NavBar setLogin={setLogin} login={login} favorites={favorites} t={t} />

        <LanguageSwitcher />

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  fetchedBooks={fetchedBooks}
                  setFetchedBooks={setFetchedBooks}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={<Login setLogin={setLogin} login={login} />}
            />

            <Route
              path="/register"
              element={<Register setLogin={setLogin} />}
            />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
          </Routes>
        </Suspense>
      </div>
      <BackToTop scrollContainerSelector="body" />

      {/* <FooterLoader /> */}
      <Suspense fallback={<div>Loading</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}
