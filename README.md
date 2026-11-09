# Teable Beautification — Mist & Stone Theme

A Teable beautification skin for custom dashboards: muted liquid glass, light and dark themes, animated mesh backgrounds, and matching Authentik sign-in styling.

Teable 美化主题 / 皮肤：低饱和度配色、毛玻璃、深浅色切换与动态渐变背景。适用于自定义 Teable 仪表盘；并非覆盖所有原生 Teable 页面的一键插件。

## Contents

- `mist-stone.css`: public-site surfaces, mesh background, responsive motion and image framing.
- `appearance.js`: Light/Dark/System selector and optional background motion. Preferences stay in local storage per origin. No network requests or tracking.
- `dashboard.css`: adapter for the custom Tailwind-based Teable dashboards.
- `authentik.css`: Authentik branding CSS adapter.
- `tokens.json`: source palette and semantic roles.

## Quick start

```html
<head>
  <!-- after the application's own styles -->
  <link rel="stylesheet" href="mist-stone.css">
  <link rel="stylesheet" href="dashboard.css">   <!-- custom Teable dashboards -->
  <script src="appearance.js"></script>
</head>
<body>
  <div data-appearance-control></div>            <!-- Light / Dark / System switch -->
  ...
</body>
```

For Authentik, paste `authentik.css` into the brand's custom CSS (System → Brands). `tokens.json` holds the palette if you want to reuse it elsewhere.

Load the stylesheet after application styles. Load appearance.js in the head; add a `data-appearance-control` container where controls should appear. Without a container, the script adds a standalone toolbar after page load.

Motion respects reduced-motion settings and pauses while the document is hidden. Reduced-transparency and high-contrast preferences use solid panels. Product illustrations and technical diagrams should retain original color information.

The dashboard adapter targets custom dashboard markup, not every native Teable screen. Test selectors against your own version. Authentik uses shadow DOM and requires integration through its branding/template facilities; this repository does not change authentication flows, accounts, proxy rules, or permissions.

Before deployment, back up current styles and test both themes at desktop and mobile widths. This package contains no server addresses, deployment credentials, business data, or product image files.

Current limitations: docking/undocking product animation is not included; it requires separate physically aligned product and dock/case assets. Native Teable grid theming needs a separate version-specific adapter.

## License

GPL-3.0. See [LICENSE](LICENSE).
