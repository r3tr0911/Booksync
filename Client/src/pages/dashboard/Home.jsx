import { useEffect, useState, useRef } from "react";
import { useNavigate, Link} from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useLogoutToast } from "../../hooks/useLogoutToast";


function Home() {
  const navigate = useNavigate();
  
  // ==== Estado búsqueda ====
  const [query, setQuery] = useState("");
  const [libros, setLibros] = useState([]); 
  const [showResults, setShowResults] = useState(false);
  
  // ==== Estado carrusel ====
  const [currentIndex, setCurrentIndex] = useState(0); 
  const trackRef = useRef(null);
  
  // ==== Hook de logout (toast global) ====
  const { toast, openToast } = useLogoutToast();

  // ==== Función para obtener libros desde la API ====
  const fetchLibros = async (search = "") => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/libros?title=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
  
      const data = await response.json();
      setLibros(data.libros || [])
      
    } catch (error) {
      console.error("Error al obtener libros:", error);
    }
  }
  
  // ==== Lógica de búsqueda ====
  useEffect(() => {
    const delay = setTimeout(() => {
      if(query.trim().length === 0 ){
        setLibros([])
        setShowResults(false);
        return ;
      }

      fetchLibros(query);
      setShowResults(true);
    }, 400)

    return () => clearTimeout(delay);
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

  const handlePrev = () => {
    if (libros.length === 0) return;
    setCurrentIndex((prev) =>
      (prev - 1 + libros.length) % libros.length
    );
  };

  const handleNext = () => {
    if (libros.length === 0) return;
    setCurrentIndex((prev) =>
      (prev + 1) % libros.length
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleCardClick = (book) => {
    localStorage.setItem("selectedBook", JSON.stringify(book));
    navigate(`/detalle/${book.id_libro}`);
  };

  
  return (
    <div className="home-page">
      {/* ===== Sidebar ===== */}
      <Sidebar onLogout={openToast}/>

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
                {libros.map((book, index) => (
                  <article
                    key={book.id_libro}
                    className={`card ${
                      index === currentIndex ? "active" : ""
                    }`}
                    onClick={() => handleCardClick(book)}
                  >
                    <figure className="cover">
                      <img src={`http://localhost:3000${book.cover}`} alt={`Portada de ${book.title}`} />
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
              {libros.map((_, index) => (
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
            {libros.length === 0 ? (
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
              libros.map((book) => (
                <article
                  key={book.id_libro}
                  className="result-card"
                  onClick={() => handleCardClick(book)}
                >
                  <figure>
                    <img
                      src={`http://localhost:3000${book.cover}`} alt={`Portada de ${book.title}`}
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
        {/* Toast de logout reutilizable */}
        {toast}
      </main>
    </div>
  );
}

export default Home;
