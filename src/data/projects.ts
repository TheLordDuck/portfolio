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
  /** Public source code (GitHub URL). Leave it out for private repos. */
  repo?: string;
  /** Live site, if it is publicly reachable. */
  url?: string;
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
        file: "invoices.png",
        alt: {
          en: "Invoice list with totals, filters and the status of each invoice",
          es: "Lista de facturas con totales, filtros y el estado de cada una",
        },
      },
      {
        file: "invoice-pdf.png",
        alt: { en: "Invoice generated as a PDF", es: "Factura generada en PDF" },
      },
      {
        file: "users.png",
        alt: {
          en: "User list grouped by type: cleaning, management and admin",
          es: "Lista de usuarios por tipo: limpieza, gestión y administración",
        },
      },
      {
        file: "permissions.png",
        alt: {
          en: "Table of what each user type can do",
          es: "Tabla de lo que puede hacer cada tipo de usuario",
        },
      },
      {
        file: "assign.png",
        alt: {
          en: "Assigning workers to a cleaning site",
          es: "Asignar trabajadores a un lugar de limpieza",
        },
      },
      {
        file: "mobile.png",
        alt: {
          en: "Mobile app for cleaning staff: login, my sites and site detail",
          es: "App móvil para el personal de limpieza: entrar, mis lugares y detalle de un lugar",
        },
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
    repo: "https://github.com/TheLordDuck/endstep-arena",
    shots: [
      {
        file: "board.png",
        alt: {
          en: "Match board with a creature ability on the stack",
          es: "Tablero de la partida con una habilidad de criatura en la pila",
        },
      },
      {
        file: "opening-hand.png",
        alt: {
          en: "Opening hand screen to keep or mulligan",
          es: "Pantalla de mano inicial para quedársela o hacer mulligan",
        },
      },
      {
        file: "combat.png",
        alt: {
          en: "Declare blockers step against the Forge AI",
          es: "Paso de declarar bloqueadores contra la IA de Forge",
        },
      },
      {
        file: "victory.png",
        alt: { en: "Victory screen at the end of a match", es: "Pantalla de victoria al final de la partida" },
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
    url: "https://los-cubes-hermanos.thelordduck22.dev/cubes",
    shots: [
      {
        file: "cubes.png",
        alt: {
          en: "Cube collection with filters for cubes, battleboxes and twoberts",
          es: "Colección de cubos con filtros de cubos, battleboxes y twoberts",
        },
      },
      {
        file: "archetypes.png",
        alt: {
          en: "Cube page with its archetypes pulled from CubeCobra",
          es: "Página de un cubo con sus arquetipos sacados de CubeCobra",
        },
      },
      {
        file: "standings.png",
        alt: {
          en: "Draft league standings with each player's matchdays",
          es: "Clasificación de la liga de draft con las jornadas de cada jugador",
        },
      },
    ],
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
    url: "https://standard-peasant-cube.vercel.app/",
    shots: [
      {
        file: "home.png",
        alt: {
          en: "Home page with the letterpress newspaper look",
          es: "Portada con la estética de periódico tipográfico",
        },
      },
      {
        file: "blog.png",
        alt: { en: "Blog with the cube's set updates", es: "Blog con las actualizaciones del cubo por set" },
      },
      {
        file: "sample-pack.png",
        alt: {
          en: "Sample pack: 15 random cards from the current list",
          es: "Sobre de muestra: 15 cartas al azar de la lista actual",
        },
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
    url: "https://mtg-library.thelordduck22.dev/",
    shots: [
      {
        file: "dashboard.png",
        alt: {
          en: "Dashboard with collection totals, rarity breakdown and daily backups",
          es: "Panel con los totales de la colección, el reparto por rareza y las copias diarias",
        },
      },
      {
        file: "collection.png",
        alt: {
          en: "Collection table with a card's Scryfall preview on hover",
          es: "Tabla de la colección con la previsualización de Scryfall de una carta al pasar el ratón",
        },
      },
    ],
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
    stack: ["Python", "Playwright", "Chrome CDP", "Tkinter", "CSV"],
    repo: "https://github.com/TheLordDuck/cardmarket-inventory-tool",
    shots: [
      {
        file: "reprice.png",
        alt: {
          en: "Reprice tab: price source, adjustment % and dry run",
          es: "Pestaña de repricing: fuente de precio, ajuste en % y modo de prueba",
        },
      },
      {
        file: "export.png",
        alt: {
          en: "Export tab: scrape the current stock into a CSV",
          es: "Pestaña de exportación: saca el stock actual a un CSV",
        },
      },
    ],
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
    shots: [
      {
        file: "today.png",
        alt: {
          en: "Today: latest reading, the day's curve and recent entries",
          es: "Hoy: última lectura, la curva del día y los registros recientes",
        },
      },
      {
        file: "log.png",
        alt: {
          en: "New entry form for glucose, insulin, meals or notes",
          es: "Formulario de nuevo registro de glucosa, insulina, comida o nota",
        },
      },
      {
        file: "history.png",
        alt: {
          en: "History grouped by day with each day's average and time in range",
          es: "Historial por días con la media y el tiempo en rango de cada día",
        },
      },
      {
        file: "trends.png",
        alt: {
          en: "Trends: time in range, estimated HbA1c and daily profile",
          es: "Tendencias: tiempo en rango, HbA1c estimada y perfil diario",
        },
      },
      {
        file: "mobile.png",
        alt: {
          en: "The same app on mobile: today, new entry and trends",
          es: "La misma app en el móvil: hoy, nuevo registro y tendencias",
        },
      },
    ],
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
  {
    id: "terra-index",
    name: "Terra Index",
    year: 2026,
    category: "games",
    summary: {
      en: "Terraria mod that ties recipes and storage together",
      es: "Mod de Terraria que une recetas y almacenamiento",
    },
    description: {
      en: "tModLoader mod with an NEI-style recipe index, full crafting trees with a goal tracker, and a storage terminal wired to your chests: search them, craft straight from them, and let delivery drones carry the items. Also ready-made blueprints, 9 languages and full multiplayer support.",
      es: "Mod de tModLoader con un índice de recetas estilo NEI, árboles de crafteo completos con seguimiento de objetivo y un terminal de almacenamiento conectado a tus cofres: búscalos, craftea directamente desde ellos y deja que los drones de reparto lleven los objetos. Además, planos de construcciones listas, 9 idiomas y multijugador completo.",
    },
    stack: ["C#", "tModLoader", ".NET 8"],
    status: { en: "v0.8", es: "v0.8" },
  },
  {
    id: "construccions-mouta",
    name: "Construccions Mouta",
    year: 2026,
    category: "clients",
    summary: {
      en: "Back-office and site app for a construction company",
      es: "Gestión interna y app de obra para una constructora",
    },
    description: {
      en: "Buildings, workers and monthly timesheets generated as PDF, expenses read with AI from invoices that arrive in an email inbox, and payroll. Site managers log hours and daily notes from an installable mobile app, and workers see their own hours in a calendar. In Catalan, Spanish, English and Portuguese.",
      es: "Obras, trabajadores y hojas de horas mensuales generadas en PDF, gastos leídos con IA desde las facturas que llegan a un buzón de correo, y nóminas. Los encargados apuntan horas y observaciones diarias desde una app móvil instalable, y los trabajadores ven sus horas en un calendario. En català, español, english y português.",
    },
    stack: ["Next.js", "Prisma", "PostgreSQL", "next-intl", "pdf-lib"],
    shots: [
      {
        file: "buildings.png",
        alt: {
          en: "Buildings list with the monthly timesheets of each one",
          es: "Lista de obras con las hojas de horas mensuales de cada una",
        },
      },
      {
        file: "timesheet.png",
        alt: {
          en: "Monthly timesheet: hours per worker and day",
          es: "Hoja de horas del mes: horas por trabajador y día",
        },
      },
      {
        file: "timesheet-pdf.png",
        alt: { en: "The same timesheet exported as a PDF", es: "La misma hoja de horas exportada a PDF" },
      },
      {
        file: "mobile.png",
        alt: {
          en: "Site manager's mobile app: my buildings, my hours calendar and the month's list",
          es: "App móvil del encargado: mis obras, calendario de mis horas y la lista del mes",
        },
      },
    ],
  },
  {
    id: "custom-mtg-cards",
    name: "Custom MTG Cards",
    year: 2026,
    category: "magic",
    summary: {
      en: "Generates sketch-style versions of Magic cards",
      es: "Genera versiones tipo boceto de cartas de Magic",
    },
    description: {
      en: "Paste a card list and it pulls each card from Scryfall, turns its art into a sketch look, renders the text in Card Conjurer with Playwright and composites it onto a line-art frame with sharp. Every layout is supported, from sagas and battles to split and double-faced cards, and a small web portal exports the cards as a print-ready PDF at real size.",
      es: "Pegas una lista de cartas y saca cada una de Scryfall, convierte su ilustración en un boceto, renderiza el texto en Card Conjurer con Playwright y lo compone sobre un marco de líneas con sharp. Funciona con todos los formatos, de sagas y batallas a cartas partidas y de dos caras, y un pequeño portal web exporta las cartas en un PDF listo para imprimir a tamaño real.",
    },
    stack: ["TypeScript", "Node", "Playwright", "sharp", "Express", "pdf-lib", "Scryfall API"],
    repo: "https://github.com/TheLordDuck/custom-mtg-cards",
    shots: [
      {
        file: "cards.png",
        alt: {
          en: "Two generated cards: Flow State and Together as One",
          es: "Dos cartas generadas: Flow State y Together as One",
        },
      },
      {
        file: "portal.png",
        alt: {
          en: "Web portal: card list and print settings for the PDF",
          es: "Portal web: lista de cartas y opciones de impresión del PDF",
        },
      },
    ],
  },
];
