(() => {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menu-toggle");
  const overlay = document.getElementById("mobile-overlay");
  const search = document.getElementById("doc-search");
  const navLinks = Array.from(document.querySelectorAll(".sidebar-nav a"));
  const navGroups = Array.from(document.querySelectorAll(".nav-group"));
  const emptyState = document.getElementById("empty-state");
  const currentPage = location.pathname.split("/").pop() || "index.html";

  function setMenuOpen(open) {
    sidebar.classList.toggle("open", open);
    overlay.classList.toggle("visible", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  }

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.setAttribute("aria-current", "page");
    }
    link.addEventListener("click", () => setMenuOpen(false));
  });

  menuToggle.addEventListener("click", () => setMenuOpen(!sidebar.classList.contains("open")));
  overlay.addEventListener("click", () => setMenuOpen(false));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  search.addEventListener("input", () => {
    const query = search.value.trim().toLocaleLowerCase();
    let matches = 0;
    navLinks.forEach(link => {
      const visible = !query || link.textContent.toLocaleLowerCase().includes(query);
      link.closest(".nav-leaf").hidden = !visible;
      if (visible) matches += 1;
    });
    navGroups.forEach(group => {
      group.hidden = Boolean(query && !group.querySelector(".nav-leaf:not([hidden])"));
    });
    emptyState.classList.toggle("visible", Boolean(query && matches === 0));
  });
})();
