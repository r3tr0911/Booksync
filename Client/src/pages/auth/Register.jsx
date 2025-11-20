import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";



function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    idnumber: "",
    idtype: "cc",
    birthdate: "",
    email: "",
    password: "",
    passwordConfirmed: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      lastname,
      idnumber,
      birthdate,
      email,
      password,
      passwordConfirmed,
    } = form;

    // Validaciones básicas
    if (
      !name ||
      !lastname ||
      !idnumber ||
      !birthdate ||
      !email ||
      !password ||
      !passwordConfirmed
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== passwordConfirmed) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (!/^\d+$/.test(idnumber)) {
      alert("El número de identificación debe contener solo dígitos.");
      return;
    }

    const birthDate = new Date(birthdate);
    const today = new Date();
    if (birthDate > today) {
      alert("La fecha de nacimiento no puede ser futura.");
      return;
    }

    // conectar con el backend (fetch/axios a la API de registro)
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    navigate("/");
  };

  return (
    <main className="login-wrap register-page">
      <div className="login-inner">
        {/* Logo */}
        <div className="login-brand">
          <img src="BOOKSYNC LOGO 2.png" alt="BOOKSYNC" />
        </div>

        {/* Tarjeta registro */}
        <section
          className="login-card register-card"
          role="dialog"
          aria-labelledby="reg-title"
          aria-modal="true"
        >
          <div className="avatar">
            <i className="fa-solid fa-user-plus" />
          </div>

          <form
            id="register-form"
            onSubmit={handleSubmit}
            style={{ marginTop: 14 }}
          >
            <h2 id="reg-title" className="sr-only">
              Crear cuenta BookSync
            </h2>

            <div className="form-row">
              <label htmlFor="name">Nombres</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Escribe tus nombres"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="lastname">Apellidos</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Escribe tus apellidos"
                value={form.lastname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row id-section">
              <label htmlFor="idnumber">Número de identificación</label>
              <div className="id-group">
                <input
                  type="text"
                  id="idnumber"
                  name="idnumber"
                  placeholder="Escribe tu número de identificación"
                  value={form.idnumber}
                  onChange={handleChange}
                  required
                />

                <div className="id-type">
                  <label>
                    <input
                      type="radio"
                      name="idtype"
                      value="cc"
                      checked={form.idtype === "cc"}
                      onChange={handleChange}
                    />
                    {" "}C.C
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="idtype"
                      value="ti"
                      checked={form.idtype === "ti"}
                      onChange={handleChange}
                    />
                    {" "}T.I
                  </label>
                </div>
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="birthdate">Fecha de nacimiento</label>
              <div className="field">
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  value={form.birthdate}
                  onChange={handleChange}
                  required
                />
                <i className="fa-regular fa-calendar" />
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="email">Correo</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ejemplo@ejemplo.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="password">Contraseña</label>
              <div className="field">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Escribe tu contraseña"
                  value={form.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  className="toggle"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  onClick={togglePassword}
                >
                  <i
                    className={
                      showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                    }
                  />
                </button>
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="passwordConfirmed">
                Confirme su contraseña
              </label>
              <input
                type="password"
                id="passwordConfirmed"
                name="passwordConfirmed"
                placeholder="Confirme su contraseña"
                value={form.passwordConfirmed}
                onChange={handleChange}
                minLength={6}
                required
              />
            </div>

            <button type="submit" className="btn-login">
              Registrarse
            </button>

            <div className="links">
              <Link to="/">¿Ya tienes cuenta?</Link>
              <a href="#">¿Necesitas ayuda?</a>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Register;
