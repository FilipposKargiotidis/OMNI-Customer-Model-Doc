(() => {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menu-toggle");
  const overlay = document.getElementById("mobile-overlay");
  const search = document.getElementById("doc-search");
  const navLinks = Array.from(document.querySelectorAll(".sidebar-nav a"));
  const navGroups = Array.from(document.querySelectorAll(".nav-group"));
  const emptyState = document.getElementById("empty-state");
  const currentPage = location.pathname.split("/").pop() || "index.html";
  const breadcrumbNav = document.querySelector('nav[aria-label="Breadcrumb"]');
  let breadcrumbActions = breadcrumbNav?.querySelector(".breadcrumb-actions");
  const topbar = document.querySelector(".topbar");
  const sidebarBrand = sidebar.querySelector(".sidebar-logo");
  const menuIcon = '<svg aria-hidden="true" viewBox="-32 -32 1088 1088" focusable="false"><g transform="translate(0, 960) scale(1, -1)"><path d="M1024 827.363h-1024v66.783h1024zM1024 400.844h-1024v66.783h1024zM1024-25.674h-1024v66.783h1024z"/></g></svg>';
  const pageSearchTerms = {
    "index.html": "overview customer model merchant portal accounts services partners access",
    "why-this-matters.html": "customer model organization complexity access users services hierarchy",
    "customer-hierarchy.html": "hierarchy corporation company store group partner account owner omni provisioning users PSP pay online acquiring settlement reports invoices",
    "services.html": "channels online in-store PSP pay online payment processing pay by link acquiring card terminal payment methods APM QR code TMS settlement reports invoicing",
    "corporation.html": "customer account enterprise organization companies users access hierarchy",
    "company.html": "customer account legal entity agreements payouts stores users access hierarchy",
    "group.html": "optional customer account store group organize stores region brand department scoped access",
    "store.html": "customer account online in-store payments PSP pay online acquiring terminal pay by link settlement reports invoices services",
    "test-store-online.html": "customer account testing PSP online pay online ECOM simulated transactions integration payment methods SCM search customer API",
    "partner.html": "partner account agreement companies access groups subtype sales portal users",
    "partner-sub-types.html": "partner subtypes executive platform integration technical referral access concepts",
    "Ecom-Corp-Access-groups.html": "EcomCorp access group partner online stores transaction operations reports invoices user administration",
    "IMS-GroupAccess-groups.html": "ImsGroup legacy acquiring access ID company organization number stores PSP services acquiring-only",
    "access-inheritance.html": "access inheritance corporation company store group store users scope permissions",
    "user-roles.html": "external user roles administrator finance support technical reader access permissions",
    "role-permission-matrix.html": "role permission matrix administrator finance support technical reader scoped access"
  };

  if (breadcrumbNav && !breadcrumbActions) {
    breadcrumbActions = document.createElement("div");
    breadcrumbActions.className = "breadcrumb-actions";
    breadcrumbNav.append(breadcrumbActions);
  }

  if (topbar && sidebarBrand) {
    const mobileBrand = sidebarBrand.cloneNode(true);
    mobileBrand.classList.replace("sidebar-logo", "mobile-brand");
    topbar.prepend(mobileBrand);
  }

  if (breadcrumbNav) {
    const copyLinkButton = document.createElement("button");
    copyLinkButton.className = "copy-page-link";
    copyLinkButton.type = "button";
    copyLinkButton.setAttribute("aria-label", "Copy link to this page");
    copyLinkButton.title = "Copy link to this page";
    copyLinkButton.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.07 0l3-3A5 5 0 0 0 13 2.93l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3A5 5 0 0 0 11 21.07l1.71-1.71"/></svg>';

    const copyStatus = document.createElement("span");
    copyStatus.className = "copy-page-link-status";
    copyStatus.setAttribute("role", "status");
    copyStatus.setAttribute("aria-live", "polite");

    async function copyPageLink() {
      const pageUrl = window.location.href;

      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
          throw new Error("Clipboard API is unavailable");
        }
        await navigator.clipboard.writeText(pageUrl);
        copyStatus.textContent = "Link copied";
      } catch {
        const fallback = document.createElement("textarea");
        fallback.value = pageUrl;
        fallback.setAttribute("readonly", "");
        fallback.style.position = "fixed";
        fallback.style.opacity = "0";
        document.body.appendChild(fallback);
        fallback.select();
        const copied = document.execCommand("copy");
        fallback.remove();
        copyStatus.textContent = copied
          ? "Link copied"
          : "Could not copy link. Copy the URL from the address bar.";
      }
    }

    copyLinkButton.addEventListener("click", copyPageLink);
    breadcrumbActions.append(copyLinkButton, copyStatus);
  }

  function setMenuOpen(open) {
    sidebar.classList.toggle("open", open);
    overlay.classList.toggle("visible", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menuToggle.title = open ? "Close navigation" : "Open navigation";
  }

  menuToggle.innerHTML = menuIcon;
  menuToggle.setAttribute("aria-label", "Open navigation");
  menuToggle.title = "Open navigation";

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
    const queryTerms = query.split(/\s+/).filter(Boolean);
    let matches = 0;
    navLinks.forEach(link => {
      const page = link.getAttribute("href");
      const searchableText = `${link.textContent} ${pageSearchTerms[page] || ""}`.toLocaleLowerCase();
      const visible = queryTerms.length === 0 || queryTerms.every(term => searchableText.includes(term));
      link.closest(".nav-leaf").hidden = !visible;
      if (visible) matches += 1;
    });
    navGroups.forEach(group => {
      group.hidden = Boolean(query && !group.querySelector(".nav-leaf:not([hidden])"));
    });
    emptyState.classList.toggle("visible", Boolean(query && matches === 0));
  });
})();
