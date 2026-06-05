import React, { useState, useEffect } from "react";
import api from "../api";

export default function GestionExpedientes({ cargarTodoApp }) {
  const [expedientes, setExpedientes] = useState([]);
  const [nuevo, setNuevo] = useState({
    sigla: "",
    titulo: "",
    periodo: "",
    imagen: "",
    resumen: "",
    latitud: "",
    longitud: "",
    detallesTexto: "" // Subtítulo | Texto (uno por línea)
  });

  useEffect(() => {
    cargarExpedientes();
  }, []);

  const cargarExpedientes = async () => {
    try {
      const res = await api.get("/expedientes");
      setExpedientes(res.data);
    } catch (e) {
      console.error("Error al cargar expedientes:", e);
    }
  };

  const handleAgregar = async () => {
    if (!nuevo.sigla || !nuevo.titulo || !nuevo.resumen) {
      return alert("La sigla, el título y la sinopsis son obligatorios, hermano.");
    }

    // Parsear el texto de detalles a formato array de objetos [{subtitulo, texto}]
    const lineas = nuevo.detallesTexto.split("\n");
    const detalles = lineas
      .filter(linea => linea.includes("|"))
      .map(linea => {
        const [sub, txt] = linea.split("|");
        return { subtitulo: sub.trim(), texto: txt.trim() };
      });

    if (detalles.length === 0) {
      return alert("Debes rellenar al menos una página de contenido con el formato: Subtítulo | Texto");
    }

    try {
      const datosEnvio = {
        sigla: nuevo.sigla,
        titulo: nuevo.titulo,
        periodo: nuevo.periodo,
        imagen: nuevo.imagen || "/imagenes/1.avif",
        resumen: nuevo.resumen,
        detalles: detalles,
        latitud: nuevo.latitud || null,
        longitud: nuevo.longitud || null
      };

      const res = await api.post("/expedientes", datosEnvio);
      if (res.data.ok) {
        alert("¡Dosier histórico guardado en el archivo!");
        setNuevo({
          sigla: "",
          titulo: "",
          periodo: "",
          imagen: "",
          resumen: "",
          latitud: "",
          longitud: "",
          detallesTexto: ""
        });
        cargarExpedientes();
        if (cargarTodoApp) cargarTodoApp();
      }
    } catch (e) {
      alert("Error al guardar el expediente.");
    }
  };

  const eliminarExpediente = async (id) => {
    if (!window.confirm("¿Seguro que quieres borrar este dosier histórico?")) return;
    try {
      await api.delete(`/expedientes/${id}`);
      cargarExpedientes();
      if (cargarTodoApp) cargarTodoApp();
    } catch (e) {
      alert("Error al borrar.");
    }
  };

  return (
    <div className="admin-section">
      <h2 className="titulo-egipcio">Panel de Expedientes (Dosieres)</h2>
      
      <div className="inputs-admin">
        <div className="fila-inputs">
          <input 
            placeholder="Sigla (ej: EXP-004)" 
            value={nuevo.sigla} 
            onChange={e => setNuevo({ ...nuevo, sigla: e.target.value })} 
          />
          <input 
            placeholder="Título del Dosier" 
            value={nuevo.titulo} 
            onChange={e => setNuevo({ ...nuevo, titulo: e.target.value })} 
          />
        </div>
        <div className="fila-inputs">
          <input 
            placeholder="Periodo Histórico (ej: c. 1200 a.C.)" 
            value={nuevo.periodo} 
            onChange={e => setNuevo({ ...nuevo, periodo: e.target.value })} 
          />
          <input 
            placeholder="URL Imagen de portada (opcional)" 
            value={nuevo.imagen} 
            onChange={e => setNuevo({ ...nuevo, imagen: e.target.value })} 
          />
        </div>
        <div className="fila-inputs">
          <input 
            placeholder="Latitud (ej: 29.9792)" 
            value={nuevo.latitud} 
            onChange={e => setNuevo({ ...nuevo, latitud: e.target.value })} 
          />
          <input 
            placeholder="Longitud (ej: 31.1342)" 
            value={nuevo.longitud} 
            onChange={e => setNuevo({ ...nuevo, longitud: e.target.value })} 
          />
        </div>
        <textarea 
          placeholder="Sinopsis / Resumen general del dosier..." 
          value={nuevo.resumen} 
          onChange={e => setNuevo({ ...nuevo, resumen: e.target.value })}
          className="textarea-egipcia"
          rows={3}
        />
        <textarea 
          placeholder="Páginas del Dosier (Formato: Subtítulo | Texto de la página. Escribe una por línea)" 
          value={nuevo.detallesTexto} 
          onChange={e => setNuevo({ ...nuevo, detallesTexto: e.target.value })}
          className="textarea-egipcia"
          rows={5}
        />
        <span style={{ fontSize: "0.75rem", color: "#ffd700", alignSelf: "flex-start", opacity: 0.8 }}>
          * Ejemplo: <i>Imhotep | Fue el primer arquitecto de piedra... (Salto de línea para la siguiente página)</i>
        </span>
        <button className="btn-form btn-yellow" onClick={handleAgregar}>📂 ARCHIVAR DOSIER</button>
      </div>

      <table className="tabla-egipcia">
        <thead>
          <tr>
            <th>Sigla</th>
            <th>Título</th>
            <th>Sinopsis</th>
            <th>Coords</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {expedientes.map((exp) => (
            <tr key={exp.id}>
              <td style={{ color: "#ffd700", fontWeight: "bold" }}>{exp.sigla}</td>
              <td style={{ fontWeight: "bold" }}>{exp.titulo}</td>
              <td style={{ fontSize: "0.85rem", opacity: 0.8 }}>{exp.resumen}</td>
              <td style={{ fontSize: "0.75rem", fontFamily: "monospace" }}>
                {exp.latitud && exp.longitud ? `${exp.latitud}, ${exp.longitud}` : "Ninguna"}
              </td>
              <td className="acciones-celda">
                <button className="btn-borrar-tabla" onClick={() => eliminarExpediente(exp.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
