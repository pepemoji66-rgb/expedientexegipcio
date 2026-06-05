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
          <span className="icono-egipcio">𓂀</span> {mostrarTexto ? "CERRAR" : "HISTORIA"}
        </button>

        <button
          className={`btn-cartucho ${mostrarNoticias ? "activo" : ""}`}
          onClick={() => { setMostrarNoticias(!mostrarNoticias); setMostrarTexto(false); }}
        >
          <span className="icono-egipcio">📜</span> {mostrarNoticias ? "CERRAR" : "NOTICIAS"}
        </button>
      </div>

      {algunDesplegableAbierto && (
        <div className="papiro-texto-animado">
          <div className="esfinge-texto-contenido">

            {/* SECCIÓN DE HISTORIA (TEXTO LARGO) */}
            {mostrarTexto && (
              <div className="contenido-historia">
                <h2 className="titulo-papiro-interno">El Guardián del Horizonte</h2>

                <p className="texto-noticia-papiro">
                  Conocida en la antigüedad como <strong>"Hor-em-akhet"</strong> (Horus en el Horizonte), la Gran Esfinge de Giza es una de las maravillas más enigmáticas del mundo antiguo. Tallada directamente sobre un enorme bloque de roca caliza, esta figura con cuerpo de león y rostro humano ha observado el paso de los milenios en silencio.
                </p>
                <br />
                <p className="texto-noticia-papiro">
                  Se cree que fue mandada esculpir por el faraón <strong>Kefrén</strong> alrededor del año 2500 a.C. Su rostro representa la sabiduría divina, mientras que el cuerpo del león simboliza el poder real que protege las pirámides de cualquier profanación.
                </p>
                <br />
                <p className="texto-noticia-papiro">
                  Sin embargo, la Esfinge guarda secretos que la ciencia aún debate. Las marcas de erosión sugieren que pudo ser expuesta a lluvias intensas miles de años antes de lo previsto. Las leyendas hablan de la <strong>"Sala de los Registros"</strong> oculta bajo su garra derecha, esperando ser descubierta.
                </p>
              </div>
            )}

            {/* SECCIÓN DE NOTICIAS */}
            {mostrarNoticias && (
              <div className="contenido-noticias">
                <h2 className="titulo-papiro-interno">Crónicas de Egipto</h2>
                {noticias.length > 0 ? (
                  noticias.map((n) => (
                    <div key={n.id} className="noticia-item-papiro">
                      <h3 className="titulo-noticia-dorado">{n.titulo}</h3>
                      <p className="texto-noticia-papiro">{n.resumen}</p>
                      <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <a href={n.url_enlace} target="_blank" rel="noreferrer" className="link-egipcio-visible">
                          LEER CRÓNICA COMPLETA →
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="texto-noticia-papiro">Sin noticias en la arena...</p>
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