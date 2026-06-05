const express = require("express");
const router = express.Router();
const db = require("../db");

// 1. OBTENER TODOS LOS EXPEDIENTES
router.get("/", (req, res) => {
  const sql = "SELECT * FROM expedientes ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Parsear detalles JSON a array nativo antes de enviar a React
    const parsed = results.map(row => {
      try {
        return {
          ...row,
          detalles: typeof row.detalles === "string" ? JSON.parse(row.detalles) : row.detalles
        };
      } catch (e) {
        return { ...row, detalles: [] };
      }
    });
    res.json(parsed);
  });
});

// 2. CREAR NUEVO EXPEDIENTE
router.post("/", (req, res) => {
  const { sigla, titulo, periodo, imagen, resumen, detalles, latitud, longitud } = req.body;
  
  // Asegurar que detalles sea guardado como string JSON
  const detallesStr = typeof detalles === "string" ? detalles : JSON.stringify(detalles || []);
  
  const sql = "INSERT INTO expedientes (sigla, titulo, periodo, imagen, resumen, detalles, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [sigla, titulo, periodo, imagen || null, resumen, detallesStr, latitud || null, longitud || null], (err, result) => {
    if (err) {
      console.error("Error al crear expediente:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ ok: true, id: result.insertId });
  });
});

// 3. ELIMINAR EXPEDIENTE
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM expedientes WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

module.exports = router;
