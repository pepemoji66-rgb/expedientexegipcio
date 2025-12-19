const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// =======================
// 🧱 MIDDLEWARES
// =======================
app.use(cors());
app.use(express.json());

// =======================
// 🔵 RUTAS API
// =======================
app.use("/api", require("./routes/contenidoInicio"));
app.use("/api", require("./routes/usuarios"));   // 👈 USUARIOS OK

// =======================
// 🟡 SERVIR REACT (PROD)
// =======================
const buildPath = path.resolve(__dirname, "build");
app.use(express.static(buildPath));

// ⚠️ TODAS las rutas que NO sean /api → React
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// =======================
// 🚀 ARRANQUE
// =======================
app.listen(PORT, () => {
  console.log(`🔥 Servidor iniciado en puerto ${PORT}`);
});
