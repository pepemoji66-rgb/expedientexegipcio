const express = require("express");
const router = express.Router();
const db = require("../db");

// =======================
//   OBTENER CONTENIDOS
// =======================
router.get("/", (req, res) => {const express = require("express");
const router = express.Router();
const db = require("../db");

// =======================
//   OBTENER CONTENIDO
// =======================
router.get("/", (req, res) => {
  const sql = "SELECT clave, contenido FROM contenido_inicio";

  db.query(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Error cargando contenido" });
    }

    const resultado = {};
    rows.forEach((row) => {
      resultado[row.clave] = row.contenido;
    });

    res.json(resultado);
  });
});

// =======================
//   ACTUALIZAR CONTENIDO (ADMIN)
// =======================
router.post("/", (req, res) => {
  const esAdmin = req.headers["x-admin"];

  // 🔒 BLOQUEO REAL
  if (esAdmin !== "true") {
    return res.status(403).json({ error: "No autorizado" });
  }

  const { clave, contenido } = req.body;

  if (!clave || contenido === undefined) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const sql =
    "UPDATE contenido_inicio SET contenido = ? WHERE clave = ?";

  db.query(sql, [contenido, clave], (err) => {
    if (err) {
      return res.status(500).json({ error: "Error guardando contenido" });
    }

    res.json({ ok: true });
  });
});

module.exports = router;

  const sql = "SELECT clave, contenido FROM contenido_inicio";

  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al cargar contenido" });
    }

    const resultado = {};
    rows.forEach((row) => {
      resultado[row.clave] = row.contenido;
    });

    res.json(resultado);
  });
});

// =======================
//   ACTUALIZAR CONTENIDO
// =======================
router.post("/", (req, res) => {
  const { clave, contenido } = req.body;

  if (!clave || contenido === undefined) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const sql =
    "UPDATE contenido_inicio SET contenido = ? WHERE clave = ?";

  db.query(sql, [contenido, clave], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al guardar contenido" });
    }

    res.json({ ok: true });
  });
});

module.exports = router;
