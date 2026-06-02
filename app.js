/**
 * SERVIDOR GENERAL DE CONTROL - DIVPE
 * Archivo: ./app.js (Raíz del proyecto)
 */

const express = require("express");
const path = require("path");
const app = express();

// Puerto asignado por Hostinger o 3000 local
const PORT = process.env.PORT || 3000;

// Middlewares estándar para procesar datos estructurados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. SERVIR EL PORTAL GENERAL DE BIENVENIDA (Carpeta public)
// Al entrar a la raíz /, cargará automáticamente tu 'public/index.html'
app.use("/", express.static(path.join(__dirname, "public")));

// 2. VINCULAR EL COMPONENTE DE NAVYSPEAK EN SU CARPETA INDEPENDIENTE
// Importamos el archivo de enrutamiento que creamos en la subcarpeta
const navySpeakRouter = require("./navyspeak/router");

// Delegamos la ruta '/navyspeak' al enrutador interno del componente
app.use("/navyspeak", navySpeakRouter);

// Marcador transitorio para evitar errores 404 en la otra sección
app.get("/get-underway", (req, res) => {
  res.send(
    "<h2>Get Underway 2.0</h2><p>Módulo Moodle en desarrollo posterior.</p>"
  );
});

// GUARDAESPALDAS GLOBAL: Evita de forma absoluta que Express se caiga por cualquier error
process.on("uncaughtException", (err) => {
  console.error(
    "Se capturó un error no controlado en el servidor raíz de forma segura:",
    err.message
  );
});

app.listen(PORT, () => {
  console.log(
    `Servidor raíz de la división corriendo con éxito en el puerto ${PORT}`
  );
});
