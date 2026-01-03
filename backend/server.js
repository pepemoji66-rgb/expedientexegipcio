const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db"); 

// 1. PRIMERO LOS MIDDLEWARES (Imprescindible arriba)
app.use(cors());
app.use(express.json());

// 2. IMPORTAR RUTAS
const noticiasRoutes = require('./routes/noticias');

// 3. CONEXIÓN DE TODAS LAS RUTAS
app.use("/api/noticias", noticiasRoutes); // Su propia ruta limpia
app.use("/api", require("./routes/usuarios"));
app.use("/api", require("./routes/videos"));
app.use("/api", require("./routes/audios"));
app.use("/api", require("./routes/imagenes"));
app.use("/api", require("./routes/contenidoInicio"));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Servidor funcionando en http://localhost:${PORT}`);
});