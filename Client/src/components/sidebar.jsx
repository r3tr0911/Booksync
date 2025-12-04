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
      <Link className="brand" to="/home" aria-label="Inicio">
        <img src="/BOOKSYNC LOGO 2.png" alt="BookSync" />
      </Link>

      <nav className="side-actions">
        <button className="side-btn" title="Favoritos">
          <i className="fa-solid fa-heart" />
          <small></small>
        </button>

        <Link className="side-btn" title="Reservas" to="/reservas">
          <i className="fa-solid fa-bookmark" />
          <small></small>
        </Link>

        <button className="side-btn" title="Préstamos">
          <i className="fa-solid fa-cart-shopping" />
          <small></small>
        </button>
      </nav>

      <div className="side-tools">
        <button className="tool" title="Cuenta">
          <i className="fa-regular fa-user" />
        </button>

        <button className="tool" title="Ajustes">
          <i className="fa-solid fa-gear" />
        </button>

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
