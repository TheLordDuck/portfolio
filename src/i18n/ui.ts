export const languages = { en: "English", es: "Español" } as const;

export type Lang = keyof typeof languages;
export type Localized = Record<Lang, string>;

export const defaultLang: Lang = "en";

export const isLang = (value: string): value is Lang => value in languages;

/** URL of the home page for a given language (`/` for the default one, `/es/` for the rest). */
export const pathFor = (lang: Lang) => (lang === defaultLang ? "/" : `/${lang}/`);

/** Replaces `{key}` placeholders with the given values. */
export const fmt = (text: string, vars: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));

const en = {
  meta: {
    title: "{nick} — portfolio",
    description:
      "Portfolio of {name} ({nick}), {role}: business apps, tools, Magic: The Gathering and Godot games.",
  },
  terminal: {
    inputLabel: "Command",
    languageLabel: "Language",
    welcome: "{name} · {role} · type {help} or click any command",
    projectsDir: "projects",
    help: {
      title: "Available commands:",
      ls: "list projects",
      lsLong: "list projects with details",
      cat: "show a project",
      catArg: "<project>",
      example: "e.g.",
      stack: "technologies I use",
      contact: "how to reach me",
      lang: "switch language",
      close: "close the screenshots panel",
      clear: "clear the output",
    },
    shots: {
      one: "1 screenshot on the right",
      many: "{n} screenshots on the right · ←/→ to browse",
    },
    bio: "Full-stack dev. I build business apps that real companies use,\ntools for myself, {magic} stuff and the odd game in Godot.\nI like hosting my things on my own server.",
    commandNotFound: "{name}: command not found. Type {help}",
    projectNotFound: "cat: {id}: no such project. Try {ls}",
    sudo: "nice try 😏",
    stackLabel: "stack:",
    lang: {
      current: "Current language: {lang}. Available: {list}",
      unknown: "lang: {lang}: unsupported language. Available: {list}",
    },
  },
  panel: {
    label: "Screenshots",
    close: "Close",
    previous: "Previous screenshot",
    next: "Next screenshot",
    hint: "hover to see it in colour",
    hintTouch: "tap to see it in colour",
  },
  desktop: {
    close: "Close the terminal",
    minimize: "Minimise the terminal",
    duck: "Rubber duck (click it)",
    icon: "terminal",
    closed: [
      "Segmentation fault (duck dumped)",
      "You closed the terminal. The duck saw everything.",
      "Process terminated. The duck remains.",
      "rm -rf portfolio? Nice try, the duck keeps backups.",
    ],
    minimized: [
      "Minimised. The duck is keeping your session warm.",
      "Taking a break? So is the duck.",
      "The terminal is hiding in the dock. The duck won't tell.",
    ],
    closedHint: "press any key or click the terminal icon to open it again",
    minimizedHint: "press any key or click it in the dock to bring it back",
    quacks: [
      "Quack!",
      "Quack quack.",
      "Have you tried turning it off and on again?",
      "I'm a rubber duck. Tell me about your bug.",
      "sudo quack",
      "404: bread not found",
    ],
  },
  categories: {
    clients: "Clients",
    magic: "Magic",
    tools: "Tools",
    infra: "Infra",
    games: "Games",
  },
};

export type UI = typeof en;

const es: UI = {
  meta: {
    title: "{nick} — portfolio",
    description:
      "Portfolio de {name} ({nick}), {role}: apps de gestión, herramientas, Magic: The Gathering y juegos en Godot.",
  },
  terminal: {
    inputLabel: "Comando",
    languageLabel: "Idioma",
    welcome: "{name} · {role} · escribe {help} o haz clic en cualquier comando",
    projectsDir: "proyectos",
    help: {
      title: "Comandos disponibles:",
      ls: "lista de proyectos",
      lsLong: "lista con detalles",
      cat: "ver un proyecto",
      catArg: "<proyecto>",
      example: "ej.",
      stack: "tecnologías que uso",
      contact: "cómo contactarme",
      lang: "cambiar de idioma",
      close: "cerrar el panel de capturas",
      clear: "limpiar la salida",
    },
    shots: {
      one: "1 captura a la derecha",
      many: "{n} capturas a la derecha · ←/→ para pasarlas",
    },
    bio: "Full-stack dev. Hago apps de gestión que usan empresas reales,\nherramientas para mí, cosas de {magic} y algún juego en Godot.\nMe gusta alojar mis cosas en mi propio servidor.",
    commandNotFound: "{name}: comando no encontrado. Escribe {help}",
    projectNotFound: "cat: {id}: no existe. Prueba {ls}",
    sudo: "buen intento 😏",
    stackLabel: "stack:",
    lang: {
      current: "Idioma actual: {lang}. Disponibles: {list}",
      unknown: "lang: {lang}: idioma no soportado. Disponibles: {list}",
    },
  },
  panel: {
    label: "Capturas",
    close: "Cerrar",
    previous: "Captura anterior",
    next: "Captura siguiente",
    hint: "pasa el ratón para verla en color",
    hintTouch: "toca para verla en color",
  },
  desktop: {
    close: "Cerrar la terminal",
    minimize: "Minimizar la terminal",
    duck: "Pato de goma (haz clic)",
    icon: "terminal",
    closed: [
      "Violación de segmento (pato volcado)",
      "Has cerrado la terminal. El pato lo ha visto todo.",
      "Proceso terminado. El pato permanece.",
      "¿rm -rf portfolio? Buen intento, el pato guarda copias.",
    ],
    minimized: [
      "Minimizada. El pato te guarda la sesión calentita.",
      "¿Un descansito? El pato también.",
      "La terminal se esconde en el dock. El pato no dirá nada.",
    ],
    closedHint: "pulsa cualquier tecla o haz clic en el icono para volver a abrirla",
    minimizedHint: "pulsa cualquier tecla o haz clic en el dock para recuperarla",
    quacks: [
      "¡Cuac!",
      "Cuac cuac.",
      "¿Has probado a apagarlo y volverlo a encender?",
      "Soy un pato de goma. Cuéntame tu bug.",
      "sudo cuac",
      "404: pan no encontrado",
    ],
  },
  categories: {
    clients: "Clientes",
    magic: "Magic",
    tools: "Herramientas",
    infra: "Infra",
    games: "Juegos",
  },
};

export const ui: Record<Lang, UI> = { en, es };
