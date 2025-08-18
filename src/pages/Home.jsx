import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../components/Modal";
import SearchBar from "../components/SearchBar";
import itaTrendingBooks from "../data/itaTrendingBooks";
import "./Home.css";
import { scrollup } from "../utils/scrollup";
import FavoriteButton from "../components/FavoriteButton";
import { devLog } from "../utils/devLog";
import BookResults from "../components/BookResults";
import bg480 from "../assets/images/pexels-tima-480.avif";
import bg768 from "../assets/images/pexels-tima-768.avif";
import bg1024 from "../assets/images/pexels-tima-1024.avif";
import bg1600 from "../assets/images/pexels-tima-1600.avif";
import bg1920 from "../assets/images/pexels-tima-1920.avif";
import LoadingSkeleton from '../components/LoadingSkeleton';

// Cloudinary cdn service
// import { Cloudinary } from "@cloudinary/url-gen";
// import { auto } from "@cloudinary/url-gen/actions/resize";
// import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
// import { AdvancedImage } from "@cloudinary/react";


function Home({ favorites, toggleFavorite, fetchedBooks, setFetchedBooks }) {
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState("intitle");
  const [hasSearched, setHasSearched] = useState(false);
  const [showNoResultsModal, setShowNoResultsModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [maxResult] = useState(10);
  const loadMoreRef = useRef(null);
  const { t } = useTranslation();
  const [activeQuery, setActiveQuery] = useState("");
  const [activeMode, setActiveMode] = useState("intitle");
  const [suggestions, setSuggestions] = useState([]);
 

  const placeholderMap = {
    intitle: t("searchPlaceholder.intitle"),
    inauthor: t("searchPlaceholder.inauthor"),
    subject: t("searchPlaceholder.subject"),
  };

  const handleFetch = useCallback(async () => {
    if (!hasSearched) return;
    if (!activeQuery) return;
    const encoded = encodeURIComponent(activeQuery.trim());
    setLoading(true);
    devLog("handleFetch fetching...", {
      activeQuery,
      activeMode,
      hasSearched,
      startIndex,
    });
    try {
      const q = `${activeMode}:${encoded}`;
      await new Promise(resolve => setTimeout(resolve, 500));

      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${q}&startIndex=${startIndex}&maxResults=${maxResult}`
      );

      if (!res.ok) {
        setLoading(false);
        setShowNoResultsModal(true);
        return;
      }

      const data = await res.json();
      const items = data.items ?? [];

      if (!items || items.length === 0) {
        setShowNoResultsModal(true);
      }

      setFetchedBooks(prev => (startIndex === 0 ? items : [...prev, ...items]));
      setLoading(false);
      scrollup(350);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
      setShowNoResultsModal(true);
    }
  }, [
    activeQuery,
    hasSearched,
    activeMode,
    maxResult,
    startIndex,
    setFetchedBooks,
  ]);

  const handleSelected = useCallback(book => {
    setShowModal(true);
    setSelectedTitle(book);
  }, []);

  const uniqueBooks = useMemo(() => {
    const seen = new Set();
    return fetchedBooks.filter(book => {
      if (seen.has(book.id)) return false;
      seen.add(book.id);
      return true;
    });
  }, [fetchedBooks]);

  const handleFetchNew = useCallback(
    customQuery => {
      const queryToUse = (customQuery ?? query ?? "").toString();

      if (queryToUse.trim() === activeQuery && searchMode === activeMode)
        return;

      devLog("queryToUse", queryToUse);
      setActiveQuery(queryToUse.trim());
      setActiveMode(searchMode);
      setShowNoResultsModal(false);
      setStartIndex(0);
      setHasSearched(true);
    },
    [activeMode, activeQuery, query, searchMode]
  );

  useEffect(() => {
    if (hasSearched) {
      const controller = new AbortController(); //cleanup function to your useEffect to prevent memory leaks if the component unmounts during a fetch
      const fetchData = async () => {
        await handleFetch();
      };
      fetchData();
      return () => controller.abort();
    }
  }, [hasSearched, startIndex, handleFetch]);

  const resetResults = useCallback(() => {
    setHasSearched(false);
    setQuery("");
  }, []);

  const handleReset = useCallback(() => {
    setFetchedBooks([]);
    setSelectedTitle(null);
    setQuery("");
    setSearchMode("intitle");
    setHasSearched(false);
    setShowNoResultsModal(false);
    setLoading(false);
    setSuggestions([]);
  }, [setFetchedBooks]);

  const isFavorite = book => favorites.some(fav => fav.id === book.id);

  useEffect(() => {
    if (fetchedBooks.length > 0) {
      setHasSearched(true);
    }
  }, [fetchedBooks]);

  return (
    <>
      <img
        src={bg768}
        srcSet={`${bg480} 480w, 
        ${bg768} 768w,
        ${bg1024} 1024w,
        ${bg1600} 1600w,
        ${bg1920} 1920w`}
        sizes="(max-width: 480px) 480px,
        (max-width: 768px) 768px,
        (max-width: 1024px) 1024px,
        (max-width: 1600px) 1600px,
        1920px"
        alt=" "
        aria-hidden="true"
        className="home-bg"
        decoding="async"
        fetchPriority="high"
        loading="eager"
      />

      <div className={`home-page ${loading ? "wait-cursor" : ""}`}>
        <header>
          <h1 className="main-title">Read Pick</h1>
        </header>
        <div className="main-container" id="main-content">
          <SearchBar
            query={query}
            setQuery={setQuery}
            searchMode={searchMode}
            setSearchMode={setSearchMode}
            onSearch={handleFetchNew}
            handleFetchNew={handleFetchNew}
            onReset={handleReset}
            placeholderMap={placeholderMap}
            t={t}
            itaTrendingBooks={itaTrendingBooks}
            resetResults={resetResults}
            setSuggestions={setSuggestions}
            suggestions={suggestions}
          />

          {!hasSearched && (
            <h2 className="trending-books">
              {t("trendingBooks", { defaultValue: "Trending Books" })}
            </h2>
          )}

          {loading && <LoadingSkeleton />}

          {!hasSearched && (
            <BookResults
              books={itaTrendingBooks}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              t={t}
              onSelect={handleSelected}
            />
          )}

          {uniqueBooks.length > 0 && (
            <>
              <BookResults
                books={uniqueBooks}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                t={t}
                onSelect={handleSelected}
              />
              <button
                className="load-more"
                type="button"
                ref={loadMoreRef}
                onClick={() => {
                  setStartIndex(prev => {
                    const newIndex = prev + maxResult;
                    return newIndex;
                  });
                }}>
                {t("loadMore", { defaultValue: "Load more" })}
              </button>
            </>
          )}

          {!loading && showNoResultsModal && (
            <Modal onClose={() => setShowNoResultsModal(false)}>
              <p className="no-results">
                {t("noResults", { defaultValue: "No results found" })}
              </p>
            </Modal>
          )}
          {!loading && startIndex !== 0 && showNoResultsModal && (
            <Modal onClose={() => setShowNoResultsModal(false)}>
              <p className="no-results">
                {t("noMoreResults", { defaultValue: "No more results" })}
              </p>
            </Modal>
          )}

          {showModal && selectedTitle && (
            <Modal onClose={() => setShowModal(false)}>
              <div className="modal">
                <h2 id="modal-title">{selectedTitle?.volumeInfo?.title}</h2>
                <p className="full-description">
                  <strong>
                    {t("fullDescription", { defaultValue: "Full Description" })}
                    :
                  </strong>{" "}
                  {selectedTitle.volumeInfo?.description ||
                    t("noDescription", {defaultValue: "No description available"})}
                </p>
              </div>
              <FavoriteButton
                isFavorite={isFavorite(selectedTitle)}
                onToggle={() => toggleFavorite(selectedTitle)}
              />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}
export default Home;
