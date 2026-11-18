# Site Features and Maintenance

This guide explains the main interactive features, where their implementation lives, and how to maintain them. The site is static HTML, CSS, and JavaScript; it has no build step or runtime package dependencies.

## Shared site features

Every topic page includes `site.js` and `styles.css`.

- **Responsive navigation:** `site.js` initializes the mobile menu button, sidebar overlay, and keyboard Escape behavior. It also marks the current page in the sidebar. The mobile header uses a compact copy of the sidebar logotype. Layout and responsive rules are in `styles.css`.
- **Sidebar topic search:** Search filters sidebar links by their visible labels and the page-specific keywords in `pageSearchTerms` in `site.js`. Add or update keywords there when a page uses terminology people may search for that is not in its navigation label.
- **Copy-page-link control:** `site.js` adds a copy-link button to each page's breadcrumb action area. It uses the Clipboard API when available and a textarea fallback otherwise. Each page should have a `nav[aria-label="Breadcrumb"]`; the script creates the shared action container when one is not already in the HTML.
- **Responsive presentation and documentation styling:** Shared components, diagrams, layout, and breakpoints are styled in `styles.css`. Keep page-specific structure in the relevant HTML page unless the styling is shared.

## Customer presentations

The Customer Hierarchy presentation is available on `customer-hierarchy.html`. The Customer Accounts presentation is available from the Corporation page under Customer Accounts. Both use the same presentation setup and player behavior:

- `customer-hierarchy.html` contains the dialog, setup screen, recommended outline, custom slide selection form, player controls, and script reference.
- `presentation.js` contains both ordered slide decks, visual builders, slide rendering, and presentation interactions.
- `styles.css` contains the dialog, slide, visual, animation, and responsive presentation styles.

The Customer Hierarchy deck explains why the model matters, how accounts relate, how setup works, and how Store channels and services fit together. The Customer Accounts deck focuses on the roles of Corporation, Company, optional Store Group, Store and Test Store, along with setup and access scope.

### Slide structure

The recommended outline is generated from the currently selected deck. Both presentations also allow users to choose a non-empty custom slide selection.

Each slide has a title, explanatory context, a takeaway, a visual type, and a source label. This makes a selected slide understandable on its own while still allowing the recommended sequence to tell a connected story. The decks are introductions; they do not replace the detailed topic pages.

### How a slide is rendered

In `presentation.js`, the hierarchy and account deck arrays are the source of slide order and text. Each slide's `visual` value maps to a function in `visualBuilders`. Those functions create their markup using DOM elements and `textContent`; `renderSlide` combines the slide heading, visual, takeaway, source, and progress indicators.

To add or revise a slide:

1. Update or add its content in the appropriate deck array.
2. Reuse an existing visual type when it communicates the idea clearly. If a new visual is needed, add a builder function and register it in `visualBuilders`.
3. Keep the slide clear when shown by itself: include enough context and a useful takeaway, not just a label that depends on the previous slide.
4. Update any related outline or presentation setup text in `customer-hierarchy.html` if the deck's purpose or controls change.
5. Preview both the recommended deck and a custom selection, including narrow screens and reduced-motion settings.

The outline and checkboxes are generated from the selected deck. Custom selection follows the deck order, regardless of the order in which boxes are checked.

### Presentation behavior

- Users can start the recommended deck or choose a non-empty custom selection.
- Previous/Next buttons and Left/Right arrow keys navigate slides. **Finish** returns to the setup screen.
- **Choose slides** returns to setup without closing the dialog.
- Fullscreen uses the browser Fullscreen API and displays an accessible status if fullscreen is unavailable.
- The dialog can be closed from its close button, by clicking its backdrop, or using the browser's dialog keyboard behavior. Focus returns to the element that opened it.
- The visual entrance animation respects the user's reduced-motion preference.

When changing the dialog controls or their IDs, update the matching lookups and event handlers in `presentation.js`. Keep the dialog markup, script, and styles in sync.

## Local review and publishing

Open `index.html` directly in a browser or serve the repository with a local static web server. Open `customer-hierarchy.html` and `corporation.html` to test the recommended and custom flows for their respective decks, and verify that the design-guide secondary and icon buttons render correctly. Review desktop and mobile layouts before publishing.

Pushing to `main` triggers the GitHub Pages workflow in `.github/workflows/pages.yml`. The workflow publishes the repository files as a static site.
