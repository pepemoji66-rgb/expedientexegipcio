const express = require("express");
const router = express.Router();
const db = require("../db");

// ==========================
// INSERTAR USUARIO
// ==========================
router.post("/", (req, res) => {
    const { nombre, email, ciudad, edad, sexo, password } = req.body;

    const sql = `
        INSERT INTO usuarios (nombre, email, ciudad, edad, sexo, password)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    router.post("/", (req, res) => {
    const { nombre, email, ciudad, edad, sexo, password } = req.body;

    const sql = `
        INSERT INTO usuarios (nombre, email, ciudad, edad, sexo, password)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [nombre, email, ciudad, edad, sexo, password], (err, result) => {
        if (err) {
            console.log("❌ ERROR SQL INSERT:", err);
            return res.status(500).json({ error: err });
        }
        res.json({ success: true });
    });
});


    db.query(sql, [nombre, email, ciudad, edad, sexo, password], (err, result) => {
        if (err) {
            console.log("❌ ERROR SQL INSERT:", err);
            return res.status(500).json({ error: err });
        }
        res.json({ success: true });
    });
});

// ==========================
// ELIMINAR USUARIO POR ID
// ==========================
router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM usuarios WHERE id = ?";
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true });
    });
});

// ==========================
// ELIMINAR TODOS
// ==========================
router.delete("/", (req, res) => {
    const sql = "DELETE FROM usuarios";
    db.query(sql, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true });
    });
});
// ==========================
// EDITAR / ACTUALIZAR USUARIO
// ==========================
router.put("/:id", (req, res) => {
    const { nombre, email, ciudad, edad, sexo } = req.body;

    const sql = `
        UPDATE usuarios
        SET nombre = ?, email = ?, ciudad = ?, edad = ?, sexo = ?
        WHERE id = ?
    `;

    db.query(sql, [nombre, email, ciudad, edad, sexo, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true });
    });
});



// ==========================
// BUSCAR USUARIOS (GET)
// ==========================
router.get("/", (req, res) => {
    let filters = [];
    let values = [];

    if (req.query.nombre) {
        filters.push("nombre LIKE ?");
        values.push(`%${req.query.nombre}%`);
    }
    if (req.query.ciudad) {
        filters.push("ciudad LIKE ?");
        values.push(`%${req.query.ciudad}%`);
    }
    if (req.query.edad) {
        filters.push("edad = ?");
        values.push(req.query.edad);
    }
    if (req.query.sexo) {
        filters.push("sexo LIKE ?");
        values.push(`%${req.query.sexo}%`);
    }

    let sql = "SELECT * FROM usuarios";

    if (filters.length > 0) {
        sql += " WHERE " + filters.join(" AND ");
    }

    db.query(sql, values, (err, rows) => {
        if (err) {
            console.log("❌ ERROR SQL BUSCAR:", err);
            return res.status(500).json({ error: err });
        }
        res.json(rows);
    });
});

module.exports = router;
