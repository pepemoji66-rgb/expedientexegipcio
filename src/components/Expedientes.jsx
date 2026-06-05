import React, { useState, useEffect, useRef } from "react";
import "./expedientes.css";

const DOSSIERS = [
  {
    id: "imperio-antiguo",
    sigla: "EXP-001",
    titulo: "La Era de las Pirámides y el Imperio Antiguo",
    periodo: "c. 2686 – 2181 a.C.",
    imagen: "/imagenes/1.avif",
    resumen: "El surgimiento de la arquitectura monumental en piedra y la consolidación de la teocracia divina en torno a la figura del Faraón.",
    detalles: [
      {
        subtitulo: "Imhotep y la Revolución de Saqqara",
        texto: "Antes de la Dinastía III, los faraones eran enterrados en mastabas de adobe. Todo cambió cuando el sabio Imhotep diseñó para el rey Djoser (Zoser) la Pirámide Escalonada en Saqqara. Concebida como una escalera monumental para que el alma del rey ascendiera a las estrellas del norte, este monumento representó la primera construcción a gran escala en piedra labrada de la humanidad, dando inicio a la obsesión arquitectónica egipcia."
      },
      {
        subtitulo: "La Evolución del Ángulo Perfecto",
        texto: "El faraón Seneferu (fundador de la Dinastía IV) experimentó incansablemente con la forma piramidal. Su primer intento en Meidum colapsó parcialmente. Luego, en Dahshur, construyó la Pirámide Acodada (cuyo ángulo cambia a mitad de camino debido a fallas estructurales) y, finalmente, la Pirámide Roja, la primera pirámide de caras lisas exitosa de la historia, sentando las bases para las colosales obras de Giza."
      },
      {
        subtitulo: "La Teocracia Solar y el Declive",
        texto: "Durante la Dinastía V, el culto a Ra, el dios Sol, cobró una relevancia sin precedentes. Los faraones pasaron de construir pirámides gigantescas a levantar templos solares. Sin embargo, el excesivo gasto en monumentos y el progresivo debilitamiento del poder central frente a los gobernadores locales (nomarcas) sumieron a Egipto en el Primer Período Intermedio, poniendo fin a la gloria del Imperio Antiguo."
      }
    ]
  },
  {
    id: "herejia-amarna",
    sigla: "EXP-002",
    titulo: "El Cisma de Amarna y el Faraón Rebelde",
    periodo: "c. 1353 – 1336 a.C. (Dinastía XVIII)",
    imagen: "/imagenes/6.avif",
    resumen: "La abolición del panteón tradicional de Amón en favor del monoteísmo solar de Atón, liderada por Akenatón y Nefertiti.",
    detalles: [
      {
        subtitulo: "El Alzamiento de Amenhotep IV",
        texto: "En el cenit del Imperio Nuevo, el clero de Amón en Tebas ostentaba una riqueza que rivalizaba con la del trono. En su quinto año de reinado, Amenhotep IV cambió su nombre a Akenatón ('Agradable a Atón') y declaró que Atón, el disco solar físico, era el único y verdadero dios. Cerró los templos tradicionales, confiscó sus riquezas y abolió el culto a Osiris y demás deidades del panteón tradicional."
      },
      {
        subtitulo: "Akhetatón: La Ciudad de la Arena",
        texto: "Para romper por completo con Tebas, el faraón ordenó edificar una nueva capital desde cero en el desierto: Akhetatón (actual Amarna). En pocos años, miles de obreros construyeron palacios, templos abiertos al sol y avenidas monumentales. El arte egipcio sufrió una metamorfosis radical, abandonando el idealismo rígido para mostrar figuras más fluidas, orgánicas, con cráneos alargados y escenas de afecto familiar íntimo."
      },
      {
        subtitulo: "El Colapso del Sueño Monoteísta",
        texto: "La revolución descuidó las fronteras del imperio, provocando tensiones diplomáticas y pérdidas territoriales. A la muerte de Akenatón, la ciudad fue abandonada a las arenas. Su sucesor, el joven Tutankamón, fue obligado por el clero restaurado a devolver la capital a Tebas. Los faraones posteriores borraron sistemáticamente los nombres de la dinastía de Amarna de las listas reales, considerándolos reyes heréticos."
      }
    ]
  },
  {
    id: "valle-reyes",
    sigla: "EXP-003",
    titulo: "El Valle de los Reyes y las Cámaras Ocultas",
    periodo: "c. 1550 – 1069 a.C. (Imperio Nuevo)",
    imagen: "/imagenes/7.avif",
    resumen: "El abandono de las pirámides en favor de hipogeos excavados directamente en las montañas de Tebas occidental para evitar saqueos.",
    detalles: [
      {
        subtitulo: "El Cambio de Estrategia Funeraria",
        texto: "Las pirámides, al ser visibles desde kilómetros de distancia, eran blancos fáciles para los saqueadores de tumbas. Al inicio del Imperio Nuevo, los faraones decidieron ocultar sus sepulturas. Escogieron un valle desértico rodeado por acantilados de piedra caliza, coronado naturalmente por la colina de Al-Qurn, cuya forma asemeja una pirámide natural. Allí tallaron profundos túneles subterráneos diseñados para simular el inframundo (Duat)."
      },
      {
        subtitulo: "Arquitectura y Libros del Inframundo",
        texto: "Cada tumba excavada en la roca (hipogeo) seguía un trazado de pozos de drenaje, corredores descendentes y antecámaras decoradas con bajorrelieves policromados. Los muros plasmaban los textos sagrados como el Libro de los Muertos, el Libro del Amduat y el Libro de las Puertas, que servían de mapa e instrucciones mágicas para que el faraón superase los peligros de la noche y renaciera junto al Sol."
      },
      {
        subtitulo: "El Gran Descubrimiento de la KV62",
        texto: "Aunque casi todas las tumbas fueron desvalijadas en la antigüedad, una pequeña sepultura sepultada accidentalmente bajo los escombros de las cabañas de los obreros sobrevivió intacta. En noviembre de 1922, Howard Carter descubrió la tumba KV62 de Tutankamón. El hallazgo de más de 5,000 artefactos de oro, plata, alabastro y piedras semipreciosas reveló al mundo moderno el asombroso lujo que acompañaba a los gobernantes de Egipto en su viaje al más allá."
      }
    ]
  }
];

function DossierCard({ d, estaAbierto, onToggle }) {
  const [paginaDetalle, setPaginaDetalle] = useState(0);
  const [leyendo, setLeyendo] = useState(false);
  const textRef = useRef(null);

  // Al abrir/cerrar o cambiar de página, cancelar lectura de voz
  useEffect(() => {
    setPaginaDetalle(0);
    window.speechSynthesis.cancel();
    setLeyendo(false);
  }, [estaAbierto]);

  const cambiarPagina = (nuevaPag) => {
    window.speechSynthesis.cancel();
    setLeyendo(false);
    setPaginaDetalle(nuevaPag);
  };

  const toggleLeerVoz = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setLeyendo(false);
      return;
    }

    // Extraer el texto traducido directamente del DOM si está disponible
    const textoA_Leer = textRef.current 
      ? textRef.current.innerText 
      : `${d.detalles[paginaDetalle].subtitulo}. ${d.detalles[paginaDetalle].texto}`;

    // Limpieza de caracteres extraños y emojis
    const textoLimpio = textoA_Leer
      .replace(/<[^>]*>?/gm, "")
      .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
      .replace(/\s+/g, " ")
      .trim();

    const ut = new SpeechSynthesisUtterance(textoLimpio);

    // Detección dinámica de idioma basándonos en el atributo HTML lang modificado por Google Translate
    let langCode = "es-ES";
    const htmlLang = document.documentElement.lang;
    if (htmlLang) {
      if (htmlLang.startsWith("en")) langCode = "en-US";
      else if (htmlLang.startsWith("fr")) langCode = "fr-FR";
      else if (htmlLang.startsWith("de")) langCode = "de-DE";
      else if (htmlLang.startsWith("it")) langCode = "it-IT";
      else if (htmlLang.startsWith("pt")) langCode = "pt-PT";
    }

    ut.lang = langCode;
    ut.rate = 0.95;
    ut.pitch = 0.95;
    ut.onend = () => setLeyendo(false);

    // Intentar asignar voz local del navegador según idioma
    const voces = window.speechSynthesis.getVoices();
    const prefix = langCode.substring(0, 2);
    let vozElegida = voces.find(v => v.lang.startsWith(prefix) && ["pablo", "jorge", "alvaro", "david", "guy", "mark", "male", "microsoft"].some(name => v.name.toLowerCase().includes(name)));
    
    // Si no encuentra una voz masculina específica, toma cualquiera del idioma correspondiente
    if (!vozElegida) {
      vozElegida = voces.find(v => v.lang.startsWith(prefix));
    }

    if (vozElegida) {
      ut.voice = vozElegida;
    }

    setLeyendo(true);
    window.speechSynthesis.speak(ut);
  };

  const detActivo = d.detalles[paginaDetalle];
  const totalPaginas = d.detalles.length;

  const htmlLang = document.documentElement.lang || "es";
  const isEn = htmlLang.startsWith("en");

  return (
    <div 
      className={`dossier-card ${estaAbierto ? "abierto" : ""}`}
      style={{
        backgroundImage: estaAbierto 
          ? "none" 
          : `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.88)), url(${d.imagen})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="dossier-pestaña" onClick={onToggle}>
        <div className="dossier-header-main">
          <span className="dossier-sigla">{d.sigla}</span>
          <h3 className="dossier-titulo">{d.titulo}</h3>
          {!estaAbierto && <span className="dossier-periodo">{d.periodo}</span>}
        </div>
        <button className="btn-abrir-dossier" type="button">
          {estaAbierto 
            ? (isEn ? "🔒 CLOSE" : "🔒 CERRAR DOSIER") 
            : (isEn ? "📂 OPEN" : "📂 ABRIR DOSIER")}
        </button>
      </div>

      {estaAbierto && (
        <div className="dossier-contenido">
          <div className="pergamino-interior">
            <p className="resumen-dossier">
              <strong>{isEn ? "DOSSIER BRIEF:" : "SINOPSIS DEL DOSIER:"}</strong> {d.resumen}
            </p>
            
            <div className="detalles-dossier" ref={textRef}>
              <div className="dossier-seccion-info">
                <h4>{detActivo.subtitulo}</h4>
                <p>{detActivo.texto}</p>
              </div>
            </div>

            {/* CONTROLES DE VOZ Y PAGINACIÓN */}
            <div className="dossier-footer-controles">
              <button 
                className={`btn-robocop-lector ${leyendo ? "leyendo-activo" : ""}`}
                onClick={toggleLeerVoz}
                type="button"
              >
                {leyendo 
                  ? `🛑 ${isEn ? "STOP AUDIO" : "DETENER AUDIO"}` 
                  : `🔊 ${isEn ? "LISTEN DOSSIER" : "ESCUCHAR DOSIER"}`}
              </button>

              {totalPaginas > 1 && (
                <div className="paginacion-interna-pergamino">
                  <button 
                    disabled={paginaDetalle === 0} 
                    onClick={() => cambiarPagina(paginaDetalle - 1)}
                    type="button"
                    className="btn-pag-pergamino"
                  >
                    ◀ {isEn ? "Back" : "Atrás"}
                  </button>
                  <span className="pag-contador-pergamino">
                    {isEn ? "Page" : "Página"} {paginaDetalle + 1} / {totalPaginas}
                  </span>
                  <button 
                    disabled={paginaDetalle === totalPaginas - 1} 
                    onClick={() => cambiarPagina(paginaDetalle + 1)}
                    type="button"
                    className="btn-pag-pergamino"
                  >
                    {isEn ? "Next" : "Siguiente"} ▶
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Expedientes() {
  const [dossierAbierto, setDossierAbierto] = useState(null);

  const toggleDossier = (id) => {
    if (dossierAbierto === id) {
      setDossierAbierto(null);
    } else {
      setDossierAbierto(id);
    }
  };

  return (
    <div className="expedientes-seccion">
      <header className="expedientes-header">
        <h2 className="titulo-egipcio">𓆎 DOSIERES Y EXPEDIENTES HISTÓRICOS 𓆎</h2>
        <p className="subtitulo-seccion">
          Accede a los archivos clasificados de la egiptología. Crónicas documentadas sobre la historia de las dinastías.
        </p>
      </header>

      <div className="dossiers-grid">
        {DOSSIERS.map((d) => (
          <DossierCard 
            key={d.id} 
            d={d} 
            estaAbierto={dossierAbierto === d.id} 
            onToggle={() => toggleDossier(d.id)} 
          />
        ))}
      </div>

      <div className="divisor-seccion">
        <span className="rombo-dorado"></span>
      </div>
    </div>
  );
}
