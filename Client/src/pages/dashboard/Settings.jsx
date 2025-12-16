import Sidebar from "../../components/sidebar";
import { useState } from "react";
import { useLogoutToast } from "../../hooks/useLogoutToast";
import { useAsyncError } from "react-router-dom";

function Settings ({
    onSaveAlerts,
    onChangePassword,
    OnResetPreferences,
}){
    const [alerts, setAlerts] = useState({
        returnReminders: true,
        upcomingReservations: true,
        reservedAvailable: true,
    });

    //===CAMBIO DE CONTRASEÑA==//
    const [passwords, setPasswords] = useState({
        current: "",
        next: "",
        confirm:"",
    });

    //===TOAST DE CIERRE===//
    const {toast, openToast} = useLogoutToast();

    //=== HANDLES ===//
    const handleAlertToggle = (key) => (event) => {
        const {checked} = event.target;
        setAlerts((prev) => ({ ...prev, [key]:checked }));
    };

    const handleSaveAlerts = (event) => {
        event.preventDefault();
        if (onSaveAlerts) {
            onSaveAlerts(alerts);
        }
         // despues poner un toast de cierre
        console.log("Ajustes de alertas guardados", alerts);
    };

    const handlePasswordChange = (event) => {
        const { name , value } = event.target;
        setPasswords((prev) => ({... prev, [name]: value }));
    };

    const handleSubmitPassword = (event) => {
        event.preventDefault();

        if(!passwords.current || !passwords.next || !passwords.confirm){
            alert("Por favor completa todos los campos de contraseña.");
            return;
        }

        if(passwords.next !== passwords.confirm){
            alert("La nueva contraseña no coincide.");
            return;
        }

        if(onChangePassword){
            onChangePassword({
                current: passwords.current,
                next: passwords.next,
            });
        }

        console.log("Solicitud de cambio de contraseña:", passwords);
        setPasswords({ current: "", next: "", confirm:"" });
    };

    const handleResetPreferences = () => {
        setAlerts({
            returnReminders: true,
            upcomingReservations: true,
            reservedAvailable: true,
        });
        setPasswords({ current: "", next: "", confirm: "" });
        
        if (OnResetPreferences) {
            OnResetPreferences();
        }

        console.log("Preferencias restabelcidas por defecto")
    };

    return (
        <div className="settings-page">
            <div className="settings-layout">
                <Sidebar onLogout={openToast}/>

                {/* CONTENIDO */}
                <div className="settings-main">
                    <div className="settings-page__inner">
                        <div className="settings-page__panel">
                            {/* HEADER */}
                            <header className="settings-header">
                                <h1 className="settings-header__title">AJUSTES</h1>
                            </header>

                            {/* CUERPO */}
                            <main className="settings-body">
                                {/* Columna izquierda*/}
                                <section className="settings-column settings-column--alerts">
                                    <div className="settings-section-label">
                                        ALERTAS Y RECORDATORIOS
                                    </div>

                                    <form className="settings-alerts-form" onSubmit={handleSaveAlerts}>
                                        <ul className="settings-alerts-list">
                                            <li className="settings-alert-item">
                                                <input id="alert-return-reminders" type="checkbox" checked={alerts.returnReminders} onChange={handleAlertToggle("returnReminders")} />
                                                <label htmlFor="alert-return-reminders">
                                                    Recordatorios de devolución
                                                </label>
                                            </li>

                                            <li className="settings-alert-item">
                                                <input id="alert-upcoming-reservations" type="checkbox" checked={alerts.upcomingReservations} onChange={handleAlertToggle("upcomingReservations")} />
                                                <label htmlFor="alert-upcoming-reservations">
                                                Alertas de reservas próximas a vencer
                                                </label>
                                            </li>

                                            <li className="settings-alert-item">
                                                <input id="alert-reserved-available" type="checkbox" checked={alerts.reservedAvailable} onChange={handleAlertToggle("reservedAvailable")} />
                                                <label htmlFor="alert-reserved-available">
                                                    Aviso de libros reservados disponibles
                                                </label>
                                            </li>
                                        </ul>

                                        <hr className="settings-divider"/>

                                        <div className="settigns-alerts-actions">
                                            <button type="submit" className="settings-btn settings-btn--primary">
                                                <span className="settings-btn__icon" aria-hidden="true">
                                                    <i className="fa-solid fa-floppy-disk" />
                                                </span>
                                                Guardar ajustes
                                            </button>
                                        </div>
                                    </form>
                                </section>

                                {/* Columna derecha*/}
                                <section className="settings-column settings-column--security">
                                    <div className="settings-section-label settings-section-label--right">
                                        SEGURIDAD
                                    </div>

                                    <form className="settings-security-form" onSubmit={handleSubmitPassword}>
                                        <div className="settings-field">
                                            <label htmlFor="current-password">
                                                Contraseña actual
                                            </label>
                                            <input id="current-password" name="current" type="password" value={passwords.current} onChange={handlePasswordChange} />
                                        </div>

                                        <div className="settings-field">
                                            <label htmlFor="next-password">Nueva contraseña</label>
                                            <input id="next-password" name="next" type="password" value={passwords.next} onChange={handlePasswordChange}/>
                                        </div>  

                                        <div className="settings-field">
                                            <label htmlFor="confirm-password"> Confirmar nueva contraseña</label>
                                            <input id="confirm-password" name="confirm" type="password" value={passwords.confirm} onChange={handlePasswordChange}/>
                                        </div>

                                        <div className="settings-security-actions">
                                            <button type="sumbit" className="settings-btn settings-btn--primary">
                                                <span className="settings-btn__icon" aria-hidden="true">
                                                    <i className="fa-solid fa-key" />
                                                </span>
                                                Actualizar contraseña
                                            </button>
                                        </div>
                                    </form>
                                </section>
                            </main>

                            {/*FOOTER*/}
                            <footer className="settings-footer">
                                <button type="button" className="settings-btn settings-btn--danger" onClick={handleResetPreferences}>
                                    Restablecer Preferencias
                                </button>
                            </footer>
                        </div>
                    </div>
                </div>
                {toast}
            </div>
        </div>
    );
}

export default Settings;