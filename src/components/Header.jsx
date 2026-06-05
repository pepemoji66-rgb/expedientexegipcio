import React, { useContext, useState, useEffect } from "react";
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

  useEffect(() => {
    const loadTranslate = () => {
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        const element = document.getElementById('google_translate_element');
        if (element && element.innerHTML === "") {
          new window.google.translate.TranslateElement({
            pageLanguage: 'es',
            includedLanguages: 'en,es,fr,de,it,pt',
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
          }, 'google_translate_element');
        }
      }
    };

    // Vigilar y reponer si desaparece o tarda en cargar
    const interval = setInterval(loadTranslate, 2000);
    const timeout = setTimeout(loadTranslate, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

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
          <button onClick={() => navegarA("misterios")}>MISTERIOS DE EGIPTO</button>
          <button onClick={() => setSeccionActiva("vivo")} className="nav-destacado-vivo">
            𓇳 EGIPTO EN VIVO
          </button>

          {/* SECCIONES ESPECIALES */}
          <button onClick={() => navegarA("expedientes")} className="nav-destacado-azul">
            📜 DOSIERES HISTÓRICOS
          </button>
          <button onClick={() => navegarA("ra")} className="nav-destacado-oro">
            ☀️ ORÁCULO DE RA
          </button>
          <button onClick={() => navegarA("chat")} className="nav-destacado-chat">
            💬 CHAT USUARIOS
          </button>

          {/* PANEL DE CONTROL (SOLO ADMINISTRADOR) */}
          {auth && (
            <button onClick={() => { setMenuAbierto(false); navigate("/admin"); }} className="nav-destacado-chat" style={{ background: "#c5a059", color: "#0f0f1a", border: "1px solid gold", fontWeight: "bold" }}>
              ⚙️ PANEL DE CONTROL
            </button>
          )}

          {/* SELECTOR DE TEMA */}
          <div className="selector-tema-mini">
            <select value={tema} onChange={(e) => setTema(e.target.value)}>
              <option value="desierto">🏜️ DESIERTO</option>
              <option value="agua">🌊 NILO</option>
              <option value="faraon">🏛️ FARAÓN</option>
            </select>
          </div>

          {/* TRADUCTOR MULTIIDIOMA */}
          <div className="traductor-header-box skiptranslate" style={{ margin: "5px 15px", display: "inline-block", verticalAlign: "middle" }}>
            <div id="google_translate_element"></div>
          </div>
        </nav>
      </div>
    </header>
  );
}