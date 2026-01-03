const express = require("express");
const router = express.Router();
const db = require("../db");

// Esto responde a: POST http://localhost:5000/api/videos
router.post("/videos", (req, res) => {
    const { titulo, url } = req.body;
    const sql = "INSERT INTO videos (titulo, url) VALUES (?, ?)";
    
    db.query(sql, [titulo, url], (err, result) => {
        if (err) {
            console.error("Error MySQL:", err);
            return res.status(500).json(err);
        }
        res.json({ id: result.insertId });
    });
});

// Esto responde a: GET http://localhost:5000/api/videos
router.get("/videos", (req, res) => {
    db.query("SELECT * FROM videos", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// ELIMINAR AUDIO
router.delete("/videos/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM videos WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Video eliminado" });
    });
});

module.exports = router;