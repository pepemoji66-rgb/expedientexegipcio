import React, { useState, useEffect } from "react";
import axios from "axios";
import "./esfinge.css";

export default function Esfinge() {
  const [mostrarTexto, setMostrarTexto] = useState(false);
  const [mostrarNoticias, setMostrarNoticias] = useState(false);
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const traerNoticias = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/noticias");
        setNoticias(res.data);
      } catch (error) {
        console.error("Error al pedir noticias:", error);
      }
    };
    traerNoticias();
  }, []);

  return (
    <div className="esfinge-gran-contenedor">
      <header className="esfinge-header">
        <div className="linea-dorada"></div>
        <h2 className="esfinge-titulo">La Cámara de la Esfinge</h2>
        <div className="linea-dorada"></div>
      </header>

      <div className="templo-marco">
        <div className="esfinge-imagen-contenedor">
          <img 
            src="/imagenes/esfinge.jpg" 
            alt="Esfinge" 
            className={`esfinge-imagen ${(mostrarTexto || mostrarNoticias) ? 'imagen-peque' : ''}`} 
          />
        </div>
      </div>

      <div className="controles-esfinge">
        <button className={`btn-cartucho ${mostrarTexto ? "activo" : ""}`} 
          onClick={() => { setMostrarTexto(!mostrarTexto); setMostrarNoticias(false); }}>
          <span className="icono-egipcio">𓂀</span> {mostrarTexto ? "CERRAR" : "HISTORIA"}
        </button>

        <button className={`btn-cartucho ${mostrarNoticias ? "activo" : ""}`}
          onClick={() => { setMostrarNoticias(!mostrarNoticias); setMostrarTexto(false); }}>
          <span className="icono-egipcio">📜</span> {mostrarNoticias ? "CERRAR" : "NOTICIAS"}
        </button>
      </div>

      {(mostrarTexto || mostrarNoticias) && (
        <div className="papiro-texto-animado">
          <div className="esfinge-texto-contenido">
            {mostrarTexto && (
              <div className="contenido-historia">
                <h2 className="titulo-papiro-interno">El Guardián del Horizonte</h2>
                <p className="texto-noticia-papiro">La Gran Esfinge es el guardián eterno de las pirámides, tallada en roca caliza. Representa la unión de la sabiduría y la fuerza.</p>
              </div>
            )}

            {mostrarNoticias && (
              <div className="contenido-noticias">
                <h2 className="titulo-papiro-interno">Crónicas de Egipto</h2>
                {noticias.length > 0 ? (
                  noticias.map((n) => (
                    <div key={n.id} className="noticia-item-papiro">
                      <h3 className="titulo-noticia-dorado">{n.titulo}</h3>
                      <p className="texto-noticia-papiro">{n.resumen}</p>
                      <div style={{ textAlign: 'center' }}>
                        <a href={n.url_enlace} target="_blank" rel="noreferrer" className="link-egipcio-visible">
                          LEER CRÓNICA COMPLETA →
                        </a>
                      </div>
                    </div>
                  ))
                ) : <p className="texto-noticia-papiro">Sin noticias en la arena...</p>}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="divisor-seccion"><span className="rombo-dorado"></span></div>
    </div>
  );
}