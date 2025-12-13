// src/hooks/useLogoutToast.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useLogoutToast() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);

    // Mostrar el toast
    const openToast = () => setShowToast(true);
    // Cerrar sin hacer logout
    const closeToast = () => setShowToast(false);

    // Confirmar logout
    const confirmLogout = () => {
        navigate("/");
    };

    // Autocierre a los 5 segundos (como en Home)
    useEffect(() => {
        if (!showToast) return;
        const timer = setTimeout(() => setShowToast(false), 5000);
        return () => clearTimeout(timer);
    }, [showToast]);


    const toast = (
    <div
        id="logout-toast"
        className={`toast-logout ${showToast ? "is-visible" : ""}`}
        aria-hidden={showToast ? "false" : "true"}
        role="alertdialog"
        aria-labelledby="logout-title"
        aria-describedby="logout-desc"
    >
        <div className="toast-card">
            <div className="toast-header">
                <span id="logout-title" className="toast-title">
                    Cerrar sesión
                </span>
                <button
                    className="toast-close"
                    type="button"
                    aria-label="Cerrar aviso"
                    onClick={closeToast}
                > 
                    &times;
                </button>
            </div>
            <p id="logout-desc" className="toast-desc">
                Estás a punto de cerrar sesión
            </p>
            <div className="toast-actions">
                <button
                    id="toast-confirm-logout"
                    className="btn-danger"
                    type="button"
                    onClick={confirmLogout}
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    </div>
    );

    return { toast, openToast };
}