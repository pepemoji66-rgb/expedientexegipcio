import React, { useState, useEffect } from "react";
import api from "../api";

export default function GestionVivo() {
    const [monumentos, setMonumentos] = useState([]);
    const [nuevo, setNuevo] = useState({ nombre: '', titulo: '', descripcion: '', url_mapa: '' });

    useEffect(() => { cargarDatos(); }, []);

    const cargarDatos = async () => {
        const res = await api.get("/monumentos");
        setMonumentos(res.data);
    };

    const agregar = async () => {
        await api.post("/monumentos", nuevo);
        setNuevo({ nombre: '', titulo: '', descripcion: '', url_mapa: '' });
        cargarDatos();
        alert("¡Vídeo de dron añadido al Templo!");
    };

    const eliminar = async (id) => {
        if (!window.confirm("¿Borrar este vuelo de dron?")) return;
        await api.delete(`/monumentos/${id}`);
        cargarDatos();
    };

    return (
        <div className="admin-section">
            <h2>🛸 Gestión de Egipto en Vivo (Drones)</h2>
            <div className="inputs-admin" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <input placeholder="Nombre Botón (ej: Gran Pirámide)" value={nuevo.nombre} onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })} />
                <input placeholder="Título del Vídeo" value={nuevo.titulo} onChange={e => setNuevo({ ...nuevo, titulo: e.target.value })} />
                <textarea placeholder="Descripción del monumento..." value={nuevo.descripcion} onChange={e => setNuevo({ ...nuevo, descripcion: e.target.value })} />
                <input placeholder="Archivo MP4 (ej: esfinge.mp4)" value={nuevo.url_mapa} onChange={e => setNuevo({ ...nuevo, url_mapa: e.target.value })} />
                <button className="btn-form btn-blue" onClick={agregar}>AÑADIR NUEVO VUELO</button>
            </div>

            <table className="tabla-egipcia">
                <thead>
                    <tr>
                        <th>Botón</th>
                        <th>Título</th>
                        <th>Archivo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {monumentos.map(m => (
                        <tr key={m.id}>
                            <td>{m.nombre}</td>
                            <td>{m.titulo}</td>
                            <td>{m.url_mapa}</td>
                            <td>
                                <button className="btn-borrar-tabla" onClick={() => eliminar(m.id)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}