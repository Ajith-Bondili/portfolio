# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev          # Vite dev server at http://localhost:5173
npm run build        # tsc -b && vite build → outputs to dist/
npm run lint         # ESLint (flat config)
npm run preview      # Preview production build locally
```

Before opening a PR: `npm run lint && npm run build`

No test suite exists — verify UI changes manually (keyboard nav, theme toggle, CLI commands).

## Architecture

**Stack:** React 19 + TypeScript + Vite 7 + Tailwind CSS v4. Deployed on Vercel (static + serverless functions).

### Window System

The app is a TUI-style bento grid of 6 windows managed in `src/App.tsx`:

- **me** → **music** → **experience** → **coding** → **cli** → **projects** (cycles via Left/Right arrows)
- Each window can be **selected** (highlighted) or **expanded** (fullscreen overlay via Enter/Escape)
- `WindowShell` (`src/components/windows/WindowShell.tsx`) wraps every window with terminal chrome (title bar, close/expand buttons)

All top-level state lives in App.tsx via useState/useRef — no state management library.

### Data Layer

- **Content** lives in `src/data/info.ts` — `personalInfo`, `experiencesData`, `projectsData`, `asciiList`. Components import from here; never hardcode copy in components.
- **Runtime data** fetched on mount in App.tsx via `/api/*` endpoints:
  - `/api/github-activity` (6hr cache) — GitHub contributions, streaks
  - `/api/leetcode` (1hr cache) — solved counts, submission calendar
  - `/api/recent-tracks` (5min cache, polls every 60s) — Spotify tracks
- **CLI** (`CliWindow`) handles local commands (about, experience, skills, etc.), slash commands (/help, /theme, /clear), and falls back to `POST /api/ask` (Gemini via OpenAI-compatible endpoint)

### Serverless API (`api/`)

Handlers are plain JS files in `api/` (Vercel Functions), not in `src/`. They use in-memory Map() caching with TTL. Spotify integration uses a custom token manager with rate-limit tracking (`api/token-manager.js`, `api/rate-limit-manager.js`).

### Keyboard Navigation

Keyboard-first design — all navigation works without mouse:
- Left/Right: cycle windows
- Up/Down: navigate items within windows (experiences, projects, tracks, GitHub/LeetCode toggle)
- Enter: expand window; Escape: close
- Tab in CLI: autocomplete suggestions

### Theme System

CSS variables in `src/index.css` (`.theme-dark` / `.theme-light`). Persisted to localStorage, syncs with system preference on first load. Key variables: `--bg`, `--surface`, `--border`, `--text`, `--muted`, `--accent`, `--heat-0` through `--heat-4`.

### Layout

`.portfolio-grid` in `src/index.css` — CSS Grid with named template areas. Single column on mobile, 4-column bento on desktop (1024px+). The grid layout and many component sizes use hardcoded values that need responsive breakpoints (tracked in TODO.md section 9).

## Code Style

- 2-space indent, semicolons, double quotes
- PascalCase for components/types, camelCase for variables/functions
- Keep API handlers small and defensive with clear status codes
- Commit style: concise imperative subjects (e.g., "Refine workspace layout and window navigation")

## Environment Variables

Required in `.env`:
```
GEMINI_API_KEY=...
```

Optional (Spotify):
```
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
SPOTIFY_REDIRECT_URI=https://ajithbondili.com/api/callback
```

Optional (API defaults — also configurable via `personalInfo` in info.ts):
```
GITHUB_USERNAME=...
LEETCODE_USERNAME=...
```
