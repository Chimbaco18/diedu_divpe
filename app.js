/**
 * SERVIDOR EXPRESS COMPILADO DE BIENVENIDA
 * Archivo: app.js
 */

const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. CONFIGURACIÓN DIRECTA PARA EVITAR FALLOS DE PROPAGACIÓN .ENV
const pool = mysql.createPool({
  host: "127.0.0.1", // Localhost dentro de Hostinger
  user: "u790457506_user_navy", // Tu usuario real de phpMyAdmin
  password: "PonAquiTuContraseñaDeLaBaseDeDatos", // La clave de tu base de datos
  database: "u790457506_navyspeak_db", // Tu base de datos real
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

const db = pool.promise();

// Captura de errores de conexión preventiva para que el proceso no muera
pool.getConnection((err, connection) => {
  if (err) {
    console.error("====== ADVERTENCIA BASE DE DATOS ======");
    console.error("Express corriendo. MySQL no conectó:", err.message);
    console.error("=======================================");
  } else {
    console.log("Conexión exitosa a MySQL en Hostinger.");
    connection.release();
  }
});

// 2. ENRUTAMIENTO DIRECTO DE LOS RECURSOS DE FRONTEND
// Sirve el index.html de la carpeta public de forma automática
app.use("/", express.static(path.join(__dirname, "public")));
// Sirve todo el componente de la carpeta navyspeak
app.use("/navyspeak", express.static(path.join(__dirname, "navyspeak")));

// 3. API ENDPOINT DE AUTENTICACIÓN REAL CONTRA MYSQL
app.post("/navyspeak/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Campos incompletos." });
  }

  try {
    const [rows] = await db.execute(
      "SELECT id, full_name, role, is_active, password_hash FROM users WHERE LOWER(email) = ?",
      [email.trim().toLowerCase()]
    );

    if (rows.length === 0) {
      return res.json({
        success: false,
        message: "El usuario institucional no existe.",
      });
    }

    const usuario = rows[0];

    if (!usuario.is_active) {
      return res.json({ success: false, message: "El usuario está inactivo." });
    }

    if (usuario.password_hash === password) {
      await db.execute("UPDATE users SET last_login_at = NOW() WHERE id = ?", [
        usuario.id,
      ]);
      return res.json({
        success: true,
        message: "Acceso autorizado.",
        user: { name: usuario.full_name, role: usuario.role },
      });
    } else {
      return res.json({ success: false, message: "Contraseña incorrecta." });
    }
  } catch (error) {
    console.error("Error en query de login:", error.message);
    return res.json({
      success: false,
      message: "Error temporal de base de datos.",
    });
  }
});

// Marcador para evitar el error 404 en la otra sección
app.get("/get-underway", (req, res) => {
  res.send(
    "<h2>Get Underway 2.0</h2><p>Módulo Moodle en desarrollo de código posterior.</p>"
  );
});

// GUARDAESPALDAS GLOBAL: Si algo falla, el proceso NO muere y el 503 no aparece
process.on("uncaughtException", (err) => {
  console.error(
    "Capturado error crítico de ejecución de forma segura:",
    err.message
  );
});

app.listen(PORT, () => {
  console.log(
    `Servidor Express levantado de forma segura en el puerto ${PORT}`
  );
});
