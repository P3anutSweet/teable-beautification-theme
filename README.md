# Mist & Stone skin

Low-saturation light/dark glass styling for static product sites, custom Teable dashboards, and Authentik sign-in.

## Contents

- `mist-stone.css`: public-site surfaces, mesh background, responsive motion and image framing.
- `appearance.js`: Light/Dark/System selector and optional background motion. Preferences stay in local storage per origin. No network requests or tracking.
- `dashboard.css`: adapter for the custom Tailwind-based Teable dashboards.
- `authentik.css`: Authentik branding CSS adapter.
- `tokens.json`: source palette and semantic roles.

Load the stylesheet after application styles. Load appearance.js in the head; add a `data-appearance-control` container where controls should appear. Without a container, the script adds a standalone toolbar after page load.

Motion respects reduced-motion settings and pauses while the document is hidden. Reduced-transparency and high-contrast preferences use solid panels. Product illustrations and technical diagrams should retain original color information.

The dashboard adapter targets custom dashboard markup, not every native Teable screen. Test selectors against your own version. Authentik uses shadow DOM and requires integration through its branding/template facilities; this repository does not change authentication flows, accounts, proxy rules, or permissions.

Before deployment, back up current styles and test both themes at desktop and mobile widths. This package contains no server addresses, deployment credentials, business data, or product image files.

Current limitations: docking/undocking product animation is not included; it requires separate physically aligned product and dock/case assets. Native Teable grid theming needs a separate version-specific adapter.
