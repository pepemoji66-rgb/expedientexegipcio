import React, { useState, useEffect, useRef } from "react";
import "./misterios.css";

const MISTERIOS_DATA = [
  {
    id: "orion-correlation",
    titulo: "La Correlación de Orión y el Mapa Estelar",
    icono: "🌌",
    resumen: "La hipótesis de Robert Bauval sobre la correspondencia exacta entre las pirámides de Giza y las estrellas del cinturón de Orión.",
    textoCompleto: "Propuesta originalmente en 1989 por el ingeniero Robert Bauval, la teoría de la correlación de Orión sostiene que la posición de las tres pirámides de la meseta de Giza no es casual, sino un reflejo terrestre exacto del Cinturón de Orión: las estrellas Alnitak, Alnilam y Mintaka. La pirámide de Keops corresponde a Alnitak, Kefrén a Alnilam y Micerino a Mintaka. Lo más desconcertante es que Micerino está ligeramente desplazada del eje y es de menor tamaño, imitando con precisión la menor luminosidad y desviación de la estrella Mintaka. Según los cálculos astronómicos de precesión solar, la alineación perfecta en el horizonte con el Río Nilo representando la Vía Láctea ocurrió exactamente en el año 10,500 a.C."
  },
  {
    id: "geometria-luz",
    titulo: "La Gran Pirámide y la Velocidad de la Luz",
    icono: "📐",
    resumen: "La desconcertante coincidencia geográfica con la constante física y las proporciones matemáticas de Pi y Phi.",
    textoCompleto: "La Gran Pirámide de Keops guarda relaciones matemáticas asombrosas. Si se divide el perímetro de su base por el doble de su altura, se obtiene una aproximación casi exacta al número Pi (3.14159). Además, la relación entre la apotema y la mitad de la base describe con precisión la proporción áurea o Phi (1.618). Pero el dato más impactante pertenece a la física moderna: las coordenadas geográficas de la cúspide de la Gran Pirámide son exactamente 29.9792458° N de latitud, una cifra que coincide al milímetro con la velocidad de la luz en el vacío, medida en 299,792,458 metros por segundo. ¿Un guiño de una civilización avanzada o una coincidencia cósmica?"
  },
  {
    id: "sala-registros",
    titulo: "La Sala de los Registros Bajo la Esfinge",
    icono: "🦁",
    resumen: "Las lecturas de radar y sismógrafos que revelan grandes cavidades artificiales bajo las garras de la Gran Esfinge.",
    textoCompleto: "El místico Edgar Cayce profetizó que una cámara secreta, conocida como la 'Sala de los Registros', se encontraba oculta bajo la garra derecha de la Esfinge, albergando la sabiduría y archivos de una civilización perdida antediluviana. En la década de 1990, geofísicos como Thomas Dobecki y John Anthony West realizaron análisis sísmicos y radares de penetración terrestre (GPR). Los resultados confirmaron la presencia de una cavidad rectangular artificial de 12 por 9 metros, situada a unos 8 metros por debajo de las garras de la Esfinge. Hasta el día de hoy, el acceso y excavación de esta anomalía subterránea permanecen estrictamente restringido por las autoridades de egiptología."
  },
  {
    id: "acustica-camara",
    titulo: "Acústica y Resonancia a 432 Hz",
    icono: "🔊",
    resumen: "El comportamiento sónico del sarcófago de granito negro y los misterios de las ondas en la Cámara del Rey.",
    textoCompleto: "La Cámara del Rey, en el corazón de la Gran Pirámide, está construida enteramente con bloques macizos de granito rojo traídos desde Asuán. En su interior reposa el sarcófago, tallado en una sola pieza de granito negro. Diversos investigadores de la acústica han demostrado que la cámara y el sarcófago actúan como una caja de resonancia. Al emitir tonos sostenidos, el interior vibra y amplifica las frecuencias de 432 Hz y 110 Hz. Estas frecuencias específicas están vinculadas a estados de meditación profunda y estimulación de ondas cerebrales theta. Se cree que la pirámide no era una simple tumba, sino una máquina vibracional diseñada para rituales de iniciación y amplificación sónica."
  }
];

function MisterioCard({ m, estaActivo, onToggle }) {
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
    <div className={`misterio-card ${estaActivo ? "activo" : ""}`}>
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
        <button 
          className={`btn-robocop-lector ${leyendo ? "leyendo-activo" : ""}`}
          onClick={toggleLeerVoz}
          style={{ marginBottom: "15px", width: "100%" }}
          type="button"
        >
          {leyendo 
            ? `🛑 ${isEn ? "STOP AUDIO" : "DETENER AUDIO"}` 
            : `🔊 ${isEn ? "LISTEN ENIGMA" : "ESCUCHAR ENIGMA"}`}
        </button>
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

export default function Misterios() {
  const [activoId, setActivoId] = useState(null);

  const toggleActivo = (id) => {
    setActivoId(activoId === id ? null : id);
  };

  return (
    <div className="misterios-seccion">
      <header className="misterios-header">
        <h2 className="titulo-egipcio">𓁳 LOS MISTERIOS DE EGIPTO 𓁳</h2>
        <p className="subtitulo-seccion">
          Aquello que la arqueología oficial no puede responder. Investigaciones sobre alineación astronómica, física matemática y anomalías de resonancia.
        </p>
      </header>

      <div className="misterios-grid">
        {MISTERIOS_DATA.map((m) => (
          <MisterioCard 
            key={m.id} 
            m={m} 
            estaActivo={activoId === m.id} 
            onToggle={() => toggleActivo(m.id)} 
          />
        ))}
      </div>

      <div className="divisor-seccion">
        <span className="rombo-dorado"></span>
      </div>
    </div>
  );
}
