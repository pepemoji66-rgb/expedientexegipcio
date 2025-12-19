import React, { useState, useEffect } from "react";
import api from "./api";
import "./admin.css";

function AdminPage({
  usuariosFiltrados = [],
  imagenesGaleria = [],
  setImagenesGaleria
}) {
  // =========================
  // USUARIOS
  // =========================
  const [usuarios, setUsuarios] = useState([]);
  const [paginaUsuarios, setPaginaUsuarios] = useState(1);
  const usuariosPorPagina = 10;

  useEffect(() => {
    if (usuariosFiltrados.length === 0) {
      cargarUsuarios();
    } else {
      setUsuarios(usuariosFiltrados);
      setPaginaUsuarios(1);
    }
  }, [usuariosFiltrados]);

  const cargarUsuarios = async () => {
    const res = await api.get("/usuarios");
    setUsuarios(res.data);
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    await api.delete(`/usuarios/${id}`);
    cargarUsuarios();
  };

  const eliminarTodos = async () => {
    if (!window.confirm("⚠ Esto borrará TODOS los usuarios. ¿Seguro?")) return;
    await api.delete("/usuarios");
    cargarUsuarios();
  };

  const indiceUltimoUsuario = paginaUsuarios * usuariosPorPagina;
  const indicePrimerUsuario = indiceUltimoUsuario - usuariosPorPagina;
  const usuariosActuales = usuarios.slice(
    indicePrimerUsuario,
    indiceUltimoUsuario
  );

  const totalPaginasUsuarios = Math.ceil(
    usuarios.length / usuariosPorPagina
  );

  // =========================
  // GALERÍA (PAGINADA)
  // =========================
  const imagenesPorPagina = 10;
  const [paginaGaleria, setPaginaGaleria] = useState(1);

  const totalPaginasGaleria = Math.ceil(
    imagenesGaleria.length / imagenesPorPagina
  );

  const indiceUltimaImg = paginaGaleria * imagenesPorPagina;
  const indicePrimeraImg = indiceUltimaImg - imagenesPorPagina;

  const imagenesPagina = imagenesGaleria.slice(
    indicePrimeraImg,
    indiceUltimaImg
  );

  const toggleVisibleImagen = (id) => {
    setImagenesGaleria((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, visible: !img.visible } : img
      )
    );
  };

  const eliminarImagen = (id) => {
    if (!window.confirm("¿Seguro que quieres borrar esta imagen?")) return;

    setImagenesGaleria((prev) =>
      prev.filter((img) => img.id !== id)
    );
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#f4e6b2" }}>
        Panel de Administración
      </h2>

      <button
        onClick={() => (window.location.href = "/")}
        style={{ marginBottom: "20px" }}
      >
        ⬅ Volver
      </button>

      {/* =========================
          USUARIOS
      ========================= */}
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

      {/* PAGINACIÓN USUARIOS */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {Array.from({ length: totalPaginasUsuarios }, (_, i) => (
          <button
            key={i}
            onClick={() => setPaginaUsuarios(i + 1)}
            style={{
              margin: "0 5px",
              background: paginaUsuarios === i + 1 ? "#c4a552" : "#333",
              color: "white"
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* =========================
          GALERÍA
      ========================= */}
      <hr style={{ margin: "50px 0" }} />

      <h3 style={{ color: "#f4e6b2" }}>Gestión de Galería</h3>

      <div className="tabla-contenedor">
        <table className="tabla-egipcia">
          <thead>
            <tr>
              <th>ID</th>
              <th>Miniatura</th>
              <th>Título</th>
              <th>Visible</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {imagenesPagina.map((img) => (
              <tr key={img.id}>
                <td>{img.id}</td>
                <td>
                  <img
                    src={img.src}
                    alt={img.titulo}
                    style={{ width: "70px", borderRadius: "6px" }}
                  />
                </td>
                <td>{img.titulo}</td>
                <td>{img.visible ? "Sí" : "No"}</td>
                <td>
                  <button
                    onClick={() => toggleVisibleImagen(img.id)}
                    style={{
                      background: img.visible ? "#b33" : "#2a8",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "4px"
                    }}
                  >
                    {img.visible ? "Ocultar" : "Mostrar"}
                  </button>

                  <button
                    onClick={() => eliminarImagen(img.id)}
                    style={{
                      background: "#000",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      marginLeft: "6px"
                    }}
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN GALERÍA */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {Array.from({ length: totalPaginasGaleria }, (_, i) => (
          <button
            key={i}
            onClick={() => setPaginaGaleria(i + 1)}
            style={{
              margin: "0 5px",
              background: paginaGaleria === i + 1 ? "#c4a552" : "#333",
              color: "white"
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
