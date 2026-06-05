const express = require("express");
const router = express.Router();
const db = require("../db");

// 🔍 BUSCAR USUARIOS (Tu código GET actual)
router.get("/usuarios", (req, res) => {
  const { nombre, ciudad, edad, sexo } = req.query;
  let sql = "SELECT * FROM usuarios WHERE 1=1";
  const params = [];
  if (nombre) { sql += " AND nombre LIKE ?"; params.push(`%${nombre}%`); }
  if (ciudad) { sql += " AND ciudad LIKE ?"; params.push(`%${ciudad}%`); }
  if (edad) { sql += " AND edad = ?"; params.push(edad); }
  if (sexo) { sql += " AND sexo = ?"; params.push(sexo); }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.json(results);
  });
});

// ✍️ CREAR USUARIO (Registro corregido para React)
router.post("/usuarios", (req, res) => {
  const { nombre, email, ciudad, edad, sexo, password } = req.body;
  const sql = "INSERT INTO usuarios (nombre, email, ciudad, edad, sexo, password) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [nombre, email, ciudad, edad, sexo, password], (err) => {
    if (err) {
      console.error("❌ Error POST usuarios:", err);
      return res.status(500).json({ error: "Error insertando usuario" });
    }
    // Devolvemos 201 para que React lo detecte como éxito total
    res.status(201).json({ ok: true });
  });
});

// 🔑 NUEVO: LOGIN DE USUARIOS (¡Esta era la que faltaba!)
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en el servidor" });

    if (results.length > 0) {
      // El usuario existe y la clave coincide
      res.json({ ok: true, user: results[0] });
    } else {
      // No se encontró o datos mal
      res.json({ ok: false, message: "Usuario o contraseña incorrectos" });
    }
  });
});

// 🗑️ ELIMINAR USUARIO
router.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM usuarios WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error al borrar" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "ID no encontrado" });
    res.json({ ok: true, message: "Usuario eliminado" });
  });
});

module.exports = router;