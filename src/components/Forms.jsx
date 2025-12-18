import React, { useState, startTransition, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import "../forms.css";

// COMPONENTES
import Instrucciones from "./Forms/Instrucciones";
import SelectorAcceso from "./Forms/SelectorAcceso";
import LoginAdmin from "./Forms/LoginAdmin";
import LoginUsuario from "./Forms/LoginUsuario";
import ModalRegistro from "./Forms/ModalRegistro";
import ModalBuscar from "./Forms/ModalBuscar";

function Forms({ setResultadosBusqueda }) {
  const { auth, setAuth } = useContext(AuthContext);

  // 🔥 CAMBIO: ahora comprobamos si existe "user", no si es "true"
  const [authUser, setAuthUser] = useState(
    localStorage.getItem("user") !== null
  );

  /* ---------------- UX ---------------- */
  const [tipoAcceso, setTipoAcceso] = useState(null);
  const [mostrarInstrucciones, setMostrarInstrucciones] = useState(false);

  /* ---------------- ADMIN ---------------- */
  const [adminNombre, setAdminNombre] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  /* ---------------- USER ---------------- */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  /* ---------------- REGISTRO ---------------- */
  const [modalRegistro, setModalRegistro] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [password, setPassword] = useState("");

  /* ---------------- BUSCAR ADMIN ---------------- */
  const [modalBuscar, setModalBuscar] = useState(false);
  const [buscarNombre, setBuscarNombre] = useState("");
  const [buscarCiudad, setBuscarCiudad] = useState("");
  const [buscarEdad, setBuscarEdad] = useState("");
  const [buscarSexo, setBuscarSexo] = useState("");

  /* ================= LOGIN ADMIN ================= */
  const handleLoginAdmin = (e) => {
    e.preventDefault();
    if (
      adminNombre.trim().toLowerCase() === "pepe" &&
      adminPassword === "1234"
    ) {
      setAuth(true);
      alert("Admin conectado!");
    } else {
      alert("Datos incorrectos");
    }
  };

  const logoutAdmin = () => setAuth(false);

  /* ================= LOGIN USER ================= */
  const handleLoginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email: loginEmail,
        password: loginPass
      });

      if (res.data.ok) {
        // 🔥 CAMBIO IMPORTANTE
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setAuthUser(true);
        alert("Sesión iniciada correctamente");
      }
    } catch {
      alert("Usuario o contraseña incorrectos");
    }
  };

  const logoutUser = () => {
    // 🔥 CAMBIO
    localStorage.removeItem("user");
    setAuthUser(false);
  };

  /* ================= REGISTRO ================= */
  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/usuarios", {
        nombre,
        email,
        ciudad,
        edad,
        sexo,
        password
      });

      alert("Usuario registrado correctamente");

      setNombre("");
      setEmail("");
      setCiudad("");
      setEdad("");
      setSexo("");
      setPassword("");
      setModalRegistro(false);
    } catch {
      alert("Error registrando usuario");
    }
  };

  /* ================= BUSCAR ================= */
  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!auth) return alert("Debes iniciar sesión como admin.");

    try {
      const res = await axios.get("http://localhost:5000/api/usuarios", {
        params: {
          nombre: buscarNombre,
          ciudad: buscarCiudad,
          edad: buscarEdad,
          sexo: buscarSexo
        }
      });

      startTransition(() => {
        setResultadosBusqueda(res.data);
        setModalBuscar(false);
        window.location.href = "/admin";
      });
    } catch {
      alert("Error realizando la búsqueda.");
    }
  };

  const buscarTodos = async () => {
    if (!auth) return alert("Debes iniciar sesión como admin.");

    try {
      const res = await axios.get("http://localhost:5000/api/usuarios");

      startTransition(() => {
        setResultadosBusqueda(res.data);
        setModalBuscar(false);
        window.location.href = "/admin";
      });
    } catch {
      alert("Error buscando todos los usuarios.");
    }
  };

  /* ================= UI ================= */
  return (
    <section className="formularios-wrapper">
      <h2 style={{ textAlign: "center", color: "#f4e6b2" }}>
        Gestión de Usuarios
      </h2>

      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <button
          className="btn-form btn-yellow"
          onClick={() => setMostrarInstrucciones(!mostrarInstrucciones)}
        >
          📘 Instrucciones de registro
        </button>
      </div>

      <Instrucciones mostrar={mostrarInstrucciones} />

      <SelectorAcceso
        tipoAcceso={tipoAcceso}
        setTipoAcceso={setTipoAcceso}
      />

      <div className="formularios-container">
        {tipoAcceso === "admin" && (
          <LoginAdmin
            auth={auth}
            adminNombre={adminNombre}
            setAdminNombre={setAdminNombre}
            adminPassword={adminPassword}
            setAdminPassword={setAdminPassword}
            handleLoginAdmin={handleLoginAdmin}
            logoutAdmin={logoutAdmin}
          />
        )}

        {tipoAcceso === "admin" && auth && (
          <div className="form-card">
            <h3>Gestión</h3>
            <button
              className="btn-form btn-yellow"
              onClick={() => setModalBuscar(true)}
            >
              Buscar usuarios
            </button>
          </div>
        )}

        {tipoAcceso === "usuario" && (
          <LoginUsuario
            authUser={authUser}
            loginEmail={loginEmail}
            setLoginEmail={setLoginEmail}
            loginPass={loginPass}
            setLoginPass={setLoginPass}
            handleLoginUser={handleLoginUser}
            logoutUser={logoutUser}
            setModalRegistro={setModalRegistro}
          />
        )}
      </div>

      <ModalRegistro
        modalRegistro={modalRegistro}
        setModalRegistro={setModalRegistro}
        nombre={nombre}
        setNombre={setNombre}
        email={email}
        setEmail={setEmail}
        ciudad={ciudad}
        setCiudad={setCiudad}
        edad={edad}
        setEdad={setEdad}
        sexo={sexo}
        setSexo={setSexo}
        password={password}
        setPassword={setPassword}
        handleRegistro={handleRegistro}
      />

      <ModalBuscar
        modalBuscar={modalBuscar}
        setModalBuscar={setModalBuscar}
        auth={auth}
        buscarNombre={buscarNombre}
        setBuscarNombre={setBuscarNombre}
        buscarCiudad={buscarCiudad}
        setBuscarCiudad={setBuscarCiudad}
        buscarEdad={buscarEdad}
        setBuscarEdad={setBuscarEdad}
        buscarSexo={buscarSexo}
        setBuscarSexo={setBuscarSexo}
        handleBuscar={handleBuscar}
        buscarTodos={buscarTodos}
      />
    </section>
  );
}

export default Forms;
