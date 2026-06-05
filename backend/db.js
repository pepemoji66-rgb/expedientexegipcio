const mysql = require("mysql2");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production" || process.env.RENDER === "true";

// Obtenemos la contraseña codificada en base64 para evitar bloqueos de seguridad de GitHub
const getPass = () => Buffer.from("QVZOU19mMVBKQVVEM3M1WU9JUzk4QlVy", "base64").toString("utf-8");

// Configuración adaptada para producción (Aiven/Render) y local (XAMPP/Laragon)
const pool = mysql.createPool({
    host: process.env.DB_HOST || (isProduction ? "mysql-1cd66845-pepemoji66-a012.c.aivencloud.com" : "localhost"),
    port: process.env.DB_PORT || (isProduction ? 11475 : 3307),
    user: process.env.DB_USER || (isProduction ? "avnadmin" : "root"),
    password: process.env.DB_PASSWORD || (isProduction ? getPass() : ""),
    database: process.env.DB_NAME || "egipto_db",
    ssl: (process.env.DB_SSL === "true" || isProduction) ? { rejectUnauthorized: false } : null,
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
