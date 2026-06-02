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

// 1. SERVIR EL PORTAL GENERAL DE BIENVENIDA (Carpeta public)
// Al entrar a la raíz '/', Express cargará automáticamente './public/index.html'
app.use("/", express.static(path.join(__dirname, "public")));

// 2. VINCULAR EL ENRUTADOR DEL COMPONENTE INTERNO NAVYSPEAK
// Importamos la lógica encapsulada de la subcarpeta navyspeak
const navySpeakRouter = require("./navyspeak/router");

// Acoplamos el enrutador para que responda bajo el prefijo '/navyspeak'
app.use("/navyspeak", navySpeakRouter);

// Marcador para la sección de Moodle
app.get("/get-underway", (req, res) => {
  res.send(
    "<h2>Get Underway 2.0</h2><p>Módulo Moodle en desarrollo posterior.</p>"
  );
});

// Guardaespaldas de procesos para que el servidor nunca se apague por excepciones directas
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
