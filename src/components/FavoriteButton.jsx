import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./FavoriteButton.css";

export default function FavoriteButton({ isFavorite, onToggle }) {
  const clickSoundRef = useRef(null);
  const removeSoundRef = useRef(null);
  const remove2SoundRef = useRef(null);
  const hasUserInteracted = useRef(false);
  const [soundsReady, setSoundsReady] = useState(false);

  const { t } = useTranslation();
  const location = useLocation();
  const isFavoritesPage = location.pathname === "/favorites";

  useEffect(() => {
    const markInteraction = () => {
      hasUserInteracted.current = true;

      // Lazy load audio only after user interaction
      import("../assets/add-to-favorite.mp3").then(({ default: popSound }) => {
        clickSoundRef.current = new Audio(popSound);
      });
      import("../assets/whoosh_zapsplat.mp3").then(
        ({ default: swooshSound }) => {
          removeSoundRef.current = new Audio(swooshSound);
        }
      );
      import("../assets/zapsplat_soft_click.mp3").then(
        ({ default: popUpSound }) => {
          remove2SoundRef.current = new Audio(popUpSound);
        }
      );

      setSoundsReady(true);
      document.removeEventListener("click", markInteraction);
    };

    document.addEventListener("click", markInteraction);
    return () => document.removeEventListener("click", markInteraction);
  }, []);

  const handleToggle = () => {
    if (!hasUserInteracted.current || !soundsReady) return;

    const addSound = clickSoundRef.current;
    const removeSound = removeSoundRef.current;
    const remove2Sound = remove2SoundRef.current;

    if (!isFavorite && addSound) {
      addSound.currentTime = 0;
      addSound.play().catch(console.warn);
    } else if (isFavorite && isFavoritesPage && removeSound) {
      removeSound.currentTime = 0;
      removeSound.play().catch(console.warn);
    } else if (remove2Sound) {
      remove2Sound.currentTime = 0;
      remove2Sound.play().catch(console.warn);
    }

    onToggle?.();
  };

  return (
    <button
      className="favorite-btn"
      onClick={handleToggle}
      aria-label={
        isFavorite
          ? t("removeFromFavorites") || "Remove from favorites"
          : t("addToFavorites") || "Add to favorites"
      }>
      <FaHeart className={`heart-icon ${isFavorite ? "active" : ""}`} />
    </button>
  );
}
