import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../header.css";
import { AuthContext } from "../AuthContext";
import { ThemeContext } from "../ThemeContext";

export default function Header({ setSeccionActiva }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const { tema, setTema } = useContext(ThemeContext);
  const navigate = useNavigate();

  const hayUsuario = localStorage.getItem("user") !== null;
  const mostrarTodo = auth || hayUsuario;

  const navegarA = (seccion) => {
    setMenuAbierto(false);
    navigate("/");
    setSeccionActiva(seccion);
    window.scrollTo(0, 0);
  };

  const cerrarSesion = () => {
    setAuth(false);
    localStorage.removeItem("user");
    navegarA("inicio");
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo" onClick={() => navegarA("inicio")}>
          MISTERIOS DE EGIPTO
        </div>

        {/* BOTÓN HAMBURGUESA: Las tres rayitas */}
        <button
          className={`menu-hamburguesa ${menuAbierto ? "activo" : ""}`}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* MENÚ DE NAVEGACIÓN */}
        <nav className={`nav-menu ${menuAbierto ? "visible" : ""}`}>
          <button onClick={() => navegarA("inicio")}>INICIO</button>
          <button onClick={() => navegarA("esfinge")}>LA ESFINGE</button>
          
          {!mostrarTodo ? (
            <button onClick={() => navegarA("formularios")} className="nav-destacado-oro">ACCESO</button>
          ) : (
            <button onClick={cerrarSesion} className="btn-logout-header">CERRAR SESIÓN</button>
          )}

          {/* SECCIONES MULTIMEDIA */}
          <button onClick={() => navegarA("audio")}>AUDIO</button>
          <button onClick={() => navegarA("videos")}>VÍDEOS</button>
          <button onClick={() => navegarA("galeria")}>GALERÍA</button>

          {/* SECCIONES INTERACTIVAS */}
          <button onClick={() => navegarA("mapa")}>MAPA INTERACTIVO</button>
          <button onClick={() => navegarA("minijuego")}>MINIJUEGO</button>
          <button onClick={() => setSeccionActiva("vivo")} className="nav-destacado-vivo">
            𓇳 EGIPTO EN VIVO
          </button>

          {/* SECCIONES ESPECIALES */}
          <button onClick={() => navegarA("orion")} className="nav-destacado-azul">
            ✨ CINTURÓN DE ORIÓN
          </button>
          <button onClick={() => navegarA("ra")} className="nav-destacado-oro">
            ☀️ ORÁCULO DE RA
          </button>
          <button onClick={() => navegarA("chat")} className="nav-destacado-chat">
            💬 CHAT USUARIOS
          </button>

          {/* SELECTOR DE TEMA */}
          <div className="selector-tema-mini">
            <select value={tema} onChange={(e) => setTema(e.target.value)}>
              <option value="desierto">🏜️ DESIERTO</option>
              <option value="agua">🌊 NILO</option>
              <option value="faraon">🏛️ FARAÓN</option>
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
}