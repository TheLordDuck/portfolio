// Side panel shared by split.html and open.html: the terminal window splits in two
// like a tmux pane, with the screenshots on the right.
// openOnCat: true  → `cat <id>` opens the panel (split.html)
//            false → only `open <id>` does; `cat` shows a hint (open.html)
function mountSplit({ openOnCat }) {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="window">
      <div class="title-bar"><span class="dots"><i></i><i></i><i></i></span><span class="title">thelordduck22@portfolio: ~</span></div>
      <div class="split-body">
        <div class="screen"></div>
        <aside class="panel" aria-hidden="true">
          <div class="pane-bar"><span class="pane-path"></span><button class="icon-btn" data-close aria-label="Close">✕</button></div>
          <div class="pane-content"></div>
        </aside>
      </div>
    </div>`);

  const win = document.querySelector(".window");
  const panel = document.querySelector(".panel");
  const content = panel.querySelector(".pane-content");
  let gallery = null;
  let current = null;

  function open(project) {
    if (current === project && win.classList.contains("split")) return;
    gallery?.destroy();
    current = project;
    panel.querySelector(".pane-path").textContent = `~/projects/${project.id}/shots`;
    content.classList.remove("fade");
    void content.offsetWidth;
    content.classList.add("fade");
    gallery = createGallery(content, project);
    win.classList.add("split");
    panel.setAttribute("aria-hidden", "false");
  }

  function close() {
    win.classList.remove("split");
    panel.setAttribute("aria-hidden", "true");
    current = null;
  }

  panel.querySelector("[data-close]").addEventListener("click", (e) => {
    e.stopPropagation();
    close();
  });

  startTerminal(document.querySelector(".screen"), {
    openCommand: !openOnCat,
    catExtra: openOnCat ? null : (p) => p.shots.length
      ? `\n\n<span class="p">▸</span> ${cmd(`open ${p.id}`)} <span class="d">(${p.shots.length} screenshots)</span>`
      : `\n\n<span class="d">▸ no screenshots yet</span>`,
    onCat: (p) => (openOnCat ? open(p) : current !== p && close()),
    onOpen: open,
    onClose: close,
    onOther: close,
    onEscape: close,
    onArrow: (dir) => win.classList.contains("split") && (dir < 0 ? gallery?.prev() : gallery?.next()),
  });

  mountToolbar((style) => {
    if (current && win.classList.contains("split")) {
      gallery?.destroy();
      gallery = createGallery(content, current, style);
    }
  });
}
