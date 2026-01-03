import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../header.css";
import { AuthContext } from "../AuthContext";

export default function Header({ setSeccionActiva }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    const nuevoEstado = !menuAbierto;
    setMenuAbierto(nuevoEstado);
    document.body.classList.toggle("menu-abierto", nuevoEstado);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
    document.body.classList.remove("menu-abierto");
  };

  const navegarA = (seccion) => {
    setSeccionActiva(seccion);
    cerrarMenu();
  };

  const cerrarSesion = () => {
    setAuth(false);
    navegarA("inicio");
  };

  return (
    <header className="site-header">
      <div className="logo">EGIPTO</div>

      <button className="menu-btn" onClick={toggleMenu}>
        ☰ Menú
      </button>

      {menuAbierto && <div className="menu-overlay" onClick={cerrarMenu}></div>}

      <nav className="side-menu">
        <button onClick={() => navegarA("inicio")}>Inicio</button>
        <button onClick={() => navegarA("esfinge")}>Esfinge</button>
        <button onClick={() => navegarA("formularios")}>Formularios</button>

        {auth && (
          <>
            <button onClick={() => navegarA("audio")}>Audio</button>
            <button onClick={() => navegarA("videos")}>Vídeos</button>
            <button onClick={() => navegarA("galeria")}>Galería</button>
            <button onClick={() => navegarA("mapa")}>Mapa Interactivo</button>
            <button onClick={() => navegarA("minijuego")}>Minijuego</button>
            <button onClick={() => navegarA("ra")}>Lo que Ra disponga</button>
            <button onClick={() => navigate("/chat-usuarios")}>Chat Usuarios</button>
            <button onClick={cerrarSesion} className="btn-logout">Cerrar sesión</button>
          </>
        )}
      </nav>
    </header>
  );
}