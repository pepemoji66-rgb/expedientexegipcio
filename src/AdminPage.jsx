import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./admin.css";
import GestionEsfinge from "./components/GestionEsfinge";

export default function AdminPage({
  imagenesGaleria, setImagenesGaleria,
  audios, setAudios,
  videos, setVideos,
  resultadosBusqueda // Asumo que aquí vienen tus usuarios
}) {
  const navigate = useNavigate();
  const [seccionAdmin, setSeccionAdmin] = useState("galeria");
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevaUrl, setNuevaUrl] = useState("");
  
  // --- ESTADOS PARA PAGINACIÓN ---
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 10;

  // --- LÓGICA DE PAGINACIÓN ---
  const usuarios = resultadosBusqueda || [];
  const ultimoIndice = paginaActual * usuariosPorPagina;
  const primerIndice = ultimoIndice - usuariosPorPagina;
  const usuariosPaginados = usuarios.slice(primerIndice, ultimoIndice);
  const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);

  // --- LÓGICA DE ELIMINAR ---
  const eliminarItem = async (id, tipo) => {
    if (!window.confirm(`¿Seguro que quieres borrar este item de ${tipo}?`)) return;
    try {
      await axios.delete(`http://localhost:5000/api/${tipo}/${id}`);
      if (tipo === "imagenes") setImagenesGaleria(imagenesGaleria.filter(i => i.id !== id));
      if (tipo === "audios") setAudios(audios.filter(a => a.id !== id));
      if (tipo === "videos") setVideos(videos.length > 0 ? videos.filter(v => v.id !== id) : []);
    } catch (e) {
      alert("Error al eliminar");
    }
  };

  // --- LÓGICA DE AÑADIR ---
  const agregarItem = async (tipo) => {
    if (!nuevaUrl || !nuevoTitulo) return alert("Rellena los campos, hermano");
    try {
      const res = await axios.post(`http://localhost:5000/api/${tipo}`, {
        titulo: nuevoTitulo,
        url: nuevaUrl
      });
      const nuevoObj = { id: res.data.id, titulo: nuevoTitulo, url: nuevaUrl };
      if (tipo === "imagenes") setImagenesGaleria([...imagenesGaleria, nuevoObj]);
      if (tipo === "audios") setAudios([...audios, nuevoObj]);
      if (tipo === "videos") setVideos([...videos, nuevoObj]);
      setNuevoTitulo(""); setNuevaUrl("");
    } catch (e) {
      alert("Error al añadir");
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🏛 Panel de Control del Templo</h1>
        <button className="btn-volver" onClick={() => navigate("/")}>Volver al Inicio</button>
      </div>

      <nav className="admin-nav">
        <button className={seccionAdmin === "galeria" ? "active" : ""} onClick={() => setSeccionAdmin("galeria")}>🖼 Galería</button>
        <button className={seccionAdmin === "audio" ? "active" : ""} onClick={() => setSeccionAdmin("audio")}>🎧 Audios</button>
        <button className={seccionAdmin === "videos" ? "active" : ""} onClick={() => setSeccionAdmin("videos")}>🎬 Vídeos</button>
        <button className={seccionAdmin === "usuarios" ? "active" : ""} onClick={() => setSeccionAdmin("usuarios")}>👥 Usuarios</button>
        <button className={seccionAdmin === "esfinge" ? "active" : ""} onClick={() => setSeccionAdmin("esfinge")}>🦁 Esfinge</button>
      </nav>

      {/* GALERÍA */}
      {seccionAdmin === "galeria" && (
        <div className="admin-section">
          <div className="inputs-admin">
            <input placeholder="URL Imagen" value={nuevaUrl} onChange={e => setNuevaUrl(e.target.value)} />
            <input placeholder="Título" value={nuevoTitulo} onChange={e => setNuevoTitulo(e.target.value)} />
            <button onClick={() => agregarItem("imagenes")}>Añadir Imagen</button>
          </div>
          <div className="admin-grid">
            {imagenesGaleria.map(img => (
              <div key={img.id} className="admin-item">
                <img src={img.url} alt={img.titulo} />
                <button onClick={() => eliminarItem(img.id, "imagenes")}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AUDIO */}
      {seccionAdmin === "audio" && (
        <div className="admin-section">
          <div className="inputs-admin">
            <input placeholder="Ruta audio" value={nuevaUrl} onChange={e => setNuevaUrl(e.target.value)} />
            <input placeholder="Título" value={nuevoTitulo} onChange={e => setNuevoTitulo(e.target.value)} />
            <button onClick={() => agregarItem("audios")}>Añadir Audio</button>
          </div>
          <table className="tabla-egipcia">
            <thead><tr><th>Audio</th><th>Acciones</th></tr></thead>
            <tbody>
              {audios.map(a => (
                <tr key={a.id}>
                  <td>{a.titulo}</td>
                  <td><button className="btn-borrar-tabla" onClick={() => eliminarItem(a.id, "audios")}>🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VÍDEOS */}
      {seccionAdmin === "videos" && (
        <div className="admin-section">
          <div className="inputs-admin">
            <input placeholder="URL Vídeo" value={nuevaUrl} onChange={e => setNuevaUrl(e.target.value)} />
            <input placeholder="Título" value={nuevoTitulo} onChange={e => setNuevoTitulo(e.target.value)} />
            <button onClick={() => agregarItem("videos")}>Añadir Vídeo</button>
          </div>
          <table className="tabla-egipcia">
            <thead><tr><th>Vídeo</th><th>Acciones</th></tr></thead>
            <tbody>
              {videos.map(v => (
                <tr key={v.id}>
                  <td>{v.titulo}</td>
                  <td><button className="btn-borrar-tabla" onClick={() => eliminarItem(v.id, "videos")}>🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

     {/* USUARIOS CON PAGINACIÓN Y BOTÓN ELIMINAR */}
      {seccionAdmin === "usuarios" && (
        <div className="admin-section">
          <h2>Gestión de Usuarios</h2>
          <table className="tabla-egipcia">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosPaginados.map(u => (
                <tr key={u.id}>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>
                    <button 
                      className="btn-borrar-tabla" 
                      onClick={() => eliminarItem(u.id, "usuarios")}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* CONTROLES DE PAGINACIÓN */}
          <div className="paginacion-controles">
            <button 
              disabled={paginaActual === 1} 
              onClick={() => setPaginaActual(paginaActual - 1)}
            >
              Anterior
            </button>
            <span>Página {paginaActual} de {totalPaginas}</span>
            <button 
              disabled={paginaActual === totalPaginas} 
              onClick={() => setPaginaActual(paginaActual + 1)}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* ESFINGE */}
      {seccionAdmin === "esfinge" && <GestionEsfinge />}
    </div>
  );
}