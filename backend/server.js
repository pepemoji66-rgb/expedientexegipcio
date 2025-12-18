const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

// =======================
//     INICIAR APP
// =======================
const app = express();

// =======================
//        CORS
// =======================
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  })
);

// =======================
//     BODY JSON
// =======================
app.use(express.json());

// =======================
//    CONEXIÓN MYSQL
// =======================
const db = require("./db");

// =======================
//   RUTAS USUARIOS
// =======================
const usuariosRoutes = require("./routes/usuarios");
app.use("/api/usuarios", usuariosRoutes);

// =======================
//          LOGIN
// =======================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ ok: false });
    }

    if (result.length === 0) {
      return res.status(401).json({ ok: false });
    }

    const usuario = result[0];

    const esAdmin = usuario.email === "admin@admin.com";

    res.json({
      ok: true,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        esAdmin
      }
    });
  });
});

// =======================
//   CONTENIDO INICIO
// =======================
app.get("/api/contenido-inicio", (req, res) => {
  const sql = "SELECT clave, contenido FROM contenido_inicio";

  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
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
//   ACTUALIZAR CONTENIDO
// =======================
app.post("/api/contenido-inicio", (req, res) => {
  const esAdmin = req.headers["x-admin"];

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
      console.error(err);
      return res.status(500).json({ error: "Error guardando contenido" });
    }

    res.json({ ok: true });
  });
});

// =======================
//     SERVIDOR HTTP
// =======================
const server = http.createServer(app);

// =======================
//        SOCKET.IO
// =======================
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

require("./socket")(io);

// =======================
//     PUERTO (RENDER)
// =======================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("🔥 Servidor iniciado en puerto", PORT);
});
