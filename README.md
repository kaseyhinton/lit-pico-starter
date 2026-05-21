# Native HTML + Pico Starter

A single-file app starter that is portable, dependency-free, and self-contained — designed to run for decades with minimal maintenance.

## Design Principles

- **Single file** — the entire app lives in `index.html`. No build step, no bundler, no node_modules.
- **No framework** — vanilla JS only. State, routing, and rendering are implemented in ~20 lines of plain JavaScript.
- **File-portable** — works when opened directly from the filesystem (`file://`) or served from any static host. Hash-based routing (`#/route`) ensures links never break outside a server context.
- **Minimal external dependencies** — only [Pico CSS](https://picocss.com/) loaded from a CDN for styling. Nothing else.
- **Persistent state** — app state is stored in `localStorage` and rehydrated on page load, surviving refreshes without a backend.
- **Light/dark theme** — respects user preference via Pico's `data-theme` attribute, toggled and persisted in state.

## Architecture

Everything runs inside a single `<script>` block, organized into these sections:

| Section | Purpose |
|---|---|
| **Assets** | Inline SVG icons (sun, moon) stored as template literal strings |
| **State** | A plain JS object hydrated from `localStorage`; `setState(partial)` merges changes, persists to storage, and triggers a re-render |
| **Routing** | Hash-based — `getRoute()` reads `location.hash` and `hashchange` events drive view switches; works with `file://` and any static host |
| **Views** | Pure functions that return HTML strings (`navbar`, `homeView`, `accountView`) |
| **Rendering** | `rerender()` sets `data-theme` and replaces `document.body.innerHTML` with the current view |

### Adding a new route

1. Add a nav link: `<a href="#/my-route">Label</a>`
2. Write a view function: `const myView = () => \`<main>...</main>\``
3. Add a branch in `rerender()`: `state.route === "my-route" ? myView() : ...`

## Running

Open `index.html` directly in your browser — no server required. Or serve it:

```bash
# Python
python -m http.server 3000
```

```bash
# Bun
bunx serve
```

