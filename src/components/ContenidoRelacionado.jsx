import React, { useState } from "react";

function ContenidoRelacionado() {
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
  const [mostrarRecursos, setMostrarRecursos] = useState(false);
  const [mostrarNoticias, setMostrarNoticias] = useState(false);

  // Lista de noticias reales (en español)
  const noticias = [
    {
      titulo: "Egipto revela colosales estatuas restauradas en Luxor",
      fuente: "AP News",
      enlace:
        "https://apnews.com/article/6f8337f96ab084b7854ca9ed13c214de",
      resumen:
        "Egipto presentó dos estatuas gigantes de Amenhotep III restauradas tras casi 20 años de trabajo arqueológico.",
    },
    {
      titulo: "Tito Vivas desmonta mitos sobre las pirámides",
      fuente: "Cadena SER",
      enlace:
        "https://cadenaser.com/galicia/2025/05/07/tito-vivas-las-piramides-no-las-hizo-dios-ni-un-ovni-las-hizo-el-ser-humano-con-tecnica-y-simbologia-radio-coruna/",
      resumen:
        "El egiptólogo explica cómo se construyeron realmente las pirámides y critica las teorías pseudocientíficas.",
    },
    {
      titulo: "Descubrimiento sensacional en Saqqara",
      fuente: "Huffington Post",
      enlace:
        "https://www.huffingtonpost.es/sociedad/tras-piramides-momias-faraones-arqueologos-dan-descubrimiento-sensacional-arenas-egipto.html",
      resumen:
        "Arqueólogos encuentran una estatua familiar excepcionalmente conservada que aporta nueva información cultural.",
    },
  ];

  return (
    <section
      id="contenido-relacionado"
      className="contenido-relacionado"
      style={{
        maxWidth: "1050px",
        margin: "80px auto",
        display: "block",
        textAlign: "center",
      }}
    >
      <h3>Contenido Relacionado</h3>

      {/* BOTONES */}
      <div
        className="botones-relacionados"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          width: "100%",
          marginBottom: "20px",
          flexWrap: "wrap"
        }}
      >
        <button className="btn" onClick={() => setMostrarMapa(!mostrarMapa)}>
          {mostrarMapa ? "Ocultar Mapa" : "Mapa"}
        </button>

        <button
          className="btn"
          onClick={() => setMostrarDescripcion(!mostrarDescripcion)}
        >
          {mostrarDescripcion ? "Ocultar Descripción" : "Descripción"}
        </button>

        <button
          className="btn"
          onClick={() => setMostrarRecursos(!mostrarRecursos)}
        >
          {mostrarRecursos ? "Ocultar Recursos" : "Recursos"}
        </button>

        <button
          className="btn"
          onClick={() => setMostrarNoticias(!mostrarNoticias)}
        >
          {mostrarNoticias ? "Ocultar Noticias" : "Noticias"}
        </button>
      </div>

      {/* MAPA */}
      {mostrarMapa && (
        <div className="panel">
          <h4>Mapa de las Pirámides de Giza</h4>
          <a
            href="https://www.google.com/maps/place/Great+Pyramid+of+Giza/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#f4e6b2",
              padding: "12px 20px",
              borderRadius: "8px",
              color: "#3e2f2f",
              fontWeight: "bold",
              textDecoration: "none",
              boxShadow: "0 0 12px rgba(255, 230, 180, 0.7)",
            }}
          >
            🌍 Abrir ubicación en Google Maps
          </a>
        </div>
      )}

      {/* DESCRIPCIÓN */}
      {mostrarDescripcion && (
        <div className="panel">
          <h4>Descripción</h4>
          <p>
            Las pirámides de Egipto son monumentos construidos hace más de
            4.500 años. Son símbolo del ingenio, la ingeniería y la cultura del
            Antiguo Egipto.
          </p>
        </div>
      )}

      {/* RECURSOS */}
      {mostrarRecursos && (
        <div className="panel">
          <h4>Recursos Relacionados</h4>
          <ul>
            <li>
              <a
                href="https://es.wikipedia.org/wiki/Gran_Pir%C3%A1mide_de_Guiza"
                target="_blank"
                rel="noreferrer"
              >
                Gran Pirámide de Guiza
              </a>
            </li>
            <li>
              <a
                href="https://es.wikipedia.org/wiki/Esfinge_de_Guiza"
                target="_blank"
                rel="noreferrer"
              >
                La Gran Esfinge
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=Qe9X6TRl3eI"
                target="_blank"
                rel="noreferrer"
              >
                Documental sobre las Pirámides
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* 🟩 NOTICIAS */}
      {mostrarNoticias && (
        <div className="panel">
          <h4>Noticias de Actualidad</h4>

          {noticias.map((n, i) => (
            <div
              key={i}
              style={{
                marginBottom: "18px",
                padding: "12px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(5px)",
              }}
            >
              <h4 style={{ color: "#f4e6b2" }}>{n.titulo}</h4>
              <p style={{ color: "#f1f1f1" }}>{n.resumen}</p>

              <a
                href={n.enlace}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#ffd87a",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                Leer noticia completa ({n.fuente})
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ContenidoRelacionado;
