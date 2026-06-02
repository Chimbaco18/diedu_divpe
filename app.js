/**
 * SERVIDOR GENERAL DE CONTROL - PORTAL BILINGÜISMO
 * Archivo: ./app.js (Raíz)
 */

const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. RUTA EXPLÍCITA PARA LEVANTAR EL PORTAL DE NAVYSPEAK
// Cuando el usuario digite /navyspeak o /navyspeak/, el servidor le entregará
// directamente el archivo index.html que está en la carpeta navyspeak
app.get("/navyspeak", (req, res) => {
  res.sendFile(path.join(__dirname, "navyspeak", "index.html"));
});

// 2. SERVIR LOS RECURSOS ESTÁTICOS COMPARTIDOS Y MODULARES
// Esto mapea las carpetas para que index.html encuentre styles.css y client.js de inmediato
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/navyspeak", express.static(path.join(__dirname, "navyspeak")));

// Marcador para la sección de Moodle
app.get("/get-underway", (req, res) => {
  res.send(
    "<h2>Get Underway 2.0</h2><p>Módulo Moodle en desarrollo posterior.</p>"
  );
});

// Capturador de excepciones preventivo para inmunidad del proceso
process.on("uncaughtException", (err) => {
  console.error(
    "Se capturó un error no controlado de forma segura:",
    err.message
  );
});

app.listen(PORT, () => {
  console.log(
    `Servidor de la división corriendo con éxito en el puerto ${PORT}`
  );
});
