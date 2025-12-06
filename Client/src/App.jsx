import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Home from "./pages/dashboard/Home.jsx";
import Detalle from "./pages/dashboard/Detalle.jsx";
import Help from "./pages/auth/Help.jsx";
import Forgot from "./pages/auth/ForgotEmailSent.jsx";
import Reset from "./pages/auth/ResetPassword.jsx";
import ReservasUsuario from "./pages/dashboard/ReservasUsuario.jsx";
import PrestamosUsuarios from "./pages/dashboard/PrestamosUsuarios.jsx";
import Favorites from "./pages/dashboard/Favorites.jsx";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Help" element={<Help />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/Reset" element={<Reset />} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Detalle/:id" element={<Detalle />} />
        <Route path="/Reservas" element={<ReservasUsuario />} />
        <Route path="/Prestamos" element={<PrestamosUsuarios />} />
        <Route path="/Favoritos" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
