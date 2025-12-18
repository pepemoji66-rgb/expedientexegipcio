import React, { useState } from "react";
import "./esfinge.css";
import ContenidoRelacionado from "./ContenidoRelacionado";  // ✅ AÑADIDO

export default function Esfinge() {
  const [mostrarTexto, setMostrarTexto] = useState(false);

  return (
    <div className="esfinge-wrapper">

      <h2 className="esfinge-titulo">La Gran Esfinge de Giza</h2>

      {/* IMAGEN PRINCIPAL */}
      <div className="esfinge-imagen-contenedor">
        <img
          src="/imagenes/esfinge.jpg"
          alt="La Esfinge de Giza"
          className="esfinge-imagen"
        />
      </div>

      {/* BOTÓN MOSTRAR/OCULTAR */}
      <button
        className="btn-esfinge"
        onClick={() => setMostrarTexto(!mostrarTexto)}
      >
        {mostrarTexto ? "Ocultar historia" : "Mostrar historia"}
      </button>

      {/* TEXTO QUE SE OCULTA/MUESTRA */}
      {mostrarTexto && (
        <div className="esfinge-texto-wrapper">

          <p className="esfinge-texto">
            La Gran Esfinge de Giza es uno de los monumentos más icónicos del antiguo Egipto.
            Se cree que fue tallada hace más de 4.500 años, durante el reinado del faraón Kefrén,
            aunque su origen exacto y su propósito siguen siendo objeto de debate entre los historiadores.
          </p>

          <p className="esfinge-texto">
            La Esfinge combina el cuerpo de un león —símbolo de fuerza, protección y realeza—
            con la cabeza humana, representando la inteligencia y el poder divino del faraón.
            Custodiaba la entrada al complejo funerario de Giza, protegiendo el camino hacia las pirámides.
          </p>

          <p className="esfinge-texto">
            Mide unos 73 metros de largo y más de 20 metros de altura. A lo largo de los siglos,
            ha sobrevivido tormentas de arena, erosión, restauraciones fallidas y el paso del tiempo.
            Aun así, continúa siendo un símbolo eterno de misterio, poder y grandeza del antiguo Egipto.
          </p>

          <p className="esfinge-texto">
            Hoy en día, la Esfinge sigue cautivando a millones de visitantes,
            recordándonos la profundidad histórica y espiritual de la civilización egipcia.
          </p>

        </div>
      )}

      {/* 🟩 SECCIÓN DE CONTENIDO RELACIONADO + NOTICIAS */}
      <ContenidoRelacionado />   {/* ✅ Añadido aquí sin romper nada */}

    </div>
  );
}
