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

// 1. DETERMINACIÓN ESTABLE DE LA RUTA ABSOLUTA (Solución al error ENOENT de Hostinger)
// path.resolve() limpia los segmentos de carpetas virtuales de Node.js como '/nodejs'
const NAVYSPEAK_DIR = path.resolve(__dirname, "navyspeak");

// 2. SERVIR RECURSOS ESTÁTICOS COMPONENTIZADOS
// Con esta instrucción, Express mapea internamente la carpeta física y expone sus archivos (.js, .css)
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/navyspeak", express.static(NAVYSPEAK_DIR));

// 3. DESPACHO ASÍNCRONO FLUIDO DEL HTML DE NAVYSPEAK
// Cuando el usuario digite /navyspeak, enviamos el archivo calculando su ubicación absoluta en disco
app.get("/navyspeak", (req, res) => {
  const fileTarget = path.join(NAVYSPEAK_DIR, "index.html");

  res.sendFile(fileTarget, (err) => {
    if (err) {
      console.error(
        "Fallo físico al despachar el archivo index.html:",
        err.message
      );
      res
        .status(404)
        .send(
          "Error de infraestructura: El archivo index.html no se encuentra en la ruta esperada del servidor."
        );
    }
  });
});

// 4. VINCULACIÓN DEL SUBMÓDULO DE LA API DE DATOS
const navySpeakRouter = require("./navyspeak/router");
app.use("/navyspeak/api", navySpeakRouter);

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
