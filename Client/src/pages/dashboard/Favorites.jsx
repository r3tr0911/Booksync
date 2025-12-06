import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";


const favorites = [
    {
        id: "metamorfosis",
        titulo: "metamorfosis",
        autor: "Kafka",
        estado: "Disponible para reservar",
        genero: "Ficción / Existencialismo",
        portada: "/Covers/metamorfosis.jpg",
      },
      {
        id: "tan-poca-vida",
        titulo: "tan-poca-vida",
        autor: "Yanagihara",
        estado: "Sin disponibilidad",
        genero: "Ficción",
        portada: "/Covers/tan-poca-vida.jpg",
      },
]

function Favorites (){
    const navigate = useNavigate();
    
    const handleReservar = (idLibro) => {
        console.log("Reservar libro id:", idLibro)
        alert("simulacion: reservar libro" + idLibro)
    };

    const handleDetalle = (idLibro) => {
        navigate(`/detalle/${idLibro}`)
    };

    const handleQuitarFavorito = (idLibro) => {
        console.log("Quitar de favoritos id:", idLibro);
        alert("Simulación: quitar de favoritos " + idLibro);
    };

    const renderDisponibiidad = (estado) => {
        switch (estado){
            case "disponible" :
                return (
                    <p className="favorito-row">
                        <span className="label">Disponible para reservar</span>
                    </p>
                );
            case "prestado" :
                return (
                    <p className="favorito-row">
                        <span className="label">Prestado actualmente</span>
                    </p>
                )
            case "Reservado" :
                return (
                    <p className="favorito-row">
                        <span className="label">Reservado actualmente</span>
                    </p>
                )
            case "Sin_stock" :
                return (
                    <p className="favorito-row">
                        <span className="label">Sin ejemplares disponibles</span>
                    </p>
                )
            default :
                return null
        };   
    };


    return (
        <div className="favoritos-page">
            <div className="app layout">
                <Sidebar />

                <main className="favoritos-content">
                    {/* HEADER */}
                    <header className="favoritos-header">
                        <div className="badge-mis-favoritos">
                            <span className="badge-icon">
                                <i className="fa-solid fa-book-open" />
                            </span>
                            <div className="badge-text">
                                <span>Mis</span>
                                <span>favoritos</span>
                            </div>
                        </div>
                    </header>

                    {/* Lista de favoritos */}
                    <section className="favoritos-panel">
                        <div className="favoritos-grid">
                            {favorites.map((libro) => 
                                <article key={libro.id} className="favorito-card">
                                    {/* Corazon flotante*/}
                                    <button type="button" className="favorito like" onClick={() => {handleQuitarFavorito(libro.id)}} aria-label="Quitar de favoritos">
                                        <i className="fa-regular fa-heart"/>    
                                    </button>

                                    {/* Portada */}
                                    <div className="favorito-cover">
                                        <img src={libro.portada} alt={libro.titulo} />
                                    </div>

                                    {/* info */}
                                    <div className="favorito-info">
                                        <h3 className="favorito-title">
                                            {libro.titulo} <span> ({libro.autor})</span>
                                        </h3>
                                        {renderDisponibiidad(libro.estado)}
                                        <p className="favorito-row genero">{libro.genero}</p>
                                    </div>

                                    {/* Botones*/}
                                    <div className="favorito-footer">
                                        <button type="button" className="btn-favorito-reservar" onClick={() => handleReservar(libro.id)}>
                                            Reservar
                                        </button>

                                        <button type="button" className="btn-favorito-detalle" onClick={() => handleDetalle(libro.id)}>
                                            Detalle
                                        </button>   
                                    </div>
                                </article>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Favorites