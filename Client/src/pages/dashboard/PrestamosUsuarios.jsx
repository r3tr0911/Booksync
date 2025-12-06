import React from "react";
import Sidebar from "../../components/sidebar";


const prestamos = [
  {
    id: 1,
    titulo: "La metamorfosis",
    autor: "Kafka",
    estado: "vigente",
    prestadoEl: "20/05/2025",
    devolverAntesDe: "27/05/2025",
    portada: "/Covers/metamorfosis.jpg",
  },
  {
    id: 2,
    titulo: "Tan poca vida",
    autor: "Yanagihara",
    estado: "atrasado",
    prestadoEl: "20/05/2025",
    devolverAntesDe: "27/05/2025",
    portada: "/Covers/tan-poca-vida.jpg",
  },
  {
    id: 3,
    titulo: "Utopía",
    autor: "Andre Htois",
    estado: "proximo", 
    prestadoEl: "20/05/2025",
    devolverAntesDe: "27/05/2025",
    portada: "/Covers/utopia.jpg",
  },
];

function PrestamosUsuarios() {
    const renderEstado = (estado) => {
        switch (estado) {
            case "proximo":
                return (
                    <span className="badge-estado badge-proximo">
                        Próximo a vencer
                    </span>
                );
            case "vigente":
                return (
                    <span className="badge-estado badge-vigente">
                        Vigente
                    </span>
                );
            case "atrasado":
                return (
                    <span className="badge-estado badge-atrasado">
                        Atrasado
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="prestamos-page">
            <div className="app-layout">
                <Sidebar />

                <main className="prestamos-content">
                    {/* HEADER */}
                    <header className="prestamos-header">
                        <div className="badge-mis-prestamos">
                            <span className="badge-icon">
                                <i className="fa-solid fa-book-open" />
                            </span>
                            <div className="badge-text">
                                <span>Mis</span>
                                <span>préstamos</span>
                            </div>
                        </div>
                    </header>

                    {/* LISTA DE PRÉSTAMOS */}
                    <section className="prestamos-panel">
                        <div className="prestamos-grid">
                            {prestamos.map((prestamo) => (
                                <article key={prestamo.id} className="prestamo-card">
                                    <div className="prestamo-cover">
                                        <img src={prestamo.portada} alt={prestamo.titulo} />
                                    </div>

                                    <div className="prestamo-info">
                                        <h3 className="prestamo-title">
                                            {prestamo.titulo} <span>({prestamo.autor})</span>
                                        </h3>

                                        <p className="prestamo-row">
                                            <span className="label">Prestado el:</span>{" "}
                                            {prestamo.prestadoEl}
                                        </p>

                                        <p className="prestamo-row">
                                            <span className="label">Devolver antes del:</span>{" "}
                                            {prestamo.devolverAntesDe}
                                        </p>
                                    </div>

                                    <div className="prestamo-footer">
                                        {renderEstado(prestamo.estado)}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default PrestamosUsuarios;
