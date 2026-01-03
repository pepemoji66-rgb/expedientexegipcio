import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import AudioProvider from "./AudioProvider";
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
import "./forms.css";
import "./footer.css";
import "./titulo.css";

function AppContent() {
  const { auth } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const [seccionActiva, setSeccionActiva] = useState("inicio");
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

  // ESTADOS QUE VIENEN DE LA BASE DE DATOS
  const [imagenesGaleria, setImagenesGaleria] = useState([]);
  const [audios, setAudios] = useState([]);
  const [videos, setVideos] = useState([]);

  // 🏺 CARGA TOTAL DE LA BASE DE DATOS
  useEffect(() => {
    const cargarTodo = async () => {
      try {
        const [resV, resA, resI] = await Promise.all([
          axios.get("http://localhost:5000/api/videos"),
          axios.get("http://localhost:5000/api/audios"),
          axios.get("http://localhost:5000/api/imagenes")
        ]);

        setVideos(resV.data.map(v => ({ ...v, src: v.url, visible: true })));
        setAudios(resA.data.map(a => ({ ...a, src: a.url, visible: true })));
        setImagenesGaleria(resI.data.map(i => ({ ...i, src: i.url, visible: true })));
        
        console.log("🏺 Datos de Egipto sincronizados");
      } catch (e) {
        console.error("Error cargando el templo:", e);
      }
    };
    cargarTodo();
  }, []);

  useEffect(() => {
    const seccion = searchParams.get("seccion");
    setSeccionActiva(seccion || "inicio");
  }, [searchParams]);

  return (
    <AudioProvider>
      <div className="App">
        <Header setSeccionActiva={setSeccionActiva} />
        <AudioControl />
        <Routes>
          <Route path="/" element={
            <>
              <TituloPrincipal />
              {seccionActiva === "inicio" && <Home />}
              {seccionActiva === "esfinge" && <Esfinge />}
              {seccionActiva === "formularios" && <Forms setResultadosBusqueda={setResultadosBusqueda} />}
              {auth && seccionActiva === "galeria" && <Galeria imagenes={imagenesGaleria} />}
              {auth && seccionActiva === "audio" && <AudioSection audios={audios} />}
              {auth && seccionActiva === "videos" && <Videos videos={videos} />}
              {auth && seccionActiva === "mapa" && <MapaInteractivo setSeccionActiva={setSeccionActiva} />}
              {auth && seccionActiva === "minijuego" && <Minijuego />}
              {auth && seccionActiva === "ra" && <Ra />}
            </>
          } />
          <Route path="/admin" element={
            auth ? <AdminPage 
              imagenesGaleria={imagenesGaleria} setImagenesGaleria={setImagenesGaleria}
              audios={audios} setAudios={setAudios}
              videos={videos} setVideos={setVideos}
              resultadosBusqueda={resultadosBusqueda} 
            /> : <h2 style={{textAlign: "center"}}>Inicia sesión para administrar el Templo</h2>
          } />
          <Route path="/chat-usuarios" element={<ChatUsuarios setSeccionActiva={setSeccionActiva} />} />
        </Routes>
        <Footer />
      </div>
    </AudioProvider>
  );
}

export default function App() {
  return ( <BrowserRouter><AppContent /></BrowserRouter> );
}