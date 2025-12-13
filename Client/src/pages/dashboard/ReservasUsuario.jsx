import React from "react";
import Sidebar from "../../components/sidebar";
import { useLogoutToast } from "../../hooks/useLogoutToast";

const reservas = [
    {
        id: 1,
        titulo: "La metamorfosis",
        autor: "Kafka",
        estado: "vencido",
        reservadoEl: "14/05/2025",
        recogerAntesDe: null,
        portada: "/Covers/metamorfosis.jpg",
    },
    {
        id: 2,
        titulo: "Tan poca vida",
        autor: "Yanagihara",
        estado: "disponible",
        reservadoEl: "05/12/2025",
        recogerAntesDe: "03/12/2025",
        portada: "/Covers/tan-poca-vida.jpg",
    },
];

function ReservasUsuario() {
    const {toast, openToast} = useLogoutToast();
    const handleCancelar = (reservaId) => {
    console.log("Cancelar reserva id:", reservaId);
    alert("Simulación: cancelar reserva " + reservaId);
    };

    return (
        <div className="reservas-page">
            <div className="app-layout">
                <Sidebar onLogout={openToast}/>

                <main className="reservas-content">
                    <header className="reservas-header">
                        <div className="badge-mis-reservas">
                            <span className="badge-icon">
                                <i className="fa-solid fa-book-open" />
                            </span>
                            <div className="badge-text">
                                <span>Mis</span>
                                <span>reservas</span>
                            </div>
                        </div>
                    </header>

                    <section className="reservas-panel">
                        <div className="reservas-grid">
                            {reservas.map((reserva) => (
                                <article key={reserva.id} className="reserva-card">
                                    <div className="reserva-cover">
                                        <img src={reserva.portada} alt={reserva.titulo} />
                                    </div>

                                    <div className="reserva-info">
                                        <h3 className="reserva-title">
                                            {reserva.titulo} <span>({reserva.autor})</span>
                                        </h3>

                                        <p className="reserva-row">
                                            <span className="label">Reservado el:</span>{" "}
                                            {reserva.reservadoEl}
                                        </p>

                                        {reserva.estado === "disponible" && (
                                            <>
                                                <p className="reserva-row">
                                                    <span className="label">Estado:</span>{" "}
                                                        Disponible para recoger
                                                </p>
                                                {reserva.recogerAntesDe && (
                                                    <p className="reserva-row">
                                                        <span className="label">
                                                            Recoger antes del:
                                                        </span>{" "}
                                                        {reserva.recogerAntesDe}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    <div className="reserva-footer">
                                        {reserva.estado === "vencido" ? (
                                            <span className="badge-estado badge-vencido">
                                                vencido
                                            </span>
                                        ) : (
                                            <button
                                                type="button"
                                                className="btn-cancelar-reserva"
                                                onClick={() => handleCancelar(reserva.id)}
                                            >
                                                Cancelar reserva
                                            </button>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </main>
                {toast}
            </div>
        </div>
    );
}

export default ReservasUsuario;
