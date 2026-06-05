import React, { useState } from "react";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() && email.trim() && mensaje.trim()) {
      setEnviado(true);
      setNombre("");
      setEmail("");
      setMensaje("");
      alert("📨 Mensaje enviado a la arena del Templo. El Faraón responderá pronto.");
    } else {
      alert("Por favor, rellena todos los campos sagrados.");
    }
  };

  return (
    <div style={{ padding: "40px 20px", display: "flex", justifyContent: "center", minHeight: "80vh" }}>
      <div 
        className="papiro-tab-content" 
        style={{ 
          maxWidth: "600px", 
          width: "100%", 
          backgroundLinearGradient: "linear-gradient(rgba(244, 228, 188, 0.95), rgba(228, 204, 152, 0.95))",
          boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
          borderRadius: "8px"
        }}
      >
        <h2 className="papiro-title" style={{ textAlign: "center", textTransform: "uppercase" }}>
          𓇳 Formulario de Contacto 𓇳
        </h2>
        
        {enviado ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <span style={{ fontSize: "3rem" }}>✉️</span>
            <p className="papiro-text" style={{ fontWeight: "bold", marginTop: "15px" }}>
              ¡Tu mensaje ha sido enviado con éxito! 
            </p>
            <p className="papiro-text" style={{ fontSize: "0.95rem" }}>
              Nuestros sacerdotes procesarán tu consulta y te responderán a la brevedad.
            </p>
            <button 
              className="btn-tab-cartucho" 
              style={{ marginTop: "20px", background: "#5d4037", color: "#fff" }}
              onClick={() => setEnviado(false)}
            >
              ENVIAR OTRO MENSAJE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label style={{ fontWeight: "bold", color: "#3e2723" }}>Nombre / Nick</label>
              <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                placeholder="Escribe tu nombre..."
                required 
                style={{ 
                  padding: "10px", 
                  borderRadius: "5px", 
                  border: "1px solid #5d4037", 
                  background: "rgba(255, 255, 255, 0.5)",
                  color: "#3e2723"
                }}
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label style={{ fontWeight: "bold", color: "#3e2723" }}>Correo Electrónico</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Escribe tu email..."
                required 
                style={{ 
                  padding: "10px", 
                  borderRadius: "5px", 
                  border: "1px solid #5d4037", 
                  background: "rgba(255, 255, 255, 0.5)",
                  color: "#3e2723"
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label style={{ fontWeight: "bold", color: "#3e2723" }}>Mensaje</label>
              <textarea 
                rows="6"
                value={mensaje} 
                onChange={(e) => setMensaje(e.target.value)} 
                placeholder="¿Qué deseas transmitir al Faraón?..."
                required 
                style={{ 
                  padding: "10px", 
                  borderRadius: "5px", 
                  border: "1px solid #5d4037", 
                  background: "rgba(255, 255, 255, 0.5)",
                  color: "#3e2723",
                  fontFamily: "inherit"
                }}
              />
            </div>

            <button 
              type="submit" 
              className="btn-tab-cartucho" 
              style={{ 
                marginTop: "10px", 
                background: "#5d4037", 
                color: "#f4e4bc", 
                border: "none", 
                fontWeight: "bold",
                fontSize: "1.1rem"
              }}
            >
              𓋹 ENVIAR MENSAJE
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
