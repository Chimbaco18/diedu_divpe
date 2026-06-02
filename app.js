/**
 * DOCUMENTACIÓN DEL SERVIDOR: PLATAFORMA DE BILINGÜISMO (DIEDU - DIVPE)
 * Finalidad: Controlar el enrutamiento y servir las interfaces de usuario.
 */

// 1. IMPORTACIÓN DE MÓDULOS DE PROGRAMACIÓN
const express = require("express");
const app = express();
const path = require("path");

// 2. CONFIGURACIÓN DE VARIABLES DE ENTORNO
// PORT toma el puerto asignado automáticamente por Hostinger o usa el 3000 localmente.
const PORT = process.env.PORT || 3000;

// 3. DEFINICIÓN DE RUTAS (CODELÓGICA DE EXPRESS)

// Ruta Raíz: Renderiza el menú principal de la división
app.get("/", (req, res) => {
  // Array de objetos para mapear la navegación de forma limpia y modular
  const secciones = [
    { nombre: "Inicio", url: "/" },
    { nombre: "Get Underway 2.0", url: "/get-underway" },
    { nombre: "NavySpeak", url: "/navyspeak" },
  ];

  // Envío del código HTML/CSS responsivo al navegador del cliente
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
            
            <!-- BARRA DE NAVEGACIÓN INSTITUCIONAL -->
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

            <!-- CONTENEDOR CENTRAL -->
            <main class="max-w-4xl mx-auto my-auto text-center p-8 bg-white rounded-xl shadow-sm border border-slate-200 m-4">
                <h1 class="text-3xl font-extrabold text-[#002060] mb-4">División de Bilingüismo</h1>
                <p class="text-slate-600 mb-8">Portal oficial de administración y control de programas de idiomas de la Dirección de Educación Naval.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Tarjeta Get Underway 2.0 -->
                    <div class="p-6 border rounded-xl text-left border-slate-200 hover:shadow-md transition">
                        <h3 class="font-bold text-lg text-slate-800">Get Underway 2.0</h3>
                        <p class="text-sm text-slate-500 mb-4">Curso interactivo de inglés especializado integrado con la plataforma Moodle.</p>
                        <a href="/get-underway" class="text-blue-600 text-sm font-semibold hover:underline">Ingresar al Curso →</a>
                    </div>
                    
                    <!-- Tarjeta NavySpeak -->
                    <div class="p-6 border rounded-xl text-left border-slate-200 hover:shadow-md transition">
                        <h3 class="font-bold text-lg text-slate-800">NavySpeak</h3>
                        <p class="text-sm text-slate-500 mb-4">Aplicación móvil (APK). Módulo para la descarga y el control de uso de usuarios.</p>
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

// Ruta del Módulo Get Underway 2.0
app.get("/get-underway", (req, res) => {
  res.send(
    "<h2>Get Underway 2.0</h2><p>Código para la pasarela de autenticación de Moodle en desarrollo.</p>"
  );
});

// Ruta del Módulo NavySpeak
app.get("/navyspeak", (req, res) => {
  res.send(
    "<h2>NavySpeak</h2><p>Código para la landing page de descarga y control de uso de la APK en desarrollo.</p>"
  );
});

// 4. INICIALIZACIÓN DEL PROCESO DEL SERVIDOR WEB
app.listen(PORT, () => {
  console.log(`Servidor escuchando activamente a través del puerto: ${PORT}`);
});
