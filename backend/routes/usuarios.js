const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// =======================
// 🔌 CONEXIÓN MYSQL
// =======================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "egipto_db", // ⬅️ CAMBIA ESTO
  port: 3307
});

// =======================
// GET /api/usuarios
// =======================
router.get("/usuarios", (req, res) => {
  const { nombre, ciudad, edad, sexo } = req.query;

  let sql = "SELECT * FROM usuarios WHERE 1=1";
  const params = [];

  if (nombre) {
    sql += " AND nombre LIKE ?";
    params.push(`%${nombre}%`);
  }
  if (ciudad) {
    sql += " AND ciudad LIKE ?";
    params.push(`%${ciudad}%`);
  }
  if (edad) {
    sql += " AND edad = ?";
    params.push(edad);
  }
  if (sexo) {
    sql += " AND sexo = ?";
    params.push(sexo);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("❌ Error GET usuarios:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.json(results);
  });
});

// =======================
// POST /api/usuarios
// =======================
router.post("/usuarios", (req, res) => {
  const { nombre, email, ciudad, edad, sexo, password } = req.body;

  const sql = `
    INSERT INTO usuarios (nombre, email, ciudad, edad, sexo, password)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nombre, email, ciudad, edad, sexo, password],
    (err) => {
      if (err) {
        console.error("❌ Error POST usuarios:", err);
        return res.status(500).json({ error: "Error insertando usuario" });
      }
      res.json({ ok: true });
    }
  );
});

module.exports = router;
