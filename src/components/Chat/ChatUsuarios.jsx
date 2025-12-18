import React, { useEffect, useRef, useState, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../AuthContext";
import "./chatUsuarios.css";

export default function ChatUsuarios() {
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);

  const { auth } = useContext(AuthContext); // admin logueado
  const conversationId = "sala-prueba";

  // ===============================
  //   IDENTIDAD PARA EL CHAT
  // ===============================
  let chatUser = null;

  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    // Usuario normal
    chatUser = JSON.parse(storedUser);
  } else if (auth) {
    // Admin ficticio
    chatUser = {
      id: 0,
      nombre: "ADMIN"
    };
  }

  useEffect(() => {
    if (!chatUser) return;

    socketRef.current = io("http://localhost:5000");

    socketRef.current.emit("joinConversation", { conversationId });

    socketRef.current.on("chatHistory", (history) => {
      setMensajes(history);
    });

    socketRef.current.on("receiveMessage", (message) => {
      setMensajes((prev) => [...prev, message]);
    });

    socketRef.current.on("chatCleared", () => {
      setMensajes([]);
    });

    return () => socketRef.current.disconnect();
  }, []);

  // ===============================
  //   ENVIAR MENSAJE
  // ===============================
  const enviarMensaje = () => {
    if (!input.trim() || !chatUser) return;

    socketRef.current.emit("sendMessage", {
      conversationId,
      senderId: chatUser.id,
      senderNombre: chatUser.nombre,
      content: input
    });

    setInput("");
  };

  // ===============================
  //   BORRAR CHAT
  // ===============================
  const borrarChat = () => {
    if (!window.confirm("¿Seguro que quieres borrar todo el chat?")) return;

    socketRef.current.emit("clearChat", { conversationId });
  };

  if (!chatUser) {
    return (
      <p style={{ textAlign: "center", color: "#f5c36a" }}>
        Debes iniciar sesión como usuario o administrador para usar el chat
      </p>
    );
  }

  return (
    <>
      <h2 style={{ textAlign: "center", color: "#f5c36a" }}>
        Chat Usuarios
      </h2>

      <div className="chat-container">
        <button
          onClick={borrarChat}
          style={{
            marginBottom: "10px",
            background: "#c62828",
            color: "#fff",
            border: "none",
            padding: "6px 10px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          🗑️ Borrar chat
        </button>

        <div className="chat-messages">
          {mensajes.map((msg, index) => {
            const esMio = msg.senderNombre === chatUser.nombre;

            return (
              <div
                key={index}
                className={`chat-message ${esMio ? "own" : "other"}`}
              >
                <div className="chat-user">{msg.senderNombre}</div>
                {msg.content}
              </div>
            );
          })}
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
    </>
  );
}
