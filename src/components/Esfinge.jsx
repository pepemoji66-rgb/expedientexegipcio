import React, { useState, useEffect } from "react";
import api from "../api";
import "./esfinge.css";

export default function Esfinge() {
  const [mostrarTexto, setMostrarTexto] = useState(false);
  const [mostrarNoticias, setMostrarNoticias] = useState(false);
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const traerNoticias = async () => {
      try {
        const res = await api.get("/noticias");
        setNoticias(res.data);
      } catch (error) {
        console.error("Error al pedir noticias:", error);
      }
    };
    traerNoticias();
  }, []);

  const algunDesplegableAbierto = mostrarTexto || mostrarNoticias;

  return (
    <div className="esfinge-gran-contenedor">
      <header className="esfinge-header">
        <div className="linea-dorada"></div>
        <h2 className="esfinge-titulo">La Cámara de la Esfinge</h2>
        <div className="linea-dorada"></div>
      </header>

      {/* Introducción mística para que la página no se vea vacía al cargar */}
      <div className="esfinge-introduccion-box" style={{ maxWidth: "800px", margin: "20px auto", padding: "20px", background: "rgba(15, 15, 26, 0.7)", border: "1px solid rgba(197, 160, 89, 0.3)", borderRadius: "10px", textAlign: "center", backdropFilter: "blur(5px)" }}>
        <p style={{ color: "#f4e6b2", fontSize: "1.1rem", lineHeight: "1.7", fontStyle: "italic" }}>
          "Custodiando los secretos eternos de la meseta de Giza, la Gran Esfinge se erige como el monumento tallado en piedra más colosal y enigmático de la Tierra. Un guardián silencioso envuelto en debates geológicos, cámaras secretas ocultas bajo la arena y profecías sobre el origen de nuestra civilización."
        </p>
      </div>

      <div className="esfinge-layout-superior">
        {!algunDesplegableAbierto && (
          <aside className="esfinge-poema">
            <span className="poema-verso">Guardián del sol,</span>
            <span className="poema-verso">silencio de arena,</span>
            <span className="poema-verso">tu mirada de piedra</span>
            <span className="poema-verso">el tiempo encadena.</span>
            <br />
            <span className="poema-verso">Enigma eterno</span>
            <span className="poema-verso">bajo el cielo de Nut.</span>
          </aside>
        )}

        <div className="esfinge-imagen-contenedor">
          <img
            src="/imagenes/esfinge.jpg"
            alt="Esfinge"
            className={`esfinge-imagen ${algunDesplegableAbierto ? 'imagen-peque' : ''}`}
          />
        </div>
      </div>

      <div className="controles-esfinge">
        <button
          className={`btn-cartucho ${mostrarTexto ? "activo" : ""}`}
          onClick={() => { setMostrarTexto(!mostrarTexto); setMostrarNoticias(false); }}
        >
          <span className="icono-egipcio">𓂀</span> {mostrarTexto ? "CERRAR HISTORIA" : "REVELAR HISTORIA"}
        </button>

        <button
          className={`btn-cartucho ${mostrarNoticias ? "activo" : ""}`}
          onClick={() => { setMostrarNoticias(!mostrarNoticias); setMostrarTexto(false); }}
        >
          <span className="icono-egipcio">📜</span> {mostrarNoticias ? "CERRAR NOTICIAS" : "LEER NOTICIAS"}
        </button>
      </div>

      {algunDesplegableAbierto && (
        <div className="papiro-texto-animado">
          <div className="esfinge-texto-contenido">

            {/* SECCIÓN DE HISTORIA (TEXTO ENRIQUECIDO Y LARGO) */}
            {mostrarTexto && (
              <div className="contenido-historia">
                <h2 className="titulo-papiro-interno">El Guardián del Horizonte: Secretos Revelados</h2>

                <p className="texto-noticia-papiro">
                  Conocida en la antigüedad como <strong>"Hor-em-akhet"</strong> (Horus en el Horizonte), la Gran Esfinge de Giza es uno de los legados más intrigantes del mundo antiguo. Tallada directamente sobre el lecho de roca caliza de la meseta, esta colosal escultura combina el cuerpo de un león (símbolo de fuerza y poder real) con la cabeza de un faraón, tradicionalmente atribuida a <strong>Kefrén</strong> (alrededor del 2500 a.C.).
                </p>
                <br />
                
                <h3 style={{ color: "#5d4037", fontSize: "1.3rem", fontWeight: "bold", margin: "15px 0 5px 0" }}>El Enigma de la Erosión Hídrica</h3>
                <p className="texto-noticia-papiro">
                  La datación oficial sitúa la Esfinge en el Imperio Antiguo, pero diversos geólogos, liderados por Robert Schoch, han argumentado que las profundas marcas de erosión vertical en el cuerpo de la Esfinge y sus muros circundantes fueron causadas por <strong>lluvias intensas y persistentes</strong>. Dado que el clima de Giza ha sido desértico desde hace al menos 5,000 años, esta teoría sugiere que el monumento original fue tallado miles de años antes, quizás en el 7000 a.C. o el 10000 a.C., durante el periodo húmedo del Neolítico.
                </p>
                <br />

                <h3 style={{ color: "#5d4037", fontSize: "1.3rem", fontWeight: "bold", margin: "15px 0 5px 0" }}>La Estela del Sueño de Tutmosis IV</h3>
                <p className="texto-noticia-papiro">
                  Durante siglos, la Esfinge permaneció enterrada bajo las arenas del desierto hasta los hombros. La famosa **Estela del Sueño**, erigida entre sus garras delanteras, narra cómo el joven príncipe Tutmosis se quedó dormido bajo su sombra tras una jornada de caza. La Esfinge se le apareció en sueños prometiéndole la corona de Egipto si retiraba la arena que asfixiaba su cuerpo. Al despertar, Tutmosis inició las excavaciones, se convirtió en faraón y conmemoró el pacto con la estela de granito que aún hoy puede contemplarse.
                </p>
                <br />

                <h3 style={{ color: "#5d4037", fontSize: "1.3rem", fontWeight: "bold", margin: "15px 0 5px 0" }}>La Sala de los Registros Oculta</h3>
                <p className="texto-noticia-papiro">
                  Diversos sondeos sísmicos y radares de penetración terrestre han detectado la presencia de **grandes cavidades y anomalías artificiales** debajo de la meseta de Giza. Una de las cámaras subterráneas más famosas, según las profecías del místico Edgar Cayce y diversos estudios geofísicos, se localizaría exactamente debajo de la garra derecha de la Esfinge. Se especula que esta "Sala de los Registros" albergaría los conocimientos y archivos perdidos de una civilización antediluviana preexistente.
                </p>
              </div>
            )}

            {/* SECCIÓN DE NOTICIAS */}
            {mostrarNoticias && (
              <div className="contenido-noticias">
                <h2 className="titulo-papiro-interno">Crónicas de Egipto</h2>
                {noticias.length > 0 ? (
                  noticias.map((n) => (
                    <div key={n.id} className="noticia-item-papiro" style={{ borderBottom: "1px dashed #5d4037", paddingBottom: "20px", marginBottom: "20px" }}>
                      <h3 className="titulo-noticia-dorado" style={{ color: "#8b5a2b", textAlign: "left", fontSize: "1.3rem" }}>{n.titulo}</h3>
                      {n.fecha && <span style={{ fontSize: "0.8rem", color: "#6d4c41", display: "block", marginBottom: "5px" }}>📅 Publicado: {new Date(n.fecha).toLocaleDateString()}</span>}
                      {n.url_imagen && <img src={n.url_imagen} alt={n.titulo} style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "5px", margin: "10px 0" }} />}
                      <p className="texto-noticia-papiro" style={{ textAlign: "justify" }}>{n.resumen}</p>
                      <div style={{ textAlign: "right", marginTop: "10px" }}>
                        <a href={n.url_enlace} target="_blank" rel="noreferrer" className="link-egipcio-visible" style={{ fontWeight: "bold", color: "#5d4037" }}>
                          LEER CRÓNICA COMPLETA →
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="texto-noticia-papiro" style={{ textAlign: "center" }}>Sin noticias en la arena...</p>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      <div className="divisor-seccion">
        <span className="rombo-dorado"></span>
      </div>
    </div>
  );
}