import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./chatIA.css";

export default function ChatIA() {

  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);

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
      const res = await axios.post("http://localhost:5000/api/chat", {
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

      <button className="refresh-btn" onClick={() => window.location.reload()}>
        🔄
      </button>

      <h2 className="chat-titulo">Chat del Faraón</h2>

      <div className="chat-contenedor" ref={chatRef}>
        {mensajes.map((msg, index) => (
          <div
            key={index}
            className={`mensaje-burbuja ${msg.autor === "usuario" ? "user" : "ia"}`}
          >
            {msg.texto}
          </div>
        ))}

        {escribiendo && (
          <div className="mensaje-burbuja ia escribiendo">
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
