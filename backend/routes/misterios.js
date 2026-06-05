const express = require("express");
const router = express.Router();
const db = require("../db");

// 1. OBTENER TODOS LOS MISTERIOS
router.get("/", (req, res) => {
  const sql = "SELECT * FROM misterios ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 2. CREAR NUEVO MISTERIO
router.post("/", (req, res) => {
  const { titulo, icono, resumen, textoCompleto, imagen, latitud, longitud } = req.body;
  const sql = "INSERT INTO misterios (titulo, icono, resumen, textoCompleto, imagen, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [titulo, icono, resumen, textoCompleto, imagen || null, latitud || null, longitud || null], (err, result) => {
    if (err) {
      console.error("Error al crear misterio:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ ok: true, id: result.insertId });
  });
});

// 3. ELIMINAR MISTERIO
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM misterios WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

module.exports = router;
