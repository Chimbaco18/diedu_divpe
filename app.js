/**
 * SERVIDOR GENERAL DE CONTROL - PORTAL BILINGÜISMO
 * Archivo: ./app.js (Raíz del proyecto)
 */

const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

// Permite procesar datos JSON enviados por el navegador en peticiones POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. MIDDLEWARES ESTÁTICOS PRIORITARIOS
// Mapeamos las rutas web de forma limpia hacia los directorios físicos correspondientes
app.use("/", express.static(path.resolve(__dirname, "public")));
app.use("/navyspeak", express.static(path.resolve(__dirname, "navyspeak")));

// 2. VINCULACIÓN DEL SUBMÓDULO DE LA API DE DATOS
// Importamos el router encargado del backend y la persistencia de datos
const navySpeakRouter = require("./navyspeak/router");
app.use("/navyspeak/api", navySpeakRouter);

// 3. ENTRADA TRANSITORIA PARA EL MÓDULO MOODLE
app.get("/get-underway", (req, res) => {
  res.send(
    "<h2>Get Underway 2.0</h2><p>Módulo Moodle en desarrollo posterior.</p>"
  );
});

// GUARDAESPALDAS DE PROCESOS: Evita que cualquier fallo lógico apague el backend de la Armada
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
