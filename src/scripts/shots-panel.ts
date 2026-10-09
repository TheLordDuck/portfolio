import { ui, type Lang, type Localized } from "../i18n/ui";

/** Shape of the JSON that Terminal.astro embeds at build time (images already optimised). */
export type ShotsData = Record<string, { src: string; width: number; height: number; file: string; alt: Localized }[]>;

/**
 * Side panel that splits the terminal window in two (tmux style) and shows a project's
 * screenshots with a green phosphor look; hovering (or tapping) reveals the real colours.
 */
export function createShotsPanel() {
  const data: ShotsData = JSON.parse(document.getElementById("shots-data")?.textContent || "{}");
  const win = document.querySelector<HTMLElement>(".window")!;
  const panel = document.getElementById("shots-panel")!;
  const path = panel.querySelector<HTMLElement>(".pane-path")!;
  const closeButton = panel.querySelector<HTMLButtonElement>(".pane-close")!;
  const content = panel.querySelector<HTMLElement>(".pane-content")!;

  let projectId: string | null = null;
  let index = 0;
  let lang: Lang = "en";

  const shots = () => (projectId ? (data[projectId] ?? []) : []);

  function render(animate: boolean) {
    const list = shots();
    const shot = list[index];
    const t = ui[lang].panel;
    path.textContent = `~/${ui[lang].terminal.projectsDir}/${projectId}/shots`;
    panel.setAttribute("aria-label", t.label);
    closeButton.setAttribute("aria-label", t.close);
    closeButton.title = t.close;

    const nav =
      list.length > 1
        ? `<button class="pane-btn" data-step="-1" aria-label="${t.previous}">←</button>
           <span>${index + 1}/${list.length}</span>
           <button class="pane-btn" data-step="1" aria-label="${t.next}">→</button>
           <span class="pane-dots">${list.map((_, i) => `<button data-go="${i}" class="${i === index ? "on" : ""}" aria-label="${i + 1}/${list.length}"></button>`).join("")}</span>`
        : "";

    content.innerHTML = `
      <figure class="shot">
        <img src="${shot.src}" width="${shot.width}" height="${shot.height}" alt="${shot.alt[lang]}" decoding="async" />
      </figure>
      <div class="pane-nav">${nav}<span class="pane-file">${shot.file}</span></div>
      <p class="pane-hint">${matchMedia("(hover: none)").matches ? t.hintTouch : t.hint}</p>`;

    if (animate) {
      content.classList.remove("fade");
      void content.offsetWidth; // restart the animation
      content.classList.add("fade");
    }
  }

  function open(id: string, currentLang: Lang): boolean {
    lang = currentLang;
    if (!data[id]?.length) {
      close();
      return false;
    }
    const sameProject = id === projectId && isOpen();
    projectId = id;
    if (!sameProject) index = 0;
    render(!sameProject);
    win.classList.add("split");
    panel.inert = false;
    // warm the cache so browsing is instant
    for (const s of data[id]) new Image().src = s.src;
    return true;
  }

  function close() {
    win.classList.remove("split");
    panel.inert = true;
  }

  function isOpen() {
    return win.classList.contains("split");
  }

  function step(delta: number) {
    const list = shots();
    if (!isOpen() || list.length < 2) return;
    index = (index + delta + list.length) % list.length;
    render(true);
  }

  function setLang(next: Lang) {
    lang = next;
    if (isOpen()) render(false);
  }

  closeButton.addEventListener("click", close);
  content.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const stepButton = target.closest<HTMLElement>("[data-step]");
    const dot = target.closest<HTMLElement>("[data-go]");
    if (stepButton) step(Number(stepButton.dataset.step));
    else if (dot) {
      index = Number(dot.dataset.go);
      render(true);
    } else if (target.closest(".shot")) {
      // touch screens have no hover: tapping toggles the real colours
      target.closest(".shot")!.classList.toggle("color");
    }
  });

  return { open, close, isOpen, step, setLang };
}
