# Lit + Pico Starter

This project aims to be portable, dependency‑light, and self‑contained so it can run for decades with minimal maintenance.

## Running
- start a local server

```bash
# Python
python -m http.server 3000
```

```bash
# Bun
bunx serve
```

## Design principles
- No external runtime dependencies; all assets vendored in `dependencies/`.

## Vendored assets
- `dependencies/pico.min.css` (Pico CSS)
- `dependencies/lit-html.js` (Lit runtime) 
