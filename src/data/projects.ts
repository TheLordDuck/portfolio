import type { Localized, UI } from "../i18n/ui";

export type Category = keyof UI["categories"];

export interface Screenshot {
  /** File name inside `src/assets/projects/<project id>/`. */
  file: string;
  alt: Localized;
}

export interface Project {
  /** Slug used by `cat <id>`. Keep it lowercase and without spaces. */
  id: string;
  name: string;
  year: number;
  category: Category;
  summary: Localized;
  description: Localized;
  stack: string[];
  status?: Localized;
  /** Shown in the side panel on `cat <id>`, in this order. */
  shots?: Screenshot[];
}

export const profile = {
  nick: "thelordduck22",
  name: "Flavio",
  role: "full-stack dev",
  // TODO: replace with your real contact details
  email: "hello@example.com",
  github: "https://github.com/",
  linkedin: "",
};

export const projects: Project[] = [
  {
    id: "bri-llar",
    name: "Bri-LLAR",
    year: 2026,
    category: "clients",
    summary: {
      en: "Back-office app for a cleaning company",
      es: "Gestión interna para una empresa de limpieza",
    },
    description: {
      en: "Customers, delivery notes, PDF invoices and quotes, invoices sent by email, workers and timesheets for each cleaning site. Available in Catalan, Spanish, English and Portuguese, with light and dark themes.",
      es: "Clientes, albaranes, facturas y presupuestos en PDF, envío de facturas por email, trabajadores y hojas de horas de los centros de limpieza. En català, español, english y português, con tema claro y oscuro.",
    },
    stack: ["Next.js", "Prisma", "PostgreSQL", "Tiptap", "Vitest"],
    shots: [
      {
        file: "dashboard.png",
        alt: { en: "Placeholder — dashboard", es: "Provisional — panel" },
      },
      {
        file: "invoices.png",
        alt: { en: "Placeholder — invoice list", es: "Provisional — lista de facturas" },
      },
      {
        file: "invoice-pdf.png",
        alt: { en: "Placeholder — PDF invoice", es: "Provisional — factura en PDF" },
      },
    ],
  },
  {
    id: "personand",
    name: "PersonAND",
    year: 2026,
    category: "clients",
    summary: {
      en: "HR management for Andorra, sorted",
      es: "La gestión laboral de Andorra, en orden",
    },
    description: {
      en: "HR management for agencies and companies in Andorra: workers, contracts, hires and terminations, hours, holidays and, later on, payroll.",
      es: "Gestión laboral para gestorías y empresas de Andorra: trabajadores, contratos, altas y bajas, horas, vacaciones y, más adelante, nóminas.",
    },
    stack: ["Next.js", "PostgreSQL", "Docker", "Vitest"],
    status: { en: "In development", es: "En desarrollo" },
    shots: [
      {
        file: "workers.png",
        alt: { en: "Placeholder — worker list", es: "Provisional — lista de trabajadores" },
      },
      {
        file: "calendar.png",
        alt: { en: "Placeholder — hours and holidays calendar", es: "Provisional — calendario de horas y vacaciones" },
      },
      {
        file: "contract.png",
        alt: { en: "Placeholder — contract", es: "Provisional — contrato" },
      },
    ],
  },
  {
    id: "endstep-arena",
    name: "Endstep Arena",
    year: 2026,
    category: "magic",
    summary: {
      en: "Chrome extension with an Arena-style UI for endstep.cc",
      es: "Extensión de Chrome con UI estilo Arena para endstep.cc",
    },
    description: {
      en: "Chromium (MV3) extension that covers endstep.cc matches with a modern, card-first board. Visual only: it plays through Endstep's socket and never sends anything Endstep's own UI wouldn't.",
      es: "Extensión Chromium (MV3) que cubre las partidas de endstep.cc con un tablero moderno centrado en las cartas. Solo visual: juega a través del socket de Endstep sin enviar nada que su propia UI no enviaría.",
    },
    stack: ["TypeScript", "Chrome MV3", "WebSocket"],
    status: { en: "v0.5", es: "v0.5" },
    shots: [
      {
        file: "board.png",
        alt: { en: "Placeholder — match board", es: "Provisional — tablero de la partida" },
      },
      {
        file: "hand.png",
        alt: { en: "Placeholder — hand of cards", es: "Provisional — mano de cartas" },
      },
      {
        file: "debug-panel.png",
        alt: { en: "Placeholder — debug panel", es: "Provisional — panel de depuración" },
      },
    ],
  },
  {
    id: "construccions-mouta",
    name: "Construccions Mouta",
    year: 2025,
    category: "clients",
    summary: {
      en: "PDF invoicing for a construction company",
      es: "Facturación en PDF para una constructora",
    },
    description: {
      en: "Generates PDF invoices from the services purchased and emails them to customers, with scheduled jobs.",
      es: "Genera facturas en PDF a partir de los servicios contratados y las envía por email a los clientes, con tareas programadas.",
    },
    stack: ["Next.js", "Prisma", "pdf-lib", "node-cron"],
  },
  {
    id: "orbit",
    name: "Orbit",
    year: 2026,
    category: "clients",
    summary: {
      en: "Aubity's internal operating system",
      es: "Sistema operativo interno de Aubity",
    },
    description: {
      en: "Private tool for Aubity's partners: what needs doing, who's doing it, customers, leads, active projects, decisions, money and documents, all in one place.",
      es: "Herramienta privada para los socios de Aubity: qué hay que hacer, quién lo hace, clientes, oportunidades, proyectos activos, decisiones, dinero y documentos, todo en un sitio.",
    },
    stack: ["Next.js", "Supabase", "Vitest"],
  },
  {
    id: "aubity",
    name: "Aubity",
    year: 2026,
    category: "clients",
    summary: {
      en: "Landing page for aubity.es",
      es: "Landing de aubity.es",
    },
    description: {
      en: "Migration of a static HTML/CSS/JS site to Next.js, keeping its design and behaviour. Available in Catalan, Spanish and English.",
      es: "Migración de una web estática HTML/CSS/JS a Next.js conservando diseño y comportamiento. En català, español e english.",
    },
    stack: ["Next.js", "Tailwind v4", "TypeScript"],
  },
  {
    id: "peasant-standard",
    name: "Peasant Standard",
    year: 2025,
    category: "magic",
    summary: {
      en: "Website and guide for a homebrew Magic cube",
      es: "Web y guía de un cubo casero de Magic",
    },
    description: {
      en: "Public blog and cube guide with a letterpress newspaper look, plus a password-protected admin panel to manage the content.",
      es: "Blog público y guía del cubo con estética de periódico tipográfico, más un panel de administración con contraseña para gestionar el contenido.",
    },
    stack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind v4"],
    shots: [
      {
        file: "home.png",
        alt: { en: "Placeholder — blog home", es: "Provisional — portada del blog" },
      },
      {
        file: "admin.png",
        alt: { en: "Placeholder — admin panel", es: "Provisional — panel de administración" },
      },
    ],
  },
  {
    id: "update-inventory",
    name: "update-inventory",
    year: 2026,
    category: "magic",
    summary: {
      en: "Automatic repricer for Cardmarket",
      es: "Repricer automático para Cardmarket",
    },
    description: {
      en: "Cardmarket has no API access or stock export, so this tool drives your own already-open Chrome and does the clicking for you: automatic repricing, or an export → edit → import CSV round-trip.",
      es: "Cardmarket no tiene API ni exportación de stock, así que esta herramienta maneja tu propio Chrome ya abierto y hace los clics por ti: repricing automático o exportar → editar → importar en CSV.",
    },
    stack: ["Python", "Chrome", "CSV"],
  },
  {
    id: "glucolog",
    name: "GlucoLog",
    year: 2026,
    category: "tools",
    summary: {
      en: "Glucose log for diabetes",
      es: "Registro de glucosa para diabetes",
    },
    description: {
      en: "App to log and track glucose levels day to day.",
      es: "App para registrar y seguir los niveles de glucosa en el día a día.",
    },
    stack: ["Next.js", "Prisma", "PostgreSQL"],
  },
  {
    id: "png-svg",
    name: "PNG → SVG",
    year: 2026,
    category: "tools",
    summary: {
      en: "In-browser logo vectorizer",
      es: "Vectorizador de logos en el navegador",
    },
    description: {
      en: "Turns PNG logos into SVG entirely in the browser, with no server and no uploads. Presets for logos, black and white, or detailed images.",
      es: "Convierte logos PNG a SVG 100% en el navegador, sin servidor ni subir archivos. Presets para logo, blanco y negro o detallado.",
    },
    stack: ["JavaScript", "Canvas"],
    shots: [
      {
        file: "editor.png",
        alt: { en: "PNG → SVG start screen with the drop zone", es: "Pantalla inicial de PNG → SVG con la zona para soltar el logo" },
      },
      {
        file: "presets.png",
        alt: { en: "Placeholder — presets", es: "Provisional — presets" },
      },
    ],
  },
  {
    id: "homelab",
    name: "Homelab",
    year: 2026,
    category: "infra",
    summary: {
      en: "Self-hosting through a VPS tunnel",
      es: "Self-hosting a través de un túnel en un VPS",
    },
    description: {
      en: "A public VPS running Pangolin, Gerbil and Traefik tunnels traffic to a home server running Coolify, Postgres and Newt.",
      es: "Un VPS público con Pangolin, Gerbil y Traefik hace de túnel hacia un servidor en casa con Coolify, Postgres y Newt.",
    },
    stack: ["Docker", "Pangolin", "Traefik", "Coolify"],
  },
  {
    id: "endstep-desktop",
    name: "Endstep Desktop",
    year: 2026,
    category: "magic",
    summary: {
      en: "Desktop app for endstep.cc",
      es: "App de escritorio para endstep.cc",
    },
    description: {
      en: "Windows desktop wrapper with its own installer.",
      es: "Envoltorio de escritorio para Windows con instalador propio.",
    },
    stack: ["Electron", "electron-builder"],
  },
  {
    id: "godot",
    name: "Fables & Mistborn",
    year: 2026,
    category: "games",
    summary: {
      en: "Game prototypes in Godot",
      es: "Prototipos de juegos en Godot",
    },
    description: {
      en: "Game experiments in Godot 4: Fables, and an adaptation inspired by Mistborn.",
      es: "Experimentos de juego en Godot 4: Fables y una adaptación inspirada en Mistborn.",
    },
    stack: ["Godot 4", "GDScript"],
    shots: [
      {
        file: "fables.png",
        alt: { en: "Placeholder — Fables", es: "Provisional — Fables" },
      },
      {
        file: "mistborn.png",
        alt: { en: "Placeholder — Mistborn", es: "Provisional — Mistborn" },
      },
    ],
  },
];
