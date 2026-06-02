/**
 * DESARROLLO DE INTERFAZ: PÁGINA PRINCIPAL MODERNA Y RESPONSIVE
 * Sistema: División de Bilingüismo (DIEDU - DIVPE)
 * Componente: app.js
 */

// 1. IMPORTACIÓN DE LOGICA Y DEPENDENCIAS
const express = require("express");
const app = express();

// 2. ASIGNACIÓN DEL PUERTO DE RED PARA PRODUCCIÓN
const PORT = process.env.PORT || 3000;

// 3. ENRUTAMIENTO Y RENDERIZADO DE LA PÁGINA DE INICIO
app.get("/", (req, res) => {
  // Matriz de objetos en JavaScript para la construcción modular del menú
  const itemsMenu = [
    { texto: "Inicio", url: "/" },
    { texto: "Get Underway 2.0", url: "/get-underway" },
    { texto: "NavySpeak", url: "/navyspeak" },
  ];

  // Envío del documento visual con estilos integrados de última generación
  res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>DIEDU - DIVPE | Bilingüismo</title>
            <!-- Invocación de Tailwind CSS para el procesamiento del diseño responsive y estético -->
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-slate-100 min-h-screen flex flex-col justify-between font-sans antialiased">
            
            <!-- CODELÓGICA DE LA BARRA DE NAVEGACIÓN (NAVBAR MODERN) -->
            <nav class="bg-[#002060] text-white p-4 shadow-xl border-b-2 border-amber-500 sticky top-0 z-50">
                <div class="max-w-6xl mx-auto flex justify-between items-center px-4 md:px-8">
                    <!-- Identificación de la División con Estilo Tipográfico Fuerte -->
                    <div class="font-extrabold text-xl tracking-widest text-white flex items-center gap-2">
                        <span class="text-amber-400">ARC</span> BILINGÜISMO
                    </div>
                    
                    <!-- Enlaces del Menú: Se auto-ajustan en pantallas móviles -->
                    <div class="flex space-x-1 md:space-x-4 text-xs md:text-sm font-semibold">
                        ${itemsMenu
                          .map(
                            (item) => `
                            <a href="${item.url}" class="px-3 py-2 rounded-lg hover:bg-blue-900/60 hover:text-amber-400 transition-all duration-200">
                                ${item.texto}
                            </a>
                        `
                          )
                          .join("")}
                    </div>
                </div>
            </nav>

            <!-- CONTENEDOR PRINCIPAL: DISEÑO DINÁMICO Y RESPONSIVE -->
            <main class="flex-grow flex items-center justify-center p-4 md:p-12">
                <div class="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    <!-- Columna Izquierda: Mensaje de Bienvenida Institucional (6/12 ancho) -->
                    <div class="lg:col-span-5 text-center lg:text-left space-y-4">
                        <span class="bg-blue-100 text-[#002060] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                            DIEDU - DIVPE
                        </span>
                        <h1 class="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                            Portal Central de <span class="text-[#002060] underline decoration-amber-500">Idiomas</span>
                        </h1>
                        <p class="text-slate-600 text-sm md:text-base leading-relaxed">
                            Bienvenido a la plataforma tecnológica de la Dirección de Educación Naval. Un entorno diseñado para centralizar el aprendizaje, gestionar cursos y controlar las herramientas de bilingüismo de la Armada Nacional.
                        </p>
                    </div>

                    <!-- Columna Derecha: Tarjetas de Acceso con Grid Interno (7/12 ancho) -->
                    <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        
                        <!-- Tarjeta Dinámica 1: Get Underway 2.0 -->
                        <div class="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                            <div>
                                <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#002060] transition-colors duration-300">
                                    <span class="text-[#002060] font-bold text-lg group-hover:text-white">GU</span>
                                </div>
                                <h3 class="font-black text-lg text-slate-800 mb-1">Get Underway 2.0</h3>
                                <p class="text-xs text-slate-500 leading-relaxed mb-6">
                                    Capacitación interactiva en inglés técnico especializado a través del entorno virtual Moodle.
                                </p>
                            </div>
                            <a href="/get-underway" class="inline-flex items-center justify-center bg-[#002060] text-white text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-blue-900 transition shadow-sm">
                                Entrar al Curso
                            </a>
                        </div>

                        <!-- Tarjeta Dinámica 2: NavySpeak -->
                        <div class="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                            <div>
                                <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors duration-300">
                                    <span class="text-emerald-600 font-bold text-lg group-hover:text-white">NS</span>
                                </div>
                                <h3 class="font-black text-lg text-slate-800 mb-1">NavySpeak</h3>
                                <p class="text-xs text-slate-500 leading-relaxed mb-6">
                                    Aplicación móvil oficial (APK). Acceso directo a la landing page de descarga protegida.
                                </p>
                            </div>
                            <a href="/navyspeak" class="inline-flex items-center justify-center bg-emerald-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-emerald-700 transition shadow-sm">
                                Descargar APK
                            </a>
                        </div>

                    </div>
                </div>
            </main>

            <!-- PIE DE PÁGINA (FOOTER) -->
            <footer class="bg-slate-900 text-slate-400 text-center py-4 text-[10px] md:text-xs border-t border-slate-800">
                &copy; 2026 Armada Nacional de Colombia — Dirección de Educación Naval
            </footer>

        </body>
        </html>
    `);
});

// 4. RUTAS SECUNDARIAS CONFIGURADAS COMO MARCADORES DE POSICIÓN (PLACEHOLDERS)
app.get("/get-underway", (req, res) => {
  res.send(
    "<h2>Get Underway 2.0</h2><p>Módulo Moodle reservado. Código en desarrollo posterior.</p>"
  );
});

app.get("/navyspeak", (req, res) => {
  res.send(
    "<h2>NavySpeak</h2><p>Módulo APK reservado. Código en desarrollo posterior.</p>"
  );
});

// 5. INICIALIZACIÓN DEL SERVIDOR WEB
app.listen(PORT, () => {
  console.log(`Servidor de la división inicializado en el puerto: ${PORT}`);
});
