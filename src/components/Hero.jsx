import React, { useState } from "react";
import "../hero.css";

export default function Hero({ contenido, form, editando, onChange }) {
  const [mostrarSobreMi, setMostrarSobreMi] = useState(false);

  return (
    <section className="hero-section">

      {/* 💛 TÍTULO PRINCIPAL */}
      {editando ? (
        <textarea
          name="hero_title"
          value={form.hero_title || ""}
          onChange={onChange}
        />
      ) : (
        <h2 className="hero-titulo-grande">
          {contenido.hero_title}
        </h2>
      )}

      {/* 🔥 MENSAJE EGIPCIO */}
      <div className="mensaje-inicial-egipto">
        {editando ? (
          <textarea
            name="hero_message"
            value={form.hero_message || ""}
            onChange={onChange}
            rows={5}
          />
        ) : (
          <p style={{ whiteSpace: "pre-line" }}>
            {contenido.hero_message}
          </p>
        )}
      </div>

      {/* ✨ SOBRE MÍ */}
      <div className="presentacion-autor">
        <p><strong>Hola, soy José Moreno Jiménez</strong></p>

        <button
          className="btn-sobre-mi"
          onClick={() => setMostrarSobreMi(!mostrarSobreMi)}
        >
          {mostrarSobreMi ? "Ocultar" : "Sobre mí"}
        </button>

        {mostrarSobreMi && (
          <div className="sobre-mi-texto">
            {editando ? (
              <textarea
                name="about_text"
                value={form.about_text || ""}
                onChange={onChange}
                rows={5}
              />
            ) : (
              <p>{contenido.about_text}</p>
            )}
          </div>
        )}
      </div>

    </section>
  );
}
