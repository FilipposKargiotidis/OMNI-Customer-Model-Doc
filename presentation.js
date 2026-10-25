(() => {
  const dialog = document.getElementById("hierarchy-presentation");
  const openButton = document.getElementById("open-hierarchy-presentation");
  if (!dialog || !openButton) return;

  const slides = [
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

  const setup = document.getElementById("presentation-setup");
  const player = document.getElementById("presentation-player");
  const outline = document.getElementById("recommended-outline");
  const slideOptions = document.getElementById("presentation-slide-options");
  const slideStage = document.getElementById("presentation-slide-stage");
  const source = document.getElementById("presentation-source");
  const playerStatus = document.getElementById("presentation-player-status");
  const slideCount = document.getElementById("presentation-slide-count");
  const progressFill = document.getElementById("presentation-progress-fill");
  const previousButton = document.getElementById("presentation-previous");
  const nextButton = document.getElementById("presentation-next");
  const fullscreenButton = document.getElementById("presentation-fullscreen");
  const validation = document.getElementById("presentation-validation");
  let activeSlides = slides;
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

  const visualBuilders = {
    context: buildContextVisual,
    hierarchy: buildHierarchyVisual,
    creation: buildCreationVisual,
    channels: buildChannelsVisual,
    examples: buildExamplesVisual
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

  slides.forEach((slide, index) => {
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

  openButton.addEventListener("click", () => {
    previouslyFocused = document.activeElement;
    setup.hidden = false;
    player.hidden = true;
    dialog.showModal();
    document.getElementById("start-recommended").focus();
  });

  const closePresentation = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    dialog.close();
  };
  document.getElementById("close-presentation").addEventListener("click", closePresentation);
  dialog.addEventListener("close", () => previouslyFocused?.focus());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) closePresentation();
  });

  document.getElementById("start-recommended").addEventListener("click", () => startPresentation(slides));
  document.getElementById("custom-presentation-form").addEventListener("submit", event => {
    event.preventDefault();
    const selection = Array.from(slideOptions.querySelectorAll("input:checked"))
      .map(input => slides[Number(input.value)]);
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
