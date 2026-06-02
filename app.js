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

// 1. RESOLUCIÓN DE DIRECTORIOS ABSOLUTOS DE FORMA SEGURA
const PUBLIC_DIR = path.resolve(__dirname, "public");
const NAVYSPEAK_DIR = path.resolve(__dirname, "navyspeak");[cite: 7]

// 2. MIDDLEWARES ESTÁTICOS COMPARTIDOS
app.use("/", express.static(PUBLIC_DIR));
app.use("/navyspeak", express.static(NAVYSPEAK_DIR));[cite: 7]

// 3. RUTA DE ENTREGA BLINDADA PARA NAVYSPEAK
// Usamos path.join combinado con la ruta resuelta de __dirname para evitar desvíos de carpetas virtuales
app.get("/navyspeak", (req, res) => {
  const fileTarget = path.join(NAVYSPEAK_DIR, "index.html");[cite: 7]
  
  res.sendFile(fileTarget, (err) => {
    if (err) {
      console.error("Fallo físico en el servidor de Hostinger al leer el archivo:", err.message);
      
      // Contingencia: Si falla la ruta absoluta por permisos del hosting, 
      // dejamos que el middleware estático intente resolver la entrega por defecto.
      res.redirect("/navyspeak/");
    }
  });
});

// 4. VINCULACIÓN DEL SUBMÓDULO DE LA API DE DATOS
const navySpeakRouter = require("./navyspeak/router");[cite: 7]
app.use("/navyspeak/api", navySpeakRouter);[cite: 7]

// Módulo transitorio de Moodle
app.get("/get-underway", (req, res) => {
  res.send(
    "<h2>Get Underway 2.0</h2><p>Módulo Moodle en desarrollo posterior.</p>"
  );[cite: 7]
});

// Capturador de excepciones preventivo para inmunidad del proceso
process.on("uncaughtException", (err) => {
  console.error("Se capturó un error no controlado de forma segura:", err.message);[cite: 7]
});

app.listen(PORT, () => {
  console.log(`Servidor de la división corriendo con éxito en el puerto ${PORT}`);[cite: 7]
});