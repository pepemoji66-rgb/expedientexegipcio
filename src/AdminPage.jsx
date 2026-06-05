import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import "./admin.css";
import GestionEsfinge from "./components/GestionEsfinge";
import GestionVivo from "./components/GestionVivo";
import GestionExpedientes from "./components/GestionExpedientes";
import GestionMisterios from "./components/GestionMisterios";

export default function AdminPage({
  imagenesGaleria, setImagenesGaleria,
  audios, setAudios,
  videos, setVideos,
  resultadosBusqueda,
  setResultadosBusqueda,
  cargarTodoApp
}) {
  const navigate = useNavigate();
  const [seccionAdmin, setSeccionAdmin] = useState("galeria");
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevaUrl, setNuevaUrl] = useState("");
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");

  // LOGICA DE PAGINACIÓN UNIFICADA
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 10;

  // Resetear página al cambiar de sección para no quedarnos en el limbo
  useEffect(() => {
    setPaginaActual(1);
  }, [seccionAdmin]);

  const cargarTodosLosUsuarios = async () => {
    try {
      const res = await api.get("/usuarios");
      setResultadosBusqueda(res.data);
    } catch (e) {
      console.error("Error al cargar los usuarios:", e);
    }
  };

  // --- LÓGICA DE CORTE (SLICE) PARA CUALQUIER SECCIÓN ---
  const obtenerItemsPaginados = (lista) => {
    const ultimoIndice = paginaActual * itemsPorPagina;
    const primerIndice = ultimoIndice - itemsPorPagina;
    return lista.slice(primerIndice, ultimoIndice);
  };

  const calcularTotalPaginas = (lista) => Math.ceil(lista.length / itemsPorPagina) || 1;

  // Seleccionamos la lista según la sección activa
  let listaActiva = [];
  if (seccionAdmin === "galeria") listaActiva = imagenesGaleria;
  else if (seccionAdmin === "audio") listaActiva = audios;
  else if (seccionAdmin === "videos") listaActiva = videos;
  else if (seccionAdmin === "usuarios") listaActiva = resultadosBusqueda || [];

  const itemsAMostrar = obtenerItemsPaginados(listaActiva);
  const totalPaginas = calcularTotalPaginas(listaActiva);

  const eliminarItem = async (id, tipo) => {
    if (!window.confirm(`¿Seguro que quieres borrar este item de ${tipo}?`)) return;
    try {
      await api.delete(`/${tipo}/${id}`);
      if (tipo === "imagenes") setImagenesGaleria(imagenesGaleria.filter(i => i.id !== id));
      if (tipo === "audios") setAudios(audios.filter(a => a.id !== id));
      if (tipo === "videos") setVideos(videos.filter(v => v.id !== id));
      if (tipo === "usuarios") setResultadosBusqueda(resultadosBusqueda.filter(u => u.id !== id));
      alert("Eliminado de las arenas del tiempo.");
    } catch (e) {
      alert("Error al eliminar.");
    }
  };

  const agregarItem = async (tipo) => {
    if (!nuevaUrl || !nuevoTitulo) return alert("Rellena los campos, hermano");
    try {
      const datos = {
        titulo: nuevoTitulo,
        url: nuevaUrl,
        descripcion: tipo === "imagenes" ? nuevaDescripcion : "",
        latitud: tipo === "imagenes" ? latitud : null,
        longitud: tipo === "imagenes" ? longitud : null
      };
      const res = await api.post(`/${tipo}`, datos);
      const nuevoObj = { ...datos, id: res.data.id };

      if (tipo === "imagenes") setImagenesGaleria([...imagenesGaleria, nuevoObj]);
      if (tipo === "audios") setAudios([...audios, nuevoObj]);
      if (tipo === "videos") setVideos([...videos, nuevoObj]);

      setNuevoTitulo(""); setNuevaUrl(""); setNuevaDescripcion(""); setLatitud(""); setLongitud("");
      alert("Añadido con éxito al Templo");
    } catch (e) {
      alert("Error al añadir");
    }
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>🏛 Panel de Control</h1>
        <button className="btn-volver" onClick={() => navigate("/")}>Volver al Inicio</button>
      </header>

      <nav className="admin-nav">
        <button className={seccionAdmin === "galeria" ? "active" : ""} onClick={() => setSeccionAdmin("galeria")}>🖼 Galería</button>
        <button className={seccionAdmin === "audio" ? "active" : ""} onClick={() => setSeccionAdmin("audio")}>🎧 Audios</button>
        <button className={seccionAdmin === "videos" ? "active" : ""} onClick={() => setSeccionAdmin("videos")}>🎬 Vídeos</button>
        <button className={seccionAdmin === "usuarios" ? "active" : ""} onClick={() => { setSeccionAdmin("usuarios"); cargarTodosLosUsuarios(); }}>👥 Usuarios</button>
        <button className={seccionAdmin === "esfinge" ? "active" : ""} onClick={() => setSeccionAdmin("esfinge")}>🦁 Esfinge</button>
        <button className={seccionAdmin === "vivo" ? "active" : ""} onClick={() => setSeccionAdmin("vivo")}>🛸 En Vivo</button>
        <button className={seccionAdmin === "expedientes" ? "active" : ""} onClick={() => setSeccionAdmin("expedientes")}>📂 Expedientes</button>
        <button className={seccionAdmin === "misterios" ? "active" : ""} onClick={() => setSeccionAdmin("misterios")}>𓂀 Misterios</button>
      </nav>

      <div className="admin-content-wrapper">

        {/* GALERÍA PAGINADA */}
        {seccionAdmin === "galeria" && (
          <div className="admin-section">
            <div className="inputs-admin">
              <div className="fila-inputs">
                <input placeholder="URL Imagen" value={nuevaUrl} onChange={e => setNuevaUrl(e.target.value)} />
                <input placeholder="Título" value={nuevoTitulo} onChange={e => setNuevoTitulo(e.target.value)} />
              </div>
              <div className="fila-inputs">
                <input placeholder="Latitud" value={latitud} onChange={e => setLatitud(e.target.value)} />
                <input placeholder="Longitud" value={longitud} onChange={e => setLongitud(e.target.value)} />
              </div>
              <textarea placeholder="Descripción..." value={nuevaDescripcion} onChange={e => setNuevaDescripcion(e.target.value)} className="admin-textarea" />
              <button className="btn-form" onClick={() => agregarItem("imagenes")}>AÑADIR A LA GALERÍA</button>
            </div>

            <div className="admin-grid">
              {itemsAMostrar.map(img => (
                <div key={img.id} className="admin-item">
                  <img src={img.url} alt={img.titulo} />
                  <button className="btn-borrar-mini" onClick={() => eliminarItem(img.id, "imagenes")}>🗑️</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AUDIOS Y VIDEOS PAGINADOS */}
        {(seccionAdmin === "audio" || seccionAdmin === "videos") && (
          <div className="admin-section">
            <div className="inputs-admin">
              <input placeholder="URL" value={nuevaUrl} onChange={e => setNuevaUrl(e.target.value)} />
              <input placeholder="Título" value={nuevoTitulo} onChange={e => setNuevoTitulo(e.target.value)} />
              <button className="btn-form" onClick={() => agregarItem(seccionAdmin === "audio" ? "audios" : "videos")}>AÑADIR {seccionAdmin.toUpperCase()}</button>
            </div>
            <table className="tabla-egipcia">
              <thead><tr><th>Título</th><th>Acciones</th></tr></thead>
              <tbody>
                {itemsAMostrar.map(item => (
                  <tr key={item.id}>
                    <td>{item.titulo}</td>
                    <td className="acciones-celda">
                      <button className="btn-borrar-tabla" onClick={() => eliminarItem(item.id, seccionAdmin === "audio" ? "audios" : "videos")}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* USUARIOS PAGINADOS */}
        {seccionAdmin === "usuarios" && (
          <div className="admin-section">
            <table className="tabla-egipcia">
              <thead><tr><th>Nombre</th><th>Email</th><th>Acciones</th></tr></thead>
              <tbody>
                {itemsAMostrar.map(u => (
                  <tr key={u.id}>
                    <td>{u.nombre}</td>
                    <td>{u.email}</td>
                    <td className="acciones-celda">
                      <button className="btn-borrar-tabla" onClick={() => eliminarItem(u.id, "usuarios")}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* COMPONENTES EXTERNOS */}
        {seccionAdmin === "esfinge" && <GestionEsfinge />}
        {seccionAdmin === "vivo" && <GestionVivo />}
        {seccionAdmin === "expedientes" && <GestionExpedientes cargarTodoApp={cargarTodoApp} />}
        {seccionAdmin === "misterios" && <GestionMisterios cargarTodoApp={cargarTodoApp} />}

        {/* CONTROLES DE PAGINACIÓN UNIVERSALES */}
        {["galeria", "audio", "videos", "usuarios"].includes(seccionAdmin) && (
          <div className="paginacion-controles">
            <button disabled={paginaActual === 1} onClick={() => setPaginaActual(paginaActual - 1)}>Anterior</button>
            <span>Página {paginaActual} de {totalPaginas}</span>
            <button disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual(paginaActual + 1)}>Siguiente</button>
          </div>
        )}

      </div>
    </div>
  );
}