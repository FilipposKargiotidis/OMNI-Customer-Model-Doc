# Site Features and Maintenance

This guide explains the main interactive features, where their implementation lives, and how to maintain them. The site is static HTML, CSS, and JavaScript; it has no build step or runtime package dependencies.

## Shared site features

Every topic page includes `site.js` and `styles.css`.

- **Responsive navigation:** `site.js` initializes the mobile menu button, sidebar overlay, and keyboard Escape behavior. It also marks the current page in the sidebar. The mobile header uses a compact copy of the sidebar logotype. Layout and responsive rules are in `styles.css`.
- **Sidebar topic search:** Search filters sidebar links by their visible labels and the page-specific keywords in `pageSearchTerms` in `site.js`. Add or update keywords there when a page uses terminology people may search for that is not in its navigation label.
- **Copy-page-link control:** `site.js` adds a copy-link button to each page's breadcrumb action area. It uses the Clipboard API when available and a textarea fallback otherwise. Each page should have a `nav[aria-label="Breadcrumb"]`; the script creates the shared action container when one is not already in the HTML.
- **Responsive presentation and documentation styling:** Shared components, diagrams, layout, and breakpoints are styled in `styles.css`. Keep page-specific structure in the relevant HTML page unless the styling is shared.

## Customer Hierarchy presentation

The presentation pilot is available from the **Present this section** button on `customer-hierarchy.html`. Its parts are split by responsibility:

- `customer-hierarchy.html` contains the dialog, setup screen, recommended outline, custom slide selection form, player controls, and script reference.
- `presentation.js` contains the ordered slide content, visual builders, slide rendering, and presentation interactions.
- `styles.css` contains the dialog, slide, visual, animation, and responsive presentation styles.

### Slide structure

The recommended deck contains five slides:

1. Why a shared customer model matters.
2. Where account types sit in the hierarchy.
3. Standard and specialist account-creation paths.
4. Online and In-store channels and their services.
5. Illustrative Store setups.

Each slide has a title, explanatory context, a takeaway, a visual type, and a source label. This makes a selected slide understandable on its own while still allowing the recommended sequence to tell a connected story. The deck is intentionally an abstract introduction; it does not replace the detailed topic pages.

### How a slide is rendered

In `presentation.js`, the `slides` array is the source of slide order and text. Each slide's `visual` value maps to a function in `visualBuilders`. Those functions create their markup using DOM elements and `textContent`; `renderSlide` combines the slide heading, visual, takeaway, source, and progress indicators.

To add or revise a slide:

1. Update or add its content in the `slides` array.
2. Reuse an existing visual type when it communicates the idea clearly. If a new visual is needed, add a builder function and register it in `visualBuilders`.
3. Keep the slide clear when shown by itself: include enough context and a useful takeaway, not just a label that depends on the previous slide.
4. Update any related outline or presentation setup text in `customer-hierarchy.html` if the deck's purpose or controls change.
5. Preview both the recommended deck and a custom selection, including narrow screens and reduced-motion settings.

The outline and checkboxes are generated from `slides`. Custom selection follows the deck order, regardless of the order in which boxes are checked.

### Presentation behavior

- Users can start the recommended deck or choose a non-empty custom selection.
- Previous/Next buttons and Left/Right arrow keys navigate slides. **Finish** returns to the setup screen.
- **Choose slides** returns to setup without closing the dialog.
- Fullscreen uses the browser Fullscreen API and displays an accessible status if fullscreen is unavailable.
- The dialog can be closed from its close button, by clicking its backdrop, or using the browser's dialog keyboard behavior. Focus returns to the element that opened it.
- The visual entrance animation respects the user's reduced-motion preference.

When changing the dialog controls or their IDs, update the matching lookups and event handlers in `presentation.js`. Keep the dialog markup, script, and styles in sync.

## Local review and publishing

Open `index.html` directly in a browser or serve the repository with a local static web server. For the presentation, open `customer-hierarchy.html` and test the recommended and custom flows. Review desktop and mobile layouts before publishing.

Pushing to `main` triggers the GitHub Pages workflow in `.github/workflows/pages.yml`. The workflow publishes the repository files as a static site.
