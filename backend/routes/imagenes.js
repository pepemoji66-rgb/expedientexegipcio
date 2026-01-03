const express = require("express");
const router = express.Router();
const db = require("../db"); // Verifica que tu archivo de conexión se llame db.js

// OBTENER IMÁGENES
router.get("/imagenes", (req, res) => {
    db.query("SELECT * FROM imagenes ORDER BY orden ASC", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// GUARDAR IMAGEN
router.post("/imagenes", (req, res) => {
    const { titulo, url, orden } = req.body;
    const sql = "INSERT INTO imagenes (titulo, url, orden) VALUES (?, ?, ?)";
    db.query(sql, [titulo, url, orden || 0], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Imagen guardada", id: result.insertId });
    });
});

// ELIMINAR IMAGEN
router.delete("/imagenes/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM imagenes WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Imagen eliminada" });
    });
});

module.exports = router;