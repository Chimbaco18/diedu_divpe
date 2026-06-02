/**
 * SERVIDOR GENERAL DE CONTROL - PORTAL BILINGÜISMO
 * Archivo: ./app.js (Raíz del proyecto)
 */

const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. CARGA DE MIDDLEWARES ESTÁTICOS PRIORITARIOS
// Mapeamos el acceso directo. Al ingresar a /navyspeak, Express buscará 
// por defecto el archivo index.html dentro de esa carpeta de forma automática.
app.use("/", express.static(path.resolve(__dirname, "public")));
app.use("/navyspeak", express.static(path.resolve(__dirname, "navyspeak")));

// 2. REGLA DE REDIRECCIÓN DE RUTA LIMPIA
// Si el usuario digita /navyspeak sin la barra final, forzamos la barra diagonal
// para que el navegador resuelva correctamente los scripts vecinos (client.js y styles.css)
app.get("/navyspeak", (req, res) => {
  res.redirect("/navyspeak/");
});

// 3. VINCULACIÓN DEL SUBMÓDULO DE LA API DE DATOS
// Conectamos el router única y exclusivamente para procesar las peticiones POST de la base de datos
const navySpeakRouter = require("./navyspeak/router");
app.use("/navyspeak/api", navySpeakRouter);

// Módulo transitorio de Moodle
app.get("/get-underway", (req, res) => {
  res.send(
    "<h2>Get Underway 2.0</h2><p>Módulo Moodle en desarrollo posterior.</p>"
  );