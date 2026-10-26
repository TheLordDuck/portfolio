import { ui, type Lang, type Localized } from "../i18n/ui";

/** Shape of the JSON that Terminal.astro embeds at build time (images already optimised). */
export type ShotsData = Record<string, { src: string; width: number; height: number; file: string; alt: Localized }[]>;

/**
 * Side panel that splits the terminal window in two (tmux style) and shows a project's
 * screenshots with a green phosphor look; hovering reveals the real colours. Clicking (or
 * tapping) a screenshot opens it full screen, in colour, in a second terminal window.
 */
export function createShotsPanel() {
  const data: ShotsData = JSON.parse(document.getElementById("shots-data")?.textContent || "{}");
  const win = document.querySelector<HTMLElement>(".window")!;
  const panel = document.getElementById("shots-panel")!;
  const path = panel.querySelector<HTMLElement>(".pane-path")!;
  const closeButton = panel.querySelector<HTMLButtonElement>(".pane-close")!;
  const content = panel.querySelector<HTMLElement>(".pane-content")!;

  const viewer = document.getElementById("shot-viewer") as HTMLDialogElement;
  const viewerTitle = viewer.querySelector<HTMLElement>(".viewer-title")!;
  const viewerCount = viewer.querySelector<HTMLElement>(".viewer-count")!;
  const viewerClose = viewer.querySelector<HTMLButtonElement>(".viewer-close")!;
  const viewerScreen = viewer.querySelector<HTMLElement>(".viewer-screen")!;

  let projectId: string | null = null;
  let index = 0;
  let lang: Lang = "en";

  const shots = () => (projectId ? (data[projectId] ?? []) : []);
  const shotsPath = () => `~/${ui[lang].terminal.projectsDir}/${projectId}/shots`;

  function render(animate: boolean) {
    const list = shots();
    const shot = list[index];
    const t = ui[lang].panel;
    path.textContent = shotsPath();
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
      <figure class="shot" role="button" tabindex="0" aria-label="${t.enlarge}">
        <img src="${shot.src}" width="${shot.width}" height="${shot.height}" alt="${shot.alt[lang]}" decoding="async" />
        <span class="shot-tip" aria-hidden="true"><span>▸ ${t.tipColour}</span><span>▸ ${t.tipEnlarge}</span></span>
      </figure>
      <div class="pane-nav">${nav}<span class="pane-file">${shot.file}</span></div>
      ${matchMedia("(hover: none)").matches ? `<p class="pane-hint">${t.hintTouch}</p>` : ""}`;

    if (animate) {
      content.classList.remove("fade");
      void content.offsetWidth; // restart the animation
      content.classList.add("fade");
    }
    if (viewer.open) renderViewer();
  }

  function renderViewer() {
    const list = shots();
    const shot = list[index];
    const t = ui[lang].panel;
    viewerTitle.textContent = `${shotsPath()}/${shot.file}`;
    viewerCount.textContent = list.length > 1 ? `${index + 1}/${list.length}` : "";
    viewer.setAttribute("aria-label", t.label);
    viewerClose.setAttribute("aria-label", t.close);
    viewerClose.title = t.close;
    const arrow = (delta: number, label: string, glyph: string) =>
      list.length > 1
        ? `<button type="button" class="viewer-step" data-step="${delta}" aria-label="${label}">${glyph}</button>`
        : "";
    viewerScreen.innerHTML = `
      ${arrow(-1, t.previous, "←")}
      <img src="${shot.src}" width="${shot.width}" height="${shot.height}" alt="${shot.alt[lang]}" />
      ${arrow(1, t.next, "→")}`;
  }

  function openViewer() {
    if (!projectId || viewer.open) return;
    renderViewer();
    viewer.showModal();
    viewerClose.focus({ preventScroll: true });
  }

  function closeViewer() {
    if (viewer.open) viewer.close();
  }

  function open(id: string, currentLang: Lang): boolean {
    lang = currentLang;
    if (!data[id]?.length) {
      close();
      return false;
    }
    const sameProject = id === projectId;
    const alreadyShown = sameProject && isOpen();
    projectId = id;
    // reopening the same project resumes at the screenshot that was showing
    if (!sameProject) index = 0;
    render(!alreadyShown);
    win.classList.add("split");
    panel.inert = false;
    // warm the cache so browsing is instant
    for (const s of data[id]) new Image().src = s.src;
    return true;
  }

  function close() {
    closeViewer();
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
    } else if (target.closest(".shot")) openViewer();
  });
  content.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && (e.target as HTMLElement).closest(".shot")) {
      e.preventDefault();
      openViewer();
    }
  });

  viewerClose.addEventListener("click", closeViewer);
  viewer.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const stepButton = target.closest<HTMLElement>("[data-step]");
    if (stepButton) step(Number(stepButton.dataset.step));
    // a click on the backdrop lands on the <dialog> itself
    else if (target === viewer) closeViewer();
  });
  viewer.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      step(e.key === "ArrowLeft" ? -1 : 1);
    }
  });

  return { open, close, isOpen, step, setLang, viewerOpen: () => viewer.open };
}
