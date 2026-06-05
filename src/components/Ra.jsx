import React, { useState } from "react";
import axios from "axios";
import "./ra.css";

const obtenerRespuestaLocal = (text) => {
  const t = text.toLowerCase();
  
  if (t.includes("pirámide") || t.includes("piramide") || t.includes("construc") || t.includes("keops") || t.includes("kefren") || t.includes("micerino") || t.includes("bloque")) {
    const res = [
      "Las pirámides son resonadores de piedra alineados con el cosmos. Cada bloque guarda el pulso del Sol y el secreto de la ascensión divina.",
      "Keops, Kefrén y Micerino no fueron simples tumbas, sino templos de regeneración estelar. Mira sus proporciones y verás la firma del Universo.",
      "El desierto sostiene el peso de las pirámides, pero el secreto de su erección vive en la vibración acústica de las edades antiguas."
    ];
    return res[Math.floor(Math.random() * res.length)];
  }
  
  if (t.includes("esfinge") || t.includes("león") || t.includes("leon") || t.includes("guardian") || t.includes("guardián")) {
    const res = [
      "El gran guardián calizo custodia el horizonte. Debajo de su pata derecha reposa la Sala de los Registros, esperando a una era digna de su saber.",
      "La Esfinge mira hacia el este, esperando eternamente el amanecer cósmico. Su rostro ha visto nacer y morir dinastías enteras bajo la arena.",
      "¿Buscas la verdad de la Esfinge? Es el balance perfecto entre la fuerza salvaje del león y el discernimiento divino de la mente humana."
    ];
    return res[Math.floor(Math.random() * res.length)];
  }
  
  if (t.includes("orión") || t.includes("orion") || t.includes("estrella") || t.includes("cielo") || t.includes("cosmos") || t.includes("universo") || t.includes("astron")) {
    const res = [
      "La meseta de Giza es un mapa estelar esculpido en piedra. Como es arriba, es abajo; las tres pirámides son las joyas del Cinturón de Orión.",
      "Sigue el curso de las estrellas del norte. El alma del faraón viaja por los canales de ventilación directamente hacia el corazón de Orión y Sirio.",
      "El firmamento nocturno es el cuerpo de Nut. Cada estrella es una antorcha que ilumina el viaje de Ra a través del Duat."
    ];
    return res[Math.floor(Math.random() * res.length)];
  }
  
  if (t.includes("alien") || t.includes("extraterrestre") || t.includes("ovni") || t.includes("tecnología") || t.includes("futurista")) {
    const res = [
      "Atribuyes a otros mundos lo que tus ancestros lograron al sintonizarse con la Tierra y el orden cósmico (Ma'at). La sabiduría del pasado supera tus máquinas actuales.",
      "Los hombres del cielo descendieron en el Primer Tiempo (Zep Tepi). Ellos enseñaron la ciencia celeste, pero fueron las manos unidas de Kemet las que alzaron la piedra.",
      "El conocimiento no vino del espacio exterior, sino del espacio interior. Cuando el ser humano resuena con la frecuencia terrestre, no hay límite para su creación."
    ];
    return res[Math.floor(Math.random() * res.length)];
  }
  
  if (t.includes("futuro") || t.includes("mañana") || t.includes("destino") || t.includes("tiempo") || t.includes("pasar")) {
    const res = [
      "El futuro es como las crecidas del Nilo: predecible en su ciclo, pero moldeable en su fuerza. Siembra buena semilla hoy y cosecharás gloria mañana.",
      "Las arenas cambian con el viento, al igual que tu destino. No temas a lo que vendrá; mantén firme tu timón y confía en el sol que renace cada mañana.",
      "El tiempo es una ilusión del desierto. Lo que fue, será de nuevo; tus acciones actuales esculpen el monumento de tu posteridad."
    ];
    return res[Math.floor(Math.random() * res.length)];
  }
  
  if (t.includes("oro") || t.includes("tesoro") || t.includes("riqueza") || t.includes("dinero") || t.includes("moneda") || t.includes("rico")) {
    const res = [
      "El verdadero oro de Ra no se guarda en vasijas de barro ni en cámaras acorazadas. Es la luz del discernimiento y la templanza espiritual.",
      "Buscador de tesoros, las garras de la codicia solo conducen a la oscuridad de las tumbas profanadas. Llena tu mente de saber y serás el hombre más rico del desierto.",
      "La luz dorada del Sol del mediodía es el mayor tesoro. Nutre las cosechas, calienta el espíritu y no puede ser robada por los hombres de arena."
    ];
    return res[Math.floor(Math.random() * res.length)];
  }
  
  if (t.includes("muerte") || t.includes("morir") || t.includes("fin") || t.includes("tumba") || t.includes("momia") || t.includes("difunto")) {
    const res = [
      "La muerte no es el ocaso definitivo, sino la barca nocturna que cruza el río hacia el renacimiento en los campos eternos de Aaru.",
      "Tu corazón será pesado en la balanza de Ma'at frente a la pluma de la verdad. Vive con ligereza, sin el peso del rencor ni la mentira.",
      "El viaje del alma a través de las doce horas de la noche es arduo, pero Ra siempre emerge en el este al amanecer. Confía en el ciclo eterno."
    ];
    return res[Math.floor(Math.random() * res.length)];
  }
  
  if (t.includes("dios") || t.includes("anubis") || t.includes("horus") || t.includes("osiris") || t.includes("isis") || t.includes("thot") || t.includes("amón")) {
    const res = [
      "Los dioses de Kemet son los principios de la naturaleza y del alma humana. Thot es la sabiduría, Anubis el camino correcto, y Horus tu fuerza de voluntad.",
      "Invoca la mirada del halcón de Horus para vencer tus miedos y el cayado de Osiris para gobernar tus pasiones interiores.",
      "El Sol central une todas las deidades en un solo hálito de luz. Encuentra la chispa divina que yace en tu propio pecho."
    ];
    return res[Math.floor(Math.random() * res.length)];
  }
  
  if (t.includes("nilo") || t.includes("agua") || t.includes("río") || t.includes("rio") || t.includes("barca")) {
    const res = [
      "El Nilo es el cordón de plata de Egipto. Sin su crecida anual, las arenas devorarían toda la vida. Sé como el río: fluye y fertiliza a tu paso.",
      "Navegar contra la corriente del Nilo exige esfuerzo y vela; navegar a favor exige timón y paciencia. Conoce en qué época del año te encuentras.",
      "El agua limpia las impurezas de la carne y el espíritu. Bebe de la sabiduría antigua y sacia la sed de tu alma viajera."
    ];
    return res[Math.floor(Math.random() * res.length)];
  }
  
  if (t.includes("antigrav") || t.includes("gemini") || t.includes("inteligencia") || t.includes("bot") || t.includes("ia") || t.includes("ordenador") || t.includes("computa")) {
    const res = [
      "Las mentes hechas de luz y silicio son el reflejo moderno de las tablas de Thot. Úsalas para buscar la verdad, no para perderte en el laberinto del ego.",
      "Un oráculo digital es solo un espejo que refleja la pregunta del viajero. El verdadero entendimiento florece solo en tu conciencia.",
      "Los circuitos electrónicos resuenan con la electricidad, al igual que los templos de granito resuenan con las frecuencias del cosmos."
    ];
    return res[Math.floor(Math.random() * res.length)];
  }
  
  if (t.includes("hola") || t.includes("saludo") || t.includes("buenos") || t.includes("tardes") || t.includes("noches") || t.includes("hey")) {
    return "Saludos, viajero del tiempo y de la historia. Te doy la bienvenida al Templo de Ra. ¿Qué enigma perturba el horizonte de tu mente?";
  }
  
  if (t.includes("gracias") || t.includes("agradece") || t.includes("amable")) {
    return "Que las bendiciones de Ra entibien tu sendero, y que el viento del desierto borre tus penas pasadas. Sigue en paz.";
  }

  const genericas = [
    "El silencio de la arena contiene todas las respuestas. Escucha el susurro del viento del desierto.",
    "No busques agua en el desierto sin antes haber aprendido a agradecer la sed. Medita tu pregunta.",
    "El sol se oculta en el oeste solo para renacer con mayor fuerza en el este. Tu situación actual también pasará.",
    "Lo que está oculto bajo las arenas del tiempo se revelará cuando tu corazón esté tan ligero como una pluma.",
    "Los misterios del Templo no se entregan al impaciente. El Faraón observa tu perseverancia.",
    "Cada palabra que pronuncias resuena en la Cámara del Rey. Elige tus pensamientos con sabiduría sagrada.",
    "Como el escarabajo Khepri empuja el sol a través de la noche, tú debes empujar tus propósitos hacia la luz.",
    "El ojo de Horus vigila tus intenciones. Asegúrate de que tu búsqueda sea por el bien del saber.",
    "La respuesta que buscas no está en los libros de los hombres, sino en el templo silencioso que habita en ti."
  ];
  
  return genericas[Math.floor(Math.random() * genericas.length)];
};

export default function Ra() {
  const [mensaje, setMensaje] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);
  const [arena, setArena] = useState(false);

  // === ESTADOS PARA EL TEMA ===
  const [temaRa, setTemaRa] = useState("rgba(0, 0, 0, 0.4)"); 
  const [colorTexto, setColorTexto] = useState("#ffd700");

  const reproducirTormenta = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const bufferSize = ctx.sampleRate * 1;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const source = ctx.createBufferSource();
      source.buffer = noiseBuffer;
      const gain = ctx.createGain();
      gain.gain.value = 0.2;
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start();
    } catch {}
  };

  const limpiarTodo = () => {
    reproducirTormenta();
    setArena(true);
    setTimeout(() => {
      setMensaje("");
      setRespuesta("");
      setArena(false);
    }, 600);
  };

  const enviarChat = async (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;
    setCargando(true);
    setRespuesta("");

    try {
      const baseURL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") 
        ? "http://localhost:5000" 
        : "";
      
      const res = await axios.post(`${baseURL}/api/ra`, { mensaje });

      if (res.data && res.data.ok && !res.data.fallback) {
        setRespuesta(res.data.respuesta);
      } else {
        const localAns = obtenerRespuestaLocal(mensaje);
        setRespuesta(localAns);
      }
    } catch (error) {
      console.warn("⚠️ Error conectando al endpoint /api/ra, usando fallback local:", error.message);
      const localAns = obtenerRespuestaLocal(mensaje);
      setRespuesta(localAns);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={`ra-wrapper ${arena ? "efecto-arena" : ""}`} style={{ backgroundColor: temaRa, transition: "0.5s all", padding: "20px", borderRadius: "15px" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <button className="refresh-btn" onClick={limpiarTodo}>🔄</button>
        
        {/* === BOTONERA DE TEMAS PARA RA === */}
        <div style={{ background: "rgba(0,0,0,0.5)", padding: "5px 10px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "white", fontSize: "0.7rem" }}>Ambiente:</span>
          <button type="button" onClick={() => { setTemaRa("#f4e4bc"); setColorTexto("#5d4037"); }} style={{ background: "#f4e4bc", border: "none", cursor: "pointer", borderRadius: "50%", width: "20px", height: "20px" }}>🏜️</button>
          <button type="button" onClick={() => { setTemaRa("#1a3a5a"); setColorTexto("#ffffff"); }} style={{ background: "#1a3a5a", border: "none", cursor: "pointer", borderRadius: "50%", width: "20px", height: "20px" }}>💧</button>
          <button type="button" onClick={() => { setTemaRa("#000000"); setColorTexto("#ffd700"); }} style={{ background: "#000000", border: "1px solid #ffd700", cursor: "pointer", borderRadius: "50%", width: "20px", height: "20px" }}>👑</button>
        </div>
      </div>

      <h2 className="ra-titulo" style={{ color: colorTexto }}>Lo que Ra disponga</h2>

      <form onSubmit={enviarChat} className="ra-form">
        <textarea
          className="ra-textarea"
          style={{ backgroundColor: "rgba(255,255,255,0.1)", color: colorTexto, border: `1px solid ${colorTexto}` }}
          placeholder="Escribe tu consulta para Ra..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
        <button className="ra-btn" type="submit" style={{ backgroundColor: colorTexto, color: temaRa === "#f4e4bc" ? "#fff" : "#000" }}>
          {cargando ? "Consultando a Ra..." : "Preguntar"}
        </button>
      </form>

      {respuesta && (
        <div className="ra-respuesta" style={{ borderTop: `2px solid ${colorTexto}`, marginTop: "20px", color: colorTexto }}>
          <h3 style={{ color: colorTexto }}>Oráculo de Ra:</h3>
          <p style={{ fontStyle: "italic", fontSize: "1.2rem" }}>"{respuesta}"</p>
        </div>
      )}
    </div>
  );
}