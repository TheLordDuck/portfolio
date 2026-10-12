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
    id: "brillar",
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
    id: "los-cubes-hermanos",
    name: "Los Cubes Hermanos",
    year: 2024,
    category: "magic",
    summary: {
      en: "Magic cube collection and draft league",
      es: "Colección de cubos de Magic y liga de draft",
    },
    description: {
      en: "Manages a collection of Magic cubes and battleboxes, with archetypes and lists pulled live from CubeCobra, plus a draft league with seasons, matchdays and automatic standings. Photos of decklists are transcribed with Claude.",
      es: "Gestiona una colección de cubos y battleboxes de Magic, con arquetipos y listas sacadas en directo de CubeCobra, y una liga de draft con temporadas, jornadas y clasificación automática. Las fotos de listas de mazos se transcriben con Claude.",
    },
    stack: ["Next.js", "Prisma", "PostgreSQL", "Anthropic API"],
  },
  {
    id: "standard-peasant-cube",
    name: "Standard Peasant Cube",
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
    id: "mtg-library",
    name: "MTG Library",
    year: 2026,
    category: "magic",
    summary: {
      en: "Self-hosted Magic collection manager",
      es: "Gestor de colección de Magic autoalojado",
    },
    description: {
      en: "Import a ManaBox export, then browse and edit the collection in a searchable table with Scryfall previews, add cards by printing, check a decklist against what you own, and keep daily backups. No database: everything lives in one CSV.",
      es: "Importa un export de ManaBox y luego navega y edita la colección en una tabla con búsqueda y previsualizaciones de Scryfall, añade cartas por edición, comprueba un mazo contra lo que tienes y guarda copias diarias. Sin base de datos: todo vive en un CSV.",
    },
    stack: ["Next.js", "Scryfall API", "node-cron", "CSV"],
  },
  {
    id: "cardmarket-inventory-tool",
    name: "Cardmarket Inventory Tool",
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
    id: "mistborn-typegame",
    name: "Mistborn Typegame",
    year: 2026,
    category: "games",
    summary: {
      en: "Typing game set in Mistborn's Luthadel",
      es: "Juego de mecanografía ambientado en la Luthadel de Mistborn",
    },
    description: {
      en: "Typing game in Godot 4: you type the story while a paper diorama of Luthadel changes around you, from ash skies and mist to the rebellion's fires, with Vin leaping across the rooftops each time you finish a sentence.",
      es: "Juego de mecanografía en Godot 4: escribes la historia mientras un diorama de papel de Luthadel cambia a tu alrededor, del cielo de ceniza y la bruma a los fuegos de la rebelión, con Vin saltando de tejado en tejado cada vez que completas una frase.",
    },
    stack: ["Godot 4", "GDScript"],
    shots: [
      {
        file: "mistborn.png",
        alt: { en: "Placeholder — Mistborn", es: "Provisional — Mistborn" },
      },
    ],
  },
  {
    id: "homeserver",
    name: "Homeserver",
    year: 2026,
    category: "infra",
    summary: {
      en: "Home server for self-hosting",
      es: "Servidor en casa para self-hosting",
    },
    description: {
      en: "Home machine running Coolify to deploy my apps, plus Postgres and a Newt client that connects it to the VPS tunnel, so nothing on the home network has to be exposed.",
      es: "Máquina en casa con Coolify para desplegar mis apps, más Postgres y un cliente Newt que la conecta al túnel del VPS, sin exponer nada de la red de casa.",
    },
    stack: ["Docker", "Coolify", "PostgreSQL", "Newt"],
  },
  {
    id: "homeserver-vps",
    name: "Homeserver VPS",
    year: 2026,
    category: "infra",
    summary: {
      en: "Public VPS that tunnels traffic home",
      es: "VPS público que hace de túnel hacia casa",
    },
    description: {
      en: "Public entry point for the homeserver: Pangolin, Gerbil and Traefik handle routing, TLS and the WireGuard tunnel to the machine at home.",
      es: "Punto de entrada público del homeserver: Pangolin, Gerbil y Traefik se encargan del enrutado, TLS y el túnel WireGuard hacia la máquina de casa.",
    },
    stack: ["Docker", "Pangolin", "Traefik", "WireGuard"],
  },
];
