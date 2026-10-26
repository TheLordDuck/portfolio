import { profile, projects, type Project } from "../data/projects";
import { defaultLang, fmt, isLang, languages, pathFor, ui, type Lang } from "../i18n/ui";
import { banner } from "./ascii";
import { createDesktop } from "./desktop";
import { createShotsPanel } from "./shots-panel";

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Clickable command. `label` is what is shown, `command` what runs on click. */
const cmd = (command: string, label = command) =>
  `<button class="cmd" data-cmd="${command}">${label}</button>`;

const block = (html: string, extraClass = "") => `<div class="block ${extraClass}">${html}</div>`;

/** Small "[3]" badge next to projects that have screenshots. */
const shotCount = (p: Project) => (p.shots?.length ? ` <span class="d">[${p.shots.length}]</span>` : "");

/** `panelWasOpen` tells `close` whether there was a screenshots panel to close. */
function createCommands(lang: Lang, panelWasOpen: () => boolean) {
  const t = ui[lang];
  const dir = `~/${t.terminal.projectsDir}`;
  const languageList = Object.keys(languages).map((l) => cmd(`lang ${l}`, l)).join(", ");

  const helpRow = (label: string, html: string, description: string) =>
    `  ${html}${" ".repeat(Math.max(2, 18 - label.length))}${description}`;

  const help = () => {
    const h = t.terminal.help;
    return block(
      [
        h.title,
        helpRow("ls", cmd("ls"), h.ls),
        helpRow("ls -l", cmd("ls -l"), h.lsLong),
        helpRow(
          `cat ${h.catArg}`,
          `<span class="a">cat</span> ${escape(h.catArg)}`,
          `${h.cat}  (${h.example} ${cmd("cat brillar")})`,
        ),
        helpRow("stack", cmd("stack"), h.stack),
        helpRow("contact", cmd("contact"), h.contact),
        helpRow(`lang ${Object.keys(languages).join(", ")}`, `<span class="a">lang</span> ${languageList}`, h.lang),
        helpRow("close", cmd("close"), h.close),
        helpRow("clear", cmd("clear"), h.clear),
      ].join("\n"),
    );
  };

  const whoami = () =>
    block(
      `<span class="a">${profile.nick}</span> <span class="d">(</span>${profile.name}<span class="d">)</span>\n\n` +
        fmt(t.terminal.bio, { magic: `<span class="k">Magic: The Gathering</span>` }),
    );

  // widest "id/ [n]" entry, so grid columns and `ls -l` comments line up with any id length
  const idWidth = Math.max(...projects.map((p) => p.id.length + 1));
  const badgeWidth = projects.some((p) => p.shots?.length) ? 4 : 0;

  const ls = () =>
    `<div class="block grid" style="--col: ${idWidth + badgeWidth}ch">${projects
      .map((p) => `<span>${cmd(`cat ${p.id}`, `${p.id}/`)}${shotCount(p)}</span>`)
      .join("")}</div>`;

  const lsLong = () =>
    block(
      projects
        .map((p) => {
          const meta = `drwxr-xr-x  ${p.year}  ${t.categories[p.category].padEnd(13)}`;
          const pad = " ".repeat(idWidth - p.id.length - 1 + 2);
          return `<span class="d">${meta}</span> ${cmd(`cat ${p.id}`, `${p.id}/`)}${pad}<span class="d"># ${p.summary[lang]}</span>`;
        })
        .join("\n"),
    );

  const tree = () => {
    const groups = new Map<string, Project[]>();
    for (const p of projects) groups.set(p.category, [...(groups.get(p.category) ?? []), p]);
    const categories = [...groups.keys()] as Project["category"][];
    const branches = categories.map((category, i) => {
      const lastBranch = i === categories.length - 1;
      const items = groups.get(category)!;
      const leaves = items.map((p, j) => {
        const indent = lastBranch ? "    " : "│   ";
        const connector = j === items.length - 1 ? "└──" : "├──";
        return `${indent}${connector} ${cmd(`cat ${p.id}`, p.id)}`;
      });
      return [`${lastBranch ? "└──" : "├──"} <span class="a">${t.categories[category]}</span>`, ...leaves].join("\n");
    });
    return block(`<span class="b">${dir}</span>\n${branches.join("\n")}`);
  };

  const stack = () => {
    const counts = new Map<string, number>();
    for (const p of projects) for (const tech of p.stack) counts.set(tech, (counts.get(tech) ?? 0) + 1);
    const top = [...counts].sort((a, b) => b[1] - a[1]).slice(0, 10);
    return block(
      top
        .map(([tech, n]) => `${tech.padEnd(14)} <span class="p">${"█".repeat(n * 3)}</span> <span class="d">${n}</span>`)
        .join("\n"),
    );
  };

  const contact = () => {
    const link = (href: string, text = href) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
    const lines = [`email     <a href="mailto:${profile.email}">${profile.email}</a>`];
    if (profile.github) lines.push(`github    ${link(profile.github)}`);
    if (profile.linkedin) lines.push(`linkedin  ${link(profile.linkedin)}`);
    return block(lines.join("\n"));
  };

  /** Opens in a new tab and is shown without the "https://". */
  const extLink = (href: string) =>
    `<a href="${href}" target="_blank" rel="noopener">${href.replace(/^https:\/\//, "")}</a>`;

  const cat = (id: string) => {
    const p = projects.find((project) => project.id === id);
    if (!p) return block(fmt(t.terminal.projectNotFound, { id: escape(id || "?"), ls: cmd("ls") }));
    const status = p.status ? ` <span class="k">[${p.status[lang]}]</span>` : "";
    const shotCount = p.shots?.length ?? 0;
    const shotsLine = fmt(shotCount === 1 ? t.terminal.shots.one : t.terminal.shots.many, { n: shotCount });
    return block(
      [
        `<span class="d"># ${dir}/${p.id}/README.md</span>`,
        "",
        `<span class="a">## ${p.name}</span>${status}`,
        `<span class="d">${p.year} · ${t.categories[p.category]}</span>`,
        "",
        p.description[lang],
        "",
        `<span class="d">${t.terminal.stackLabel}</span> ${p.stack.map((s) => `<span class="b">${s}</span>`).join(", ")}`,
        ...(p.url ? [`<span class="d">web:</span>   ${extLink(p.url)}`] : []),
        ...(p.repo ? [`<span class="d">repo:</span>  ${extLink(p.repo)}`] : []),
        // clickable, so the panel can be reopened after closing it without running `cat` again
        ...(shotCount
          ? ["", `<span class="p">▸</span> <button class="cmd" data-shots="${p.id}" title="${t.terminal.shots.reopen}">${shotsLine}</button>`]
          : []),
      ].join("\n"),
    );
  };

  const switchLang = (target: string) => {
    const list = Object.keys(languages).join(", ");
    if (target && !isLang(target)) return block(fmt(t.terminal.lang.unknown, { lang: escape(target), list }));
    // `lang <other>` never gets here: startTerminal switches in place without printing anything
    return block(fmt(t.terminal.lang.current, { lang, list: languageList }));
  };

  // `close` closes the screenshots panel (done in startTerminal); it only prints something when there was none
  const close = () => (panelWasOpen() ? "" : block(t.terminal.nothingToClose));
  const exact: Record<string, () => string> = { help, whoami, ls, "ls -l": lsLong, tree, stack, contact, close };
  const withArg: Record<string, (arg: string) => string> = { cat, cd: cat, lang: switchLang };

  return function run(line: string): string {
    if (exact[line]) return exact[line]();
    const [name, ...rest] = line.split(/\s+/);
    const arg = rest.join(" ").replace(/\/$/, "");
    if (withArg[name]) return withArg[name](arg);
    if (name === "sudo") return block(t.terminal.sudo);
    return block(fmt(t.terminal.commandNotFound, { name: escape(name), help: cmd("help") }));
  };
}

// ---------------------------------------------------------------------------
// Text scramble effect
// ---------------------------------------------------------------------------

const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789#%&*+=<>/\\";
const SCRAMBLE_MS = 700;
let scrambleFrame = 0;
let scrambleTimeout: ReturnType<typeof setTimeout> | undefined;

/**
 * Re-types every text node inside `roots`: characters start as random glyphs and settle
 * into the real text left to right. Skips the SVG banner and the prompt lines.
 */
function scramble(roots: HTMLElement[]) {
  cancelAnimationFrame(scrambleFrame);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const targets: { node: Text; chars: string[] }[] = [];
  for (const root of roots) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) =>
        node.parentElement?.closest("svg, .prompt-line") || !node.textContent?.trim()
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT,
    });
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      targets.push({ node, chars: Array.from(node.textContent ?? "") });
    }
  }

  const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  const start = performance.now();

  const paint = (progress: number) => {
    const eased = 1 - (1 - progress) ** 3;
    for (const { node, chars } of targets) {
      const settled = Math.floor(eased * chars.length);
      node.textContent = chars
        .map((ch, i) => (i < settled || /\s/.test(ch) ? ch : randomGlyph()))
        .join("");
    }
  };

  const frame = (now: number) => {
    const progress = Math.min(1, (now - start) / SCRAMBLE_MS);
    paint(progress);
    if (progress < 1) scrambleFrame = requestAnimationFrame(frame);
  };
  scrambleFrame = requestAnimationFrame(frame);

  // safety net: if frames get throttled (background tab…), still end on the real text
  clearTimeout(scrambleTimeout);
  scrambleTimeout = setTimeout(() => {
    cancelAnimationFrame(scrambleFrame);
    paint(1);
  }, SCRAMBLE_MS + 50);
}

// ---------------------------------------------------------------------------
// Terminal UI
// ---------------------------------------------------------------------------

const langFromPath = (path: string): Lang =>
  (Object.keys(languages) as Lang[]).find((l) => l !== defaultLang && path.startsWith(pathFor(l))) ?? defaultLang;

export function startTerminal() {
  const htmlLang = document.documentElement.lang;
  let lang: Lang = isLang(htmlLang) ? htmlLang : defaultLang;
  // whether the panel was open when the last command ran (kept so a language switch re-renders it the same)
  let panelWasOpen = false;
  const commandsFor = (l: Lang) => createCommands(l, () => panelWasOpen);
  let run = commandsFor(lang);

  // The intro (banner + whoami + help) stays pinned at the top; every command the visitor
  // runs replaces the previous output instead of piling up below it. After the first command
  // whoami is dropped from the intro (it has been read by then) to leave room for the output.
  const intro = document.getElementById("intro")!;
  const output = document.getElementById("output")!;
  const input = document.getElementById("prompt-input") as HTMLInputElement;
  const langLinks = document.querySelectorAll<HTMLAnchorElement>(".langs a[hreflang]");
  const prompt = `<span class="p">${profile.nick}@portfolio</span>:<span class="b">~</span>$`;
  const commandHistory: string[] = [];
  let historyIndex = 0;
  let lastLine = "";
  let introDone = false;
  let whoamiRead = false;
  const shotsPanel = createShotsPanel();
  const desktop = createDesktop({
    lang,
    onClose: () => shotsPanel.close(),
    // a closed terminal comes back fresh; a minimised one exactly as it was left
    onRestore: (wasClosed) => {
      if (wasClosed) {
        output.innerHTML = "";
        lastLine = "";
        playIntro();
      }
      input.focus({ preventScroll: true });
    },
  });

  intro.innerHTML = `${banner(profile.nick)}<div id="intro-body"></div>`;
  const introBody = document.getElementById("intro-body")!;

  // `clear` empties the output; so does `help`, since the help is already in the intro
  const clearsOutput = (line: string) => line === "clear" || line === "help";

  const render = (line: string) =>
    `<div class="prompt-line">${prompt} ${escape(line)}</div>` +
    (line && line !== "clear" ? `<pre>${run(line)}</pre>` : "");

  function renderIntro() {
    const welcome = fmt(ui[lang].terminal.welcome, {
      name: profile.name,
      role: profile.role,
      help: `</span>${cmd("help")}<span class="d">`,
    });
    introBody.innerHTML =
      block(`<span class="d">${welcome}</span>`) +
      (introDone ? (whoamiRead ? "" : `<div class="intro-whoami">${render("whoami")}</div>`) + render("help") : "");
  }

  const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Fades `el` out and folds its height to 0, so what's below slides up, then removes it. */
  function fold(el: HTMLElement) {
    if (reducedMotion()) return el.remove();
    el.style.overflow = "hidden";
    el.animate(
      [
        { height: `${el.offsetHeight}px`, opacity: 1 },
        { opacity: 0, offset: 0.4 },
        { height: "0px", opacity: 0 },
      ],
      { duration: 450, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
    ).onfinish = () => el.remove();
  }

  /** Drops the intro's whoami for good once the visitor has run a command. */
  function hideWhoami() {
    whoamiRead = true;
    const el = introBody.querySelector<HTMLElement>(".intro-whoami");
    if (el) fold(el);
  }

  /**
   * Replaces the output of the last command: the old one folds away (see `fold`) while the
   * new one fades in below it. Pass "" to just clear it.
   */
  function showOutput(html: string) {
    output.querySelectorAll<HTMLElement>(".out:not(.leaving)").forEach((old) => {
      old.classList.add("leaving");
      fold(old);
    });
    if (!html) return;
    output.insertAdjacentHTML("beforeend", `<div class="out">${html}</div>`);
    if (!reducedMotion()) output.lastElementChild!.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
  }

  function execute(raw: string) {
    const line = raw.trim();
    if (line) {
      commandHistory.push(line);
      historyIndex = commandHistory.length;
    }
    // `lang <other>` works like the EN/ES switch: whatever is on screen (output, screenshots
    // panel, the screenshot showing) stays and is re-typed in the new language
    const langTarget = line.match(/^lang\s+(\S+)$/)?.[1];
    if (langTarget && isLang(langTarget) && langTarget !== lang) {
      switchTo(langTarget);
      return;
    }
    lastLine = line;
    if (line && !whoamiRead) hideWhoami();
    panelWasOpen = shotsPanel.isOpen();
    showOutput(clearsOutput(line) ? "" : render(line));

    // `cat <id>` opens the screenshots panel; any other command closes it
    const [name, ...rest] = line.split(/\s+/);
    const id = rest.join(" ").replace(/\/$/, "");
    if ((name === "cat" || name === "cd") && projects.some((p) => p.id === id)) shotsPanel.open(id, lang);
    else shotsPanel.close();

    // only scrolls when the prompt was pushed off-screen by a long output
    input.scrollIntoView({ block: "nearest" });
  }

  /** Switches language in place: re-renders everything and plays the scramble effect. */
  function switchTo(target: Lang, pushHistory = true) {
    if (target === lang) return;
    lang = target;
    run = commandsFor(lang);
    const t = ui[lang];
    const vars = { nick: profile.nick, name: profile.name, role: profile.role };

    document.documentElement.lang = lang;
    document.title = fmt(t.meta.title, vars);
    document.querySelector('meta[name="description"]')?.setAttribute("content", fmt(t.meta.description, vars));
    input.setAttribute("aria-label", t.terminal.inputLabel);
    document.querySelector(".langs")?.setAttribute("aria-label", t.terminal.languageLabel);
    langLinks.forEach((a) => {
      if (a.hreflang === lang) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    if (pushHistory) window.history.pushState({ lang }, "", pathFor(lang));

    renderIntro();
    output.innerHTML = lastLine && !clearsOutput(lastLine) ? `<div class="out">${render(lastLine)}</div>` : "";
    shotsPanel.setLang(lang);
    desktop.setLang(lang);
    scramble([introBody, output]);
  }

  window.addEventListener("popstate", () => switchTo(langFromPath(location.pathname), false));

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const langLink = target.closest<HTMLAnchorElement>(".langs a[hreflang]");
    if (langLink && isLang(langLink.hreflang)) {
      e.preventDefault();
      switchTo(langLink.hreflang);
      return;
    }
    const button = target.closest<HTMLButtonElement>("button.cmd");
    if (button?.dataset.shots) shotsPanel.open(button.dataset.shots, lang);
    else if (button) execute(button.dataset.cmd ?? "");
    else if (!target.closest("a, #shots-panel, #shot-viewer, #desktop, .dots") && !getSelection()?.toString())
      input.focus();
  });

  // Esc closes the panel; ←/→ browse screenshots unless the visitor is editing a command.
  // The full-screen viewer handles its own keys (Esc closes only the viewer).
  document.addEventListener("keydown", (e) => {
    if (!shotsPanel.isOpen() || shotsPanel.viewerOpen()) return;
    if (e.key === "Escape") shotsPanel.close();
    const editing = document.activeElement === input && input.value !== "";
    if (!editing && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
      e.preventDefault();
      shotsPanel.step(e.key === "ArrowLeft" ? -1 : 1);
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      execute(input.value);
      input.value = "";
    } else if (e.key === "ArrowUp" && historyIndex > 0) {
      input.value = commandHistory[--historyIndex];
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      historyIndex = Math.min(historyIndex + 1, commandHistory.length);
      input.value = commandHistory[historyIndex] ?? "";
    } else if (e.key === "Tab") {
      // autocomplete project ids after `cat` / `cd`
      e.preventDefault();
      const match = input.value.match(/^(cat|cd) (.*)$/);
      if (match) {
        const found = projects.map((p) => p.id).filter((id) => id.startsWith(match[2]));
        if (found.length === 1) input.value = `${match[1]} ${found[0]}`;
      }
    }
  });

  /** Types the first command letter by letter, then shows whoami + help. Replays on reopening. */
  let introTyping: ReturnType<typeof setInterval> | undefined;
  let introPause: ReturnType<typeof setTimeout> | undefined;
  function playIntro() {
    clearInterval(introTyping);
    clearTimeout(introPause);
    introDone = false;
    whoamiRead = false;
    input.value = "";
    renderIntro();
    const first = "whoami";
    let typed = 0;
    introTyping = setInterval(() => {
      input.value = first.slice(0, ++typed);
      if (typed === first.length) {
        clearInterval(introTyping);
        introPause = setTimeout(() => {
          input.value = "";
          introDone = true;
          renderIntro();
        }, 300);
      }
    }, 90);
  }

  playIntro();
}
