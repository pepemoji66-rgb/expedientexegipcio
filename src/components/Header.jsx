import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../header.css";
import { AuthContext } from "../AuthContext";

export default function Header({ setSeccionActiva }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  // ESTA LÍNEA ES LA MAGIA: Mira si entró como Pepe O como Invitado
  const hayUsuario = localStorage.getItem("user") !== null;
  const mostrarTodo = auth || hayUsuario;

  const navegarA = (seccion) => {
    setSeccionActiva(seccion);
    setMenuAbierto(false);
    document.body.classList.remove("menu-abierto");
    window.scrollTo(0, 0); 
  };

  const cerrarSesion = () => {
    setAuth(false);
    localStorage.removeItem("user");
    navegarA("inicio");
  };

  return (
    <header className="site-header">
      <div className="logo" onClick={() => navegarA("inicio")}>EGIPTO</div>
      <button className="menu-btn" onClick={() => setMenuAbierto(!menuAbierto)}>
        {menuAbierto ? "✖" : "☰ Menú"}
      </button>

      <nav className={`side-menu ${menuAbierto ? "abierto" : ""}`}>
        <button onClick={() => navegarA("inicio")}>Inicio</button>
        <button onClick={() => navegarA("esfinge")}>Esfinge</button>
        <button onClick={() => navegarA("formularios")}>Acceso</button>

        {/* SI ESTÁ LOGUEADO, SE ABRE EL TEMPLO */}
        {mostrarTodo && (
          <>
            <button onClick={() => navegarA("audio")}>Audio</button>
            <button onClick={() => navegarA("videos")}>Vídeos</button>
            <button onClick={() => navegarA("galeria")}>Galería</button>
            <button onClick={() => navegarA("mapa")}>Mapa</button>
            <button onClick={() => navegarA("minijuego")}>Minijuego</button>
            <button onClick={cerrarSesion} className="btn-logout">Cerrar Sesión</button>
          </>
        )}
      </nav>
    </header>
  );
}