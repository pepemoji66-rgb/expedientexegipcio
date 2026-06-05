import React, { useState } from 'react';
import './seccionorion.css';

const SeccionOrion = () => {
  const [infoActiva, setInfoActiva] = useState(null);

  const datos = {
    micerino: { id: 'micerino', titulo: "Pirámide de Micerino", texto: "La menor de las tres, construida para Menkaura." },
    kefren: { id: 'kefren', titulo: "Pirámide de Kefrén", texto: "La del centro, aún conserva su revestimiento original." },
    keops: { id: 'keops', titulo: "Gran Pirámide de Keops", texto: "La más grande y antigua, alineada con las estrellas." }
  };

  const manejarClick = (piramide) => {
    setInfoActiva(infoActiva?.id === piramide.id ? null : piramide);
  };

  return (
    <div className="seccion-orion-full-container">
      <h2 className="titulo-seccion">LA CORRELACIÓN ESTELAR</h2>

      <div className="mapa-interactivo-horizontal">
        <div className="poema-lateral">
          <p>LUNA DE PLATA, GUARDIANA DEL VELO,</p>
          <p>BESA LA ARENA QUE MIRA HACIA EL CIELO.</p>
        </div>

        <div
          className="mapa-interactivo-wrapper"
          style={{
            backgroundImage: "url('/imagenes/orion-giza.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="punto-estelar micerino" onClick={() => manejarClick(datos.micerino)}></div>
          <div className="punto-estelar kefren" onClick={() => manejarClick(datos.kefren)}></div>
          <div className="punto-estelar keops" onClick={() => manejarClick(datos.keops)}></div>
        </div>
      </div>

      {infoActiva && (
        <div className="papiro-info">
          <div className="papiro-contenido">
            <button className="cerrar-papiro" onClick={() => setInfoActiva(null)}>CERRAR X</button>
            <h3 style={{ color: '#d4af37', marginBottom: '10px' }}>{infoActiva.titulo}</h3>
            <p>{infoActiva.texto}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeccionOrion;