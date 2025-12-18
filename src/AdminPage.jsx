import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";

function AdminPage({ usuariosFiltrados = [] }) {

  const [usuarios, setUsuarios] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 10;

  // Cargar todos o filtrados
  useEffect(() => {
    if (usuariosFiltrados.length === 0) {
      cargarUsuarios();
    } else {
      setUsuarios(usuariosFiltrados);
      setPaginaActual(1);
    }
  }, [usuariosFiltrados]);

  const cargarUsuarios = async () => {
    const res = await axios.get("http://localhost:5000/api/usuarios");
    setUsuarios(res.data);
  };

  // ELIMINAR UNO
  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    await axios.delete(`http://localhost:5000/api/usuarios/${id}`);
    cargarUsuarios();
  };

  // ELIMINAR TODOS
  const eliminarTodos = async () => {
    if (!window.confirm("⚠ Esto borrará TODOS los usuarios. ¿Seguro?")) return;

    await axios.delete("http://localhost:5000/api/usuarios");
    cargarUsuarios();
  };

  // PAGINACIÓN
  const indiceUltimo = paginaActual * usuariosPorPagina;
  const indicePrimero = indiceUltimo - usuariosPorPagina;
  const usuariosActuales = usuarios.slice(indicePrimero, indiceUltimo);

  const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);

  const cambiarPagina = (num) => {
    if (num >= 1 && num <= totalPaginas) {
      setPaginaActual(num);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#f4e6b2" }}>
        Panel de Administración
      </h2>

      {/* BOTÓN VOLVER */}
      <button
        onClick={() => (window.location.href = "/")}
        style={{
          background: "#888",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ⬅ Volver
      </button>

      {/* BOTÓN ELIMINAR TODOS */}
      <button
        onClick={eliminarTodos}
        style={{
          background: "red",
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
          marginLeft: "10px",
        }}
      >
        ❌ Eliminar TODOS
      </button>

      {/* TABLA */}
      <div className="tabla-contenedor">
        <table className="tabla-egipcia">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Ciudad</th>
              <th>Edad</th>
              <th>Sexo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuariosActuales.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.email}</td>
                <td>{user.ciudad}</td>
                <td>{user.edad}</td>
                <td>{user.sexo}</td>
                <td>
                  <button
                    className="btn-eliminar-egipcio"
                    onClick={() => eliminarUsuario(user.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CONTROLES DE PAGINACIÓN */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          style={{ marginRight: "10px" }}
        >
          ⬅ Anterior
        </button>

        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => cambiarPagina(i + 1)}
            style={{
              margin: "0 5px",
              background: paginaActual === i + 1 ? "#c4a552" : "#333",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          style={{ marginLeft: "10px" }}
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
}

export default AdminPage;
