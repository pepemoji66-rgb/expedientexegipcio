const mysql = require("mysql2");
require("dotenv").config();

// Configuración adaptada para producción (Aiven/Render) y local (XAMPP/Laragon)
const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3307,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "egipto_db",
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : null,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log("📡 Pool de conexiones MySQL del Templo listo.");

const db = {
    query: (sql, params, callback) => {
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }
        pool.query(sql, params, callback);
    }
};

module.exports = db;
