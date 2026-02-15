# Repository Guidelines

## Project Structure & Module Organization
- `src/`: React + TypeScript frontend.
- `src/App.tsx`: top-level state, window selection, keyboard controls, and data fetch wiring.
- `src/components/windows/`: main window modules (`MeWindow`, `ExperienceWindow`, `ProjectsWindow`, `CodingWindow`, `CliWindow`).
- `src/components/widgets/` and `src/components/effects/`: reusable UI pieces.
- `src/data/info.ts`: portfolio content and CLI command metadata.
- `api/`: serverless handlers for runtime features (AI, GitHub, LeetCode, Spotify, auth helpers).
- `public/`: static assets. `dist/`: generated build output.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start local Vite server (`http://localhost:5173`).
- `npm run lint`: run ESLint over source files.
- `npm run build`: run TypeScript build (`tsc -b`) and Vite production build.
- `npm run preview`: preview the production build locally.

Before opening a PR, run: `npm run lint && npm run build`.

## Coding Style & Naming Conventions
- Use 2-space indentation, semicolons, and double quotes to match existing code.
- Components and types use `PascalCase`; variables/functions use `camelCase`.
- Prefer explicit, descriptive names (`selectedWindow`, `githubStatus`).
- Keep user/profile content in `src/data/info.ts` instead of hardcoding copy in components.
- Keep API handlers small and defensive (validate method/body and return clear status codes).

## Testing Guidelines
- There is no dedicated unit test suite yet.
- Required checks: successful `npm run lint` and `npm run build`.
- Manual verification is expected for UI changes.
- Keyboard interactions (`left/right`, `up/down`, `Enter`, `Esc`)
- Theme toggle behavior
- CLI command suggestions and output
- For API edits, manually exercise endpoints (for example `POST /api/ask`) and verify error handling.

## Commit & Pull Request Guidelines
- Follow existing history style: concise, imperative commit subjects (e.g., `Refine workspace layout and window navigation`).
- Keep commits focused to one change area.
- PRs should include what changed and why.
- PRs should list key paths touched (for example `src/App.tsx`, `api/ask.js`).
- Add screenshots or GIFs for UI changes.
- Note any new environment variables or setup steps.

## Security & Configuration Tips
- Keep secrets in `.env` only (`GEMINI_API_KEY`, Spotify credentials, tokens).
- Never commit `.env`, tokens, or secret-bearing logs.
