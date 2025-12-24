import React, {useState, useMemo, useRef, useEffect} from "react";
import Sidebar from "../../components/sidebar";
import { useLogoutToast } from "../../hooks/useLogoutToast";

const MOCK_RESERVAS = [
  {
    id: 1,
    isbn: "9781532834509",
    titulo: "Utopía",
    usuario: "Juanita Valbuena",
    fechaReserva: "30/05/2025",
    fechaLimite: "15/09/2025",
    estado: "Puede retirarse",
    estadoTipo: "ok", 
  },
  {
    id: 2,
    isbn: "97898975661912",
    titulo: "La metamorfosis",
    usuario: "Kevin Lara",
    fechaReserva: "05/06/2025",
    fechaLimite: "25/06/2025",
    estado: "Expirada",
    estadoTipo: "danger",
  },
  {
    id: 3,
    isbn: "9788426403278",
    titulo: "Tan poca vida",
    usuario: "Santiago Lancheros",
    fechaReserva: "25/08/2025",
    fechaLimite: "03/09/2025",
    estado: "Vigente",
    estadoTipo: "warning",
  },
];

function ReservasAdmin() {

  const [reservas] = useState(MOCK_RESERVAS); 
  const [search, setSearch] = useState(""); 
  const [selectedIds, setSelectedIds] = useState([]); 
  const { toast, openToast } = useLogoutToast(); 

  // ===== buscador ====
  const reservasFiltradas = useMemo(() => {
    if (!search.trim()) return reservas;

    const term = search.toLowerCase();
    return reservas.filter((res) =>
      [
        res.isbn,
        res.titulo,
        res.usuario,
        res.estado,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [reservas, search]);

  // ===== Manejar cambios en el input de búsqueda =====
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // ===== Acciones de la barra superior =====
  const handleNuevaReserva = () => {
    alert("Simulación: abrir modal para crear nueva reserva");
  };

  const handleHistorial = () => {
    alert("Simulación: ver historial de reservas");
  };

  const handleExportar = () => {
    alert("Simulación: exportar reservas (CSV / Excel)");
  };

  // ===== Selección masiva  =====
  const visibleIds = reservasFiltradas.map((r) => r.id);

  const allVisibleSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => selectedIds.includes(id));

  const noneVisibleSelected = visibleIds.every(
    (id) => !selectedIds.includes(id)
  );


  const isIndeterminate =
    !noneVisibleSelected && !allVisibleSelected;


  const selectAllRef = useRef(null);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);


  const handleToggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };


  const handleToggleAll = (event) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedIds((prev) => {
        const set = new Set(prev);
        visibleIds.forEach((id) => set.add(id));
        return Array.from(set);
      });
    } else {
      setSelectedIds((prev) =>
        prev.filter((id) => !visibleIds.includes(id))
      );
    }
  };

  // ===== Acciones masivas  =====
  const handleConfirmarSeleccionadas = () => {
    if (selectedIds.length === 0) {
      alert("No hay reservas seleccionadas.");
      return;
    }
    alert(
      `Simulación: confirmar ${selectedIds.length} reservas seleccionadas`
    );
  };

  const handleCancelarSeleccionadas = () => {
    if (selectedIds.length === 0) {
      alert("No hay reservas seleccionadas.");
      return;
    }
    alert(
      `Simulación: cancelar ${selectedIds.length} reservas seleccionadas`
    );
  };

  const renderEstadoPill = (reserva) => {
    return (
      <span
        className={`res-estado-pill res-estado-pill--${reserva.estadoTipo}`}
      >
        <span className="res-estado-dot" />
        <span className="res-estado-text">
          {reserva.estado}
        </span>
      </span>
    );
  };

  // ===== Render =====
  return (
    <div className="reservas-admin-page">
      <div className="reservas-admin-layout">
        <Sidebar onLogout={openToast} />

        <main className="reservas-admin-main">
          <section className="reservas-admin-panel">
            {/* HEADER */}
            <header className="reservas-admin-header">
              <div className="reservas-admin-title-block">
                <h1 className="reservas-admin-title">Reservas</h1>
                <span className="reservas-admin-counter">
                  {reservasFiltradas.length}
                </span>
              </div>

              <div className="reservas-admin-header-actions">
                <button
                  type="button"
                  className="res-btn res-btn--primary"
                  onClick={handleNuevaReserva}
                >
                  <i
                    className="fa-solid fa-plus"
                    aria-hidden="true"
                  />
                  <span>Nueva reserva</span>
                </button>

                <button
                  type="button"
                  className="res-btn res-btn--ghost"
                  onClick={handleHistorial}
                >
                  <i
                    className="fa-regular fa-clock"
                    aria-hidden="true"
                  />
                  <span>Historial</span>
                </button>

                <button
                  type="button"
                  className="res-btn res-btn--ghost"
                  onClick={handleExportar}
                >
                  <i
                    className="fa-solid fa-file-export"
                    aria-hidden="true"
                  />
                  <span>Exportar</span>
                </button>
              </div>
            </header>

            {/* BUSCADOR */}
            <div className="reservas-admin-search-row">
              <div className="reservas-admin-search">
                <span className="search-icon">
                  <i className="fa-solid fa-magnifying-glass" />
                </span>
                <input
                  type="text"
                  placeholder="Título, autor, ISBN, código"
                  value={search}
                  onChange={handleSearchChange}
                />
                <button
                  type="button"
                  className="search-voice"
                  aria-label="Búsqueda por voz"
                >
                  <i className="fa-solid fa-microphone" />
                </button>
              </div>
            </div>

            {/* FILTROS  */}
            <div className="reservas-admin-filters-row">
              <button type="button" className="res-chip">
                <i className="fa-solid fa-user" />
                <span>Usuario</span>
                <i className="fa-solid fa-chevron-down" />
              </button>

              <button type="button" className="res-chip">
                <i className="fa-solid fa-toggle-on" />
                <span>Estado</span>
                <i className="fa-solid fa-chevron-down" />
              </button>

              <button type="button" className="res-chip">
                <i className="fa-solid fa-calendar-day" />
                <span>Fecha</span>
                <i className="fa-solid fa-chevron-down" />
              </button>

              <button type="button" className="res-chip">
                <i className="fa-solid fa-layer-group" />
                <span>Categoría</span>
                <i className="fa-solid fa-chevron-down" />
              </button>
            </div>

            {/* TABLA */}
            <div className="reservas-admin-table-wrapper">
              <table className="reservas-admin-table">
                <thead>
                  <tr>
                    <th className="col-checkbox">
                      <input
                        type="checkbox"
                        aria-label="Seleccionar todas"
                        ref={selectAllRef}
                        checked={allVisibleSelected}
                        onChange={handleToggleAll}
                      />
                    </th>
                    <th>Código / ISBN</th>
                    <th>Título</th>
                    <th>Usuario</th>
                    <th>Fecha reserva</th>
                    <th>Fecha límite de retiro</th>
                    <th className="col-estado">Estado</th>
                    <th className="col-actions">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reservasFiltradas.map((res) => (
                    <tr key={res.id}>
                      <td className="col-checkbox">
                        <input
                          type="checkbox"
                          aria-label={`Seleccionar reserva de ${res.usuario}`}
                          checked={selectedIds.includes(res.id)}
                          onChange={() =>
                            handleToggleRow(res.id)
                          }
                        />
                      </td>
                      <td>{res.isbn}</td>
                      <td>{res.titulo}</td>
                      <td>{res.usuario}</td>
                      <td>{res.fechaReserva}</td>
                      <td>{res.fechaLimite}</td>
                      <td className="col-estado">
                        {renderEstadoPill(res)}
                      </td>
                      <td className="col-actions">
                        <button
                          type="button"
                          className="row-action"
                          title="Ver detalle"
                          onClick={() =>
                            alert(
                              `Simulación: ver detalle de la reserva de ${res.usuario}`
                            )
                          }
                        >
                          <i className="fa-regular fa-eye" />
                        </button>
                        <button
                          type="button"
                          className="row-action"
                          title="Editar"
                          onClick={() =>
                            alert(
                              `Simulación: editar reserva de ${res.usuario}`
                            )
                          }
                        >
                          <i className="fa-solid fa-pen" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {reservasFiltradas.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="no-results"
                      >
                        No se encontraron reservas para "
                        {search}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ACCIONES MASIVAS */}
            <footer className="reservas-admin-footer">
              <div className="reservas-admin-bulk-actions">
                <button
                  type="button"
                  className="res-btn res-btn--primary"
                  onClick={handleConfirmarSeleccionadas}
                >
                  <i className="fa-regular fa-square-check" />
                  <span>Confirmar reservas</span>
                </button>

                <button
                  type="button"
                  className="res-btn res-btn--ghost"
                  onClick={handleCancelarSeleccionadas}
                >
                  <i className="fa-regular fa-circle-xmark" />
                  <span>Cancelar</span>
                </button>

              </div>
            </footer>
          </section>

          {toast}
        </main>
      </div>
    </div>
  );
}

export default ReservasAdmin;
