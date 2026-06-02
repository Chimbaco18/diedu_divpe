const express = require("express");
const app = express();
const path = require("path");

// Hostinger asignará el puerto automáticamente en producción, localmente usa el 3000
const PORT = process.env.PORT || 3000;

// Ruta Principal (Menú de la División de Bilingüismo)
app.get("/", (req, res) => {
  // Definición del menú con los nombres oficiales de los proyectos
  const secciones = [
    { nombre: "Inicio", url: "/" },
    { nombre: "Get Underway 2.0", url: "/get-underway" },
    { nombre: "NavySpeak (APK)", url: "/navyspeak" },
  ];

  res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>DIEDU - DIVPE | Bilingüismo</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-slate-50 min-h-screen flex flex-col justify-between">
            
            <!-- BARRA DE NAVEGACIÓN -->
            <nav class="bg-[#002060] text-white p-4 shadow-md flex justify-between items-center">
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

            <!-- CONTENIDO PRINCIPAL -->
            <main class="max-w-4xl mx-auto my-auto text-center p-6 bg-white rounded-lg shadow-sm border border-slate-200">
                <h1 class="text-3xl font-extrabold text-[#002060] mb-4">División de Bilingüismo</h1>
                <p class="text-slate-600 mb-6">Portal de administración y acceso a las plataformas de idiomas de la Armada Nacional de Colombia.</p>
                
                <!-- TARJETAS DE ACCESO -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Tarjeta Get Underway 2.0 -->
                    <div class="p-4 border rounded-lg text-left border-slate-200 hover:shadow-md transition">
                        <h3 class="font-bold text-lg text-slate-800">Get Underway 2.0</h3>
                        <p class="text-sm text-slate-500 mb-4">Curso de inglés especializado desarrollado sobre plataforma Moodle.</p>
                        <a href="/get-underway" class="text-blue-600 text-sm font-semibold hover:underline">Ingresar al Curso →</a>
                    </div>
                    
                    <!-- Tarjeta NavySpeak -->
                    <div class="p-4 border rounded-lg text-left border-slate-200 hover:shadow-md transition">
                        <h3 class="font-bold text-lg text-slate-800">NavySpeak</h3>
                        <p class="text-sm text-slate-500 mb-4">Aplicación móvil (APK). Landing page para descarga y control de uso.</p>
                        <a href="/navyspeak" class="text-emerald-600 text-sm font-semibold hover:underline">Ver Landing / Descargar →</a>
                    </div>
                </div>
            </main>

            <!-- PIE DE PÁGINA -->
            <footer class="bg-slate-800 text-slate-400 text-center py-3 text-xs">
                &copy; 2026 Armada Nacional de Colombia - DIEDU
            </footer>
        </body>
        </html>
    `);
});

// Rutas de las aplicaciones con sus nuevos end-points de enrutamiento
app.get("/get-underway", (req, res) => {
  res.send(
    "Módulo de autenticación e integración con Get Underway 2.0 (Moodle) en desarrollo."
  );
});

app.get("/navyspeak", (req, res) => {
  res.send(
    "Landing page de descarga y sistema de control de acceso para NavySpeak (APK) en desarrollo."
  );
});

// Inicialización del servicio
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
