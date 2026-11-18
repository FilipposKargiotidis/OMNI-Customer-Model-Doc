(() => {
  const dialog = document.getElementById("hierarchy-presentation");
  const hierarchyOpenButton = document.getElementById("open-hierarchy-presentation");
  const accountsOpenButton = document.getElementById("open-accounts-presentation");
  if (!dialog || (!hierarchyOpenButton && !accountsOpenButton)) return;

  const hierarchySlides = [
    {
      title: "A clear model makes complexity easier to manage",
      context: "Merchants can have many legal entities, Stores and users. A shared structure helps people understand where operations belong and how access should be organized.",
      takeaway: "One understandable model connects the merchant's organization, Store services and user responsibilities.",
      visual: "context",
      source: "Why this matters"
    },
    {
      title: "The hierarchy gives each account a clear place",
      context: "Corporations organize Companies. Companies manage Stores directly or through optional Store Groups, while remaining the Store's parent.",
      takeaway: "Store Groups add organization, not another legal entity; Partners may serve Stores but are not hierarchy parents.",
      visual: "hierarchy",
      source: "Customer hierarchy"
    },
    {
      title: "Account setup follows standard and specialist paths",
      context: "Owner OMNI users create Partner and Company parent accounts, then Groups, Stores and Test Stores. Development-team setup covers Corporations and special access groups.",
      takeaway: "The account type determines who sets it up and which path is followed.",
      visual: "creation",
      source: "How customer accounts are created"
    },
    {
      title: "Every Store has one channel; its services depend on setup",
      context: "A Store is Online or In-store. Services are associated with that Store according to its channel, agreements and configuration.",
      takeaway: "The channel describes how the Store operates; it does not limit the Store to only one service.",
      visual: "channels",
      source: "Channels & Services"
    },
    {
      title: "One hierarchy can support different Store setups",
      context: "Stores can use different channels and services within the same model. These examples are illustrative; availability depends on each Store's agreements and setup.",
      takeaway: "The hierarchy stays consistent while Store-level services reflect each business's needs.",
      visual: "examples",
      source: "Illustrative Store setups"
    }
  ];

  const accountSlides = [
    {
      title: "Each customer account has a distinct role",
      context: "Corporation, Company, optional Store Group and Store represent different organizational or operational levels in the customer model.",
      takeaway: "Use the account level that matches the organization or activity being represented.",
      visual: "accountRoles",
      source: "Customer accounts"
    },
    {
      title: "A Corporation is the parent legal entity",
      context: "A Corporation can have Companies and other legal entities beneath it. It may have its own organisation number or share an organisation number with a Company under it.",
      takeaway: "The Corporation provides the parent legal-entity structure above its Companies.",
      visual: "corporation",
      source: "Corporation"
    },
    {
      title: "The Company is the legal entity beneath the Corporation",
      context: "The Company holds its organisation number and one Access ID. It also owns commercial agreements, receives payouts and organizes its Stores.",
      takeaway: "The Company is the legal and commercial anchor for its Store operations.",
      visual: "company",
      source: "Company"
    },
    {
      title: "The common route connects a Company directly to Stores",
      context: "A Company can have one or more Stores directly beneath it. Each Store is the operational account where payment services and activity are associated.",
      takeaway: "The direct Company-to-Store route is the common setup.",
      visual: "directStoreRoute",
      source: "Company and Store"
    },
    {
      title: "An optional Store Group can organize Stores",
      context: "When extra organization is useful, a Company can place a Store Group between itself and its Stores. Groups can reflect regions, brands, departments or business units.",
      takeaway: "The Store Group is optional; the Company remains the parent legal entity and the Store remains the service level.",
      visual: "groupStoreRoute",
      source: "Store Group"
    },
    {
      title: "Stores connect the account model to payment services",
      context: "Each Store has one channel—Online or In-store—and can be configured with compatible payment and operational services.",
      takeaway: "Services are associated with the Store according to its channel, agreements and configuration.",
      visual: "channels",
      source: "Store & Services"
    },
    {
      title: "Test Stores support integration without live payments",
      context: "Online Test Stores are used internally to test Pay online integrations. Their transactions are simulated, not live customer payments.",
      takeaway: "Test Store setup and payment method configuration are currently internal capabilities, not customer self-service.",
      visual: "testStore",
      source: "Test Store (Online)"
    },
    {
      title: "Access follows account scope, role and permissions",
      context: "Users can be assigned at relevant account levels. Their potential scope follows that account and its lower levels, while assigned roles and permissions determine what they can do.",
      takeaway: "Account placement provides scope; it does not by itself grant every permission.",
      visual: "accountAccess",
      source: "Access inheritance"
    },
    {
      title: "Account setup depends on the account type",
      context: "Owner OMNI users create Partner and Company parent accounts, then Groups, Stores and Test Stores. Development-team setup covers Corporations and special access groups.",
      takeaway: "The account type determines who sets it up and which path is followed.",
      visual: "creation",
      source: "How customer accounts are created"
    },
    {
      title: "Both Store routes fit the same customer hierarchy",
      context: "A Company can manage Stores directly or organize them through an optional Store Group. In either route, the Company remains their parent legal entity.",
      takeaway: "Choose the direct route by default; add a Store Group when it provides useful organization.",
      visual: "completedRoutes",
      source: "Customer hierarchy"
    }
  ];

  const setup = document.getElementById("presentation-setup");
  const player = document.getElementById("presentation-player");
  const outline = document.getElementById("recommended-outline");
  const slideOptions = document.getElementById("presentation-slide-options");
  const presentationTitle = document.getElementById("presentation-title");
  const presentationIntro = document.getElementById("presentation-setup-title");
  const recommendedTitle = document.getElementById("presentation-recommended-title");
  const recommendedDescription = document.getElementById("presentation-recommended-description");
  const slideStage = document.getElementById("presentation-slide-stage");
  const source = document.getElementById("presentation-source");
  const playerStatus = document.getElementById("presentation-player-status");
  const slideCount = document.getElementById("presentation-slide-count");
  const progressFill = document.getElementById("presentation-progress-fill");
  const previousButton = document.getElementById("presentation-previous");
  const nextButton = document.getElementById("presentation-next");
  const fullscreenButton = document.getElementById("presentation-fullscreen");
  const validation = document.getElementById("presentation-validation");
  let activeDeck = {
    title: "Customer hierarchy",
    intro: "A concise story from the purpose of the model to account setup and Store services.",
    recommendedTitle: "Tell the complete story",
    recommendedDescription: "All prepared slides in a clear sequence, designed for a short introduction.",
    slides: hierarchySlides
  };
  let activeSlides = activeDeck.slides;
  let activeIndex = 0;
  let previouslyFocused = null;

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  const addToken = (parent, text, className = "") => parent.append(element("span", `presentation-token ${className}`.trim(), text));

  function buildContextVisual() {
    const visual = element("div", "presentation-visual presentation-context-visual");
    const items = [
      ["01", "Business structure", "Many entities need a clear relationship."],
      ["02", "Store operations", "Services belong at the right operational level."],
      ["03", "User responsibilities", "Access should reflect the work people do."]
    ];
    items.forEach(([number, title, description]) => {
      const card = element("article", "presentation-context-card");
      card.append(element("span", "presentation-visual-number", number), element("h4", "", title), element("p", "", description));
      visual.append(card);
    });
    visual.append(element("div", "presentation-clarity-bar", "A shared customer model brings these parts together"));
    return visual;
  }

  function hierarchyNode(title, subtitle, variant) {
    const node = element("div", `presentation-hierarchy-node ${variant}`);
    node.append(element("strong", "", title), element("span", "", subtitle));
    return node;
  }

  function buildHierarchyVisual() {
    const visual = element("div", "presentation-visual presentation-hierarchy-visual");
    const top = element("div", "presentation-hierarchy-top");
    top.append(
      hierarchyNode("Corporation", "Enterprise structure", "account-corporation"),
      element("span", "presentation-flow-arrow", "→"),
      hierarchyNode("Company", "Legal and operating entity", "account-company")
    );
    const routes = element("div", "presentation-hierarchy-routes");
    const groupRoute = element("article", "presentation-hierarchy-route");
    const groupChain = element("div", "presentation-route-chain");
    groupChain.append(
      hierarchyNode("Store Group", "Organizes Stores", "account-group"),
      element("span", "presentation-flow-arrow", "→"),
      hierarchyNode("Stores", "Operational accounts", "account-store")
    );
    groupRoute.append(element("span", "presentation-route-label", "OPTIONAL STORE GROUP ROUTE"), groupChain);
    const directRoute = element("article", "presentation-hierarchy-route");
    directRoute.append(element("span", "presentation-route-label", "DIRECT ROUTE"), hierarchyNode("Stores", "Can sit directly under Company", "account-store"));
    routes.append(groupRoute, directRoute);
    visual.append(top, routes);
    return visual;
  }

  function buildCreationVisual() {
    const visual = element("div", "presentation-visual presentation-creation-visual");
    const ownerLane = element("article", "presentation-creation-lane presentation-owner-lane");
    ownerLane.append(element("span", "presentation-route-label", "STANDARD INTERNAL SETUP"), element("h4", "", "Owner OMNI users"));
    const ownerFlow = element("div", "presentation-creation-flow");
    ["Partner or Company", "Groups, Stores and Test Stores"].forEach((label, index) => {
      if (index) ownerFlow.append(element("span", "presentation-flow-arrow", "→"));
      ownerFlow.append(element("span", "presentation-flow-node", label));
    });
    ownerLane.append(ownerFlow, element("p", "", "Groups can organize Stores created under Company accounts."));

    const developmentLane = element("article", "presentation-creation-lane presentation-development-lane");
    developmentLane.append(element("span", "presentation-route-label", "SPECIALIST SETUP"), element("h4", "", "Development team"));
    const specialistTags = element("div", "presentation-specialist-tags");
    addToken(specialistTags, "Corporations");
    addToken(specialistTags, "Special access groups");
    developmentLane.append(specialistTags, element("p", "", "Used when a Partner, customer or service needs setup beyond standard account flows."));
    visual.append(ownerLane, developmentLane);
    return visual;
  }

  function buildChannelCard(channel, description, services, variant) {
    const card = element("article", `presentation-channel-card ${variant}`);
    card.append(element("span", "presentation-channel-label", channel), element("p", "", description));
    const tokenList = element("div", "presentation-token-list");
    services.forEach(service => addToken(tokenList, service));
    card.append(tokenList);
    return card;
  }

  function buildChannelsVisual() {
    const visual = element("div", "presentation-visual presentation-channels-visual");
    visual.append(
      buildChannelCard("Online", "A digital customer journey, such as a website or online checkout.", ["Online PSP / Pay online", "Pay by Link", "Card acquiring", "Settlement reports"], "service-online"),
      buildChannelCard("In-store", "A physical point of sale, often supported by a payment terminal.", ["In-store PSP / terminal", "QR Code and APMs", "Card acquiring", "TMS"], "service-instore")
    );
    return visual;
  }

  function buildExampleCard(title, channel, services, variant) {
    const card = element("article", `presentation-example-card ${variant}`);
    card.append(element("span", "presentation-channel-label", channel), element("h4", "", title));
    const list = element("ul", "presentation-example-services");
    services.forEach(service => list.append(element("li", "", service)));
    card.append(list);
    return card;
  }

  function buildExamplesVisual() {
    const visual = element("div", "presentation-visual presentation-examples-visual");
    visual.append(
      buildExampleCard("Website checkout", "ONLINE", ["Online PSP / Pay online", "Card acquiring", "Pay by Link"], "service-online"),
      buildExampleCard("Physical store", "IN-STORE", ["Payment terminal", "Card acquiring", "Settlement reports"], "service-instore")
    );
    return visual;
  }

  function buildAccountRolesVisual() {
    const visual = element("div", "presentation-visual presentation-account-roles-visual");
    const accounts = [
      ["Corporation", "Enterprise organization", "account-corporation"],
      ["Company", "Commercial and operating entity", "account-company"],
      ["Store Group", "Optional Store organization", "account-group"],
      ["Store", "Payment services and activity", "account-store"]
    ];
    accounts.forEach(([title, description, variant]) => {
      const card = element("article", `presentation-account-role ${variant}`);
      card.append(element("strong", "", title), element("span", "", description));
      visual.append(card);
    });
    return visual;
  }

  function buildCorporationVisual() {
    const visual = element("div", "presentation-visual presentation-company-visual");
    const corporation = hierarchyNode("Corporation", "Parent legal entity · organisation number may be shared", "account-corporation");
    const companies = element("div", "presentation-company-stores");
    companies.append(
      hierarchyNode("Company", "Legal entity · organisation number · one Access ID", "account-company"),
      hierarchyNode("Other legal entity", "May sit beneath the Corporation", "account-company")
    );
    visual.append(corporation, element("span", "presentation-flow-arrow", "↓"), companies);
    return visual;
  }

  function buildCompanyVisual() {
    const visual = element("div", "presentation-visual presentation-company-visual");
    const company = hierarchyNode("Company", "Legal entity · organisation number · one Access ID", "account-company");
    const stores = element("div", "presentation-company-stores");
    stores.append(
      hierarchyNode("Store", "Payment services", "account-store"),
      hierarchyNode("Store", "Payment services", "account-store")
    );
    visual.append(company, element("span", "presentation-flow-arrow", "↓"), stores);
    return visual;
  }

  function buildDirectStoreRouteVisual() {
    const visual = element("div", "presentation-visual presentation-account-route-visual");
    visual.append(
      element("span", "presentation-route-label", "COMMON DIRECT ROUTE"),
      hierarchyNode("Company", "Parent legal entity · agreement owner", "account-company"),
      element("span", "presentation-flow-arrow", "↓"),
      hierarchyNode("Store", "Payment services and activity", "account-store")
    );
    return visual;
  }

  function buildGroupStoreRouteVisual() {
    const visual = element("div", "presentation-visual presentation-account-route-visual");
    visual.append(
      element("span", "presentation-route-label", "OPTIONAL ORGANIZATIONAL ROUTE"),
      hierarchyNode("Company", "Parent legal entity", "account-company"),
      element("span", "presentation-flow-arrow", "↓"),
      hierarchyNode("Store Group", "Organizes Stores by region, brand or business unit", "account-group"),
      element("span", "presentation-flow-arrow", "↓"),
      hierarchyNode("Store", "Payment services and activity", "account-store")
    );
    return visual;
  }

  function buildCompletedRoutesVisual() {
    const visual = element("div", "presentation-visual presentation-completed-routes-visual");
    const directRoute = element("article", "presentation-completed-route");
    directRoute.append(
      element("span", "presentation-route-label", "COMMON DIRECT ROUTE"),
      hierarchyNode("Company", "Parent legal entity", "account-company"),
      element("span", "presentation-flow-arrow", "↓"),
      hierarchyNode("Store", "Services and activity", "account-store")
    );
    const groupedRoute = element("article", "presentation-completed-route");
    groupedRoute.append(
      element("span", "presentation-route-label", "OPTIONAL STORE GROUP ROUTE"),
      hierarchyNode("Company", "Parent legal entity", "account-company"),
      element("span", "presentation-flow-arrow", "↓"),
      hierarchyNode("Store Group", "Organizational layer", "account-group"),
      element("span", "presentation-flow-arrow", "↓"),
      hierarchyNode("Store", "Services and activity", "account-store")
    );
    visual.append(directRoute, groupedRoute);
    return visual;
  }

  function buildTestStoreVisual() {
    const visual = element("div", "presentation-visual presentation-test-store-visual");
    const current = element("article", "presentation-test-store-card presentation-test-store-current");
    current.append(
      element("span", "presentation-route-label", "AVAILABLE INTERNALLY"),
      element("h4", "", "Integration testing"),
      element("p", "", "Online setup and simulated test transactions; no live customer payments.")
    );
    const future = element("article", "presentation-test-store-card presentation-test-store-future");
    future.append(
      element("span", "presentation-route-label", "NOT CUSTOMER SELF-SERVICE"),
      element("h4", "", "Customer-managed setup"),
      element("p", "", "Customer-facing Test Store creation and management have not been made available.")
    );
    visual.append(current, future);
    return visual;
  }

  function buildAccountAccessVisual() {
    const visual = element("div", "presentation-visual presentation-account-access-visual");
    [
      ["Corporation", "Potential scope: the Corporation and lower account levels", "account-corporation"],
      ["Company", "Potential scope: that Company and its Store Groups and Stores", "account-company"],
      ["Store Group", "Potential scope: that Store Group and its Stores", "account-group"],
      ["Store", "Potential scope: that Store", "account-store"]
    ].forEach(([title, scope, variant]) => {
      const row = element("article", `presentation-account-access-row ${variant}`);
      row.append(element("strong", "", title), element("span", "", scope));
      visual.append(row);
    });
    visual.append(element("p", "presentation-example-note", "Actual access depends on assigned roles and permissions."));
    return visual;
  }

  const visualBuilders = {
    context: buildContextVisual,
    hierarchy: buildHierarchyVisual,
    creation: buildCreationVisual,
    channels: buildChannelsVisual,
    examples: buildExamplesVisual,
    accountRoles: buildAccountRolesVisual,
    corporation: buildCorporationVisual,
    company: buildCompanyVisual,
    directStoreRoute: buildDirectStoreRouteVisual,
    groupStoreRoute: buildGroupStoreRouteVisual,
    completedRoutes: buildCompletedRoutesVisual,
    testStore: buildTestStoreVisual,
    accountAccess: buildAccountAccessVisual
  };

  function renderSlide(index) {
    const slide = activeSlides[index];
    const content = element("article", "presentation-slide-content");
    content.tabIndex = -1;
    const heading = element("header", "presentation-slide-heading");
    heading.append(element("span", "presentation-slide-source", slide.source), element("h3", "", slide.title), element("p", "", slide.context));
    const takeaway = element("p", "presentation-takeaway", slide.takeaway);
    content.append(heading, visualBuilders[slide.visual](), takeaway);
    slideStage.replaceChildren(content);
    source.textContent = slide.source;
    slideCount.textContent = `Slide ${index + 1} of ${activeSlides.length}`;
    progressFill.style.width = `${((index + 1) / activeSlides.length) * 100}%`;
    previousButton.disabled = index === 0;
    nextButton.textContent = index === activeSlides.length - 1 ? "Finish" : "Next";
    requestAnimationFrame(() => content.classList.add("is-visible"));
  }

  function startPresentation(selection) {
    if (selection.length === 0) {
      validation.textContent = "Select at least one slide to continue.";
      return;
    }
    activeSlides = selection;
    activeIndex = 0;
    validation.textContent = "";
    setup.hidden = true;
    player.hidden = false;
    renderSlide(activeIndex);
    slideStage.querySelector(".presentation-slide-content").focus();
  }

  function goToSlide(index) {
    if (index >= activeSlides.length) {
      player.hidden = true;
      setup.hidden = false;
      document.getElementById("close-presentation").focus();
      return;
    }
    activeIndex = Math.max(0, index);
    renderSlide(activeIndex);
  }

  function renderSlideOptions() {
    outline.replaceChildren();
    slideOptions.replaceChildren();
    activeDeck.slides.forEach((slide, index) => {
      outline.append(element("li", "", slide.title));
      const label = element("label", "presentation-option");
      const checkbox = element("input", "", "");
      checkbox.type = "checkbox";
      checkbox.value = String(index);
      checkbox.checked = true;
      const copy = element("span", "presentation-option-copy");
      copy.append(element("strong", "", slide.title), element("small", "", slide.source));
      label.append(checkbox, copy);
      slideOptions.append(label);
    });
  }

  function openPresentation(deck) {
    activeDeck = deck;
    activeSlides = deck.slides;
    presentationTitle.textContent = deck.title;
    presentationIntro.textContent = deck.intro;
    recommendedTitle.textContent = deck.recommendedTitle;
    recommendedDescription.textContent = deck.recommendedDescription;
    renderSlideOptions();
    previouslyFocused = document.activeElement;
    setup.hidden = false;
    player.hidden = true;
    validation.textContent = "";
    dialog.showModal();
    document.getElementById("start-recommended").focus();
  }

  hierarchyOpenButton?.addEventListener("click", () => openPresentation({
    title: "Customer hierarchy",
    intro: "A concise story from the purpose of the model to account setup and Store services.",
    recommendedTitle: "Tell the complete story",
    recommendedDescription: "All prepared slides in a clear sequence, designed for a short introduction.",
    slides: hierarchySlides
  }));
  accountsOpenButton?.addEventListener("click", () => openPresentation({
    title: "Customer accounts",
    intro: "A practical introduction to what each account represents, how accounts relate, and where services and access fit.",
    recommendedTitle: "Introduce the account model",
    recommendedDescription: "A recommended sequence covering account roles, setup, Store services, Test Stores and access.",
    slides: accountSlides
  }));

  const closePresentation = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    dialog.close();
  };
  document.getElementById("close-presentation").addEventListener("click", closePresentation);
  dialog.addEventListener("close", () => previouslyFocused?.focus());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) closePresentation();
  });

  document.getElementById("start-recommended").addEventListener("click", () => startPresentation(activeDeck.slides));
  document.getElementById("custom-presentation-form").addEventListener("submit", event => {
    event.preventDefault();
    const selection = Array.from(slideOptions.querySelectorAll("input:checked"))
      .map(input => activeDeck.slides[Number(input.value)]);
    startPresentation(selection);
  });

  previousButton.addEventListener("click", () => goToSlide(activeIndex - 1));
  nextButton.addEventListener("click", () => goToSlide(activeIndex + 1));
  document.getElementById("presentation-back-to-setup").addEventListener("click", () => {
    player.hidden = true;
    setup.hidden = false;
    document.getElementById("start-recommended").focus();
  });
  fullscreenButton.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        fullscreenButton.textContent = "Enter fullscreen";
      } else {
        await dialog.querySelector(".presentation-shell").requestFullscreen();
        fullscreenButton.textContent = "Exit fullscreen";
      }
      playerStatus.textContent = "";
    } catch (error) {
      playerStatus.textContent = `Fullscreen is unavailable: ${error.message}`;
    }
  });

  document.addEventListener("keydown", event => {
    if (!dialog.open || player.hidden || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToSlide(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide(activeIndex - 1);
    }
  });

  document.addEventListener("fullscreenchange", () => {
    fullscreenButton.textContent = document.fullscreenElement
      ? "Exit fullscreen"
      : "Enter fullscreen";
  });
})();
