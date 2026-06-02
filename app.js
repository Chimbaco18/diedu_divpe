/**
 * BACKEND GLOBAL CON CONEXIÓN A BASE DE DATOS MYSQL
 * Componente principal: app.js
 */

const express = require("express");
const mysql = require("mysql2");
const path = require("path");
// Módulo para cargar las variables secretas del entorno (.env)
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares obligatorios para capturar y procesar datos JSON en peticiones POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del Pool de conexiones para optimizar las consultas al hosting
const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "3306", 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Habilitamos el uso de promesas (async/await) para un código más limpio y legible
const db = pool.promise();

// Servir los componentes estáticos desde sus respectivas carpetas encapsuladas
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/navyspeak", express.static(path.join(__dirname, "navyspeak")));

/**
 * ENDPOINT DE PROGRAMACIÓN: AUTENTICACIÓN DE USUARIOS NAVYSPEAK
 * Recibe: email, password desde el formulario del cliente
 */
app.post("/navyspeak/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Por favor, complete todos los campos.",
      });
  }

  try {
    // Consulta estructurada con parámetros preparados para proteger la base de datos
    const [rows] = await db.execute(
      "SELECT id, full_name, role, is_active, password_hash FROM users WHERE LOWER(email) = ?",
      [email.trim().toLowerCase()]
    );

    // Validación de existencia del registro en la tabla SQL
    if (rows.length === 0) {
      return res.json({
        success: false,
        message: "El usuario institucional no se encuentra registrado.",
      });
    }

    const usuario = rows[0];

    // Validación de estado del usuario activo
    if (!usuario.is_active) {
      return res.json({
        success: false,
        message: "El usuario se encuentra inactivo. Contacte al administrador.",
      });
    }

    // Validación de credencial de acceso contra la columna password_hash
    if (usuario.password_hash === password) {
      // Registro de auditoría: actualiza la fecha de último acceso en la base de datos
      await db.execute("UPDATE users SET last_login_at = NOW() WHERE id = ?", [
        usuario.id,
      ]);

      return res.json({
        success: true,
        message: "Autenticación exitosa.",
        user: { name: usuario.full_name, role: usuario.role },
      });
    } else {
      return res.json({ success: false, message: "Contraseña incorrecta." });
    }
  } catch (error) {
    console.error("Error en la consulta de autenticación:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error interno en el servidor de base de datos.",
      });
  }
});

// Inicialización de la escucha del servidor web de la división
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo activamente en el puerto ${PORT}`);
});
