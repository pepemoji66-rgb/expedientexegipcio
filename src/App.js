import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTH
import { AuthContext } from "./AuthContext";

// AUDIO PROVIDER
import AudioProvider from "./AudioProvider";

// PÁGINAS
import AdminPage from "./AdminPage";

// COMPONENTES
import Header from "./components/Header";
import AudioControl from "./components/AudioControl";
import AudioSection from "./components/AudioSection";
import TituloPrincipal from "./components/TituloPrincipal";
import Videos from "./components/Videos";
import Galeria from "./components/Galeria";
import Forms from "./components/Forms";
import Footer from "./components/Footer";
import MapaInteractivo from "./components/MapaInteractivo";
import Esfinge from "./components/Esfinge";
import Minijuego from "./components/Minijuego";
import Ra from "./components/Ra";
import Home from "./components/Home";

import ChatUsuarios from "./components/Chat/ChatUsuarios";

// CSS
import "./base.css";
import "./buttons.css";
import "./header.css";
import "./hero.css";
import "./videos.css";
import "./galeria.css";
import "./forms.css";
import "./footer.css";
import "./titulo.css";

function App() {
  const [seccionActiva, setSeccionActiva] = useState("inicio");
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const estrella = document.querySelector(".estrella-fugaz");

    function lanzarEstrella() {
      if (!estrella) return;

      estrella.style.animation = "none";
      setTimeout(() => {
        estrella.style.animation = "";
      }, 50);

      const siguiente = Math.random() * 15000 + 10000;
      setTimeout(lanzarEstrella, siguiente);
    }

    lanzarEstrella();
  }, []);

  return (
    <BrowserRouter>
      <AudioProvider>
        <div className="App">
          <div className="arena-particles"></div>
          <div className="estrella-fugaz"></div>

          {/* MENÚ */}
          <Header setSeccionActiva={setSeccionActiva} />

          {/* BOTÓN MÚSICA */}
          <AudioControl />

          <div id="contenido-principal">
            <Routes>
              {/* HOME */}
              <Route
                path="/"
                element={
                  <>
                    <TituloPrincipal />

                    {seccionActiva === "inicio" && <Home />}
                    {seccionActiva === "esfinge" && <Esfinge />}

                    {seccionActiva === "formularios" && (
                      <Forms setResultadosBusqueda={setUsuariosFiltrados} />
                    )}

                    {auth && seccionActiva === "audio" && <AudioSection />}
                    {auth && seccionActiva === "videos" && <Videos />}
                    {auth && seccionActiva === "galeria" && <Galeria />}
                    {auth && seccionActiva === "mapa" && (
                      <MapaInteractivo setSeccionActiva={setSeccionActiva} />
                    )}
                    {auth && seccionActiva === "minijuego" && <Minijuego />}
                    {auth && seccionActiva === "ra" && <Ra />}
                  </>
                }
              />

              {/* ADMIN */}
              <Route
                path="/admin"
                element={
                  auth ? (
                    <AdminPage usuariosFiltrados={usuariosFiltrados} />
                  ) : (
                    <h2 style={{ textAlign: "center" }}>
                      Debes iniciar sesión para ver esta página.
                    </h2>
                  )
                }
              />

              {/* CHAT USUARIOS */}
              <Route path="/chat-usuarios" element={<ChatUsuarios />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </AudioProvider>
    </BrowserRouter>
  );
}

export default App;
