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

  const irChatUsuarios = () => {
    cerrarMenu();
    navigate("/chat-usuarios");
  };

  return (
    <header className="site-header">
      <div className="logo">EGIPTO</div>

      <button className="menu-btn" onClick={toggleMenu}>
        ☰ Menú
      </button>

      <nav className="side-menu">
        {/* 🔵 SIEMPRE DISPONIBLES */}
        <button onClick={() => navegarA("inicio")}>Inicio</button>
        <button onClick={() => navegarA("esfinge")}>Esfinge</button>
        <button onClick={() => navegarA("formularios")}>Formularios</button>

        {/* 🔒 SOLO SI ESTÁ LOGEADO */}
        {auth && (
          <>
            <button onClick={() => navegarA("audio")}>Audio</button>
            <button onClick={() => navegarA("videos")}>Vídeos</button>
            <button onClick={() => navegarA("galeria")}>Galería</button>
            <button onClick={() => navegarA("mapa")}>Mapa Interactivo</button>
            <button onClick={() => navegarA("minijuego")}>Minijuego</button>

            {/* 🟡 CHAT IA */}
            <button onClick={() => navegarA("ra")}>
              Lo que Ra disponga
            </button>

            {/* 🔵 CHAT USUARIOS */}
            <button onClick={irChatUsuarios}>
              Chat Usuarios
            </button>
          </>
        )}

        {/* 🔴 CERRAR SESIÓN */}
        {auth && (
          <button
            onClick={cerrarSesion}
            style={{ background: "#ff4a4a", color: "white" }}
          >
            Cerrar sesión
          </button>
        )}
      </nav>
    </header>
  );
}
