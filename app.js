/**
 * ARQUITECTURA MODULAR BACKEND - DIVISION DE BILINGÜISMO
 * Archivo: app.js (Lógica pura del Servidor)
 */

const express = require("express");
const app = express();
const path = require("path");

// Asignación dinámica del puerto para Hostinger o puerto 3000 local
const PORT = process.env.PORT || 3000;

// MIDDLEWARE: Le indica a Express que sirva de forma automática
// cualquier archivo dentro de la carpeta 'public' (como index.html)
app.use(express.static(path.join(__dirname, "public")));

// RUTAS RESERVADAS PARA PARÁMETROS FUTUROS (SECCIONES SECUNDARIAS)
app.get("/get-underway", (req, res) => {
  res.send(
    "<h2>Get Underway 2.0</h2><p>Entorno Moodle reservado en código backend.</p>"
  );
});

app.get("/navyspeak", (req, res) => {
  res.send(
    "<h2>NavySpeak</h2><p>Entorno de descarga APK reservado en código backend.</p>"
  );
});

// INICIALIZACIÓN DEL SERVIDOR WEB
app.listen(PORT, () => {
  console.log(`Servidor Express modular ejecutándose en el puerto ${PORT}`);
});
