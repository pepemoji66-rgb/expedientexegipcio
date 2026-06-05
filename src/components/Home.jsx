import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../AuthContext";
import Hero from "./Hero";

export default function Home({ setSeccionActiva }) {
  const { auth } = useContext(AuthContext); 
  const [contenido, setContenido] = useState({});
  const [form, setForm] = useState({});
  const [editando, setEditando] = useState(false);
  const [activePyramid, setActivePyramid] = useState("keops");

  useEffect(() => {
    api.get("/contenido-inicio")
      .then((res) => {
        setContenido(res.data);
        setForm(res.data);
      })
      .catch(() => console.error("Error cargando contenido"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
    try {
      for (const clave in form) {
        await api.post("/contenido-inicio", 
          { [clave]: form[clave] },
          { headers: { "x-admin": "true" } }
        );
      }
      setContenido(form);
      setEditando(false);
      alert("Templo actualizado, Faraón");
    } catch (error) {
      alert("Error al guardar");
    }
  };

  const navegarA = (seccion) => {
    setSeccionActiva(seccion);
    window.scrollTo(0, 0);
  };

  const pyramidsData = {
    keops: {
      title: "Gran Pirámide de Keops (Jufu)",
      desc: "Con sus 146.6 metros de altura original, la Gran Pirámide es una maravilla de la ingeniería antigua. Compuesta por más de 2.3 millones de bloques de piedra de hasta 60 toneladas cada uno, su alineación perfecta con los cuatro puntos cardinales y con las estrellas del Cinturón de Orión sigue desconcertando a arqueólogos y astrónomos de todo el mundo."
    },
    kefren: {
      title: "Pirámide de Kefrén (Jafra)",
      desc: "Situada al lado de la de Keops, parece más alta debido a que está construida sobre una elevación natural de la meseta y tiene un ángulo más inclinado. Es la única pirámide de Giza que conserva su revestimiento original de piedra caliza pulida en la cúspide. Está custodiada en su base por el templo del valle y la Gran Esfinge."
    },
    micerino: {
      title: "Pirámide de Micerino (Menkaura)",
      desc: "La menor de las tres pirámides principales, con una altura de 65 metros. Aunque es de menor escala, destaca porque la parte inferior de su revestimiento fue construida con granito rojo traído desde las canteras de Asuán, a más de 800 kilómetros de distancia. Presenta una enorme brecha en su cara norte, vestigio de un intento medieval por desmantelarla."
    }
  };

  return (
    <div className="home-main-container">
      <Hero
        contenido={contenido}
        form={form}
        editando={editando}
        onChange={handleChange}
      />

      {/* 📊 SECCIÓN: EL TEMPLO EN CIFRAS (DASHBOARD) */}
      <section className="home-dashboard-section">
        <h2 className="seccion-subtitulo">EL TEMPLO EN CIFRAS</h2>
        <p className="seccion-descripcion">
          Los registros de exploración y las herramientas del Faraón recopiladas para tu inmersión.
        </p>
        <div className="home-dashboard-grid">
          <div className="dashboard-card">
            <div className="dashboard-icon">🛸</div>
            <div className="dashboard-number">7</div>
            <div className="dashboard-label">Drones en Vivo</div>
            <div className="dashboard-desc">Sobrevuelos interactivos y vistas de 360° en tiempo real.</div>
          </div>
          <div className="dashboard-card">
            <div className="dashboard-icon">𓂀</div>
            <div className="dashboard-number">10</div>
            <div className="dashboard-label">Cámaras Fotográficas</div>
            <div className="dashboard-desc">Registros geolocalizados integrados en el mapa del desierto.</div>
          </div>
          <div className="dashboard-card">
            <div className="dashboard-icon">📜</div>
            <div className="dashboard-number">2</div>
            <div className="dashboard-label">Crónicas Activas</div>
            <div className="dashboard-desc">Últimos descubrimientos arqueológicos y noticias.</div>
          </div>
          <div className="dashboard-card">
            <div className="dashboard-icon">🪐</div>
            <div className="dashboard-number">3</div>
            <div className="dashboard-label">Estrellas alineadas</div>
            <div className="dashboard-desc">Conexión exacta entre las pirámides y Orión.</div>
          </div>
        </div>
      </section>

      {/* ⛰️ SECCIÓN: DETALLES DE LAS PIRÁMIDES */}
      <section className="home-piramides-section">
        <div className="piramides-tabs-container">
          <h2 className="seccion-subtitulo">ARQUITECTURA ANCESTRAL</h2>
          <p className="seccion-descripcion" style={{ color: '#ffffff' }}>
            Selecciona una de las pirámides sagradas de la meseta de Giza para revelar sus secretos de construcción.
          </p>

          <div className="tab-buttons-row">
            <button 
              className={`btn-tab-cartucho ${activePyramid === "keops" ? "activo" : ""}`}
              onClick={() => setActivePyramid("keops")}
            >
              𓂀 KEOPS
            </button>
            <button 
              className={`btn-tab-cartucho ${activePyramid === "kefren" ? "activo" : ""}`}
              onClick={() => setActivePyramid("kefren")}
            >
              𓂀 KEFRÉN
            </button>
            <button 
              className={`btn-tab-cartucho ${activePyramid === "micerino" ? "activo" : ""}`}
              onClick={() => setActivePyramid("micerino")}
            >
              𓂀 MICERINO
            </button>
          </div>

          <div className="papiro-tab-content">
            <h3 className="papiro-title">{pyramidsData[activePyramid].title}</h3>
            <p className="papiro-text">{pyramidsData[activePyramid].desc}</p>
          </div>
        </div>
      </section>

      {/* ⏳ SECCIÓN: LÍNEA DE TIEMPO INTERACTIVA */}
      <section className="home-timeline-section">
        <h2 className="seccion-subtitulo">CRONOLOGÍA DE LA ARENA</h2>
        <p className="seccion-descripcion">
          El transcurso de los milenios sobre el Templo y el horizonte egipcio.
        </p>

        <div className="timeline-vertical">
          <div className="timeline-item">
            <div className="timeline-node"></div>
            <div className="timeline-content-card">
              <div className="timeline-year">2560 a.C.</div>
              <h3 className="timeline-title">El Despertar de la Gran Pirámide</h3>
              <p className="timeline-desc">
                Se culmina la construcción de la pirámide de Keops tras más de 20 años de esfuerzos, convirtiéndose en el monumento más alto del planeta durante casi 4,000 años.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-node"></div>
            <div className="timeline-content-card">
              <div className="timeline-year">2500 a.C.</div>
              <h3 className="timeline-title">El Guardián del Horizonte</h3>
              <p className="timeline-desc">
                Bajo las órdenes de Kefrén, se esculpe la Gran Esfinge sobre un único bloque monolítico calizo para proteger los accesos al valle de las pirámides.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-node"></div>
            <div className="timeline-content-card">
              <div className="timeline-year">1999 d.C.</div>
              <h3 className="timeline-title">Teoría de la Correlación Estelar</h3>
              <p className="timeline-desc">
                Estudios astronómicos populares demuestran la precisa coincidencia de ubicación entre las tres pirámides y las estrellas Alnitak, Alnilam y Mintaka.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-node"></div>
            <div className="timeline-content-card">
              <div className="timeline-year">Hoy</div>
              <h3 className="timeline-title">Tu Exploración en Vivo</h3>
              <p className="timeline-desc">
                Tomas el control del Templo interactivo para volar drones en 360°, geolocalizar imágenes en el mapa y chatear con el oráculo ancestral de Ra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🗺️ SECCIÓN: ACCESOS DIRECTOS DINÁMICOS */}
      <section className="home-explore-section">
        <h2 className="seccion-subtitulo">INGRESA AL TEMPLO</h2>
        <p className="seccion-descripcion">
          Haz clic en cualquiera de las cámaras interactivas para comenzar tu exploración arqueológica.
        </p>

        <div className="explore-grid">
          <div className="explore-card" onClick={() => navegarA("vivo")}>
            <div>
              <h3 className="explore-title">🛸 EGIPTO EN VIVO</h3>
              <p className="explore-desc">
                Vuela en tiempo real y controla cámaras 360° sobre monumentos ancestrales como Luxor, la Esfinge y Alejandría.
              </p>
            </div>
            <button className="explore-btn">VOLAR DRON</button>
          </div>

          <div className="explore-card" onClick={() => navegarA("ra")}>
            <div>
              <h3 className="explore-title">☀️ ORÁCULO DE RA</h3>
              <p className="explore-desc">
                Consulta los antiguos enigmas de la arena entablando una conversación interactiva con la IA de Ra.
              </p>
            </div>
            <button className="explore-btn">HABLAR CON RA</button>
          </div>

          <div className="explore-card" onClick={() => navegarA("mapa")}>
            <div>
              <h3 className="explore-title">🗺️ MAPA INTERACTIVO</h3>
              <p className="explore-desc">
                Visualiza los puntos de interés geolocalizados de la meseta y descubre sus galerías secretas.
              </p>
            </div>
            <button className="explore-btn">ABRIR MAPA</button>
          </div>
        </div>
      </section>

      {/* 🔒 SEGURIDAD: Solo el admin ve esto */}
      {auth && (
        <div className="admin-zone" style={{ padding: "40px", textAlign: "center" }}>
          {!editando ? (
            <button className="btn-admin-gold" onClick={() => setEditando(true)}>
              ✏️ EDITAR TEXTOS DE INICIO
            </button>
          ) : (
            <div className="admin-actions" style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "15px" }}>
              <button className="btn-save" onClick={guardarCambios}>💾 GUARDAR</button>
              <button className="btn-cancel" onClick={() => setEditando(false)}>❌ CANCELAR</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}