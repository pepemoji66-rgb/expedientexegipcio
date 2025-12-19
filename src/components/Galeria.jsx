import React, { useState, useEffect } from "react";
import "../galeria.css";

export default function Galeria({ imagenes = [] }) {
  const [imagenActiva, setImagenActiva] = useState(null);
  const [esVertical, setEsVertical] = useState(false);
  const [cargando, setCargando] = useState(false);

  // PAGINACIÓN
  const imagenesPorPagina = 10;
  const [paginaActual, setPaginaActual] = useState(1);

  // solo imágenes visibles
  const imagenesVisibles = imagenes.filter(img => img.visible);

  const totalPaginas = Math.ceil(
    imagenesVisibles.length / imagenesPorPagina
  );

  const indiceUltima = paginaActual * imagenesPorPagina;
  const indicePrimera = indiceUltima - imagenesPorPagina;

  const imagenesPagina = imagenesVisibles.slice(
    indicePrimera,
    indiceUltima
  );

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  const abrirLightbox = (src) => {
    setCargando(true);

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setEsVertical(img.height > img.width);
      setImagenActiva(src);
      setCargando(false);
      document.body.style.overflow = "hidden";
    };

    setTimeout(() => setCargando(false), 1200);
  };

  const cerrarLightbox = () => {
    setImagenActiva(null);
    document.body.style.overflow = "auto";
  };

  const cambiarPagina = (num) => {
    if (num >= 1 && num <= totalPaginas) {
      setPaginaActual(num);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="galeria-mosaico">
      <h2 className="titulo-galeria">Galería Egipcia</h2>

      <div className="galeria-grid">
        {imagenesPagina.map((img) => (
          <div
            key={img.id}
            className="galeria-item"
            onClick={() => abrirLightbox(img.src)}
          >
            <img src={img.src} alt={img.titulo} draggable="false" />
          </div>
        ))}
      </div>

      {/* PAGINACIÓN */}
      {totalPaginas > 1 && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            style={{ marginRight: "10px" }}
          >
            ⬅ Anterior
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              onClick={() => cambiarPagina(i + 1)}
              style={{
                margin: "0 5px",
                background:
                  paginaActual === i + 1 ? "#c4a552" : "#333",
                color: "white",
                padding: "6px 12px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            style={{ marginLeft: "10px" }}
          >
            Siguiente ➡
          </button>
        </div>
      )}

      {/* LOADER */}
      {cargando && (
        <div className="lightbox loader-fix">
          <div className="loader-arena"></div>
        </div>
      )}

      {/* LIGHTBOX */}
      {imagenActiva && !cargando && (
        <div className="lightbox" onClick={cerrarLightbox}>
          <div
            className={`lightbox-contenido scroll-interno ${
              esVertical ? "vertical" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-cerrar"
              onClick={cerrarLightbox}
            >
              ✦
            </button>

            <img src={imagenActiva} alt="Ampliada" />
          </div>
        </div>
      )}
    </section>
  );
}
