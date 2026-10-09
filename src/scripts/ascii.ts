// Block-art drawn as SVG: the nick banner (ANSI Shadow figlet font) and the desktop duck.

// "ANSI Shadow" figlet font. Only the letters the nick needs; add more if you change it.
const FONT: Record<string, string[]> = {
  T: ["████████╗", "╚══██╔══╝", "   ██║   ", "   ██║   ", "   ██║   ", "   ╚═╝   "],
  H: ["██╗  ██╗", "██║  ██║", "███████║", "██╔══██║", "██║  ██║", "╚═╝  ╚═╝"],
  E: ["███████╗", "██╔════╝", "█████╗  ", "██╔══╝  ", "███████╗", "╚══════╝"],
  L: ["██╗     ", "██║     ", "██║     ", "██║     ", "███████╗", "╚══════╝"],
  O: [" ██████╗ ", "██╔═══██╗", "██║   ██║", "██║   ██║", "╚██████╔╝", " ╚═════╝ "],
  R: ["██████╗ ", "██╔══██╗", "██████╔╝", "██╔══██╗", "██║  ██║", "╚═╝  ╚═╝"],
  D: ["██████╗ ", "██╔══██╗", "██║  ██║", "██║  ██║", "██████╔╝", "╚═════╝ "],
  U: ["██╗   ██╗", "██║   ██║", "██║   ██║", "██║   ██║", "╚██████╔╝", " ╚═════╝ "],
  C: [" ██████╗", "██╔════╝", "██║     ", "██║     ", "╚██████╗", " ╚═════╝"],
  K: ["██╗  ██╗", "██║ ██╔╝", "█████╔╝ ", "██╔═██╗ ", "██║  ██╗", "╚═╝  ╚═╝"],
  "2": ["██████╗ ", "╚════██╗", " █████╔╝", "██╔═══╝ ", "███████╗", "╚══════╝"],
};
const BLANK = Array(6).fill("    ");

const asciiRows = (text: string) =>
  [0, 1, 2, 3, 4, 5].map((row) => [...text.toUpperCase()].map((ch) => (FONT[ch] ?? BLANK)[row]).join(""));

// Web fonts rarely ship box-drawing glyphs (█ ═ ╗…), so the banner is drawn as an SVG
// instead of text: every cell is 1×2 units, █ becomes a rectangle and the rest become lines.
const STROKES: Record<string, (x: number, y: number) => string> = {
  "═": (x, y) => `M${x} ${y + 1}h1`,
  "║": (x, y) => `M${x + 0.5} ${y}v2`,
  "╗": (x, y) => `M${x} ${y + 1}h.5v1`,
  "╔": (x, y) => `M${x + 1} ${y + 1}h-.5v1`,
  "╝": (x, y) => `M${x} ${y + 1}h.5v-1`,
  "╚": (x, y) => `M${x + 1} ${y + 1}h-.5v-1`,
};

function asciiSvg(rows: string[], label?: string) {
  let blocks = "";
  let strokes = "";
  rows.forEach((row, r) => {
    const cells = [...row];
    const y = r * 2;
    for (let x = 0; x < cells.length; x++) {
      if (cells[x] === "█") {
        // merge consecutive █ into a single rectangle so no gaps show between them
        let end = x;
        while (cells[end + 1] === "█") end++;
        blocks += `<rect x="${x}" y="${y}" width="${end - x + 1}" height="2.02"/>`;
        x = end;
      } else if (STROKES[cells[x]]) {
        strokes += STROKES[cells[x]](x, y);
      }
    }
  });
  const width = Math.max(...rows.map((row) => [...row].length));
  const height = rows.length * 2;
  const a11y = label ? `role="img" aria-label="${label}"` : `aria-hidden="true"`;
  return `<svg viewBox="0 0 ${width} ${height}" style="max-width:${width * 7.5}px" ${a11y}>
<path d="${strokes}" class="shadow"/><g class="cells">${blocks}</g></svg>`;
}

// On narrow screens the nick is split in two lines
const SPLIT = /^(.*?lord)(.*)$/i;

export function banner(nick: string) {
  const parts = nick.match(SPLIT);
  const narrow = parts ? [...asciiRows(parts[1]), "", ...asciiRows(parts[2])] : asciiRows(nick);
  return `<div class="ascii wide">${asciiSvg(asciiRows(nick), nick)}</div><div class="ascii narrow">${asciiSvg(narrow)}</div>`;
}

// Rubber duck shown on the desktop when the terminal is closed or minimised.
// █ = body, ▓ = beak. The shadow is worked out from the shape, like the font's ╗ ║ ╚ lines.
const DUCK = [
  "         ██████             ",
  "       ██████████           ",
  "       ████  ████           ",
  " ▓▓▓▓▓▓██████████           ",
  "   ▓▓▓▓████████             ",
  "       ████████         ██  ",
  "     ████████████████████   ",
  "    ██████████████████████  ",
  "    ██████████████████████  ",
  "     ████████████████████   ",
  "       ████████████████     ",
];

export function duckSvg() {
  const isFilled = (x: number, r: number) => /[█▓]/.test([...(DUCK[r] ?? "")][x] ?? "");
  let body = "";
  let beak = "";
  let shadow = "";
  DUCK.forEach((row, r) => {
    const cells = [...row];
    const y = r * 2;
    for (let x = 0; x < cells.length; x++) {
      if (!isFilled(x, r)) continue;
      let end = x;
      while (cells[end + 1] === cells[x]) end++;
      // a little taller than a row so neighbouring rows overlap and no seams show
      const rect = `<rect x="${x}" y="${y}" width="${end - x + 1}" height="2.15"/>`;
      if (cells[x] === "▓") beak += rect;
      else body += rect;
      x = end;
    }
    // shadow: the outline of the shape, shifted half a cell right and down
    for (let x = 0; x < cells.length; x++) {
      if (!isFilled(x, r)) continue;
      const sx = x + 0.5;
      const sy = y + 1;
      if (!isFilled(x, r - 1)) shadow += `M${sx} ${sy}h1`;
      if (!isFilled(x, r + 1)) shadow += `M${sx} ${sy + 2}h1`;
      if (!isFilled(x - 1, r)) shadow += `M${sx} ${sy}v2`;
      if (!isFilled(x + 1, r)) shadow += `M${sx + 1} ${sy}v2`;
    }
  });
  const width = Math.max(...DUCK.map((row) => [...row].length)) + 1;
  const height = DUCK.length * 2 + 1;
  return `<svg viewBox="0 0 ${width} ${height}" aria-hidden="true">
<path d="${shadow}" class="shadow"/><g class="cells">${body}</g><g class="beak">${beak}</g></svg>`;
}
