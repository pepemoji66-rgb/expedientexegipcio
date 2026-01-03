import React from "react";

export default function ModalBuscar({ 
  modalBuscar, 
  setModalBuscar, 
  nombre, ciudad, edad, sexo, 
  setBusData, 
  handleBuscar,
  buscarTodos // <--- Importante que reciba esta función
}) {
  
  if (!modalBuscar) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="form-card modal-content">
        <h2 className="titulo-egipcio">Buscador de Almas</h2>
        
        {/* BOTÓN RÁPIDO PARA VER TODOS */}
        <button 
          className="btn-form btn-blue" 
          style={{ marginBottom: "15px" }}
          onClick={buscarTodos}
        >
          📜 MOSTRAR TODOS LOS USUARIOS
        </button>

        <div className="divisor-dorado"><span>O FILTRAR POR:</span></div>

        <form onSubmit={handleBuscar} className="panel-interno">
          <input type="text" name="nombre" placeholder="Nombre..." value={nombre} onChange={handleChange} />
          <input type="text" name="ciudad" placeholder="Ciudad..." value={ciudad} onChange={handleChange} />

          <div className="fila-mixta">
            <input type="number" name="edad" placeholder="Edad" value={edad} onChange={handleChange} />
            <select name="sexo" value={sexo} onChange={handleChange}>
              <option value="">Sexo</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>

          <button type="submit" className="btn-form btn-yellow">🔍 APLICAR FILTROS</button>
          <button type="button" className="btn-form btn-red" onClick={() => setModalBuscar(false)}>CERRAR</button>
        </form>
      </div>
    </div>
  );
}