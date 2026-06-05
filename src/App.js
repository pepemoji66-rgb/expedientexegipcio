import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import AudioProvider from "./AudioProvider";

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
import Misterios from "./components/Misterios";
import Ra from "./components/Ra";
import Home from "./components/Home";
import ChatUsuarios from "./components/Chat/ChatUsuarios";
import EgiptoEnVivo from "./components/EgiptoEnVivo";
import Expedientes from "./components/Expedientes";
import Politicas from "./components/Politicas";
import Contacto from "./components/Contacto";

// IMPORTA TU ADMIN PAGE AQUÍ (Asegúrate de que la ruta sea correcta)
import AdminPage from "./AdminPage";

// CSS
import "./base.css";
import "./buttons.css";
import "./header.css";
import "./hero.css";
import "./videos.css";
import "./forms.css";
import "./footer.css";
import "./titulo.css";

function AppContent() {
  const { auth } = useContext(AuthContext);
  const { tema } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const [seccionActiva, setSeccionActiva] = useState("inicio");
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

  const [imagenesGaleria, setImagenesGaleria] = useState([]);
  const [audios, setAudios] = useState([]);
  const [videos, setVideos] = useState([]);

  const tienePermiso = auth || localStorage.getItem("user") !== null;

  useEffect(() => {
    const cargarTodo = async () => {
      try {
        const baseURL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") 
          ? "http://localhost:5000" 
          : "";
        const [resV, resA, resI] = await Promise.all([
          axios.get(`${baseURL}/api/videos`),
          axios.get(`${baseURL}/api/audios`),
          axios.get(`${baseURL}/api/imagenes`)
        ]);

        setVideos(resV.data.map(v => ({ ...v, src: v.url, visible: true })));
        setAudios(resA.data.map(a => ({ ...a, src: a.url, visible: true })));
        setImagenesGaleria(resI.data.map(i => ({
          ...i, src: i.url,
          visible: i.visible === 1 || i.visible === true || i.visible === undefined,
          descripcion: i.descripcion || "", latitud: i.latitud, longitud: i.longitud
        })));
      } catch (e) {
        console.error("Error cargando el templo:", e);
      }
    };
    cargarTodo();
  }, []);

  useEffect(() => {
    const seccion = searchParams.get("seccion");
    if (seccion) setSeccionActiva(seccion);
  }, [searchParams]);

  return (
    <div className={`App theme-${tema}`}>
      <div className="estrella-fugaz"></div>

      <Header setSeccionActiva={setSeccionActiva} />
      <AudioControl />

      <main className="content-wrapper">
        <Routes>
          {/* RUTA PRINCIPAL */}
          <Route path="/" element={
            <>
              <TituloPrincipal />
              {seccionActiva === "inicio" && <Home setSeccionActiva={setSeccionActiva} />}
              {seccionActiva === "esfinge" && <Esfinge />}
              {seccionActiva === "formularios" && <Forms setResultadosBusqueda={setResultadosBusqueda} />}

              {/* SECCIONES PÚBLICAS Y LIBRES */}
              {seccionActiva === "galeria" && <Galeria imagenes={imagenesGaleria} setSeccionActiva={setSeccionActiva} />}
              {seccionActiva === "audio" && <AudioSection audios={audios} />}
              {seccionActiva === "videos" && <Videos videos={videos} />}
              {seccionActiva === "mapa" && <MapaInteractivo setSeccionActiva={setSeccionActiva} imagenes={imagenesGaleria} />}
              {seccionActiva === "misterios" && <Misterios />}
              {seccionActiva === "ra" && <Ra />}
              {seccionActiva === "vivo" && <EgiptoEnVivo />}
              {seccionActiva === "expedientes" && <Expedientes />}

              {/* SECCIONES ADSENSE */}
              {seccionActiva === "privacidad" && <Politicas tipo="privacidad" />}
              {seccionActiva === "terminos" && <Politicas tipo="terminos" />}
              {seccionActiva === "contacto" && <Contacto />}

              {/* SECCIONES PROTEGIDAS (REQUIEREN REGISTRO SIMPLIFICADO) */}
              {tienePermiso && (
                <>
                  {seccionActiva === "chat" && <ChatUsuarios setSeccionActiva={setSeccionActiva} />}
                </>
              )}
            </>
          } />

          {/* RUTA DEL ADMINISTRADOR (¡ESTA FALTABA!) */}
          <Route path="/admin" element={
            <AdminPage
              imagenesGaleria={imagenesGaleria}
              setImagenesGaleria={setImagenesGaleria}
              audios={audios}
              setAudios={setAudios}
              videos={videos}
              setVideos={setVideos}
              resultadosBusqueda={resultadosBusqueda}
              setResultadosBusqueda={setResultadosBusqueda}
            />
          } />

        </Routes>
      </main>
      <Footer setSeccionActiva={setSeccionActiva} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AudioProvider>
          <AppContent />
        </AudioProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}