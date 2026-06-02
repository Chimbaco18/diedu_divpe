/**
 * ENRUTADOR ESPECÍFICO DEL COMPONENTE NAVYSPEAK
 * Archivo: ./navyspeak/router.js
 */

const express = require("express");
const path = require("path");
const router = express.Router();

// Middleware intermedio para procesamiento de peticiones en este módulo
router.use(express.json());

// 1. RUTA EXPLICÍTA PARA CONTROLAR EL LOGIN DE NAVYSPEAK
// Cuando el usuario entre a /navyspeak o /navyspeak/, le enviamos su index.html dedicado
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 2. SERVIR ARCHIVOS VECINOS ESTÁTICOS EXCLUSIVOS (styles.css, client.js)
// Esto permite que el index.html pueda jalar sus estilos y scripts sin problemas
router.use("/", express.static(__dirname));

// Endpoint interno para recibir las peticiones de autenticación en fases posteriores
router.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  // Aquí se integrará la lógica de consulta SQL contra la tabla de Hostinger
  res.json({ success: true, message: "Endpoint de comunicación activo." });
});

module.exports = router;
