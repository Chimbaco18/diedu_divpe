/**
 * SUBMÓDULO DE RUTAS - COMPONENTE NAVYSPEAK
 * Archivo: ./navyspeak/router.js
 */

const express = require("express");
const router = express.Router();

// Middleware intermedio para procesamiento de peticiones en este módulo
router.use(express.json());

// Servir de forma estática los archivos vecinos de la carpeta (styles.css, client.js)
router.use("/", express.static(__dirname));

// Endpoint interno para recibir las peticiones de autenticación en fases posteriores
router.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  res.json({ success: true, message: "Endpoint de comunicación activo." });
});

module.exports = router;
