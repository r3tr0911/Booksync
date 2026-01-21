import React, {useState, useMemo} from "react";
import Sidebar from "../../components/sidebar";
import {useLogoutToast} from "../../hooks/useLogoutToast";

const MOCK_USERS = [
  {
    id: 1,
    name: "Kevin",
    fullName: "Kevin Steven",
    email: "kevin@booksync.com",
    role: "administrador",
    status: "activo",
  },
  {
    id: 2,
    name: "Juanita",
    fullName: "Juanita Valbuena",
    email: "juanita@booksync.com",
    role: "usuario",
    status: "bloqueado",
  },
  {
    id: 3,
    name: "Santiago",
    fullName: "Santiago Lancheros",
    email: "santiago@booksync.com",
    role: "bibliotecario",
    status: "inactivo",
  },
];


function UsuariosAdmin (){
  const [users] = useState(MOCK_USERS)

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");

  const {toast, openToast} = useLogoutToast();

//buscar y filtros
  const filteredUsers = useMemo(() => {
    let result = users;

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((u) => [u.name, u.fullName, u.email].join("").toLowerCase().includes(term))
    }

    if (roleFilter !== "todos") {
      result = result.filter((u) =>  u.role === roleFilter);
    }

    if(statusFilter !== "todos") {
      result = result.filter((u) => u.status === statusFilter);
    }

    return result;
  }, [users, search, roleFilter, statusFilter]);

  //handlers  
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCreateUser = () => {
    alert("Simulación: abrir modal para crear nuevo usuario/bibliotecario");
  }

  const handleOpenUserMenu = (user) => {
    alert(`Simulación: abrir menú de opciones para ${user.fullName}`);
  };

  const handleCardClick = (user) => {
    alert(`Simulación: ir al detalle de ${user.fullName}`);
  };


  return (
    <div className="users-admin-page">
      <div className="users-admin-layout">
        <Sidebar onLogout={openToast}/>
        
        <main className="users-admin-main">
          <section className="users-admin-panel">
            
            <header className="users-admin-header">
              <h1 className="users-admin-title">
                Usuarios
              </h1>
            </header>

            <div className="users-admin-search-row">
              <div className="users-admin-search">
                <span className="search-icon">
                  <i className="fa-solid fa-magnifying-glass"/>
                </span>
                <input type="text" placeholder="Buscar por nombre o correo" value={search} onChange={handleSearchChange} />
                <button type="button" className="search-voice" aria-label="Busqueda por voz">
                  <i className="fa-solid fa-microphone" />
                </button>
              </div>
            </div>

            {/* Filtros */}
            <div className="users-admin-filters-row">

              <button type="button" className="users-chip" onClick={() => setRoleFilter((prev) => prev === "todos" ? "administrador" : "todos")}>
                <i className="fa-solid fa-filter" />
                <span>Tipo</span>
                <span className="chip-value">
                  {roleFilter === "todos" ? "Todos": roleFilter}
                </span>
                <i className="fa-solid fa-chevron-down"/>
              </button>

              <button type="button" className="users-chip" onClick={() => setStatusFilter((prev) => prev === "todos" ? "activo" : "todos")}>
                <i className="fa-solid fa-chevron-down"/>
                <span>Estado</span>
                <span className="chip-value">
                  {statusFilter === "todos" ? "Todos" : statusFilter}
                </span>
                <i className="fa-solid fa-chevron-down" />
              </button>
            </div>

            {/* ===== GRID DE USUARIOS ===== */}

            <div className="users-admin-grid">
              {filteredUsers.map((user) => {
                const isActive = user.status === "activo";
                const roleLabel = user.role === "administrador" ? "Administrador" : user.role === "bibliotecario" ? "Bibliotecario" : "Usuario"
                return  (
                  <article key={user.id} className="user-card" onClick={() => handleCardClick(user)}>
                    <header className="user-card__header">
                      <span className="user-card__name">
                        {user.name}
                      </span>
                      <button type="button" className="user-card__menu" onClick={(e) => {
                          e.stopPropagation();
                          handleOpenUserMenu(user);
                        }}
                      >
                        <i className="fa-solid fa-ellipsis-vertical" />
                      </button>
                    </header>

                    <div className="user-card__avatar">
                      <i className="fa-regular fa-user" />
                    </div>

                    <div className="user-card__body">
                      <p className="user-card__full-name">{user.fullName}</p>
                      <p className="user-card__role">({roleLabel})</p>

                      <div className="user-card__status-row">
                        <span className={
                          "user-status-pill " + (isActive ? "user-status-pill--ok" : "user-status-pill--danger")
                          }
                        >
                          <span className="user-status-dot" />
                          <span className="user-status-text">
                            {user.status}
                          </span>
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}

              {filteredUsers.length === 0 && (
                <div className="users-admin-empty">
                  No se encontraron usuarios para esa busqueda.
                </div>
              )} 
            </div>
            
            {/* FOOTER */}
            <footer className="users-admin-footer">
              <button type="button" className="users-btn users-btn--primary" onClick={handleCreateUser}>
                <i className="fa-solid fa-user-plus" />
                <span>Crear nuevo usuario</span>
              </button>
            </footer>
          </section>
          {toast}
        </main>
      </div>
    </div>
  );
}

export default UsuariosAdmin;