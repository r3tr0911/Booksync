import { useEffect, useState, useRef } from "react";
import { useNavigate, Link} from "react-router-dom";
import Sidebar from "../../components/sidebar";



const FEATURED_BOOKS = [
  {
    id: "metamorfosis",
    title: "La metamorfosis",
    author: "Franz Kafka",
    cover: "/Covers/metamorfosis.jpg",
  },
  {
    id: "utopia",
    title: "Utopía",
    author: "Andre Hiotis",
    cover: "/Covers/utopia.jpg",
  },
  {
    id: "tan-poca-vida",
    title: "Tan poca vida",
    author: "Hanya Yanagihara",
    cover: "/Covers/tan-poca-vida.jpg",
  },
  {
    id: "rayuela",
    title: "Rayuela",
    author: "Julio Cortázar",
    cover: "/Covers/rayuela.jpg",
  },
];

// Cambiar por fetch a la API.
const CATALOG = FEATURED_BOOKS;

function Home() {
  const navigate = useNavigate();

  // ==== Estado búsqueda ====
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // ==== Estado carrusel ====
  const [currentIndex, setCurrentIndex] = useState(0); 
  const trackRef = useRef(null);

  // ==== Toast logout ====
  const [showToast, setShowToast] = useState(false);


  // ==== Lógica de búsqueda ====
  useEffect(() => {
    const v = query.trim();

    if (!v.length) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const qLower = v.toLowerCase();
    const filtered = CATALOG.filter((b) =>
      `${b.title} ${b.author}`.toLowerCase().includes(qLower)
    );

    setResults(filtered);
    setShowResults(true);
  }, [query]);

  // ==== Scroll del carrusel cuando cambia el índice ====
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[currentIndex];
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  // ==== Autocierre del toast ====
  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 5000);
    return () => clearTimeout(timer);
  }, [showToast]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      (prev - 1 + FEATURED_BOOKS.length) % FEATURED_BOOKS.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FEATURED_BOOKS.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleCardClick = (book) => {
    localStorage.setItem("selectedBook", JSON.stringify(book));
    navigate(`/detalle/${book.id}`);
  };

  const handleLogoutClick = () => {
    setShowToast(true);
  };

  const handleConfirmLogout = () => {
    // aquí después puedes limpiar tokens, etc.
    navigate("/");
  };

  
  return (
    <div className="home-page">
      {/* ===== Sidebar ===== */}
      <Sidebar onLogout={handleLogoutClick}/>

      {/* ===== Contenido ===== */}
      <main className="content">
        {/* Banner Buscar */}
        <section className="hero" aria-hidden="true">
          <img
            className="buscar-logo"
            src="/BUSCAR IMG.png"
            alt="Buscar – en el catálogo de la biblioteca"
          />
        </section>

        {/* Barra de búsqueda */}
        <div className="search-wrap">
          <div className="search" role="search" aria-label="Buscar en catálogo">
            <i className="fa-solid fa-magnifying-glass prefix" />
            <input
              id="q"
              type="search"
              placeholder="Título, autor o ISBN"
              autoComplete="off"
              aria-controls="resultsArea"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="suffix" type="button" aria-label="Buscar por voz">
              <i className="fa-solid fa-microphone" />
            </button>
          </div>
        </div>

        {/* ===== Destacados (carrusel) ===== */}
        {!showResults && (
          <section
            id="spotlight"
            className="featured"
            aria-label="Libros destacados"
          >
            <div className="carousel">
              <button
                className="nav spot-nav prev"
                aria-label="Anterior"
                type="button"
                onClick={handlePrev}
              >
                <i className="fa-solid fa-chevron-left" />
              </button>

              <div id="track" className="track" tabIndex="-1" ref={trackRef}>
                {FEATURED_BOOKS.map((book, index) => (
                  <article
                    key={book.id}
                    className={`card ${
                      index === currentIndex ? "active" : ""
                    }`}
                    onClick={() => handleCardClick(book)}
                  >
                    <figure className="cover">
                      <img src={book.cover} alt={`Portada de ${book.title}`} />
                    </figure>
                    <div className="book-title">{book.title}</div>
                    <div className="book-author">({book.author})</div>
                  </article>
                ))}
              </div>

              <button
                className="nav spot-nav next"
                aria-label="Siguiente"
                type="button"
                onClick={handleNext}
              >
                <i className="fa-solid fa-chevron-right" />
              </button>
            </div>

            {/* Dots */}
            <div id="dots" className="dots" aria-hidden="true">
              {FEATURED_BOOKS.map((_, index) => (
                <button
                  key={index}
                  className={`dot cap ${
                    index === currentIndex ? "is-active" : ""
                  }`}
                  aria-selected={index === currentIndex ? "true" : "false"}
                  type="button"
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ===== Resultados de búsqueda ===== */}
        <section
          id="resultsArea"
          className="results-area"
          hidden={!showResults}
          aria-live="polite"
        >
          <div className="filters">
            <button className="chip" type="button">
              <i className="fa-solid fa-filter" /> Categoría{" "}
              <span className="chip-badge">Todas</span>
            </button>
            <button className="chip" type="button">
              <i className="fa-regular fa-circle-check" /> Estado{" "}
              <span className="chip-badge">Todos</span>
            </button>
            <div className="chip-group">
              <span className="chip-label">
                <i className="fa-solid fa-sliders" /> Ordenar
              </span>
              <button className="chip alt" type="button">
                Autor
              </button>
              <button className="chip alt" type="button">
                Título
              </button>
            </div>
          </div>

          <div id="results" className="results-grid" aria-label="Resultados">
            {results.length === 0 ? (
              <p
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  color: "#f0e6d0",
                  opacity: 0.9,
                  margin: "18px 0",
                }}
              >
                No encontramos resultados para “{query.trim()}”.
              </p>
            ) : (
              results.map((book) => (
                <article
                  key={book.id}
                  className="result-card"
                  onClick={() => handleCardClick(book)}
                >
                  <figure>
                    <img
                      src={book.cover}
                      alt={`Portada de ${book.title}`}
                    />
                  </figure>
                  <div className="rc-meta">
                    <h5>{book.title}</h5>
                    <small>({book.author})</small>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* ===== Toast: Cerrar sesión ===== */}
        <div
          id="logout-toast"
          className={`toast-logout ${showToast ? "is-visible" : ""}`}
          aria-hidden={showToast ? "false" : "true"}
          role="alertdialog"
          aria-labelledby="logout-title"
          aria-describedby="logout-desc"
        >
          <div className="toast-card">
            <div className="toast-header">
              <span id="logout-title" className="toast-title">
                Cerrar sesión
              </span>
              <button
                className="toast-close"
                type="button"
                aria-label="Cerrar aviso"
                onClick={() => setShowToast(false)}
              >
                &times;
              </button>
            </div>
            <p id="logout-desc" className="toast-desc">
              Estás a punto de cerrar sesión
            </p>
            <div className="toast-actions">
              <button
                id="toast-confirm-logout"
                className="btn-danger"
                type="button"
                onClick={handleConfirmLogout}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
