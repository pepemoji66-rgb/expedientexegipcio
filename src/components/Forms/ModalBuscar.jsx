import React from "react";

function ModalBuscar({
  modalBuscar,
  setModalBuscar,
  auth,
  buscarNombre,
  setBuscarNombre,
  buscarCiudad,
  setBuscarCiudad,
  buscarEdad,
  setBuscarEdad,
  buscarSexo,
  setBuscarSexo,
  handleBuscar,
  buscarTodos
}) {
  if (!modalBuscar || !auth) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => setModalBuscar(false)}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Buscar usuarios</h3>

        <form onSubmit={handleBuscar}>
          <input
            placeholder="Nombre"
            value={buscarNombre}
            onChange={(e) => setBuscarNombre(e.target.value)}
          />

          <input
            placeholder="Ciudad"
            value={buscarCiudad}
            onChange={(e) => setBuscarCiudad(e.target.value)}
          />

          <input
            type="number"
            placeholder="Edad"
            value={buscarEdad}
            onChange={(e) => setBuscarEdad(e.target.value)}
          />

          <select
            value={buscarSexo}
            onChange={(e) => setBuscarSexo(e.target.value)}
          >
            <option value="">Cualquiera</option>
            <option>Hombre</option>
            <option>Mujer</option>
            <option>Otro</option>
          </select>

          <button className="btn-form btn-yellow">
            Buscar
          </button>
        </form>

        <button
          className="btn-form btn-yellow"
          onClick={buscarTodos}
        >
          Buscar todos
        </button>
      </div>
    </div>
  );
}

export default ModalBuscar;
