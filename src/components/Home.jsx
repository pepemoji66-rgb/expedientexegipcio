import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import Hero from "./Hero";

export default function Home() {
  const { auth } = useContext(AuthContext); // admin (true / false)
  const [contenido, setContenido] = useState({});
  const [form, setForm] = useState({});
  const [editando, setEditando] = useState(false);

  // ======================
  //  CARGAR CONTENIDO
  // ======================
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contenido-inicio")
      .then((res) => {
        setContenido(res.data);
        setForm(res.data);
      })
      .catch(() => {
        alert("Error cargando contenido");
      });
  }, []);

  // ======================
  //  🔒 SINCRONIZAR AUTH → EDICIÓN
  // ======================
  useEffect(() => {
    if (!auth && editando) {
      setEditando(false);
      setForm(contenido);
    }
  }, [auth, editando, contenido]);

  // ======================
  //  CAMBIOS EN FORM
  // ======================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ======================
  //  GUARDAR (SOLO ADMIN)
  // ======================
  const guardarCambios = async () => {
    if (!auth) {
      alert("No autorizado");
      return;
    }

    try {
      for (const clave in form) {
        await axios.post(
          "http://localhost:5000/api/contenido-inicio",
          {
            clave,
            contenido: form[clave]
          },
          {
            headers: {
              "x-admin": "true"
            }
          }
        );
      }

      setContenido(form);
      setEditando(false);
      alert("Contenido actualizado correctamente");
    } catch (error) {
      alert("Error guardando contenido (403 si no eres admin)");
    }
  };

  return (
    <>
      <Hero
        contenido={contenido}
        form={form}
        editando={editando}
        onChange={handleChange}
      />

      {auth && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {!editando ? (
            <button onClick={() => setEditando(true)}>
              ✏️ Editar textos
            </button>
          ) : (
            <>
              <button onClick={guardarCambios}>💾 Guardar</button>
              <button
                onClick={() => {
                  setForm(contenido);
                  setEditando(false);
                }}
              >
                ❌ Cancelar
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
