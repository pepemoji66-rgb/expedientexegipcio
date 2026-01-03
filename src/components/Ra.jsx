import React, { useState } from "react";
import "./ra.css";

const RESPUESTAS_RA = [
  "El tiempo revela lo que el hombre intenta ocultar.",
  "Quien escucha al desierto, encuentra su destino.",
  "La paciencia es la llave de las puertas eternas.",
  "No temas al cambio: el Nilo también cambia su cauce.",
  "La respuesta que buscas ya vive en ti.",
  "El sol no pregunta si debe salir. Simplemente lo hace.",
  "El sabio camina lento, pero llega más lejos.",
  "Nada se pierde bajo el sol de Ra."
];

export default function Ra() {
  const [mensaje, setMensaje] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);
  const [arena, setArena] = useState(false);

  // === NUEVO: ESTADOS PARA EL TEMA ===
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

  const enviarChat = (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;
    setCargando(true);
    setTimeout(() => {
      const aleatoria = RESPUESTAS_RA[Math.floor(Math.random() * RESPUESTAS_RA.length)];
      setRespuesta(aleatoria);
      setCargando(false);
    }, 1200);
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