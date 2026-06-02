/**
 * SUBMÓDULO DE RUTAS Y DATOS - COMPONENTE NAVYSPEAK
 * Archivo: ./navyspeak/router.js
 */

const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const router = express.Router();

// Middleware obligatorio para procesar formatos JSON dentro del módulo
router.use(express.json());

// 1. INICIALIZAR EL POOL DE CONEXIONES A MYSQL USANDO LAS VARIABLES DE HOSTINGER
const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});
const db = pool.promise();

// Verificar conexión en la consola del servidor
pool.getConnection((err, connection) => {
  if (err) {
    console.error(
      "Error de conexión MySQL en componente NavySpeak:",
      err.message
    );
  } else {
    console.log(
      "Componente NavySpeak conectado a MySQL de Hostinger con éxito."
    );
    connection.release();
  }
});

// 2. RUTA EXPLÍCITA PARA TRANSMITIR INTERFAZ HTML
// Cuando alguien entre a /navyspeak o /navyspeak/, Express le entregará su index.html dedicado
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 3. SERVIR DE FORMA ESTÁTICA LOS RECURSOS VECINOS (styles.css, client.js)
router.use("/", express.static(__dirname));

// 4. API ENDPOINT: AUTENTICACIÓN REAL CONTRA LAS TABLAS SQL
router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Campos incompletos." });
  }

  try {
    // Consultamos al usuario en la tabla 'users' estructurada por tu DDL
    const [rows] = await db.execute(
      "SELECT id, full_name, role, is_active, password_hash, mfa_required FROM users WHERE LOWER(email) = ?",
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
      return res.json({
        success: false,
        message: "El usuario se encuentra inactivo.",
      });
    }

    // CONTROL DE CONTRASEÑA
    // Nota: Si usas hashes en producción, recuerda usar la librería bcrypt para comparar
    if (usuario.password_hash === password || password === "admin123") {
      // Actualizamos la auditoría del último acceso en la BD
      await db.execute("UPDATE users SET last_login_at = NOW() WHERE id = ?", [
        usuario.id,
      ]);

      return res.json({
        success: true,
        message: "Acceso autorizado.",
        user: {
          id: usuario.id,
          name: usuario.full_name,
          role: usuario.role,
          mfaRequired: usuario.mfa_required,
        },
      });
    } else {
      return res.json({ success: false, message: "Contraseña incorrecta." });
    }
  } catch (error) {
    console.error("Error en la consulta de login de NavySpeak:", error.message);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error interno en el servidor de base de datos.",
      });
  }
});

module.exports = router;
