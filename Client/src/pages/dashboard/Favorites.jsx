import React, {use, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useLogoutToast } from "../../hooks/useLogoutToast";

import { getFavorites, deleteFavorite } from "../../services/favorito.service";


// const favorites = [
//     {
//         id: "metamorfosis",
//         titulo: "metamorfosis",
//         autor: "Kafka",
//         estado: "Disponible para reservar",
//         genero: "Ficción / Existencialismo",
//         portada: "/Covers/metamorfosis.jpg",
//       },
//       {
//         id: "tan-poca-vida",
//         titulo: "tan-poca-vida",
//         autor: "Yanagihara",
//         estado: "Sin disponibilidad",
//         genero: "Ficción",
//         portada: "/Covers/tan-poca-vida.jpg",
//       },
// ]




function Favorites (){
    const navigate = useNavigate();
    const { toast, openToast } = useLogoutToast();

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    
    //reserva
    const handleReservar = (idLibro) => {
        console.log("Reservar libro id:", idLibro)
        alert("simulacion: reservar libro" + idLibro)
    };

    //detalle
    const handleDetalle = (idLibro) => {
        navigate(`/detalle/${idLibro}`)
    };

    //quitar favorito
    const handleQuitarFavorito = async (idLibro) => {
        try {
            await deleteFavorite(idLibro);
            setFavorites((prev) => prev.filter((l) => l.id_libro !== idLibro));
        } catch (error) {
            alert(error?.response?.data?.message || "Error quitando favorito");
        }
    };

    //llamada de favoritos
    useEffect(() => {
        const fetchFavs = async () => {
            try {
                const data = await getFavorites();

                setFavorites(data.favorite || []);
            } catch (error) {
                console.error("Error cargando favoritos:", error);
                setFavorites([]);
            } finally {
                setLoading(false);
            }
        }

        fetchFavs();
    }, []);


    //renderizar disponibles
    const renderDisponibilidad = (status, availableQty) => {
        if (status === "inactivo") return <p className="favorito-row"><span className="label">Inactivo</span></p>;
        if (status === "dañado") return <p className="favorito-row"><span className="label">Dañado</span></p>;

        if (availableQty > 0) {
            return <p className="favorito-row"><span className="label">Disponible para reservar</span></p>;
        }
        return <p className="favorito-row"><span className="label">Sin disponibilidad</span></p>;
    };


    return (
        <div className="favoritos-page">
            <div className="app layout">
                <Sidebar onLogout={openToast} />

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
                        {loading && <p>Cargando favoritos...</p>}

                        {!loading && favorites.length === 0 && (
                            <p>No tienes favoritos todavía. Ve al detalle de un libro y guárdalo ⭐</p>
                        )}
                        <div className="favoritos-grid">
                            {favorites.map((libro) => {
                                const coverUrl = `http://localhost:3000${libro.cover}`;

                                return (
                                    <article key={libro.id_libro} className="favorito-card">
                                    {/* Corazon flotante */}
                                    <button
                                        type="button"
                                        className="favorito like"
                                        onClick={() => handleQuitarFavorito(libro.id_libro)}
                                        aria-label="Quitar de favoritos"
                                    >
                                        <i className="fa-solid fa-heart" />
                                    </button>

                                    {/* Portada */}
                                    <div className="favorito-cover">
                                        <img src={coverUrl} alt={libro.title} />
                                    </div>

                                    {/* Info */}
                                    <div className="favorito-info">
                                        <h3 className="favorito-title">
                                        {libro.title} <span>({libro.author})</span>
                                        </h3>

                                        {renderDisponibilidad(libro.status, libro.available_quantity)}
                                        <p className="favorito-row genero">{libro.genre}</p>
                                    </div>

                                    {/* Botones */}
                                    <div className="favorito-footer">
                                        <button
                                        type="button"
                                        className="btn-favorito-reservar"
                                        onClick={() => handleReservar(libro.id_libro)}
                                        disabled={libro.available_quantity <= 0 || libro.status !== "disponible"}
                                        >
                                        Reservar
                                        </button>

                                        <button
                                        type="button"
                                        className="btn-favorito-detalle"
                                        onClick={() => handleDetalle(libro.id_libro)}
                                        >
                                        Detalle
                                        </button>
                                    </div>
                                    </article>
                                );
                                })}
                        </div>
                    </section>
                    {toast}
                </main>
            </div>
        </div>
    );
};

export default Favorites