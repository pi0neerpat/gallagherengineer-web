# Personal Website — Implementation Plan

## Source
Claude Design handoff bundle for `Personal Website.html`. Two variations shipped in the prototype (Terminal, Playful) plus a tweaks panel that only the design tool needs.

## Scope (confirmed with user)
- **Stack:** plain static HTML/CSS/JS. No React, no Babel-in-browser, no build step.
- **Host:** GitHub Pages (project or user site — `.nojekyll` so underscore-prefixed assets survive).
- **Variations:** Terminal only. Drop Playful and the variation switcher.
- **Authoring chrome:** drop stage switch, tweaks panel, density + hero-variant controls. Bake in defaults: density=`roomy`, heroVariant=`0` (`whoami` / `fullstack_engineer`).

## Files produced
- `index.html` — static Terminal markup with all sections pre-rendered.
- `styles.css` — Terminal CSS, pared of tweak-panel/stage-switch rules.
- `script.js` — ~80 lines of vanilla JS: clock, typing effect, sticky-nav scrolled class, IntersectionObserver reveal, contact form submit-to-mailto fallback.
- `assets/me.jpg` — portrait from the bundle.
- `.nojekyll` — let GitHub Pages serve files verbatim.
- `404.html` — simple fallback pointing back to `/`.

## Things intentionally dropped
- React / ReactDOM / Babel CDN scripts (prototype-only).
- `Playful` variation + `playful.css`/`playful.jsx`.
- `postMessage` protocol to `window.parent` (design-tool iframe hook).
- Tweaks panel + `localStorage` persisted state.
- Density scale (`--density`) — baked at `1.18` (roomy).

## Conversions from JSX → static HTML
- **Project previews:** the dynamic SVG sine-wave bars + icon lists are pre-computed in markup (40 static spans with precomputed heights/opacities for Scribular, inlined SVGs for the menu-bar preview).
- **Platform pills:** `<img>` tags pointing at `cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/{slug}.svg` — same as the prototype, still external but cached.
- **Contact form:** no backend. `mailto:hello@gallagherengineer.com` action so it actually works on GH Pages.

## Deploy
1. Push to `main`.
2. GitHub → Settings → Pages → Source: `Deploy from branch` → `main` / root.
3. Optional custom domain: add `CNAME` file with `gallagherengineer.com`, configure DNS.
