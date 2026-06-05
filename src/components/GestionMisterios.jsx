import React, { useState, useEffect } from "react";
import api from "../api";

export default function GestionMisterios({ cargarTodoApp }) {
  const [misterios, setMisterios] = useState([]);
  const [nuevo, setNuevo] = useState({
    titulo: "",
    icono: "",
    resumen: "",
    textoCompleto: "",
    imagen: "",
    latitud: "",
    longitud: ""
  });

  useEffect(() => {
    cargarMisterios();
  }, []);

  const cargarMisterios = async () => {
    try {
      const res = await api.get("/misterios");
      setMisterios(res.data);
    } catch (e) {
      console.error("Error al cargar misterios:", e);
    }
  };

  const handleAgregar = async () => {
    if (!nuevo.titulo || !nuevo.icono || !nuevo.resumen || !nuevo.textoCompleto) {
      return alert("El título, icono, sinopsis y texto completo son obligatorios, hermano.");
    }

    try {
      const datosEnvio = {
        titulo: nuevo.titulo,
        icono: nuevo.icono,
        resumen: nuevo.resumen,
        textoCompleto: nuevo.textoCompleto,
        imagen: nuevo.imagen || "/imagenes/esfinge.jpg",
        latitud: nuevo.latitud || null,
        longitud: nuevo.longitud || null
      };

      const res = await api.post("/misterios", datosEnvio);
      if (res.data.ok) {
        alert("¡Enigma del Templo archivado!");
        setNuevo({
          titulo: "",
          icono: "",
          resumen: "",
          textoCompleto: "",
          imagen: "",
          latitud: "",
          longitud: ""
        });
        cargarMisterios();
        if (cargarTodoApp) cargarTodoApp();
      }
    } catch (e) {
      alert("Error al guardar el misterio.");
    }
  };

  const eliminarMisterio = async (id) => {
    if (!window.confirm("¿Seguro que quieres borrar este enigma del Templo?")) return;
    try {
      await api.delete(`/misterios/${id}`);
      cargarMisterios();
      if (cargarTodoApp) cargarTodoApp();
    } catch (e) {
      alert("Error al borrar.");
    }
  };

  return (
    <div className="admin-section">
      <h2 className="titulo-egipcio">Panel de Misterios (Enigmas)</h2>
      
      <div className="inputs-admin">
        <div className="fila-inputs">
          <input 
            placeholder="Título del Enigma" 
            value={nuevo.titulo} 
            onChange={e => setNuevo({ ...nuevo, titulo: e.target.value })} 
          />
          <input 
            placeholder="Icono Emoji (ej: 🌌, 🦁, 📐, 🔊)" 
            value={nuevo.icono} 
            onChange={e => setNuevo({ ...nuevo, icono: e.target.value })} 
          />
        </div>
        <div className="fila-inputs">
          <input 
            placeholder="URL Imagen del Enigma (opcional)" 
            value={nuevo.imagen} 
            onChange={e => setNuevo({ ...nuevo, imagen: e.target.value })} 
          />
        </div>
        <div className="fila-inputs">
          <input 
            placeholder="Latitud (ej: 29.9753)" 
            value={nuevo.latitud} 
            onChange={e => setNuevo({ ...nuevo, latitud: e.target.value })} 
          />
          <input 
            placeholder="Longitud (ej: 31.1376)" 
            value={nuevo.longitud} 
            onChange={e => setNuevo({ ...nuevo, longitud: e.target.value })} 
          />
        </div>
        <textarea 
          placeholder="Sinopsis / Breve resumen explicativo..." 
          value={nuevo.resumen} 
          onChange={e => setNuevo({ ...nuevo, resumen: e.target.value })}
          className="textarea-egipcia"
          rows={2}
        />
        <textarea 
          placeholder="Texto completo detallando el enigma y las hipótesis..." 
          value={nuevo.textoCompleto} 
          onChange={e => setNuevo({ ...nuevo, textoCompleto: e.target.value })}
          className="textarea-egipcia"
          rows={6}
        />
        <button className="btn-form btn-yellow" onClick={handleAgregar}>𓂀 REVELAR MISTERIO</button>
      </div>

      <table className="tabla-egipcia">
        <thead>
          <tr>
            <th>Icono</th>
            <th>Enigma</th>
            <th>Sinopsis</th>
            <th>Coords</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {misterios.map((mis) => (
            <tr key={mis.id}>
              <td style={{ fontSize: "1.5rem", textAlign: "center" }}>{mis.icono}</td>
              <td style={{ fontWeight: "bold" }}>{mis.titulo}</td>
              <td style={{ fontSize: "0.85rem", opacity: 0.8 }}>{mis.resumen}</td>
              <td style={{ fontSize: "0.75rem", fontFamily: "monospace" }}>
                {mis.latitud && mis.longitud ? `${mis.latitud}, ${mis.longitud}` : "Ninguna"}
              </td>
              <td className="acciones-celda">
                <button className="btn-borrar-tabla" onClick={() => eliminarMisterio(mis.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
