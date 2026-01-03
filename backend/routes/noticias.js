const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de que la ruta a tu conexión de BD sea correcta

// OBTENER TODAS LAS NOTICIAS
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM noticias ORDER BY fecha DESC';
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// AÑADIR UNA NOTICIA
router.post('/', (req, res) => {
    const { titulo, resumen, url_enlace, url_imagen } = req.body;
    const sql = 'INSERT INTO noticias (titulo, resumen, url_enlace, url_imagen) VALUES (?, ?, ?, ?)';
    db.query(sql, [titulo, resumen, url_enlace, url_imagen], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, ok: true });
    });
});

// BORRAR UNA NOTICIA
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM noticias WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ ok: true });
    });
});

module.exports = router;