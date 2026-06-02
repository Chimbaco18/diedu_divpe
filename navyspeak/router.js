/**
 * CONTROLADOR DE AUTENTICACIÓN REAL MYSQL
 * Archivo: navyspeak/router.js
 */

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();

// Inicializamos el Pool de conexiones usando las variables del hPanel
const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5,
});
const db = pool.promise();

// Servir estáticos locales del componente
router.use("/", express.static(__dirname));

// ENDPOINT DE AUTENTICACIÓN DEL PORTAL
router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Por favor, rellene todos los campos.",
    });
  }

  try {
    // Consultamos directo en la tabla 'users' sembrada en tu phpMyAdmin
    const [rows] = await db.execute(
      "SELECT id, full_name, role, is_active, password_hash, mfa_required FROM users WHERE LOWER(email) = ?",
      [email.trim().toLowerCase()]
    );

    if (rows.length === 0) {
      return res.json({
        success: false,
        message: "El usuario institucional no está registrado.",
      });
    }

    const usuario = rows[0];

    if (!usuario.is_active) {
      return res.json({
        success: false,
        message: "Su usuario se encuentra inactivo en la división.",
      });
    }

    // Validación de contraseña directa (Hash Bcrypt recomendado en fases posteriores)
    if (usuario.password_hash === password) {
      // Actualizamos auditoría de último acceso
      await db.execute("UPDATE users SET last_login_at = NOW() WHERE id = ?", [
        usuario.id,
      ]);

      return res.json({
        success: true,
        message: "Acceso concedido.",
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
    console.error("Error en BD NavySpeak:", error.message);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error interno en el servidor de datos.",
      });
  }
});

module.exports = router;
