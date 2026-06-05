import React from "react";

export default function ModalRegistro({
  modalRegistro,
  setModalRegistro,
  regData, // Recibimos el objeto completo
  setRegData,
  handleRegistro
}) {

  if (!modalRegistro) return null;

  // Función para actualizar los campos dentro de regData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="form-card modal-content">
        <h2 className="titulo-egipcio">Nueva Inscripción</h2>
        <form onSubmit={handleRegistro} className="panel-interno">
          <input
            type="text"
            name="nombre"
            placeholder="Nick de Explorador"
            value={regData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={regData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-form btn-yellow">📜 INSCRIBIR EXPLORADOR</button>
          <button type="button" className="btn-form btn-red" onClick={() => setModalRegistro(false)}>CERRAR</button>
        </form>
      </div>
    </div>
  );
}