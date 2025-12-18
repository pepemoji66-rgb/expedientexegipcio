import React from "react";

export default function MapaInteractivo({ setSeccionActiva }) {
  return (
    <div style={{ padding: 20 }}>

      {/* BOTÓN PARA CERRAR */}
      <button
        onClick={() => setSeccionActiva("inicio")}
        style={{
          background: "red",
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        ⬅ Cerrar Mapa
      </button>

      <h2 style={{ marginBottom: "20px" }}>Mapa Interactivo: Pirámides de Giza</h2>

      {/* MAPA EMBEBIDO DE GOOGLE MAPS */}
      <div style={{ width: "100%", height: "500px", borderRadius: "10px", overflow: "hidden" }}>
        <iframe
          title="Mapa de las Pirámides"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55236.80135395886!2d31.119870022109923!3d29.97729680065687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584587b6ac48bb%3A0xdda5ec6b4b38183b!2sGran%20Pir%C3%A1mide%20de%20Giza!5e0!3m2!1ses!2ses!4v1709484440000"
        ></iframe>
      </div>

    </div>
  );
}
