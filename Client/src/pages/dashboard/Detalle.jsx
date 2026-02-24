import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLogoutToast } from "../../hooks/useLogoutToast";
import Sidebar from "../../components/sidebar";
import axios from "axios";


function Detalle() {
  const navigate = useNavigate();
  const {toast, openToast} = useLogoutToast();
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReserveToast, setShowReserveToast] = useState(false);


  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:3000/api/libros/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
      );
        setBook(res.data)
      } catch (error) {
        console.error("Error detalle:", error);
        navigate("/Home");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, navigate])
  
  if(loading) {
      return (
        <div className="detalle-page">
          <Sidebar onLogout={openToast} />
          <main className="content">
            <p>Cargando libro...</p>
          </main>
        </div>
    );
  }
  const statusMap = {
    disponible: "Disponible",
    prestado: "Prestado",
    dañado: "Dañado",
    inactivo: "Inactivo"
  };
  const formattedStatus = statusMap[book.status] || "Desconocido";
  
  if(!book) return null;

  const coverPath = `http://localhost:3000${book.cover}`;

  const handleReserve = () => {
    setShowReserveToast(true);
    setTimeout(() => setShowReserveToast(false), 3000);
  };

  const handleCloseToast = () => {
    setShowReserveToast(false);
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

              <div className="buttons">
                <button
                  className="btn reserve"
                  type="button"
                  onClick={handleReserve}
                  disabled={book.available_quantity <= 0}
                >
                  {book.available_quantity > 0
                    ? "Reservar"
                    : "No disponible"}
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
                  <strong>Año:</strong>{" "}
                  <span>{book.publication_year}</span>
                </p>
                <p>
                  <strong>Género:</strong> <span>{book.genre}</span>
                </p>
                <p>
                  <strong>Editorial:</strong> <span>{book.editorial}</span>
                </p>
                <p>
                  <strong>Estado:</strong>{" "}
                  <span>
                    {formattedStatus}
                  </span>
                </p>
              </div>

              {book.description && (
                <div className="description">
                  <p>{book.description }</p>
                </div>
              )}

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
