import React from "react";

function ModalRegistro({
  modalRegistro,
  setModalRegistro,
  nombre,
  setNombre,
  email,
  setEmail,
  ciudad,
  setCiudad,
  edad,
  setEdad,
  sexo,
  setSexo,
  password,
  setPassword,
  handleRegistro
}) {
  if (!modalRegistro) return null;

  return (
    <div className="modal-overlay" onClick={() => setModalRegistro(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Crear cuenta</h3>

        <form onSubmit={handleRegistro}>
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Ciudad"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          />

          <input
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
          />

          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
          >
            <option value="">Sexo</option>
            <option>Hombre</option>
            <option>Mujer</option>
            <option>Otro</option>
          </select>

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn-form btn-yellow">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalRegistro;
