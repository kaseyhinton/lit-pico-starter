# Lit + Pico Starter

This project aims to be portable, dependency‑light, and self‑contained so it can run for decades with minimal maintenance.

## Running
- Open `index.html` directly in a browser (file://) or serve statically.
- Optional: start a local server: `python -m http.server 3020` and visit `http://localhost:3020`.

## Design principles
- No external runtime dependencies; all assets vendored in `dependencies/`.
- Works offline; no network required after cloning.
- Progressive enhancement with `<noscript>` fallback.
- Security headers (CSP) added for static hosting.

## Vendored assets
- `dependencies/pico.min.css` (Pico CSS)
- `dependencies/lit-html.js` (Lit runtime) 
- `dependencies/tabler-icons.css` (Tabler Icons)
