const express = require("express");
const router = express.Router();
const db = require("../db");

// OBTENER AUDIOS
router.get("/audios", (req, res) => {
    db.query("SELECT * FROM audios", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// GUARDAR AUDIO
router.post("/audios", (req, res) => {
    const { titulo, url } = req.body;
    const sql = "INSERT INTO audios (titulo, url) VALUES (?, ?)";
    db.query(sql, [titulo, url], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId });
    });
});

// ELIMINAR AUDIO
router.delete("/audios/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM audios WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Audio eliminado" });
    });
});

module.exports = router;