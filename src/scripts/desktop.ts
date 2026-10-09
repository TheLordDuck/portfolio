import { ui, type Lang } from "../i18n/ui";

type State = "open" | "closed" | "minimized";

/** Random index into `list`, different from `previous` when there is a choice. */
function pickIndex(list: unknown[], previous = -1) {
  let index = Math.floor(Math.random() * list.length);
  if (list.length > 1 && index === previous) index = (index + 1) % list.length;
  return index;
}

/**
 * The title bar's × and _ buttons. Closing or minimising the terminal reveals a "desktop"
 * with a rubber duck and a joke; any key (or the icon / dock item) brings the terminal back.
 */
export function createDesktop({
  lang: initialLang,
  onClose,
  onRestore,
}: {
  lang: Lang;
  /** Runs when the terminal is closed (not when it is minimised). */
  onClose: () => void;
  /** Runs once the terminal is back. `wasClosed` is false when it had only been minimised. */
  onRestore: (wasClosed: boolean) => void;
}) {
  const win = document.querySelector<HTMLElement>(".window")!;
  const closeButton = win.querySelector<HTMLButtonElement>(".dot-close")!;
  const minimizeButton = win.querySelector<HTMLButtonElement>(".dot-min")!;
  const desktop = document.getElementById("desktop")!;
  const icon = desktop.querySelector<HTMLButtonElement>(".desk-icon")!;
  const iconLabel = icon.querySelector<HTMLElement>(".desk-icon-label")!;
  const dock = desktop.querySelector<HTMLElement>(".dock")!;
  const dockItem = dock.querySelector<HTMLButtonElement>(".dock-item")!;
  const duck = desktop.querySelector<HTMLButtonElement>(".duck")!;
  const bubble = desktop.querySelector<HTMLElement>(".bubble")!;
  const message = desktop.querySelector<HTMLElement>(".desk-msg")!;
  const hint = desktop.querySelector<HTMLElement>(".desk-hint")!;

  let state: State = "open";
  let lang = initialLang;
  let messageIndex = 0;
  let quackIndex = -1;

  const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Plays a CSS animation class on `el`, then calls `done` (right away with reduced motion). */
  function animate(el: HTMLElement, name: string, done = () => {}) {
    if (reducedMotion()) return done();
    el.classList.remove(name);
    void el.offsetWidth; // restart the animation if it was already running
    el.classList.add(name);
    el.addEventListener(
      "animationend",
      () => {
        el.classList.remove(name);
        done();
      },
      { once: true },
    );
  }

  function render() {
    const t = ui[lang].desktop;
    closeButton.setAttribute("aria-label", t.close);
    closeButton.title = t.close;
    minimizeButton.setAttribute("aria-label", t.minimize);
    minimizeButton.title = t.minimize;
    duck.setAttribute("aria-label", t.duck);
    duck.title = t.duck;
    iconLabel.textContent = t.icon;
    if (state === "open") return;
    message.textContent = (state === "closed" ? t.closed : t.minimized)[messageIndex];
    hint.textContent = state === "closed" ? t.closedHint : t.minimizedHint;
    if (quackIndex >= 0) bubble.textContent = t.quacks[quackIndex];
    icon.hidden = state !== "closed";
    dock.hidden = state !== "minimized";
  }

  function hide(next: Exclude<State, "open">) {
    if (state !== "open") return;
    state = next;
    const t = ui[lang].desktop;
    messageIndex = pickIndex(next === "closed" ? t.closed : t.minimized);
    quackIndex = -1;
    bubble.textContent = "";
    if (next === "closed") onClose();
    render();
    desktop.hidden = false;
    animate(win, next === "closed" ? "closing" : "minimizing", () => {
      win.hidden = true;
      (next === "closed" ? icon : dockItem).focus({ preventScroll: true });
    });
  }

  function restore() {
    if (state === "open") return;
    const wasClosed = state === "closed";
    state = "open";
    desktop.hidden = true;
    win.hidden = false;
    animate(win, wasClosed ? "opening" : "restoring");
    onRestore(wasClosed);
  }

  function quack() {
    quackIndex = pickIndex(ui[lang].desktop.quacks, quackIndex);
    render();
    animate(duck, "hop");
    animate(bubble, "pop");
  }

  closeButton.addEventListener("click", () => hide("closed"));
  minimizeButton.addEventListener("click", () => hide("minimized"));
  icon.addEventListener("click", restore);
  dockItem.addEventListener("click", restore);
  duck.addEventListener("click", quack);

  // Any key brings the terminal back. Capture phase, so the terminal's own shortcuts
  // (Esc, ←/→) don't also fire while it is hidden. Tab still moves between the buttons.
  document.addEventListener(
    "keydown",
    (e) => {
      if (state === "open" || ["Tab", "Shift", "Control", "Alt", "Meta"].includes(e.key)) return;
      if (document.activeElement === duck && (e.key === "Enter" || e.key === " ")) return;
      e.preventDefault();
      e.stopPropagation();
      restore();
    },
    true,
  );

  render();

  return {
    setLang(next: Lang) {
      lang = next;
      render();
    },
  };
}
