import React, { useState, useEffect } from "react";
import api from "../api";

export default function GestionEsfinge() {
  const [noticias, setNoticias] = useState([]);
  const [nuevo, setNuevo] = useState({ titulo: "", resumen: "", url_enlace: "", url_imagen: "" });

  // Cargar noticias al iniciar
  useEffect(() => {
    cargarNoticias();
  }, []);

  const cargarNoticias = async () => {
    try {
      const res = await api.get("/noticias");
      setNoticias(res.data);
    } catch (e) { console.error("Error al cargar noticias"); }
  };

  const handleAgregar = async () => {
    if (!nuevo.titulo || !nuevo.url_enlace) return alert("El título y el enlace son obligatorios, hermano.");
    try {
      const res = await api.post("/noticias", nuevo);
      if (res.data.ok) {
        setNoticias([{ id: res.data.id, ...nuevo }, ...noticias]);
        setNuevo({ titulo: "", resumen: "", url_enlace: "", url_imagen: "" });
      }
    } catch (e) { alert("Error al guardar en la Esfinge"); }
  };

  const eliminarNoticia = async (id) => {
    if (!window.confirm("¿Seguro que quieres borrar esta noticia?")) return;
    try {
      await api.delete(`/noticias/${id}`);
      setNoticias(noticias.filter(n => n.id !== id));
    } catch (e) { alert("Error al borrar"); }
  };

  return (
    <div className="admin-section">
      <h2 className="titulo-egipcio">Panel de la Esfinge</h2>
      
      <div className="inputs-admin">
        <input 
          placeholder="Titular de la noticia" 
          value={nuevo.titulo} 
          onChange={e => setNuevo({...nuevo, titulo: e.target.value})} 
        />
        <textarea 
          placeholder="Resumen o descripción..." 
          value={nuevo.resumen} 
          onChange={e => setNuevo({...nuevo, resumen: e.target.value})}
          className="textarea-egipcia"
        />
        <input 
          placeholder="URL del enlace (Noticia completa)" 
          value={nuevo.url_enlace} 
          onChange={e => setNuevo({...nuevo, url_enlace: e.target.value})} 
        />
        <input 
          placeholder="URL de la imagen (opcional)" 
          value={nuevo.url_imagen} 
          onChange={e => setNuevo({...nuevo, url_imagen: e.target.value})} 
        />
        <button className="btn-form btn-yellow" onClick={handleAgregar}>📜 PUBLICAR NOTICIA</button>
      </div>

      <table className="tabla-egipcia">
        <thead>
          <tr>
            <th>Noticia</th>
            <th className="th-acciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {noticias.map((n) => (
            <tr key={n.id}>
              <td>
                <div style={{color: '#c5a059', fontWeight: 'bold'}}>{n.titulo}</div>
                <div style={{fontSize: '0.8rem', color: '#ccc'}}>{n.resumen}</div>
              </td>
              <td className="acciones-celda">
                <button className="btn-borrar-tabla" onClick={() => eliminarNoticia(n.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}