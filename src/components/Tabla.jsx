import React from "react";

function Tabla() {
  const registros = JSON.parse(localStorage.getItem("usuarios")) || [];
  const admin = localStorage.getItem("admin");

  // Si NO eres admin, no puedes entrar
  if (admin !== "ok") {
    return (
      <section className="tabla-wrapper">
        <div className="tabla-container">
          <h2>Acceso denegado</h2>
          <p>No tienes permisos para ver estos datos.</p>
          <a className="volver-btn" href="/" onClick={() => localStorage.removeItem("admin")}>
            Volver
          </a>
        </div>
      </section>
    );
  }

  // BORRAR UN SOLO USUARIO
  const borrarUsuario = (index) => {
    if (window.confirm("¿Quieres borrar este usuario?")) {
      const nuevos = registros.filter((_, i) => i !== index);
      localStorage.setItem("usuarios", JSON.stringify(nuevos));
      window.location.reload();
    }
  };

  // BORRAR TODOS
  const borrarTodos = () => {
    if (window.confirm("¿Estás seguro de borrar TODOS los usuarios?")) {
      localStorage.removeItem("usuarios");
      window.location.reload();
    }
  };

  return (
    <section className="tabla-wrapper">
      <div className="tabla-container">
        <h2>Usuarios Registrados</h2>

        {registros.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          <>
            <button className="btn-borrar" onClick={borrarTodos}>
              Borrar TODOS los registros
            </button>

            <table className="tabla-usuarios">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Ciudad</th>
                  <th>Edad</th>
                  <th>Sexo</th>
                  <th>Fecha</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((u, i) => (
                  <tr key={i}>
                    <td>{u.nombre}</td>
                    <td>{u.email}</td>
                    <td>{u.ciudad}</td>
                    <td>{u.edad}</td>
                    <td>{u.sexo}</td>
                    <td>{u.fecha}</td>
                    <td>
                      <button
                        className="btn-borrar"
                        style={{ padding: "5px 10px", background: "rgb(160,0,0)" }}
                        onClick={() => borrarUsuario(i)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <a
          className="volver-btn"
          href="/"
          onClick={() => localStorage.removeItem("admin")}
        >
          Cerrar sesión y volver
        </a>
      </div>
    </section>
  );
}

export default Tabla;
