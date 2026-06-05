import React, { useState, useEffect } from "react";
import "../galeria.css";

export default function Galeria({ imagenes = [], setSeccionActiva }) {
  const [seleccionada, setSeleccionada] = useState(null);
  const [esVertical, setEsVertical] = useState(false);
  const [cargando, setCargando] = useState(false);

  // --- CONFIGURACIÓN DE PAGINACIÓN ---
  const imagenesPorPagina = 10;
  const [paginaActual, setPaginaActual] = useState(1);

  // Filtramos las visibles
  const imagenesVisibles = imagenes.filter(img => img.visible == 1 || img.visible == true);

  const totalPaginas = Math.ceil(imagenesVisibles.length / imagenesPorPagina);
  const indiceUltima = paginaActual * imagenesPorPagina;
  const indicePrimera = indiceUltima - imagenesPorPagina;
  const imagenesPagina = imagenesVisibles.slice(indicePrimera, indiceUltima);

  const abrirLightbox = (imgObjeto) => {
    setCargando(true);
    const imgElement = new Image();
    imgElement.src = imgObjeto.url;
    imgElement.onload = () => {
      setEsVertical(imgElement.height > imgElement.width);
      setSeleccionada(imgObjeto);
      setCargando(false);
      document.body.style.overflow = "hidden";
    };
  };

  const cerrarLightbox = () => {
    setSeleccionada(null);
    document.body.style.overflow = "auto";
  };

  // --- ESTA ES LA FUNCIÓN QUE SE HABÍA PERDIDO ---
  const irAlMapaInterno = (lat, lon, id) => {
    const coordenadas = { lat: parseFloat(lat), lon: parseFloat(lon) };
    // Guardamos en el "maletín" para que el mapa lo lea al cargar
    localStorage.setItem("centro_mapa", JSON.stringify(coordenadas));
    localStorage.setItem("id_resaltado", id);

    setSeccionActiva("mapa"); // Cambiamos de pestaña
    document.body.style.overflow = "auto";
  };

  return (
    <section className="galeria-mosaico">
      <h2 className="titulo-galeria">Galería Egipcia</h2>

      <div className="galeria-grid">
        {imagenesPagina.map((img) => (
          <div key={img.id} className="galeria-item" onClick={() => abrirLightbox(img)}>
            <img src={img.url} alt={img.titulo} draggable="false" />
            <div className="overlay-titulo">{img.titulo}</div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="paginacion-container" style={{ textAlign: "center", marginTop: "30px" }}>
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => { setPaginaActual(i + 1); window.scrollTo(0, 0); }}
            style={{
              margin: "0 5px",
              background: paginaActual === i + 1 ? "#c4a552" : "#333",
              color: "white", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer"
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Lightbox con botón de Mapa */}
      {seleccionada && !cargando && (
        <div className="lightbox" onClick={cerrarLightbox}>
          <div className={`lightbox-contenido-pro ${esVertical ? "es-vertical" : "es-horizontal"}`} onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-cerrar" onClick={cerrarLightbox}>✕</button>
            <div className="contenedor-flex-galeria">
              <div className="bloque-imagen">
                <img src={seleccionada.url} alt={seleccionada.titulo} />
              </div>
              <div className="bloque-info">
                <h3>{seleccionada.titulo}</h3>
                <hr />
                <p>{seleccionada.descripcion}</p>

                {/* BOTÓN CRÍTICO */}
                {seleccionada.latitud && (
                  <button
                    className="btn-ver-mapa"
                    onClick={() => irAlMapaInterno(seleccionada.latitud, seleccionada.longitud, seleccionada.id)}
                    style={{
                      backgroundColor: "#c4a552", color: "white", padding: "10px 20px",
                      border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "15px"
                    }}
                  >
                    📍 VER EN MAPA INTERACTIVO
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}