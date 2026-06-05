import React, { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "../forms.css";

// COMPONENTES
import Instrucciones from "./Forms/Instrucciones";
import SelectorAcceso from "./Forms/SelectorAcceso";
import LoginAdmin from "./Forms/LoginAdmin";
import LoginUsuario from "./Forms/LoginUsuario";
import ModalRegistro from "./Forms/ModalRegistro";
import ModalBuscar from "./Forms/ModalBuscar";

function Forms({ setResultadosBusqueda }) {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  /* --- ESTADOS --- */
  const [authUser, setAuthUser] = useState(localStorage.getItem("user") !== null);
  const [tipoAcceso, setTipoAcceso] = useState(null); // 'admin' o 'usuario'
  const [mostrarInstrucciones, setMostrarInstrucciones] = useState(false);

  // Estados formularios (Login/Registro/Busca)
  const [adminNombre, setAdminNombre] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [modalRegistro, setModalRegistro] = useState(false);
  const [modalBuscar, setModalBuscar] = useState(false);

  // Campos Registro
  const [regData, setRegData] = useState({
    nombre: "",
    password: ""
  });

  // Campos Búsqueda
  const [busData, setBusData] = useState({ nombre: "", ciudad: "", edad: "", sexo: "" });

  /* ================= FUNCIONES LÓGICA ================= */

  // 1. LOGIN ADMINISTRADOR (PEPE)
  const handleLoginAdmin = (e) => {
    e.preventDefault();
    if (adminNombre.trim().toLowerCase() === "pepemoji66@gmail.com" && adminPassword === "pepemio") {
      setAuth(true);
      alert("Admin conectado");
    } else {
      alert("Error de acceso: Credenciales de administrador incorrectas.");
    }
  };

  // 2. LOGIN USUARIO (REAL CONTRA MYSQL)
  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email: loginEmail, password: loginPass });

      if (res.data.ok) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setAuthUser(true);
        alert("Bienvenido al Templo, " + res.data.user.nombre);
      } else {
        alert("El Faraón no reconoce tus credenciales. Revisa email y contraseña.");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error: No se pudo conectar con el servidor. ¿Está encendido XAMPP?");
    }
  };

  // 3. REGISTRO DE USUARIO (GRABAR EN TABLA USUARIOS)
  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      // Autogeneramos los campos obligatorios del esquema para no romper restricciones
      const nickLimpio = regData.nombre.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      const emailAutogenerado = `${nickLimpio}_${Date.now()}@egipto.com`;

      const datosCompletos = {
        nombre: regData.nombre,
        password: regData.password,
        email: emailAutogenerado,
        ciudad: "Egipto",
        edad: 30,
        sexo: "M"
      };

      const res = await api.post("/usuarios", datosCompletos);

      if (res.status === 201 || res.data.ok) {
        alert("¡Registro completado! Has sido inscrito en el Templo.");
        setModalRegistro(false);
        // Limpiar el formulario
        setRegData({ nombre: "", password: "" });
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al crear la cuenta. Intenta con otro Nick.");
    }
  };

  // 4. BÚSQUEDA DE USUARIOS
  const handleBuscar = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get("/usuarios", { params: busData });
      setResultadosBusqueda(res.data.usuarios || res.data);
      setModalBuscar(false);
      navigate("/admin");
    } catch {
      alert("Error: La búsqueda requiere conexión MySQL activa.");
    }
  };

  const buscarTodos = async () => {
    try {
      const res = await api.get("/usuarios");
      setResultadosBusqueda(res.data.usuarios || res.data);
      setModalBuscar(false);
      navigate("/admin");
    } catch {
      alert("Conecta el servidor local para ver la lista de usuarios.");
    }
  };

  /* ================= UI RENDER ================= */
  return (
    <div className="forms">
      <div className="forms-container">

        <button className="btn-form btn-volver-top" onClick={() => navigate("/?seccion=inicio")}>
          🏠 VOLVER AL INICIO
        </button>

        <section className="formularios-wrapper">
          <div className="form-card">
            <h2 className="titulo-egipcio">Gestión de Usuarios</h2>

            <button className="btn-form btn-yellow" onClick={() => setMostrarInstrucciones(!mostrarInstrucciones)}>
              {mostrarInstrucciones ? "❌ CERRAR INFO" : "📘 INSTRUCCIONES"}
            </button>

            <Instrucciones mostrar={mostrarInstrucciones} />

            {!tipoAcceso && (
              <SelectorAcceso setTipoAcceso={setTipoAcceso} />
            )}

            {/* --- PANEL DE ADMINISTRADOR --- */}
            {tipoAcceso === "admin" && (
              <div className="panel-interno">
                <LoginAdmin
                  auth={auth} adminNombre={adminNombre} setAdminNombre={setAdminNombre}
                  adminPassword={adminPassword} setAdminPassword={setAdminPassword}
                  handleLoginAdmin={handleLoginAdmin} logoutAdmin={() => setAuth(false)}
                />

                {auth && (
                  <div className="acciones-admin">
                    <button className="btn-form btn-blue" onClick={() => setModalBuscar(true)}>🔍 BUSCAR USUARIOS</button>
                    <button className="btn-form btn-blue" onClick={() => navigate("/admin")}>🗂️ GESTIÓN DE ARCHIVOS</button>
                  </div>
                )}
                <button className="btn-form btn-red" onClick={() => setTipoAcceso(null)}>VOLVER ATRÁS</button>
              </div>
            )}

            {/* --- PANEL DE USUARIO --- */}
            {tipoAcceso === "usuario" && (
              <div className="panel-interno">
                <LoginUsuario
                  authUser={authUser} loginEmail={loginEmail} setLoginEmail={setLoginEmail}
                  loginPass={loginPass} setLoginPass={setLoginPass}
                  handleLoginUser={handleLoginUser} logoutUser={() => { localStorage.removeItem("user"); setAuthUser(false); }}
                  setModalRegistro={setModalRegistro}
                />
                <button className="btn-form btn-red" onClick={() => setTipoAcceso(null)}>VOLVER ATRÁS</button>
              </div>
            )}
          </div>
        </section>

        {/* MODAL DE REGISTRO */}
        <ModalRegistro
          modalRegistro={modalRegistro}
          setModalRegistro={setModalRegistro}
          regData={regData}
          setRegData={setRegData}
          handleRegistro={handleRegistro}
        />

        {/* MODAL DE BÚSQUEDA */}
        <ModalBuscar
          modalBuscar={modalBuscar} setModalBuscar={setModalBuscar}
          {...busData} setBusData={setBusData} handleBuscar={handleBuscar}
          buscarTodos={buscarTodos}
        />

      </div>
    </div>
  );
}

export default Forms;