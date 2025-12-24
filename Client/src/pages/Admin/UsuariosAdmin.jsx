// src/pages/admin/UsuariosAdmin.jsx
import Sidebar from "../../components/sidebar";
import { useLogoutToast } from "../../hooks/useLogoutToast";

export default function UsuariosAdmin() {
  const { toast, openToast } = useLogoutToast();

  return (
    <div className="account-page">
      <div className="account-layout">
        <Sidebar onLogout={openToast} />

        <main className="account-main">
          <div className="account-page__inner">
            <div className="account-page__panel">
              <header className="admin-header">
                <h1 className="account-header__title">Gestión de usuarios</h1>
              </header>

              <p style={{ marginTop: "16px", color: "#000" }}>
                (Aquí va el grid de tarjetas de usuario: Kevin admin, Juanita
                usuaria, filtros por tipo/estado, y el botón de crear nuevo
                usuario.)
              </p>
            </div>
          </div>
        </main>
      </div>

      {toast}
    </div>
  );
}
