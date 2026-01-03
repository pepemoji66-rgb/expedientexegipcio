import React from "react";

export default function ModalRegistro({ 
  modalRegistro, 
  setModalRegistro, 
  nombre, email, ciudad, edad, sexo, password, // Vienen de ...regData
  setRegData, 
  handleRegistro 
}) {
  
  if (!modalRegistro) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="form-card modal-content">
        <h2 className="titulo-egipcio">Nueva Inscripción</h2>
        <form onSubmit={handleRegistro} className="panel-interno">
          <input type="text" name="nombre" placeholder="Nombre completo" value={nombre} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email sagrado" value={email} onChange={handleChange} required />
          <input type="text" name="ciudad" placeholder="Ciudad" value={ciudad} onChange={handleChange} />
          
          <div className="fila-mixta">
            <input type="number" name="edad" placeholder="Edad" value={edad} onChange={handleChange} />
            <select name="sexo" value={sexo} onChange={handleChange}>
              <option value="">Sexo</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>

          <input type="password" name="password" placeholder="Contraseña" value={password} onChange={handleChange} required />

          <button type="submit" className="btn-form btn-yellow">📜 REGISTRAR ALMA</button>
          <button type="button" className="btn-form btn-red" onClick={() => setModalRegistro(false)}>CERRAR</button>
        </form>
      </div>
    </div>
  );
}