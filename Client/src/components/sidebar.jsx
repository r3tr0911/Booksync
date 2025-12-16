import { Link, useNavigate } from "react-router-dom";

function Sidebar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      // Home nos pasó un callback para mostrar el toast
      onLogout();
    } else {
      // Fallback: si nadie pasó onLogout, navegar directo
      navigate("/");
    }
  };

  return (
    <aside className="sidebar">
      <Link className="brand" to="/Home" aria-label="Inicio">
        <img src="/BOOKSYNC LOGO 2.png" alt="BookSync" />
      </Link>

      <nav className="side-actions">
      <Link className="side-btn" title="Favoritos" to="/Favoritos">
          <i className="fa-solid fa-heart" />
          <small></small>
      </Link>

        <Link className="side-btn" title="Reservas" to="/Reservas">
          <i className="fa-solid fa-bookmark" />
          <small></small>
        </Link>

        <Link className="side-btn" title="Préstamos" to="/Prestamos">
          <i className="fa-solid fa-cart-shopping" />
          <small></small>
        </Link>

      </nav>

      <div className="side-tools">
        <Link className="tool" title="Cuenta" to="/Cuenta">
          <i className="fa-regular fa-user" />
          <small></small>
        </Link>

        <Link className="tool" title="Ajustes" to="/Ajustes">
          <i className="fa-solid fa-gear" />
          <small></small>
        </Link>

        <button
          id="btn-logout"
          className="tool"
          title="Salir"
          type="button"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-right-from-bracket" />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
