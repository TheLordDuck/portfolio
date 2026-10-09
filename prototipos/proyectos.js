// Datos compartidos por los cuatro prototipos.
// Las descripciones salen de los README de cada proyecto; revisa y ajusta lo que haga falta.
window.PROYECTOS = [
  {
    id: "bri-llar",
    nombre: "Bri-LLAR",
    año: 2026,
    categoria: "Clientes",
    corto: "Gestión interna para una empresa de limpieza",
    descripcion:
      "Clientes, albaranes, facturas y presupuestos en PDF, envío de facturas por email, trabajadores y hojas de horas de los centros de limpieza. En català, español, english y português, con tema claro y oscuro.",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Tiptap", "Vitest"],
    destacado: true,
  },
  {
    id: "personand",
    nombre: "PersonAND",
    año: 2026,
    categoria: "Clientes",
    corto: "La gestió laboral d'Andorra, en ordre",
    descripcion:
      "Gestión laboral para gestorías y empresas de Andorra: trabajadores, contratos, altas y bajas, horas, vacaciones y, más adelante, nóminas.",
    stack: ["Next.js", "PostgreSQL", "Docker", "Vitest"],
    destacado: true,
    estado: "En desarrollo",
  },
  {
    id: "endstep-arena",
    nombre: "Endstep Arena",
    año: 2026,
    categoria: "Magic",
    corto: "Extensión de Chrome con UI estilo Arena para endstep.cc",
    descripcion:
      "Extensión Chromium (MV3) que cubre las partidas de endstep.cc con un tablero moderno centrado en las cartas. Solo visual: juega a través del socket de Endstep sin enviar nada que su propia UI no enviaría.",
    stack: ["TypeScript", "Chrome MV3", "WebSocket"],
    destacado: true,
    estado: "v0.5",
  },
  {
    id: "construccions-mouta",
    nombre: "Construccions Mouta",
    año: 2025,
    categoria: "Clientes",
    corto: "Facturación en PDF para una constructora",
    descripcion:
      "Genera facturas en PDF a partir de los servicios contratados y las envía por email a los clientes, con tareas programadas.",
    stack: ["Next.js", "Prisma", "pdf-lib", "node-cron"],
  },
  {
    id: "orbit",
    nombre: "Orbit",
    año: 2026,
    categoria: "Clientes",
    corto: "Sistema operativo interno de Aubity",
    descripcion:
      "Herramienta privada para los socios de Aubity: qué hay que hacer, quién lo hace, clientes, oportunidades, proyectos activos, decisiones, dinero y documentos, todo en un sitio.",
    stack: ["Next.js", "Supabase", "Vitest"],
  },
  {
    id: "aubity",
    nombre: "Aubity",
    año: 2026,
    categoria: "Clientes",
    corto: "Landing de aubity.es",
    descripcion:
      "Migración de una web estática HTML/CSS/JS a Next.js conservando diseño y comportamiento. En català, español e english.",
    stack: ["Next.js", "Tailwind v4", "TypeScript"],
  },
  {
    id: "peasant-standard",
    nombre: "Peasant Standard",
    año: 2025,
    categoria: "Magic",
    corto: "Web y guía de un cubo casero de Magic",
    descripcion:
      "Blog público y guía del cubo con estética de periódico tipográfico, más un panel de administración con contraseña para gestionar el contenido.",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind v4"],
  },
  {
    id: "update-inventory",
    nombre: "update-inventory",
    año: 2026,
    categoria: "Magic",
    corto: "Repricer automático para Cardmarket",
    descripcion:
      "Cardmarket no tiene API ni exportación de stock, así que esta herramienta maneja tu propio Chrome ya abierto y hace los clics por ti: repricing automático o exportar → editar → importar en CSV.",
    stack: ["Python", "Chrome", "CSV"],
  },
  {
    id: "glucolog",
    nombre: "GlucoLog",
    año: 2026,
    categoria: "Herramientas",
    corto: "Registro de glucosa para diabetes",
    descripcion: "App para registrar y seguir los niveles de glucosa en el día a día.",
    stack: ["Next.js", "Prisma", "PostgreSQL"],
  },
  {
    id: "png-svg",
    nombre: "PNG → SVG",
    año: 2026,
    categoria: "Herramientas",
    corto: "Vectorizador de logos en el navegador",
    descripcion:
      "Convierte logos PNG a SVG 100% en el navegador, sin servidor ni subir archivos. Presets para logo, blanco y negro o detallado.",
    stack: ["JavaScript", "Canvas"],
  },
  {
    id: "server",
    nombre: "Homelab",
    año: 2026,
    categoria: "Infra",
    corto: "Self-hosting a través de un túnel en un VPS",
    descripcion:
      "Un VPS público con Pangolin, Gerbil y Traefik hace de túnel hacia un servidor en casa con Coolify, Postgres y Newt.",
    stack: ["Docker", "Pangolin", "Traefik", "Coolify"],
  },
  {
    id: "endstep-app",
    nombre: "Endstep Desktop",
    año: 2026,
    categoria: "Magic",
    corto: "App de escritorio para endstep.cc",
    descripcion: "Envoltorio de escritorio para Windows con instalador propio.",
    stack: ["Electron", "electron-builder"],
  },
  {
    id: "godot",
    nombre: "Fables & Mistborn",
    año: 2026,
    categoria: "Juegos",
    corto: "Prototipos de juegos en Godot",
    descripcion: "Experimentos de juego en Godot 4: Fables y una adaptación inspirada en Mistborn.",
    stack: ["Godot 4", "GDScript"],
  },
];
