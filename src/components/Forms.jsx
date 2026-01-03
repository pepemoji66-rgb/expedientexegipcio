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
  const [regData, setRegData] = useState({ nombre: "", email: "", ciudad: "", edad: "", sexo: "", password: "" });
  // Campos Búsqueda
  const [busData, setBusData] = useState({ nombre: "", ciudad: "", edad: "", sexo: "" });

  /* ================= FUNCIONES LÓGICA ================= */
  
  // LOGIN ADMINISTRADOR (PEPE)
  const handleLoginAdmin = (e) => {
    e.preventDefault();
    if (adminNombre.trim().toLowerCase() === "pepe" && adminPassword === "1234") {
      setAuth(true);
      alert("Admin conectado");
    } else { 
      alert("Error de acceso"); 
    }
  };

  // LOGIN USUARIO (CON MODO DEMO PARA VERCEL)
  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      // 1. Intentamos conectar con tu MySQL
      const res = await api.post("/login", { email: loginEmail, password: loginPass });
      
      if (res.data.ok) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setAuthUser(true);
        alert("Bienvenido al Templo");
      }
    } catch (error) {
      // 2. TRUCO: Si falla (por estar en Vercel), entramos como Invitado
      console.warn("Servidor MySQL no detectado. Activando modo Explorador.");
      
      const invitado = { 
        nombre: "Explorador Invitado", 
        email: loginEmail || "visitante@egipto.es" 
      };

      localStorage.setItem("user", JSON.stringify(invitado));
      setAuthUser(true);
      alert("Modo Demostración: ¡Bienvenido, Explorador!");
    }
  };

  // BÚSQUEDA DE USUARIOS
  const handleBuscar = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get("/usuarios", { params: busData });
      setResultadosBusqueda(res.data.usuarios || res.data);
      setModalBuscar(false);
      navigate("/admin");
    } catch { 
      alert("Nota: La búsqueda requiere conexión MySQL activa."); 
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
        
        {/* BOTÓN MAESTRO VOLVER */}
        <button className="btn-form btn-yellow" onClick={() => navigate("/?seccion=inicio")}>
          ⬅ VOLVER AL INICIO
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
                  handleLoginUser={handleLoginUser} logoutUser={() => {localStorage.removeItem("user"); setAuthUser(false);}}
                  setModalRegistro={setModalRegistro}
                />
                <button className="btn-form btn-red" onClick={() => setTipoAcceso(null)}>VOLVER ATRÁS</button>
              </div>
            )}
          </div>
        </section>

        {/* MODALES */}
        <ModalRegistro 
          modalRegistro={modalRegistro} setModalRegistro={setModalRegistro}
          {...regData} setRegData={setRegData} 
        />

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