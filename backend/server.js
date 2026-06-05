const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");

// 1. MIDDLEWARES
app.use(cors());
app.use(express.json());

// 2. CONEXIÓN DE TODAS LAS RUTAS EXISTENTES
app.use("/api/noticias", require('./routes/noticias'));
app.use("/api", require("./routes/usuarios"));
app.use("/api", require("./routes/videos"));
app.use("/api", require("./routes/audios"));
app.use("/api", require("./routes/imagenes"));
app.use("/api", require("./routes/contenidoInicio"));
// ELIMINAR MONUMENTO
app.delete('/api/monumentos/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM monumentos_360 WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Monumento eliminado" });
    });
});

// AÑADIR NUEVO (Por si bajas más vídeos)
app.post('/api/monumentos', (req, res) => {
    const { nombre, titulo, descripcion, url_mapa } = req.body;
    const sql = "INSERT INTO monumentos_360 (nombre, titulo, descripcion, url_mapa) VALUES (?, ?, ?, ?)";
    db.query(sql, [nombre, titulo, descripcion, url_mapa], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Monumento añadido", id: result.insertId });
    });
});

// --- ESTO ES LO QUE FALTA ---
app.get('/api/monumentos', (req, res) => {
    console.log("📢 La web ha pedido los datos 360...");
    const sql = "SELECT * FROM monumentos_360";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("❌ Error en DB:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

const path = require("path");

// Servir archivos estáticos del build de React (Producción)
app.use(express.static(path.join(__dirname, "../build")));

// Fallback para cualquier ruta no-API a index.html (SPA)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor funcionando en el puerto ${PORT}`);
});