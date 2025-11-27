import{useState} from "react";
import{useNavigate} from "react-router-dom";    
import { Link } from "react-router-dom";


function Login (){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const ok = email.trim().length > 5 && password.length >= 6;
        if(ok) {
            navigate("/home");
        } else {
            alert("Verifique el correo y la contraseña");
        }
    };

    return(
        <main className="login-wrap ">
            <div className="login-inner">
                
                <div className="login-brand">
                    <img src="BOOKSYNC LOGO 2.png" alt="Logo BOOKSYNC" />
                </div>

                <section className="login-card" role="dialog" aria-labelledby="titulo-login" aria-modal="true">

                    <div className="avatar">
                        <i className="fa-solid fa-user"/>
                    </div>
                    
                    <form id="login-form" onSubmit={handleSubmit} style={{ marginTop: "14px" }}>

                        <div className="form-row">
                            <label className="label" htmlFor="email">
                                Correo
                            </label>
                            <div className="field">
                                <input 
                                    id="email" 
                                    type="email" 
                                    placeholder="Escriba su correo" 
                                    required value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <label className="label" htmlFor="password">
                                Contraseña    
                            </label>
                            <div className="field">
                                <input 
                                    id="password" 
                                    type={showPw ? "text" : "password"} 
                                    placeholder="Escriba su contraseña" 
                                    required minLength={6} 
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                                <button 
                                    type="button" 
                                    className="toggle" 
                                    aria-label="Mostrar contraseña" 
                                    onClick={() => setShowPw((prev) => !prev)}>
                                    <i id="pw-icon" className={showPw? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}/>
                                </button>
                            </div>
                        </div>

                        <div className="captcha" aria-label="Verificación CAPTCHA simulada">
                            <span>No soy un robot</span>
                            <span className="box" aria-hidden="true" />
                        </div>

                        <div className="meta">
                            <label>
                                <input type="checkbox" /> Recuérdame
                            </label>
                            <button className="btn-login" type="submit">
                                Iniciar sesión
                            </button>
                        </div>

                        <div className="links">
                            <Link to="#">¿Olvidaste tu contraseña?</Link>
                            <Link to="/help">¿Necesitas ayuda?</Link>
                            <Link to="/register">¿No tienes cuenta?</Link>
                        </div>
                        
                    </form>
                </section>
            </div>
        </main>
    );
}

export default Login;