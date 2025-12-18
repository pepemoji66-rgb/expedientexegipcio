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
      <h3>Login Admin</h3>

      {auth ? (
        <button className="btn-form btn-red" onClick={logoutAdmin}>
          Cerrar sesión
        </button>
      ) : (
        <form onSubmit={handleLoginAdmin}>
          <div className="input-group">
            <label>Usuario</label>
            <input
              value={adminNombre}
              onChange={(e) => setAdminNombre(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
          </div>

          <button className="btn-form btn-red">Entrar</button>
        </form>
      )}
    </div>
  );
}

export default LoginAdmin;
