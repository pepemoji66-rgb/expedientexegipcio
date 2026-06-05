import React, { useState, useEffect, useRef } from "react";
import "./misterios.css";

const MISTERIOS_DATA = [
  {
    id: "orion-correlation",
    titulo: "La Correlación de Orión y el Mapa Estelar",
    icono: "🌌",
    resumen: "La hipótesis de Robert Bauval sobre la correspondencia exacta entre las pirámides de Giza y las estrellas del cinturón de Orión.",
    textoCompleto: "Propuesta originalmente en 1989 por el ingeniero Robert Bauval, la teoría de la correlación de Orión sostiene que la posición de las tres pirámides de la meseta de Giza no es casual, sino un reflejo terrestre exacto del Cinturón de Orión: las estrellas Alnitak, Alnilam y Mintaka. La pirámide de Keops corresponde a Alnitak, Kefrén a Alnilam y Micerino a Mintaka. Lo más desconcertante es que Micerino está ligeramente desplazada del eje y es de menor tamaño, imitando con precisión la menor luminosidad y desviación de la estrella Mintaka. Según los cálculos astronómicos de precesión solar, la alineación perfecta en el horizonte con el Río Nilo representando la Vía Láctea ocurrió exactamente en el año 10,500 a.C.",
    latitud: 29.976,
    longitud: 31.130
  },
  {
    id: "geometria-luz",
    titulo: "La Gran Pirámide y la Velocidad de la Luz",
    icono: "📐",
    resumen: "La desconcertante coincidencia geográfica con la constante física y las proporciones matemáticas de Pi y Phi.",
    textoCompleto: "La Gran Pirámide de Keops guarda relaciones matemáticas asombrosas. Si se divide el perímetro de su base por el doble de su altura, se obtiene una aproximación casi exacta al número Pi (3.14159). Además, la relación entre la apotema y la mitad de la base describe con precisión la proporción áurea o Phi (1.618). Pero el dato más impactante pertenece a la física moderna: las coordenadas geográficas de la cúspide de la Gran Pirámide son exactamente 29.9792458° N de latitud, una cifra que coincide al milímetro con la velocidad de la luz en el vacío, medida en 299,792,458 metros por segundo. ¿Un guiño de una civilización avanzada o una coincidencia cósmica?",
    latitud: 29.9792458,
    longitud: 31.1342
  },
  {
    id: "sala-registros",
    titulo: "La Sala de los Registros Bajo la Esfinge",
    icono: "🦁",
    resumen: "Las lecturas de radar y sismógrafos que revelan grandes cavidades artificiales bajo las garras de la Gran Esfinge.",
    textoCompleto: "El místico Edgar Cayce profetizó que una cámara secreta, conocida como la 'Sala de los Registros', se encontraba oculta bajo la garra derecha de la Esfinge, albergando la sabiduría y archivos de una civilización perdida antediluviana. En la década de 1990, geofísicos como Thomas Dobecki y John Anthony West realizaron análisis sísmicos y radares de penetración terrestre (GPR). Los resultados confirmaron la presencia de una cavidad rectangular artificial de 12 por 9 metros, situada a unos 8 metros por debajo de las garras de la Esfinge. Hasta el día de hoy, el acceso y excavación de esta anomalía subterránea permanecen estrictamente restringido por las autoridades de egiptología.",
    latitud: 29.9753,
    longitud: 31.1376
  },
  {
    id: "acustica-camara",
    titulo: "Acústica y Resonancia a 432 Hz",
    icono: "🔊",
    resumen: "El comportamiento sónico del sarcófago de granito negro y los misterios de las ondas en la Cámara del Rey.",
    textoCompleto: "La Cámara del Rey, en el corazón de la Gran Pirámide, está construida enteramente con bloques macizos de granito rojo traídos desde Asuán. En su interior reposa el sarcófago, tallado en una sola pieza de granito negro. Diversos investigadores de la acústica han demostrado que la cámara y el sarcófago actúan como una caja de resonancia. Al emitir tonos sostenidos, el interior vibra y amplifica las frecuencias de 432 Hz y 110 Hz. Estas frecuencias específicas están vinculadas a estados de meditación profunda y estimulación de ondas cerebrales theta. Se cree que la pirámide no era una simple tumba, sino una máquina vibracional diseñada para rituales de iniciación y amplificación sónica.",
    latitud: 29.9791,
    longitud: 31.1341
  }
];

function MisterioCard({ m, estaActivo, onToggle, setSeccionActiva }) {
  const [leyendo, setLeyendo] = useState(false);
  const textRef = useRef(null);

  // Detener voz si se abre/cierra la tarjeta
  useEffect(() => {
    window.speechSynthesis.cancel();
    setLeyendo(false);
  }, [estaActivo]);

  const toggleLeerVoz = (e) => {
    e.stopPropagation(); // Evitar cerrar la tarjeta

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setLeyendo(false);
      return;
    }

    // Extraer el texto del DOM
    const textoA_Leer = textRef.current 
      ? textRef.current.innerText 
      : `${m.titulo}. ${m.textoCompleto}`;

    const textoLimpio = textoA_Leer
      .replace(/<[^>]*>?/gm, "")
      .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
      .replace(/\s+/g, " ")
      .trim();

    const ut = new SpeechSynthesisUtterance(textoLimpio);

    // Detección dinámica de idioma de traducción
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

    // Seleccionar voz adecuada
    const voces = window.speechSynthesis.getVoices();
    const prefix = langCode.substring(0, 2);
    let vozElegida = voces.find(v => v.lang.startsWith(prefix) && ["pablo", "jorge", "alvaro", "david", "guy", "mark", "male", "microsoft"].some(name => v.name.toLowerCase().includes(name)));
    
    if (!vozElegida) {
      vozElegida = voces.find(v => v.lang.startsWith(prefix));
    }

    if (vozElegida) {
      ut.voice = vozElegida;
    }

    setLeyendo(true);
    window.speechSynthesis.speak(ut);
  };

  const htmlLang = document.documentElement.lang || "es";
  const isEn = htmlLang.startsWith("en");

  return (
    <div className={`misterio-card ${estaActivo ? "activo" : ""}`} style={{ position: "relative" }}>
      {estaActivo && (
        <button 
          onClick={onToggle}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            background: "transparent",
            border: "none",
            color: "#c5a059",
            fontSize: "1.4rem",
            cursor: "pointer",
            padding: "5px",
            lineHeight: 1,
            zIndex: 10,
            transition: "color 0.3s"
          }}
          onMouseOver={(e) => e.target.style.color = "#ff4d4d"}
          onMouseOut={(e) => e.target.style.color = "#c5a059"}
          title={isEn ? "Close" : "Cerrar"}
          type="button"
        >
          ✕
        </button>
      )}

      <div className="card-cabecera">
        <div className="card-icono">{m.icono}</div>
        <h3 className="card-titulo">{m.titulo}</h3>
      </div>
      
      <p className="card-resumen">{m.resumen}</p>

      {estaActivo && (
        <div className="card-contenido-detallado" ref={textRef}>
          <p>{m.textoCompleto}</p>
        </div>
      )}

      {estaActivo && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <button 
            className={`btn-robocop-lector ${leyendo ? "leyendo-activo" : ""}`}
            onClick={toggleLeerVoz}
            style={{ flex: 1 }}
            type="button"
          >
            {leyendo 
              ? `🛑 ${isEn ? "STOP AUDIO" : "DETENER AUDIO"}` 
              : `🔊 ${isEn ? "LISTEN ENIGMA" : "ESCUCHAR ENIGMA"}`}
          </button>
          
          {m.latitud && m.longitud && (
            <button
              className="btn-rastrear-mapa"
              onClick={(e) => {
                e.stopPropagation();
                const coordenadas = { lat: parseFloat(m.latitud), lon: parseFloat(m.longitud) };
                localStorage.setItem("centro_mapa", JSON.stringify(coordenadas));
                localStorage.setItem("id_resaltado", `misterio-${m.id}`);
                if (setSeccionActiva) setSeccionActiva("mapa");
              }}
              style={{ flex: 1 }}
              type="button"
            >
              📍 {isEn ? "LOCATE 𓂀" : "RASTREAR 𓂀"}
            </button>
          )}

          <button 
            onClick={onToggle}
            type="button"
            style={{
              background: "rgba(220, 38, 38, 0.15)",
              color: "#f87171",
              border: "1px solid rgba(220, 38, 38, 0.4)",
              borderRadius: "4px",
              padding: "8px 12px",
              fontSize: "11px",
              cursor: "pointer",
              fontWeight: "bold",
              fontFamily: "monospace",
              transition: "0.3s",
              flex: 1
            }}
            onMouseOver={(e) => {
              e.target.style.background = "rgba(220, 38, 38, 0.35)";
              e.target.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "rgba(220, 38, 38, 0.15)";
              e.target.style.color = "#f87171";
            }}
          >
            ❌ {isEn ? "CLOSE" : "CERRAR"}
          </button>
        </div>
      )}

      <button 
        className="btn-misterio" 
        onClick={onToggle}
        type="button"
      >
        {estaActivo 
          ? (isEn ? "HIDE ENIGMA 𓂀" : "OCULTAR ENIGMA 𓂀") 
          : (isEn ? "DECRYPT ENIGMA 𓂀" : "DESCIFRAR ENIGMA 𓂀")}
      </button>
    </div>
  );
}

export default function Misterios({ misterios = [], setSeccionActiva }) {
  const [activoId, setActivoId] = useState(null);

  const itemsAMostrar = misterios && misterios.length > 0 ? misterios : MISTERIOS_DATA;

  const toggleActivo = (id) => {
    setActivoId(activoId === id ? null : id);
  };

  useEffect(() => {
    const ab_id = localStorage.getItem("misterio_abierto_id");
    if (ab_id) {
      const matched = itemsAMostrar.find(m => String(m.id) === String(ab_id));
      if (matched) {
        setActivoId(matched.id);
      }
      localStorage.removeItem("misterio_abierto_id");
    }
  }, [itemsAMostrar]);

  return (
    <div className="misterios-seccion">
      <header className="misterios-header">
        <h2 className="titulo-egipcio">𓁳 LOS MISTERIOS DE EGIPTO 𓁳</h2>
        <p className="subtitulo-seccion">
          Aquello que la arqueología oficial no puede responder. Investigaciones sobre alineación astronómica, física matemática y anomalías de resonancia.
        </p>
      </header>

      <div className="misterios-grid">
        {itemsAMostrar.map((m) => (
          <MisterioCard 
            key={m.id} 
            m={m} 
            estaActivo={activoId === m.id} 
            onToggle={() => toggleActivo(m.id)} 
            setSeccionActiva={setSeccionActiva}
          />
        ))}
      </div>

      <div className="divisor-seccion">
        <span className="rombo-dorado"></span>
      </div>
    </div>
  );
}
