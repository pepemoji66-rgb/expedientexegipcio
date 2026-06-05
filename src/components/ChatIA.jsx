import React, { useState, useEffect, useRef } from "react";
import api from "../api";
import "./chatIA.css";

export default function ChatIA() {
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);

  // === NUEVO: ESTADOS PARA EL TEMA PERSONALIZADO ===
  const [temaChat, setTemaChat] = useState("rgba(255, 255, 255, 0.1)");
  const [colorTexto, setColorTexto] = useState("#ffffff");

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes, escribiendo]);

  const enviarMensaje = async () => {
    if (!input.trim()) return;

    const nuevoMensaje = {
      autor: "usuario",
      texto: input
    };

    setMensajes((prev) => [...prev, nuevoMensaje]);
    setInput("");
    setEscribiendo(true);

    try {
      const res = await api.post("/chat", {
        mensaje: nuevoMensaje.texto
      });

      const respuestaIA = {
        autor: "ia",
        texto: res.data.respuesta
      };

      setMensajes((prev) => [...prev, respuestaIA]);
    } catch (error) {
      setMensajes((prev) => [
        ...prev,
        { autor: "ia", texto: "Hubo un error al conectar con la IA." }
      ]);
    }

    setEscribiendo(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") enviarMensaje();
  };

  return (
    <div className="chat-egipcio-wrapper">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          🔄
        </button>

        {/* === NUEVA BOTONERA DE TEMAS PARA LA IA === */}
        <div style={{ padding: "5px", background: "rgba(0,0,0,0.3)", borderRadius: "10px" }}>
          <span style={{ color: "#fff", marginRight: "8px", fontSize: "0.7rem" }}>Ambiente:</span>
          <button onClick={() => { setTemaChat("#f4e4bc"); setColorTexto("#5d4037"); }} style={{ background: "#f4e4bc", border: "none", cursor: "pointer", borderRadius: "4px", marginRight: "5px" }}>🏜️</button>
          <button onClick={() => { setTemaChat("#1a3a5a"); setColorTexto("#ffffff"); }} style={{ background: "#1a3a5a", border: "none", cursor: "pointer", borderRadius: "4px", marginRight: "5px" }}>💧</button>
          <button onClick={() => { setTemaChat("#000000"); setColorTexto("#ffd700"); }} style={{ background: "#000000", border: "1px solid #ffd700", cursor: "pointer", borderRadius: "4px" }}>👑</button>
        </div>
      </div>

      <h2 className="chat-titulo">Chat del Faraón</h2>

      {/* === APLICAMOS EL TEMA AL CONTENEDOR === */}
      <div 
        className="chat-contenedor" 
        ref={chatRef} 
        style={{ backgroundColor: temaChat, transition: "0.5s all" }}
      >
        {mensajes.map((msg, index) => (
          <div
            key={index}
            className={`mensaje-burbuja ${msg.autor === "usuario" ? "user" : "ia"}`}
            style={{ 
                color: msg.autor === "usuario" ? "#fff" : colorTexto,
                borderLeft: msg.autor === "ia" ? `4px solid ${colorTexto}` : "none"
            }}
          >
            {msg.texto}
          </div>
        ))}

        {escribiendo && (
          <div className="mensaje-burbuja ia escribiendo" style={{ color: colorTexto }}>
            El oráculo está redactando...
          </div>
        )}
      </div>

      <div className="chat-input-box">
        <input
          type="text"
          placeholder="Escribe tu pregunta, viajero..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button onClick={enviarMensaje}>Enviar</button>
      </div>
    </div>
  );
}