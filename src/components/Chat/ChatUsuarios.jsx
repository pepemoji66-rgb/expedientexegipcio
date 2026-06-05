import React, { useEffect, useRef, useState, useContext } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./chatUsuarios.css";

export default function ChatUsuarios({ setSeccionActiva }) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);

  // === NUEVO: ESTADOS PARA PERSONALIZAR EL COLOR ===
  const [temaChat, setTemaChat] = useState("rgba(255, 255, 255, 0.1)"); // Fondo transparente suave
  const [colorTexto, setColorTexto] = useState("#ffffff"); // Texto blanco por defecto

  const conversationId = "sala-prueba";

  const storedUser = localStorage.getItem("user");
  const chatUser = storedUser
    ? JSON.parse(storedUser)
    : auth
    ? { id: 0, nombre: "ADMIN" }
    : null;

  useEffect(() => {
    if (!chatUser) return;
    const socketURL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") 
      ? "http://localhost:5000" 
      : "";
    socketRef.current = io(socketURL);
    socketRef.current.emit("joinConversation", { conversationId });
    socketRef.current.on("chatHistory", (history) => {
      setMensajes(history);
    });
    socketRef.current.on("receiveMessage", (message) => {
      setMensajes((prev) => [...prev, message]);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [chatUser]);

  const enviarMensaje = () => {
    if (!input.trim() || !chatUser) return;
    const nuevoMensaje = {
      senderId: chatUser.id,
      senderNombre: chatUser.nombre,
      content: input
    };
    setMensajes((prev) => [...prev, nuevoMensaje]);
    socketRef.current.emit("sendMessage", {
      conversationId,
      ...nuevoMensaje
    });
    setInput("");
  };

  const borrarChat = () => {
    if (!window.confirm("¿Seguro que quieres borrar todo el chat?")) return;
    socketRef.current.emit("clearChat", { conversationId });
    setMensajes([]);
  };

  const volverInicio = () => {
    setSeccionActiva("inicio");
    navigate("/", { replace: true });
  };

  if (!chatUser) {
    return (
      <p style={{ textAlign: "center", color: "#f5c36a" }}>
        Debes iniciar sesión como usuario o administrador para usar el chat
      </p>
    );
  }

  return (
    <div className="chat-container">
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <button onClick={volverInicio} style={{ marginBottom: "10px", background: "#d4a657", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
          ⬅️ Volver al inicio
        </button>

        {/* === NUEVA BOTONERA DE TEMAS === */}
        <div style={{ marginBottom: "10px", padding: "5px", background: "rgba(0,0,0,0.3)", borderRadius: "10px" }}>
          <span style={{ color: "#fff", marginRight: "10px", fontSize: "0.8rem" }}>Tema:</span>
          <button onClick={() => { setTemaChat("#f4e4bc"); setColorTexto("#5d4037"); }} style={{ background: "#f4e4bc", border: "none", cursor: "pointer", borderRadius: "4px", marginRight: "5px" }}>🏜️</button>
          <button onClick={() => { setTemaChat("#1a3a5a"); setColorTexto("#ffffff"); }} style={{ background: "#1a3a5a", border: "none", cursor: "pointer", borderRadius: "4px", marginRight: "5px" }}>💧</button>
          <button onClick={() => { setTemaChat("#000000"); setColorTexto("#ffd700"); }} style={{ background: "#000000", border: "1px solid #ffd700", cursor: "pointer", borderRadius: "4px" }}>👑</button>
        </div>

        <button onClick={borrarChat} style={{ marginBottom: "15px", background: "#c62828", color: "#fff", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
          🗑️ Borrar chat
        </button>
      </div>

      <h2 style={{ textAlign: "center", color: "#f5c36a" }}>Chat de Usuarios</h2>

      {/* === APLICAMOS EL TEMA AQUÍ (style={{ backgroundColor: temaChat, color: colorTexto }}) === */}
      <div className="chat-messages" style={{ backgroundColor: temaChat, color: colorTexto, transition: "0.3s" }}>
        {mensajes.map((msg, index) => (
          <div key={index} className="chat-message" style={{ borderBottom: `1px solid ${colorTexto}33` }}>
            <strong style={{ color: colorTexto === "#ffffff" ? "#f5c36a" : "inherit" }}>
              {msg.senderNombre}:
            </strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
        />
        <button onClick={enviarMensaje}>Enviar</button>
      </div>
    </div>
  );
}