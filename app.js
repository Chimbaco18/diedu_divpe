// Importación del framework web Express para la gestión de peticiones HTTP
const express = require("express");
const app = express();
const path = require("path");

// Definición de la variable de entorno para el puerto del servidor
const PORT = process.env.PORT || 3000;

// Configuración de la ruta principal para la interfaz de la División de Bilingüismo
app.get("/", (req, res) => {
  // Estructura modular del menú de navegación
  const secciones = [
    { nombre: "Inicio", url: "/" },
    { nombre: "Get Underway 2.0", url: "/get-underway" },
    { nombre: "NavySpeak", url: "/navyspeak" },
  ];

  // Código de la vista principal utilizando un diseño responsivo adaptado con Tailwind CSS
  res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>DIEDU - DIVPE | Bilingüismo</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-slate-50 min-h-screen flex flex-col justify-between font-sans">
            
            <!-- Barra de navegación institucional -->
            <nav class="bg-[#002060] text-white p-4 shadow-md flex justify-between items-center px-6">
                <span class="font-bold text-lg tracking-wider">ARC - BILINGÜISMO</span>
                <div class="space-x-4">
                    ${secciones
                      .map(
                        (s) =>
                          `<a href="${s.url}" class="hover:underline text-sm font-medium">${s.nombre}</a>`
                      )
                      .join("")}
                </div>
            </nav>

            <!-- Contenedor del portal central -->
            <main class="max-w-4xl mx-auto my-auto text-center p-8 bg-white rounded-xl shadow-sm border border-slate-200 m-4">
                <h1 class="text-3xl font-extrabold text-[#002060] mb-4">División de Bilingüismo</h1>
                <p class="text-slate-600 mb-8">Portal oficial de administración de la Dirección de Educación Naval.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Enrutamiento a Moodle -->
                    <div class="p-6 border rounded-xl text-left border-slate-200 hover:shadow-md transition">
                        <h3 class="font-bold text-lg text-slate-800">Get Underway 2.0</h3>
                        <p class="text-sm text-slate-500 mb-4">Curso interactivo de inglés especializado sobre la plataforma Moodle.</p>
                        <a href="/get-underway" class="text-blue-600 text-sm font-semibold hover:underline">Ingresar al Curso →</a>
                    </div>
                    
                    <!-- Enrutamiento a la APK -->
                    <div class="p-6 border rounded-xl text-left border-slate-200 hover:shadow-md transition">
                        <h3 class="font-bold text-lg text-slate-800">NavySpeak</h3>
                        <p class="text-sm text-slate-500 mb-4">Aplicación móvil (APK). Descarga protegida y módulo de control de uso.</p>
                        <a href="/navyspeak" class="text-emerald-600 text-sm font-semibold hover:underline">Ver Landing / Descargar →</a>
                    </div>
                </div>
            </main>

            <!-- Pie de página institucional -->
            <footer class="bg-slate-800 text-slate-400 text-center py-3 text-xs">
                &copy; 2026 Armada Nacional de Colombia - DIEDU
            </footer>
        </body>
        </html>
    `);
});

// Código de programación para la ruta específica de Get Underway 2.0
app.get("/get-underway", (req, res) => {
  res.send(
    "<h2>Get Underway 2.0</h2><p>Módulo de conexión para el inicio de sesión de Moodle en desarrollo de código.</p>"
  );
});

// Código de programación para la ruta específica de NavySpeak
app.get("/navyspeak", (req, res) => {
  res.send(
    "<h2>NavySpeak</h2><p>Módulo de descarga y estadísticas de uso de la APK en desarrollo de código.</p>"
  );
});

// Inicialización de la escucha de red del servidor
app.listen(PORT, () => {
  console.log(
    `Servidor de Node.js escuchando activamente en el puerto ${PORT}`
  );
});
