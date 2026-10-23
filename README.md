# OMNI Customer Model Documentation

A static documentation site describing the OMNI Customer Model: how customer accounts, services, Partner relationships, and user access fit together.

The site is designed as a practical reference for understanding the model and navigating its account and access concepts. It uses visual diagrams, examples, and capability descriptions to make the relationships easier to follow.

**Live site:** [OMNI Customer Model Documentation](https://filipposkargiotidis.github.io/OMNI-Customer-Model-Doc/)

## What’s covered

- **Customer hierarchy** — Corporation, Company, optional Store Group, and Store accounts, and how they relate.
- **Services** — Online and in-store payment services, including acquiring, settlements, invoicing, payment methods, and terminal management.
- **Partner accounts** — Partner Agreements, Sales Portal, and how Partner access relates to customer accounts.
- **Partner subtypes** — The currently created Executive subtype, alongside other subtype concepts that are still being shaped.
- **Access groups** — EcomCorp’s cross-Company grouping of online Stores, including its transaction access and current reporting, invoice, and user-administration limitations.
- **Access management** — User roles, permission concepts, and access through the customer hierarchy.

## Important note about access and capabilities

This documentation distinguishes between capabilities described as currently available and concepts that are still being developed. In particular, the Partner Access model and several Partner subtype ideas are not presented as confirmed or implemented permission rules.

Actual access can depend on account configuration, assigned roles, subtypes, and access groups. Use the relevant product configuration and approved access rules to confirm permissions before relying on them.

## Running the site locally

This is a static HTML, CSS, and JavaScript site. No package installation or build step is required.

1. Clone or download the repository.
2. Open `index.html` in a browser.

For a more representative local experience, you can serve the repository directory with any basic static web server.

## Deployment

The site is published with GitHub Pages. A GitHub Actions workflow deploys the repository contents when changes are pushed to the `main` branch. The workflow can also be started manually from the repository’s **Actions** tab.

## Project structure

- `index.html` — Documentation overview and navigation
- `*.html` — Individual topic pages
- `styles.css` — Shared layout and visual styles
- `site.js` — Shared navigation and search behavior
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow

## Contributing

When updating the documentation:

- Keep navigation links consistent across pages.
- Clearly label concepts that are not yet implemented or confirmed.
- Validate local links and review the pages in a browser before publishing.
- Push changes to `main` to trigger the GitHub Pages deployment.
