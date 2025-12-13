import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLogoutToast } from "../../hooks/useLogoutToast";
import Sidebar from "../../components/sidebar";

const BOOKS = {
  utopia: {
    title: "Utopía",
    author: "Andre Hiotis",
    year: "2002",
    genre: "Ensayo filosófico / Sociología",
    editorial: "Fondo de Cultura Económica",
    status: "Disponible",
    description:
      "Reflexión profunda sobre la búsqueda de sociedades ideales y los dilemas de la modernidad.",
    cover: "utopia.jpg",
    tags: ["Filosofía", "Ensayo", "Sociología"],
  },
  metamorfosis: {
    title: "La metamorfosis",
    author: "Franz Kafka",
    year: "1915",
    genre: "Ficción / Existencialismo",
    editorial: "Verlag Kurt Wolff",
    status: "Disponible",
    description:
      "Gregor Samsa se despierta convertido en un insecto gigante. Metáfora sobre la alienación moderna.",
    cover: "metamorfosis.jpg",
    tags: ["Ficción", "Clásico", "Existencialismo"],
  },
  "tan-poca-vida": {
    title: "Tan poca vida",
    author: "Hanya Yanagihara",
    year: "2015",
    genre: "Ficción",
    editorial: "Doubleday",
    status: "Disponible",
    description:
      "Una historia de amistad y dolor, de vidas entrelazadas y heridas que perduran.",
    cover: "tan-poca-vida.jpg",
    tags: ["Ficción", "Drama"],
  },
  rayuela: {
    title: "Rayuela",
    author: "Julio Cortázar",
    year: "1963",
    genre: "Ficción / Experimental",
    editorial: "Editorial Sudamericana",
    status: "Disponible",
    description:
      "Obra que desafía la estructura narrativa: múltiples recorridos para una misma historia.",
    cover: "rayuela.jpg",
    tags: ["Ficción", "Experimental", "Latinoamérica"],
  },
};

function Detalle() {
  const navigate = useNavigate();
  const {toast, openToast} = useLogoutToast();
  const { id } = useParams();
  const [showReserveToast, setShowReserveToast] = useState(false);

  const bookId = (id || "utopia").toLowerCase();
  const book = BOOKS[bookId];

  // Si el id no existe, mandamos al Home
  useEffect(() => {
    if (!book) {
      navigate("/Home", { replace: true });
    }
  }, [book, navigate]);

  if (!book) {
    return null;
  }

  const coverPath = `/Covers/${book.cover}`;

  const handleReserve = () => {
    setShowReserveToast(true);
    setTimeout(() => setShowReserveToast(false), 3000);
  };

  const handleCloseToast = () => {
    setShowReserveToast(false);
  };

  const handleBackHome = () => {
    navigate("/Home");
  };

  const handleLogout = () => {
    // limpiar tokens.
    navigate("/");
  };

  return (
    <div className="detalle-page">
      {/* ===== Sidebar ===== */}
      <Sidebar onLogout={openToast}/>

      {/* ===== Contenido del detalle ===== */}
      <main className="content detalle-content">
        <section className="detalle-card glass">
          <h2 className="highlight-title">
            {book.title} – {book.author}
          </h2>

          <div className="detalle-body">
            <div className="detalle-left">
              <img
                id="book-cover"
                src={coverPath}
                alt={`Portada: ${book.title}`}
              />

              <div className="rating" aria-label="Calificación del libro">
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
              </div>

              <div className="buttons">
                <button
                  className="btn reserve"
                  type="button"
                  onClick={handleReserve}
                >
                  Reservar
                </button>
                <button className="btn fav" type="button">
                  Favorito
                </button>
                <button className="btn share" type="button">
                  Compartir
                </button>
              </div>
            </div>

            <div className="detalle-right">
              <div className="info">
                <p>
                  <strong>Título:</strong> <span>{book.title}</span>
                </p>
                <p>
                  <strong>Autor:</strong> <span>{book.author}</span>
                </p>
                <p>
                  <strong>Año de publicación:</strong> <span>{book.year}</span>
                </p>
                <p>
                  <strong>Género:</strong> <span>{book.genre}</span>
                </p>
                <p>
                  <strong>Editorial:</strong> <span>{book.editorial}</span>
                </p>
                <p>
                  <strong>Estado:</strong> <span>{book.status}</span>
                </p>
              </div>

              <div className="description">
                <p>{book.description}</p>
              </div>

              <div className="tags">
                {book.tags?.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Toast de reserva */}
        <div
          className={"reserve-toast" + (showReserveToast ? "" : " hidden")}
          role="status"
          aria-live="polite"
        >
          <div className="toast-content">
            <i className="fa-solid fa-circle-check" />
            <div>
              <p className="toast-title">Reservado</p>
              <p className="toast-msg">Se ha reservado exitosamente</p>
            </div>
          </div>
          <button type="button" onClick={handleCloseToast}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      </main>
      {toast}
    </div>
  );
}

export default Detalle;
