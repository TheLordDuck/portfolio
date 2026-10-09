# thelordduck22 — portfolio

Personal portfolio of Flavio (**thelordduck22**), shaped like an interactive terminal.
Visitors can type commands (`ls`, `tree`, `cat <project>`…) or just click them.

Built with [Astro](https://astro.build), with no UI framework: one static page per language
plus a small TypeScript script that runs the terminal in the browser.

- English: `/`
- Spanish: `/es/`

Switching language (the EN · ES switcher or the `lang` command) happens in place, without a
page reload: the text is re-typed with a scramble effect, and the URL, `<title>` and
`<html lang>` are updated so links and the back button keep working. The effect is skipped
for visitors with `prefers-reduced-motion` enabled.

## Getting started

Requirements: Node 22+ and pnpm.

```bash
pnpm install
pnpm dev        # dev server at http://localhost:4321
pnpm build      # static build into dist/
pnpm preview    # serve the build locally
pnpm check      # type-check .astro and .ts files
```

## Project structure

```
src/
├── assets/
│   └── projects/<id>/    # screenshots, one folder per project
├── components/
│   ├── Home.astro        # page shell for one language (layout + terminal)
│   └── Terminal.astro    # terminal markup, styles and no-JS fallback
├── data/
│   └── projects.ts       # profile (nick, name, contact) and the project list
├── i18n/
│   └── ui.ts             # supported languages and every UI string
├── layouts/
│   └── Layout.astro      # <html>, <head>, fonts, hreflang links
├── pages/
│   ├── index.astro       # English (default language)
│   └── es/index.astro    # Spanish
├── scripts/
│   ├── ascii.ts          # block-art SVGs: the nick banner and the desktop duck
│   ├── desktop.ts        # close / minimise buttons and the "desktop" behind the terminal
│   ├── shots-panel.ts    # screenshots side panel
│   └── terminal.ts       # commands and input handling
└── styles/
    └── global.css        # colour tokens and base styles
public/
└── favicon.svg
```

## Editing content

### Profile and contact details

Edit `profile` in `src/data/projects.ts`. Leave `linkedin` (or `github`) empty to hide it
from the `contact` command.

### Adding a project

Add an entry to `projects` in `src/data/projects.ts`:

```ts
{
  id: "my-project",            // used by `cat my-project`; lowercase, no spaces
  name: "My Project",
  year: 2026,
  category: "tools",           // clients | magic | tools | infra | games
  summary: { en: "One line", es: "Una línea" },
  description: { en: "A few sentences.", es: "Unas frases." },
  stack: ["Astro", "TypeScript"],
  status: { en: "Beta", es: "Beta" },   // optional
}
```

Every text field needs a value for each language; TypeScript will complain if one is missing.

### Adding screenshots

`cat <project>` splits the terminal window in two (tmux style) and shows the project's
screenshots on the right, tinted green like an old phosphor monitor. Hovering an image (or
tapping it on a phone) reveals its real colours. Projects without screenshots don't open the panel.

1. Put the images in `src/assets/projects/<project id>/` (PNG, JPG or WebP; ideally 16:10,
   at least 1280px wide).
2. List them in the project's `shots` field, in the order they should appear:

   ```ts
   shots: [
     { file: "dashboard.png", alt: { en: "Dashboard with the month's invoices", es: "Panel con las facturas del mes" } },
     { file: "invoice.png", alt: { en: "Generated PDF invoice", es: "Factura en PDF generada" } },
   ],
   ```

At build time Astro resizes them to 1280px wide and converts them to WebP (via `sharp`).
The build fails if a listed file doesn't exist, so typos are caught early.

To add a category, add its key and label to `categories` in `src/i18n/ui.ts` (in every language).

### Changing UI text

All terminal text lives in `src/i18n/ui.ts`. Placeholders such as `{name}` or `{help}` are
filled in by `fmt()`; keep them when translating.

### Adding a language

1. Add it to `languages` in `src/i18n/ui.ts` and add a full dictionary for it
   (TypeScript enforces the same shape as the English one).
2. Add the locale to `i18n.locales` in `astro.config.mjs`.
3. Create `src/pages/<lang>/index.astro` rendering `<Home lang="<lang>" />`.

The language switcher, the `lang` command and the `hreflang` links pick it up automatically.

## Terminal commands

| Command | What it does |
| --- | --- |
| `help` | Clear the last output (the command list is already in the intro) |
| `whoami` | Short bio (shown in the intro until the first command, not listed in `help`) |
| `ls` / `ls -l` | List projects (with year, category and summary) |
| `tree` | Projects grouped by category (not listed in `help`) |
| `cat <id>` / `cd <id>` | Show one project. `Tab` autocompletes the id |
| `stack` | Most used technologies across all projects |
| `contact` | Email and links |
| `lang [en\|es]` | Show or switch the language |
| `close` | Close the screenshots panel (so do `Esc`, ✕ or running any other command) |
| `clear` | Clear the last output (the intro stays) |

`↑` / `↓` browse the command history. While the screenshots panel is open, `←` / `→` browse the images.

### Close and minimise

The title bar's `×` and `_` buttons hide the terminal and reveal a "desktop" with a rubber duck
(click it to make it talk) and a random joke. Any key, the desktop icon or the dock item brings the
terminal back: after closing it starts fresh, after minimising it comes back exactly as it was.
The jokes and quacks live in `desktop` in `src/i18n/ui.ts`.

To add a command, add a function to `exact` (no arguments) or `withArg` (takes an argument)
inside `createCommands()` in `src/scripts/terminal.ts`, its help text to `terminal.help` in
`src/i18n/ui.ts`, and a row to `help()`.

## The ASCII banner

The nick is drawn with the "ANSI Shadow" figlet font, but rendered as an **SVG** rather than text:
web fonts (including the bundled JetBrains Mono) don't include box-drawing glyphs such as `█ ═ ╗`,
so the browser would fall back to another font and the letters would misalign.

`FONT` in `src/scripts/ascii.ts` only contains the letters the current nick needs. If you
change the nick, add the missing letters (copy them from any figlet "ANSI Shadow" generator).
Below 700px wide the banner is split in two lines, at the point defined by `SPLIT`.

The desktop duck is drawn the same way from the `DUCK` grid in the same file
(`█` = body, `▓` = beak); its shadow is computed from the shape.

## Deployment

`pnpm build` outputs a fully static site in `dist/`, so it can be served by any static host
or web server (Nginx, Caddy, Coolify's static site option, Netlify, Cloudflare Pages…).
