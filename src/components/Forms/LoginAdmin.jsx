import React from "react";

function LoginAdmin({
  auth,
  adminNombre,
  setAdminNombre,
  adminPassword,
  setAdminPassword,
  handleLoginAdmin,
  logoutAdmin
}) {
  return (
    <div className="form-card">
      <h3>Acceso Administrador</h3>

      {!auth ? (
        <form onSubmit={handleLoginAdmin}>
          <input
            type="text"
            placeholder="Email de Administrador"
            value={adminNombre}
            onChange={(e) => setAdminNombre(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />

          <button className="btn-form btn-yellow" type="submit">
            Entrar
          </button>
        </form>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p>Administrador conectado</p>
          <button className="btn-form" onClick={logoutAdmin}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginAdmin;
