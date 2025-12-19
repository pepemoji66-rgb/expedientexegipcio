import React, { useState, useEffect } from "react";
import "../galeria.css";

export default function Galeria({ imagenes = [] }) {
  const [imagenActiva, setImagenActiva] = useState(null);
  const [esVertical, setEsVertical] = useState(false);
  const [cargando, setCargando] = useState(false);

  // --- FIX ANTI-FREEZE: asegura que nada quede bloqueado ---
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

      // bloquear body cuando está la imagen abierta
      document.body.style.overflow = "hidden";
    };

    // fail-safe si la imagen tarda demasiado en cargar
    setTimeout(() => setCargando(false), 1200);
  };

  const cerrarLightbox = () => {
    setImagenActiva(null);
    document.body.style.overflow = "auto";
  };



  return (
    <section className="galeria-mosaico">
      <h2 className="titulo-galeria">Galería Egipcia</h2>

      <div className="galeria-grid">
  {imagenes.map((img) => (
    <div
      key={img.id}
      className="galeria-item"
      onClick={() => abrirLightbox(img.src)}
    >
      <img
        src={img.src}
        alt={img.titulo || "Foto galería"}
        draggable="false"
      />
    </div>
  ))}
</div>


      {/* Loader corregido, no bloquea clics */}
      {cargando && (
        <div className="lightbox loader-fix">
          <div className="loader-arena"></div>
        </div>
      )}

      {imagenActiva && !cargando && (
        <div className="lightbox" onClick={cerrarLightbox}>
          <div
            className={`lightbox-contenido scroll-interno ${esVertical ? "vertical" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-cerrar" onClick={cerrarLightbox}>✦</button>

            <img src={imagenActiva} alt="Ampliada" />
          </div>
        </div>
      )}
    </section>
  );
}
