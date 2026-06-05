import React, { useState } from "react";
import "../hero.css";

export default function Hero({ contenido, form, editando, onChange }) {
  const [mostrarSobreMi, setMostrarSobreMi] = useState(false);
  const [mostrarSelectorMummy, setMostrarSelectorMummy] = useState(false);

  const cambiarIdiomaTranslate = (codigoLang) => {
    const selectCombo = document.querySelector(".goog-te-combo");
    if (selectCombo) {
      selectCombo.value = codigoLang;
      selectCombo.dispatchEvent(new Event("change"));
    } else {
      // Intentar setear la cookie googtrans como fallback si Google Translate no ha cargado su select aún
      document.cookie = `googtrans=/es/${codigoLang}; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=/es/${codigoLang}; path=/; domain=.onrender.com`;
      document.cookie = `googtrans=/es/${codigoLang}; path=/;`;
      window.location.reload();
    }
    setMostrarSelectorMummy(false);
  };

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
              {contenido.hero_title || "MISTERIOS DE EGIPTO"}
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
                {contenido.hero_message || "Descubre los secretos ocultos bajo la arena del desierto. Explora las pirámides, descifra los enigmas del Templo y embárcate en un viaje a través de los misterios más antiguos de la humanidad."}
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
                <p>{contenido.about_text || "Soy un apasionado de los misterios, los enigmas de la historia y especialmente de las pirámides, uno de los mayores secretos de la humanidad."}</p>
              </div>
            )}
          </div>
        </div>

        {/* LADO DERECHO: LA MOMIA ANCLADA A LA ARENA */}
        <div className="hero-image-side">
          <div className="contenedor-momia-arena" style={{ position: "relative" }}>
            {/* BOCADILLO DE DIÁLOGO / TRADUCTOR */}
            {mostrarSelectorMummy && (
              <div className="bocadillo-traductor skiptranslate">
                <div className="bocadillo-triangulo"></div>
                <p className="bocadillo-texto">
                  ¿En qué lengua descifrarás la arena?
                </p>
                <div className="bocadillo-botones">
                  <button onClick={() => cambiarIdiomaTranslate("es")} className="btn-lang-mummy" type="button">🇪🇸 ESP</button>
                  <button onClick={() => cambiarIdiomaTranslate("en")} className="btn-lang-mummy" type="button">🇬🇧 ENG</button>
                </div>
              </div>
            )}

            <img 
              src="/momia.png" 
              alt="Momia Sagrada" 
              className="momia-integrada" 
              onClick={() => setMostrarSelectorMummy(!mostrarSelectorMummy)}
              style={{ cursor: "pointer" }}
              title="Haz clic para cambiar de idioma / Click to change language"
            />
            <div className="sombra-pies"></div>
          </div>
        </div>
      </div>
    </section>
  );
}