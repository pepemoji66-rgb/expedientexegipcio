const express = require("express");
const router = express.Router();
const db = require("../db");

// 🔵 OBTENER CONTENIDO INICIO
router.get("/contenido-inicio", (req, res) => {
  const sql = "SELECT clave, contenido FROM contenido_inicio";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error DB:", err);
      return res.status(500).json({ error: "Error en base de datos" });
    }

    const data = {};
    results.forEach(row => {
      data[row.clave] = row.contenido;
    });

    res.json(data);
  });
});

// 🔵 GUARDAR CONTENIDO (ADMIN)
router.post("/contenido-inicio", (req, res) => {
  const data = req.body;

  const queries = Object.entries(data).map(([clave, contenido]) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO contenido_inicio (clave, contenido)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE contenido = VALUES(contenido)
      `;
      db.query(sql, [clave, contenido], err => {
        if (err) reject(err);
        else resolve();
      });
    });
  });

  Promise.all(queries)
    .then(() => res.json({ ok: true }))
    .catch(err => {
      console.error("Error guardando:", err);
      res.status(500).json({ error: "Error guardando contenido" });
    });
});

module.exports = router;
