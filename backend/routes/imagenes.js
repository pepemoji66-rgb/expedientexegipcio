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

// GUARDAR IMAGEN (ACTUALIZADO CON DESCRIPCIÓN)
router.post("/imagenes", (req, res) => {
    // 1. Añadimos 'descripcion' aquí
    const { titulo, url, orden, descripcion } = req.body;

    // 2. Añadimos 'descripcion' a la consulta y una cuarta '?'
    const sql = "INSERT INTO imagenes (titulo, url, orden, descripcion) VALUES (?, ?, ?, ?)";

    // 3. Pasamos el valor en el array de parámetros
    db.query(sql, [titulo, url, orden || 0, descripcion || ""], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({
            message: "Imagen guardada",
            id: result.insertId,
            titulo,
            url,
            descripcion // Lo devolvemos para que React lo tenga al momento
        });
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