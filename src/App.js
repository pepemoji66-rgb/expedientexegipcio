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

  // 🔑 ESTADO COMPARTIDO DE LA GALERÍA (MOCK)
  const [imagenesGaleria, setImagenesGaleria] = useState([
  { id: 1, src: "/imagenes/1.avif", titulo: "Imagen 1", orden: 1, visible: true },
  { id: 2, src: "/imagenes/2.avif", titulo: "Imagen 2", orden: 2, visible: true },
  { id: 3, src: "/imagenes/3.avif", titulo: "Imagen 3", orden: 3, visible: true },
  { id: 4, src: "/imagenes/4.avif", titulo: "Imagen 4", orden: 4, visible: true },
  { id: 5, src: "/imagenes/5.avif", titulo: "Imagen 5", orden: 5, visible: true },
  { id: 6, src: "/imagenes/6.avif", titulo: "Imagen 6", orden: 6, visible: true },
  { id: 7, src: "/imagenes/7.avif", titulo: "Imagen 7", orden: 7, visible: true },
  { id: 8, src: "/imagenes/8.avif", titulo: "Imagen 8", orden: 8, visible: true },
  { id: 9, src: "/imagenes/9.avif", titulo: "Imagen 9", orden: 9, visible: true },
  { id: 10, src: "/imagenes/10.avif", titulo: "Imagen 10", orden: 10, visible: true },
  { id: 11, src: "/imagenes/11.avif", titulo: "Imagen 11", orden: 11, visible: true },
  { id: 12, src: "/imagenes/12.avif", titulo: "Imagen 12", orden: 12, visible: true },
  { id: 13, src: "/imagenes/14.avif", titulo: "Imagen 13", orden: 13, visible: true },
  { id: 14, src: "/imagenes/15.avif", titulo: "Imagen 14", orden: 14, visible: true },
  { id: 15, src: "/imagenes/esfinge.jpg", titulo: "Esfinge", orden: 15, visible: true }
]);


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
              {/* HOME / SECCIONES */}
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

                    {auth && seccionActiva === "galeria" && (
                      <Galeria
                        imagenes={imagenesGaleria
                          .filter(img => img.visible)
                          .sort((a, b) => a.orden - b.orden)}
                      />
                    )}

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
                    <AdminPage
                      usuariosFiltrados={usuariosFiltrados}
                      imagenesGaleria={imagenesGaleria}
                      setImagenesGaleria={setImagenesGaleria}
                    />
                  ) : (
                    <h2 style={{ textAlign: "center" }}>
                      Debes iniciar sesión para ver esta página.
                    </h2>
                  )
                }
              />

              {/* CHAT */}
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
