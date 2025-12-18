import React from "react";

function LoginUsuario({
  authUser,
  loginEmail,
  setLoginEmail,
  loginPass,
  setLoginPass,
  handleLoginUser,
  logoutUser,
  setModalRegistro
}) {
  return (
    <>
      <div className="form-card">
        <h3>Iniciar Sesión</h3>

        {authUser ? (
          <button className="btn-form btn-blue" onClick={logoutUser}>
            Cerrar sesión
          </button>
        ) : (
          <form onSubmit={handleLoginUser}>
            <input
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
            />
            <button className="btn-form btn-blue">Entrar</button>
          </form>
        )}
      </div>

      <div className="form-card">
        <h3>Registro</h3>
        {!authUser && (
          <button
            className="btn-form btn-yellow"
            onClick={() => setModalRegistro(true)}
          >
            Crear cuenta
          </button>
        )}
      </div>
    </>
  );
}

export default LoginUsuario;
