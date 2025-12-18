import React from "react";

export default function SelectorAcceso({ tipoAcceso, setTipoAcceso }) {
  return (
    <>
      {/* SELECTOR INICIAL */}
      {!tipoAcceso && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "25px"
          }}
        >
          <button
            className="btn-form btn-blue"
            onClick={() => setTipoAcceso("usuario")}
          >
            👤 Usuario
          </button>

          <button
            className="btn-form btn-red"
            onClick={() => setTipoAcceso("admin")}
          >
            🔐 Administrador
          </button>
        </div>
      )}

      {/* BOTÓN VOLVER */}
      {tipoAcceso && (
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <button
            className="btn-form btn-red"
            onClick={() => setTipoAcceso(null)}
          >
            ⬅ Volver
          </button>
        </div>
      )}
    </>
  );
}
