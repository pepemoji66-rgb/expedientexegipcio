import React, { useState } from "react";
import "./ra.css";

export default function Ra() {

  const [mensaje, setMensaje] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);
  const [arena, setArena] = useState(false);

  // 🌪️ GENERADOR DE SONIDO: "Tormenta de arena"
  const reproducirTormenta = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = false;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 650;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
    } catch (err) {
      console.log("Audio no soportado o bloqueado por el navegador.");
    }
  };

  // 🔄 Limpiar solo inputs con sonido + arena
  const limpiarTodo = () => {
    reproducirTormenta();
    setArena(true);

    setTimeout(() => {
      setMensaje("");
      setRespuesta("");
      setArena(false);
    }, 800);
  };

  const enviarChat = async (e) => {
    e.preventDefault();

    if (!mensaje.trim()) return;

    setCargando(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje }),
      });

      const data = await res.json();
      setRespuesta(data.respuesta);

    } catch (error) {
      setRespuesta("⚠ Error contactando con la sabiduría de Ra.");
    }

    setCargando(false);
  };

  return (
    <div className={`ra-wrapper ${arena ? "efecto-arena" : ""}`}>

      {/* BOTÓN LIMPIAR */}
      <button className="refresh-btn" onClick={limpiarTodo}>
        <svg width="22" height="22" fill="#f4e6b2" viewBox="0 0 24 24">
          <path d="M3 12h18M12 3v18" stroke="#f4e6b2" strokeWidth="2"/>
        </svg>
      </button>

      <h2 className="ra-titulo">Lo que Ra disponga</h2>

      <form onSubmit={enviarChat} className="ra-form">
        <textarea
          className="ra-textarea"
          placeholder="Escribe tu consulta para Ra..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></textarea>

        <button className="ra-btn" type="submit">
          {cargando ? "Consultando a Ra..." : "Preguntar"}
        </button>
      </form>

      {respuesta && (
        <div className="ra-respuesta">
          <h3>Oráculo de Ra:</h3>
          <p>{respuesta}</p>
        </div>
      )}
    </div>
  );
}
