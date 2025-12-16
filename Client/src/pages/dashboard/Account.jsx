// src/pages/Account.jsx
import { useState } from "react";
import Sidebar from "../../components/sidebar"; 
import {useLogoutToast} from "../../hooks/useLogoutToast";


function Account({

    user,
    devices = [],
    onSaveProfile,
    onLogout,
    onLogoutAll,
    onDeactivate,
}) {
    const [formData, setFormData] = useState({
        fullName: user?.fullName || "Kevin Steven Uribe Lara",
        email: user?.email || "kevinesteven0627@gmail.com",
        birthDate: user?.birthDate || "",
        documentId: user?.documentId || "1070004611",
    });

    const  {toast, openToast} = useLogoutToast()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onSaveProfile) {
            onSaveProfile(formData);
        }
    };

    const handleLogoutHere = () => {
        if (onLogout) onLogout();
    };

    const handleLogoutAll = () => {
        if (onLogoutAll) onLogoutAll();
    };

    const handleDeactivate = () => {
        if (onDeactivate) onDeactivate();
    };

    const avatarInitial =
        formData.fullName?.trim()?.charAt(0)?.toUpperCase() || "U";

    return (
        <div className="account-page">
            <div className="account-layout">
                <Sidebar onLogout={openToast} />

                <div className="account-main">
                    <div className="account-page__inner">
                        <div className="account-page__panel">
                            {/* ===== HEADER ===== */}
                            <header className="account-header">
                                <h1 className="account-header__title">CUENTA</h1>

                                <div className="account-header__row">
                                    {/* Avatar a la izquierda */}
                                    <div className="account-header__avatar">
                                        <div className="account-avatar-circle">
                                            <span>{avatarInitial}</span>
                                        </div>
                                        </div>

                                        {/* Usuario + chips a la derecha */}
                                        <div className="account-header__user-block">
                                            <div className="account-header__user-top">
                                                <span className="account-header__user-label">
                                                Usuario
                                                </span>
                                                <input
                                                    className="account-header__user-input"
                                                    type="text"
                                                    value={user?.name || "kevinejemplo"}
                                                    disabled
                                                />
                                            </div>

                                        <div className="account-header__chips">
                                            <span className="account-chip account-chip--role">
                                                USUARIO
                                            </span>
                                            <span className="account-chip account-chip--status">
                                                ACTIVO
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </header>

                            {/* ===== CUERPO ===== */}
                            <main className="account-body">
                                {/* IZQUIERDA: DATOS GUARDADOS */}
                                <section className="account-left">
                                    <div className="account-section-label">DATOS GUARDADOS</div>

                                    <form className="account-form" onSubmit={handleSubmit}>
                                        <div className="account-form__field">
                                            <label htmlFor="fullName">Nombre</label>
                                            <input
                                                id="fullName"
                                                name="fullName"
                                                type="text"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="account-form__field">
                                            <label htmlFor="email">Correo</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="account-form__field">
                                            <label htmlFor="birthDate">Fecha de nacimiento</label>
                                            <input
                                                id="birthDate"
                                                name="birthDate"
                                                type="date"
                                                value={formData.birthDate}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="account-form__field">
                                            <label htmlFor="documentId">
                                                Número de identificación
                                            </label>
                                            <input
                                                id="documentId"
                                                name="documentId"
                                                type="text"
                                                value={formData.documentId}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="account-form__actions">
                                            <button
                                                type="submit"
                                                className="account-btn account-btn--primary"
                                            >
                                                <span
                                                    className="account-btn__icon"
                                                    aria-hidden="true"
                                                >
                                                    <i className="fa-solid fa-lock" />
                                                </span>
                                                    Guardar cambios
                                            </button>
                                        </div>
                                    </form>
                                </section>

                                {/* DERECHA: DISPOSITIVOS */}
                                <section className="account-right">
                                    <div className="account-devices-card">
                                        <h2 className="account-devices__title">
                                            Dispositivos vinculados
                                        </h2>
                                        <p className="account-devices__subtitle">
                                            Estás conectado en este dispositivo.
                                        </p>

                                        <div className="account-devices__table-wrapper">
                                            <table className="account-devices__table">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Dispositivo</th>
                                                        <th>Última conexión</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(devices.length
                                                    ? devices
                                                    : [
                                                        {
                                                            id: 1,
                                                            name: "Windows",
                                                            lastConnection:"5 de diciembre, 12:11 pm",
                                                            current: true,
                                                        },
                                                        {
                                                            id: 2,
                                                            name: "Xiaomi_redmi4",
                                                            lastConnection:"12 de diciembre, 8:30 am",
                                                        },
                                                        {
                                                            id: 3,
                                                            name: "Moto_G52",
                                                            lastConnection:"3 de diciembre, 6:15 pm",
                                                        },
                                                        ]).map((device) => (
                                                            <tr
                                                                key={device.id || device.name}
                                                                className={
                                                                    device.current
                                                                    ? "account-device--current"
                                                                    : ""
                                                                }
                                                            >
                                                                <td className="account-device__icon-cell">
                                                                    <i className="fa-solid fa-satellite-dish" />
                                                                </td>
                                                                <td>{device.name}</td>
                                                                <td>{device.lastConnection}</td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="account-devices__actions">
                                            <button
                                                type="button"
                                                className="account-btn account-btn--dark"
                                                onClick={handleLogoutHere}
                                            >
                                                Cerrar sesión aquí
                                            </button>
                                            <button
                                                type="button"
                                                className="account-btn account-btn--dark"
                                                onClick={handleLogoutAll}
                                            >
                                                Cerrar sesión en todos
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            </main>

                            {/* ===== ZONA DE PELIGRO ===== */}
                            <footer className="account-danger-zone">
                                <button
                                    type="button"
                                    className="account-btn account-btn--danger"
                                    onClick={handleDeactivate}
                                >
                                    Solicitar desactivación
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

export default Account;
