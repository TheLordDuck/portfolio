// Shared code for the image-panel prototypes: project data, fake screenshots,
// image styles, gallery, toolbar and a minimal terminal.
// Screenshots are drawn on a canvas as placeholders until real ones exist.

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

window.PROJECTS = [
  {
    id: "bri-llar", name: "Bri-LLAR", year: 2026, category: "Clients", accent: "#14b8a6", theme: "light",
    description: "Customers, delivery notes, PDF invoices and quotes, invoices sent by email, workers and timesheets for each cleaning site.",
    stack: ["Next.js", "Prisma", "PostgreSQL"],
    shots: [{ file: "dashboard.png", kind: "dashboard" }, { file: "invoices.png", kind: "table" }, { file: "invoice-pdf.png", kind: "detail" }],
  },
  {
    id: "personand", name: "PersonAND", year: 2026, category: "Clients", accent: "#3b82f6", theme: "light", status: "In development",
    description: "HR management for agencies and companies in Andorra: workers, contracts, hires and terminations, hours and holidays.",
    stack: ["Next.js", "PostgreSQL", "Docker"],
    shots: [{ file: "workers.png", kind: "table" }, { file: "calendar.png", kind: "calendar" }, { file: "contract.png", kind: "detail" }],
  },
  {
    id: "endstep-arena", name: "Endstep Arena", year: 2026, category: "Magic", accent: "#8b5cf6", theme: "dark", status: "v0.5",
    description: "Chromium extension that covers endstep.cc matches with a modern, card-first board.",
    stack: ["TypeScript", "Chrome MV3", "WebSocket"],
    shots: [{ file: "board.png", kind: "cards" }, { file: "hand.png", kind: "cards" }, { file: "debug-panel.png", kind: "dashboard" }],
  },
  {
    id: "peasant-standard", name: "Peasant Standard", year: 2025, category: "Magic", accent: "#b45309", theme: "paper",
    description: "Public blog and cube guide with a letterpress newspaper look, plus an admin panel.",
    stack: ["Next.js", "Prisma", "Tailwind v4"],
    shots: [{ file: "home.png", kind: "newspaper" }, { file: "admin.png", kind: "table" }],
  },
  {
    id: "png-svg", name: "PNG → SVG", year: 2026, category: "Tools", accent: "#ec4899", theme: "dark",
    description: "Turns PNG logos into SVG entirely in the browser, with no server and no uploads.",
    stack: ["JavaScript", "Canvas"],
    shots: [{ file: "editor.png", kind: "editor" }, { file: "presets.png", kind: "editor" }],
  },
  {
    id: "godot", name: "Fables & Mistborn", year: 2026, category: "Games", accent: "#f59e0b", theme: "dark",
    description: "Game experiments in Godot 4: Fables, and an adaptation inspired by Mistborn.",
    stack: ["Godot 4", "GDScript"],
    shots: [{ file: "fables.png", kind: "game" }, { file: "mistborn.png", kind: "game" }],
  },
  {
    id: "homelab", name: "Homelab", year: 2026, category: "Infra", accent: "#22c55e", theme: "dark",
    description: "A public VPS with Pangolin and Traefik tunnels traffic to a home server running Coolify and Postgres.",
    stack: ["Docker", "Pangolin", "Traefik"],
    shots: [],
  },
];

/* ------------------------------------------------------------------ */
/* Fake screenshots                                                    */
/* ------------------------------------------------------------------ */

function seededRandom(seedText) {
  let a = [...seedText].reduce((h, c) => (Math.imul(h ^ c.charCodeAt(0), 2654435761) >>> 0), 1779033703);
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const THEMES = {
  light: { bg: "#f6f7f9", panel: "#ffffff", line: "#e5e7eb", text: "#111827", muted: "#9ca3af", side: "#ffffff" },
  dark: { bg: "#0f1117", panel: "#171a23", line: "#262a36", text: "#e5e7eb", muted: "#6b7280", side: "#12141b" },
  paper: { bg: "#f3ecdc", panel: "#f8f3e7", line: "#d6cbb2", text: "#1c1917", muted: "#8a7f6a", side: "#efe6d2" },
};

const shotCache = new Map();

function screenshotUrl(project, shot) {
  const key = project.id + shot.file;
  if (shotCache.has(key)) return shotCache.get(key);
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 800;
  drawShot(canvas.getContext("2d"), project, shot);
  const url = canvas.toDataURL("image/png");
  shotCache.set(key, url);
  return url;
}

function roundRect(ctx, x, y, w, h, r, fill) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
}

function textBar(ctx, x, y, w, color, h = 10) {
  roundRect(ctx, x, y, w, h, h / 2, color);
}

function appChrome(ctx, project, th, title) {
  ctx.fillStyle = th.bg;
  ctx.fillRect(0, 0, 1280, 800);
  // sidebar
  ctx.fillStyle = th.side;
  ctx.fillRect(0, 0, 230, 800);
  ctx.fillStyle = th.line;
  ctx.fillRect(230, 0, 1, 800);
  roundRect(ctx, 24, 24, 36, 36, 9, project.accent);
  ctx.fillStyle = th.text;
  ctx.font = "bold 20px system-ui, sans-serif";
  ctx.fillText(project.name, 72, 49);
  for (let i = 0; i < 7; i++) {
    const y = 110 + i * 46;
    if (i === 1) roundRect(ctx, 14, y - 12, 202, 38, 8, project.accent + "22");
    roundRect(ctx, 28, y, 16, 16, 4, i === 1 ? project.accent : th.muted + "88");
    textBar(ctx, 56, y + 3, 80 + ((i * 37) % 60), i === 1 ? project.accent : th.muted + "88");
  }
  // top bar
  ctx.fillStyle = th.text;
  ctx.font = "bold 28px system-ui, sans-serif";
  ctx.fillText(title, 270, 62);
  roundRect(ctx, 1090, 34, 120, 38, 8, project.accent);
  ctx.beginPath();
  ctx.arc(1240, 53, 17, 0, Math.PI * 2);
  ctx.fillStyle = th.muted;
  ctx.fill();
}

const DRAW = {
  dashboard(ctx, p, th, rnd) {
    appChrome(ctx, p, th, "Dashboard");
    for (let i = 0; i < 4; i++) {
      const x = 270 + i * 245;
      roundRect(ctx, x, 100, 225, 120, 12, th.panel);
      textBar(ctx, x + 20, 124, 90, th.muted + "aa");
      ctx.fillStyle = th.text;
      ctx.font = "bold 36px system-ui, sans-serif";
      ctx.fillText(String(Math.floor(rnd() * 900 + 100)), x + 20, 185);
      roundRect(ctx, x + 150, 160, 52, 22, 11, i % 2 ? "#ef444433" : "#22c55e33");
    }
    roundRect(ctx, 270, 245, 640, 520, 12, th.panel);
    textBar(ctx, 295, 270, 160, th.muted + "aa");
    ctx.strokeStyle = p.accent;
    ctx.lineWidth = 4;
    ctx.beginPath();
    let y = 600;
    for (let x = 300; x <= 880; x += 36) {
      y = Math.max(330, Math.min(720, y + (rnd() - 0.55) * 90));
      x === 300 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    roundRect(ctx, 935, 245, 275, 520, 12, th.panel);
    for (let i = 0; i < 8; i++) {
      const yy = 285 + i * 58;
      ctx.beginPath();
      ctx.arc(965, yy + 8, 13, 0, Math.PI * 2);
      ctx.fillStyle = p.accent + "55";
      ctx.fill();
      textBar(ctx, 990, yy, 120 + rnd() * 60, th.text + "cc");
      textBar(ctx, 990, yy + 18, 70 + rnd() * 50, th.muted + "88", 8);
    }
  },
  table(ctx, p, th, rnd) {
    appChrome(ctx, p, th, "Records");
    roundRect(ctx, 270, 100, 940, 665, 12, th.panel);
    roundRect(ctx, 290, 120, 300, 40, 8, th.bg);
    ctx.fillStyle = th.line;
    ctx.fillRect(270, 180, 940, 1);
    const cols = [300, 520, 720, 900, 1060];
    cols.forEach((x) => textBar(ctx, x, 200, 70, th.muted + "aa", 9));
    for (let r = 0; r < 10; r++) {
      const y = 245 + r * 50;
      ctx.fillStyle = th.line;
      ctx.fillRect(290, y - 14, 900, 1);
      textBar(ctx, cols[0], y, 150 + rnd() * 40, th.text + "cc");
      textBar(ctx, cols[1], y, 110 + rnd() * 50, th.muted + "aa");
      textBar(ctx, cols[2], y, 90, th.muted + "aa");
      const states = ["#22c55e", "#f59e0b", "#3b82f6"];
      roundRect(ctx, cols[3], y - 5, 90, 22, 11, states[Math.floor(rnd() * 3)] + "33");
      textBar(ctx, cols[4], y, 80, th.text + "cc");
    }
  },
  detail(ctx, p, th, rnd) {
    appChrome(ctx, p, th, "Detail");
    roundRect(ctx, 270, 100, 440, 665, 12, th.panel);
    for (let i = 0; i < 7; i++) {
      const y = 135 + i * 85;
      textBar(ctx, 295, y, 100, th.muted + "aa", 9);
      roundRect(ctx, 295, y + 20, 390, 42, 8, th.bg);
    }
    roundRect(ctx, 735, 100, 475, 665, 12, "#ffffff");
    ctx.fillStyle = "#111827";
    ctx.font = "bold 30px Georgia, serif";
    ctx.fillText("INVOICE", 770, 160);
    roundRect(ctx, 1100, 125, 70, 50, 6, p.accent);
    for (let i = 0; i < 8; i++) {
      const y = 230 + i * 44;
      textBar(ctx, 770, y, 200 + rnd() * 80, "#9ca3af");
      textBar(ctx, 1090, y, 80, "#374151");
    }
    ctx.fillStyle = "#e5e7eb";
    ctx.fillRect(770, 610, 400, 2);
    ctx.fillStyle = "#111827";
    ctx.font = "bold 26px system-ui, sans-serif";
    ctx.fillText("Total   1.718,20 €", 900, 660);
  },
  calendar(ctx, p, th, rnd) {
    appChrome(ctx, p, th, "Calendar");
    roundRect(ctx, 270, 100, 940, 665, 12, th.panel);
    const cw = 940 / 7;
    for (let d = 0; d < 35; d++) {
      const x = 270 + (d % 7) * cw;
      const y = 150 + Math.floor(d / 7) * 120;
      ctx.strokeStyle = th.line;
      ctx.strokeRect(x, y, cw, 120);
      textBar(ctx, x + 10, y + 10, 20, th.muted + "aa", 9);
      if (rnd() < 0.45) roundRect(ctx, x + 8, y + 40, cw - 16, 26, 6, [p.accent, "#f59e0b", "#22c55e"][Math.floor(rnd() * 3)] + "55");
      if (rnd() < 0.2) roundRect(ctx, x + 8, y + 72, cw - 16, 26, 6, "#ef444455");
    }
  },
  cards(ctx, p, th, rnd) {
    const g = ctx.createRadialGradient(640, 400, 100, 640, 400, 800);
    g.addColorStop(0, "#1e3a2f");
    g.addColorStop(1, "#08130e");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 1280, 800);
    const colors = [["#fde68a", "#b45309"], ["#bfdbfe", "#1d4ed8"], ["#fecaca", "#b91c1c"], ["#bbf7d0", "#15803d"], ["#e9d5ff", "#6d28d9"]];
    const card = (x, y, w, h, rot, c) => {
      ctx.save();
      ctx.translate(x + w / 2, y + h / 2);
      ctx.rotate(rot);
      roundRect(ctx, -w / 2 - 4, -h / 2 - 4, w + 8, h + 8, 12, "#111");
      const lg = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
      lg.addColorStop(0, c[0]);
      lg.addColorStop(1, c[1]);
      roundRect(ctx, -w / 2, -h / 2, w, h, 9, lg);
      roundRect(ctx, -w / 2 + 10, -h / 2 + 30, w - 20, h * 0.45, 4, "#00000033");
      ctx.restore();
    };
    for (let i = 0; i < 5; i++) card(260 + i * 150, 80, 120, 168, 0, colors[Math.floor(rnd() * 5)]);
    for (let i = 0; i < 4; i++) card(330 + i * 150, 330, 120, 168, 0, colors[Math.floor(rnd() * 5)]);
    for (let i = 0; i < 6; i++) card(340 + i * 95, 590, 130, 182, (i - 2.5) * 0.09, colors[Math.floor(rnd() * 5)]);
    ctx.font = "bold 44px system-ui, sans-serif";
    roundRect(ctx, 50, 330, 110, 110, 55, p.accent);
    ctx.fillStyle = "#fff";
    ctx.fillText("20", 80, 400);
    roundRect(ctx, 1100, 650, 140, 54, 27, p.accent);
  },
  newspaper(ctx, p, th, rnd) {
    ctx.fillStyle = th.bg;
    ctx.fillRect(0, 0, 1280, 800);
    ctx.fillStyle = th.text;
    ctx.font = "bold 76px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("The Peasant Standard", 640, 120);
    ctx.textAlign = "left";
    ctx.fillRect(80, 150, 1120, 4);
    ctx.fillRect(80, 160, 1120, 1);
    for (let c = 0; c < 3; c++) {
      const x = 80 + c * 380;
      ctx.font = "bold 30px Georgia, serif";
      ctx.fillText(["Cube update", "Draft report", "New cards"][c], x, 220);
      if (c === 1) roundRect(ctx, x, 245, 350, 200, 2, p.accent + "55");
      for (let l = 0; l < (c === 1 ? 10 : 18); l++) {
        textBar(ctx, x, (c === 1 ? 470 : 250) + l * 28, 300 + rnd() * 50, th.muted, 8);
      }
    }
  },
  editor(ctx, p, th, rnd) {
    ctx.fillStyle = th.bg;
    ctx.fillRect(0, 0, 1280, 800);
    roundRect(ctx, 40, 40, 560, 600, 12, th.panel);
    roundRect(ctx, 680, 40, 560, 600, 12, th.panel);
    // pixelated logo
    for (let y = -10; y <= 10; y++) for (let x = -10; x <= 10; x++) {
      if (x * x + y * y <= 100 && x * x + y * y > 30) { ctx.fillStyle = p.accent; ctx.fillRect(320 + x * 18 - 9, 340 + y * 18 - 9, 18, 18); }
    }
    ctx.beginPath();
    ctx.arc(960, 340, 180, 0, Math.PI * 2);
    ctx.arc(960, 340, 100, 0, Math.PI * 2, true);
    ctx.fillStyle = p.accent;
    ctx.fill();
    roundRect(ctx, 40, 670, 1200, 90, 12, th.panel);
    for (let i = 0; i < 4; i++) {
      textBar(ctx, 70 + i * 290, 700, 90, th.muted);
      roundRect(ctx, 70 + i * 290, 725, 220, 8, 4, th.line);
      roundRect(ctx, 70 + i * 290, 725, 60 + rnd() * 150, 8, 4, p.accent);
    }
  },
  game(ctx, p, th, rnd) {
    const sky = ctx.createLinearGradient(0, 0, 0, 800);
    sky.addColorStop(0, rnd() < 0.5 ? "#1e1b4b" : "#7c2d12");
    sky.addColorStop(1, "#f59e0b");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 1280, 800);
    for (let i = 0; i < 40; i++) { ctx.fillStyle = "#ffffff88"; ctx.fillRect(rnd() * 1280, rnd() * 300, 3, 3); }
    ctx.fillStyle = "#1c1917";
    ctx.beginPath();
    ctx.moveTo(0, 560);
    for (let x = 0; x <= 1280; x += 80) ctx.lineTo(x, 470 + rnd() * 90);
    ctx.lineTo(1280, 800);
    ctx.lineTo(0, 800);
    ctx.fill();
    for (let x = 0; x < 1280; x += 64) {
      ctx.fillStyle = (x / 64) % 2 ? "#3f2a1d" : "#4a3222";
      ctx.fillRect(x, 640, 64, 64);
      ctx.fillStyle = "#166534";
      ctx.fillRect(x, 640, 64, 14);
    }
    ctx.fillStyle = "#0c0a09";
    ctx.fillRect(0, 704, 1280, 96);
    roundRect(ctx, 600, 560, 48, 80, 8, p.accent);
    for (let i = 0; i < 3; i++) roundRect(ctx, 40 + i * 44, 36, 34, 30, 8, "#ef4444");
  },
};

function drawShot(ctx, project, shot) {
  const th = THEMES[project.theme] ?? THEMES.dark;
  const rnd = seededRandom(project.id + shot.file);
  (DRAW[shot.kind] ?? DRAW.dashboard)(ctx, project, th, rnd);
}

/* ------------------------------------------------------------------ */
/* Image styles                                                        */
/* ------------------------------------------------------------------ */

window.IMAGE_STYLES = {
  phosphor: "Fósforo verde",
  loading: "Carga línea a línea",
  ascii: "Arte ASCII",
  framed: "Color real con marco",
};

function getStyle() {
  const fromHash = location.hash.slice(1);
  return fromHash in IMAGE_STYLES ? fromHash : "phosphor";
}

const ASCII_RAMP = " .:-=+*#%@";

function toAscii(url, cols) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const rows = Math.round(cols * (img.height / img.width) * 0.5);
      const c = document.createElement("canvas");
      c.width = cols;
      c.height = rows;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0, cols, rows);
      const data = ctx.getImageData(0, 0, cols, rows).data;
      const lum = [];
      for (let i = 0; i < data.length; i += 4) lum.push((0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255);
      // stretch contrast between the 5th and 95th percentile so dark/flat images still show detail
      const sorted = [...lum].sort((a, b) => a - b);
      const lo = sorted[Math.floor(sorted.length * 0.05)];
      const hi = sorted[Math.floor(sorted.length * 0.95)] || 1;
      // light images: invert so the content (not the background) gets the dense glyphs
      const invert = sorted[Math.floor(sorted.length / 2)] > 0.5;
      let out = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let l = Math.min(1, Math.max(0, (lum[y * cols + x] - lo) / Math.max(0.01, hi - lo)));
          if (invert) l = 1 - l;
          out += ASCII_RAMP[Math.min(ASCII_RAMP.length - 1, Math.floor(l * ASCII_RAMP.length))];
        }
        out += "\n";
      }
      resolve(out);
    };
    img.src = url;
  });
}

/** Renders one screenshot into `stage` using the given style. Returns a cleanup function. */
function renderShot(stage, project, shot, style) {
  const url = screenshotUrl(project, shot);
  const timers = [];
  stage.innerHTML = "";

  if (style === "phosphor") {
    stage.innerHTML = `<div class="shot phosphor"><img src="${url}" alt="${project.name} — ${shot.file}"></div>`;
  } else if (style === "framed") {
    stage.innerHTML = `<div class="shot framed"><div class="shot-bar"><i></i><i></i><i></i><span>${shot.file}</span></div><img src="${url}" alt="${project.name} — ${shot.file}"></div>`;
  } else if (style === "loading") {
    stage.innerHTML = `<div class="shot loading"><img src="${url}" alt="${project.name} — ${shot.file}"></div><div class="load-text"></div>`;
    const img = stage.querySelector("img");
    const label = stage.querySelector(".load-text");
    let progress = 0;
    const tick = () => {
      progress = Math.min(100, progress + 4 + Math.random() * 12);
      img.style.clipPath = `inset(0 0 ${100 - progress}% 0)`;
      const filled = Math.round(progress / 5);
      label.innerHTML = progress < 100
        ? `loading ${shot.file}… <span class="bar">[${"#".repeat(filled)}${".".repeat(20 - filled)}]</span> ${Math.floor(progress)}%`
        : `<span class="d">${shot.file} · 1280×800 · done</span>`;
      if (progress < 100) timers.push(setTimeout(tick, 70 + Math.random() * 90));
    };
    tick();
  } else if (style === "ascii") {
    stage.innerHTML = `<div class="shot ascii" title="Click to see the real image"><pre>loading…</pre><img src="${url}" alt="${project.name} — ${shot.file}"><span class="ascii-hint">click → real image</span></div>`;
    const box = stage.querySelector(".shot");
    const pre = box.querySelector("pre");
    const cols = 110;
    toAscii(url, cols).then((text) => {
      pre.textContent = text;
      const fit = () => (pre.style.fontSize = `${Math.max(3, box.clientWidth / (cols * 0.6))}px`);
      fit();
      const ro = new ResizeObserver(fit);
      ro.observe(box);
      timers.push({ ro });
    });
    box.addEventListener("click", () => box.classList.toggle("reveal"));
  }

  return () => timers.forEach((t) => (t.ro ? t.ro.disconnect() : clearTimeout(t)));
}

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

/** Builds a gallery for `project` inside `el`. Returns controls for keyboard navigation. */
function createGallery(el, project, style = getStyle(), start = 0) {
  if (!project.shots.length) {
    el.innerHTML = `<div class="gallery-empty">ls: ~/projects/${project.id}/shots: empty<br>no screenshots yet</div>`;
    return { next() {}, prev() {}, destroy() {} };
  }
  el.innerHTML = `<div class="gallery">
    <div class="gallery-stage"></div>
    <div class="gallery-nav">
      <button class="icon-btn" data-dir="-1" aria-label="Previous">←</button>
      <span class="count"></span>
      <button class="icon-btn" data-dir="1" aria-label="Next">→</button>
      <div class="gallery-dots">${project.shots.map((_, i) => `<button data-i="${i}" aria-label="Image ${i + 1}"></button>`).join("")}</div>
      <span class="fname"></span>
    </div>
  </div>`;
  const stage = el.querySelector(".gallery-stage");
  let index = 0;
  let cleanup = () => {};

  function go(i) {
    index = (i + project.shots.length) % project.shots.length;
    cleanup();
    cleanup = renderShot(stage, project, project.shots[index], style);
    el.querySelector(".count").textContent = `${index + 1}/${project.shots.length}`;
    el.querySelector(".fname").textContent = project.shots[index].file;
    el.querySelectorAll(".gallery-dots button").forEach((b, j) => b.classList.toggle("on", j === index));
  }

  el.querySelector(".gallery-nav").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    e.stopPropagation();
    if (b.dataset.dir) go(index + Number(b.dataset.dir));
    if (b.dataset.i) go(Number(b.dataset.i));
  });
  go(start);
  return { next: () => go(index + 1), prev: () => go(index - 1), destroy: () => cleanup() };
}

/* ------------------------------------------------------------------ */
/* Prototype toolbar                                                   */
/* ------------------------------------------------------------------ */

const LAYOUTS = [
  ["split.html", "1 · Split tmux"],
  ["floating.html", "2 · Ventana flotante"],
  ["inline.html", "3 · En la salida"],
  ["open.html", "4 · Comando open"],
];

function mountToolbar(onStyleChange) {
  const bar = document.createElement("div");
  bar.className = "proto-bar";
  const current = location.pathname.split("/").pop();
  const paint = () => {
    const style = getStyle();
    bar.innerHTML = `
      <div class="group"><b>Panel:</b>${LAYOUTS.map(([href, label]) => `<a href="${href}#${style}" class="${href === current ? "on" : ""}">${label}</a>`).join("")}</div>
      <div class="group"><b>Imágenes:</b>${Object.entries(IMAGE_STYLES).map(([k, label]) => `<button data-style="${k}" class="${k === style ? "on" : ""}">${label}</button>`).join("")}</div>
      <span class="hint">prueba <code>cat bri-llar</code> · ←/→ cambia imagen · Esc cierra</span>`;
  };
  bar.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-style]");
    if (!b) return;
    e.stopPropagation();
    history.replaceState(null, "", "#" + b.dataset.style);
    paint();
    onStyleChange(b.dataset.style);
  });
  paint();
  document.body.prepend(bar);
}

/* ------------------------------------------------------------------ */
/* Minimal terminal                                                    */
/* ------------------------------------------------------------------ */

const cmd = (command, label = command) => `<button class="cmd" data-cmd="${command}">${label}</button>`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

/**
 * hooks:
 *  - catExtra(project) → extra HTML appended to `cat` output
 *  - onCat(project), onOpen(project), onClose(), onOther()
 *  - afterOutput(outputEl, project | null)
 *  - onEscape(), onArrow(dir)
 *  - openCommand: boolean → enables `open <id>`
 */
function startTerminal(screen, hooks = {}) {
  screen.innerHTML = `
    <div class="intro"></div>
    <div class="output"></div>
    <div class="line"><span><span class="p">thelordduck22@portfolio</span>:<span class="b">~</span>$</span><input class="prompt-input" autocomplete="off" spellcheck="false" aria-label="Command"></div>`;
  const intro = screen.querySelector(".intro");
  const output = screen.querySelector(".output");
  const input = screen.querySelector(".prompt-input");
  const prompt = `<span class="p">thelordduck22@portfolio</span>:<span class="b">~</span>$`;

  const help = () => `<div class="block">Available commands:
  ${cmd("ls")}              list projects
  <span class="a">cat</span> &lt;project&gt;   show a project  (e.g. ${cmd("cat bri-llar")})${hooks.openCommand ? `\n  <span class="a">open</span> &lt;project&gt;  screenshots     (e.g. ${cmd("open endstep-arena")})` : ""}
  ${cmd("close")}           close the image panel
  ${cmd("clear")}           clear the output</div>`;

  const ls = () => `<div class="block grid">${PROJECTS.map((p) => `<span>${cmd(`cat ${p.id}`, p.id + "/")}${p.shots.length ? ` <span class="d">[${p.shots.length}]</span>` : ""}</span>`).join("")}</div>`;

  const cat = (p) => `<div class="block"><span class="d"># ~/projects/${p.id}/README.md</span>

<span class="a">## ${p.name}</span>${p.status ? ` <span class="k">[${p.status}]</span>` : ""}
<span class="d">${p.year} · ${p.category}</span>

${p.description}

<span class="d">stack:</span> ${p.stack.map((s) => `<span class="b">${s}</span>`).join(", ")}${hooks.catExtra ? hooks.catExtra(p) : ""}</div>`;

  function execute(raw) {
    const line = raw.trim();
    const [name, ...rest] = line.split(/\s+/);
    const project = PROJECTS.find((p) => p.id === rest.join(" ").replace(/\/$/, ""));
    let html = "";
    let shown = null;

    if (!line) html = "";
    else if (line === "help") html = help();
    else if (line === "ls") html = ls();
    else if (line === "clear") html = null;
    else if (line === "close") html = "";
    else if ((name === "cat" || name === "cd") && project) { html = cat(project); shown = project; }
    else if (name === "open" && hooks.openCommand && project) html = `<div class="block d">opening ~/projects/${project.id}/shots…</div>`;
    else if (name === "cat" || name === "open") html = `<div class="block">${name}: ${esc(rest.join(" ") || "?")}: no such project. Try ${cmd("ls")}</div>`;
    else html = `<div class="block">${esc(name)}: command not found. Type ${cmd("help")}</div>`;

    output.innerHTML = html === null ? "" : `<div>${prompt} ${esc(line)}</div>${html ? `<pre>${html}</pre>` : ""}`;

    if (shown) hooks.onCat?.(shown);
    else if (name === "open" && project) hooks.onOpen?.(project);
    else if (line === "close") hooks.onClose?.();
    else hooks.onOther?.();
    hooks.afterOutput?.(output, shown);
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("button.cmd");
    if (b) execute(b.dataset.cmd);
    else if (!e.target.closest("a, button, .panel, .shot, .proto-bar") && !getSelection().toString()) input.focus();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hooks.onEscape?.();
    if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && (!input.value || document.activeElement !== input)) {
      hooks.onArrow?.(e.key === "ArrowLeft" ? -1 : 1);
    }
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { execute(input.value); input.value = ""; }
    if (e.key === "Tab") {
      e.preventDefault();
      const m = input.value.match(/^(cat|cd|open) (.*)$/);
      const found = m && PROJECTS.filter((p) => p.id.startsWith(m[2]));
      if (found?.length === 1) input.value = `${m[1]} ${found[0].id}`;
    }
  });

  intro.innerHTML = `<div class="nick">THELORDDUCK22</div><div class="block d">Flavio · full-stack dev · prototype of the image panel</div><div>${prompt} help</div><pre>${help()}</pre>`;
  input.focus();
  // ?run=<command> runs a command on load (handy to link straight to a state)
  const auto = new URLSearchParams(location.search).get("run");
  if (auto) setTimeout(() => execute(auto), 200);
  return { execute };
}
