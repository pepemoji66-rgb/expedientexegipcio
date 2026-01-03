import React, { useState } from "react";
import "../hero.css";

export default function Hero({ contenido, form, editando, onChange }) {
  const [mostrarSobreMi, setMostrarSobreMi] = useState(false);

  return (
    <section 
      className="hero-section" 
      style={{ backgroundImage: "url('/imagenes/esfinge.jpg')" }}
    >
      <div className="hero-overlay"></div>
      
      <div className="hero-container-dual">
        {/* LADO IZQUIERDO: TEXTOS */}
        <div className="hero-text-side">
          {editando ? (
            <input
              className="hero-edit-title"
              name="hero_title"
              value={form.hero_title || ""}
              onChange={onChange}
            />
          ) : (
            <h1 className="hero-titulo-grande">
              {contenido.hero_title || "BIENVENIDO A EGIPTO"}
            </h1>
          )}

          <div className="hero-box-mística">
            {editando ? (
              <textarea
                className="hero-edit-textarea"
                name="hero_message"
                value={form.hero_message || ""}
                onChange={onChange}
                rows={6}
              />
            ) : (
              <p className="mensaje-texto-egipto">
                {contenido.hero_message}
              </p>
            )}
          </div>

          <div className="presentacion-autor">
            <p className="autor-nombre">Hola, soy <strong>José Moreno Jiménez</strong></p>
            <button
              className="btn-sobre-mi-egipcio"
              onClick={() => setMostrarSobreMi(!mostrarSobreMi)}
            >
              {mostrarSobreMi ? "OCULTAR" : "SOBRE MÍ"}
            </button>
            
            {mostrarSobreMi && (
              <div className="sobre-mi-papiro">
                <p>{contenido.about_text}</p>
              </div>
            )}
          </div>
        </div>

        {/* LADO DERECHO: LA MOMIA ANCLADA A LA ARENA */}
        <div className="hero-image-side">
          <div className="contenedor-momia-arena">
            <img 
              src="/momia.png" 
              alt="Momia Sagrada" 
              className="momia-integrada" 
            />
            <div className="sombra-pies"></div>
          </div>
        </div>
      </div>
    </section>
  );
}