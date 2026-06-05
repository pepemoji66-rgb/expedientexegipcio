import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../AuthContext";
import Hero from "./Hero";

export default function Home() {
  const { auth } = useContext(AuthContext); 
  const [contenido, setContenido] = useState({});
  const [form, setForm] = useState({});
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    api.get("/contenido-inicio")
      .then((res) => {
        setContenido(res.data);
        setForm(res.data);
      })
      .catch(() => console.error("Error cargando contenido"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
    try {
      for (const clave in form) {
        await api.post("/contenido-inicio", 
          { [clave]: form[clave] },
          { headers: { "x-admin": "true" } }
        );
      }
      setContenido(form);
      setEditando(false);
      alert("Templo actualizado, Faraón");
    } catch (error) {
      alert("Error al guardar");
    }
  };

  return (
    <div className="home-main-container">
      <Hero
        contenido={contenido}
        form={form}
        editando={editando}
        onChange={handleChange}
      />

      {/* 🔒 SEGURIDAD: Solo el admin ve esto */}
      {auth && (
        <div className="admin-zone">
          {!editando ? (
            <button className="btn-admin-gold" onClick={() => setEditando(true)}>
              ✏️ EDITAR TEXTOS
            </button>
          ) : (
            <div className="admin-actions">
              <button className="btn-save" onClick={guardarCambios}>💾 GUARDAR</button>
              <button className="btn-cancel" onClick={() => setEditando(false)}>❌ CANCELAR</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}