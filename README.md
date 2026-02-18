# Minimal TUI Portfolio

A keyboard-first, minimalist TUI-style portfolio built with React + TypeScript + Vite.

## Features

- Clean bento layout with terminal-style windows
- Core sections: `me`, `experience`, `projects`, `coding`, `music`, `cli`
- Subtle dither background (dark + light theme)
- Coding panel toggle: GitHub contribution heatmap + LeetCode stats
- Compact AI CLI (`/api/ask`)
- Spotify now-playing mini widget (`/api/now-playing`)

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Customize Content

All profile content lives in `src/data/info.ts`:

- `personalInfo`
- `experiencesData`
- `projectsData`
- `asciiList`

### School Logo

By default the `me` window uses `public/school_logo_dither.svg`.
Replace this with your own dithered PNG/SVG and update:

```ts
personalInfo.school.logoDitherPath
```

## API Endpoints

### `GET /api/github-activity?username=<github_username>`

Returns:

- `username`
- `totalContributions`
- `currentStreak`
- `longestStreak`
- `activeDays`
- `avgPerActiveDay`
- `last7Total`, `last30Total`
- `bestDayCount`, `bestDayDate`
- `maxLevelStreak`
- `days: { date, count, level }[]`
- `cached`, `warning`, `fetchedAt`

Cache TTL: 6 hours.

### `GET /api/leetcode?username=<leetcode_username>`

Returns solved counts + submission calendar, plus:

- `acceptanceRate`, `ranking`, `contributionPoints`
- `totalQuestions`, `totalEasy`, `totalMedium`, `totalHard`
- `last7Submissions`, `last14Submissions`
- `activeDays14`, `currentSubmissionStreak`, `bestSubmissionStreak`

Cache TTL: 1 hour.

### `POST /api/ask`

Compact AI response endpoint for the CLI.

Request body:

```json
{
  "messages": [{ "role": "user", "content": "..." }]
}
```

## Environment Variables

Create `.env`:

```env
# AI
GEMINI_API_KEY=your_gemini_api_key

# Optional Spotify integration
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
SPOTIFY_REDIRECT_URI=https://ajithbondili.com/api/callback

# Optional defaults for APIs
GITHUB_USERNAME=your-github-handle
LEETCODE_USERNAME=your-leetcode-handle
```

### Spotify Setup (Domain)

1. Deploy your site so `https://ajithbondili.com` is live.
2. In the Spotify Developer Dashboard app settings, add Redirect URIs:
   - `https://ajithbondili.com/api/callback`
   - `https://www.ajithbondili.com/api/callback` (if you use `www`)
3. In your deployment environment variables, set:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REDIRECT_URI=https://ajithbondili.com/api/callback`
4. Open `https://ajithbondili.com/api/login` once, approve scopes, and copy the `refresh_token` shown on the callback page.
5. Add `SPOTIFY_REFRESH_TOKEN` to env vars and redeploy.
6. Verify:
   - `https://ajithbondili.com/api/now-playing`

## Build & Check

```bash
npm run lint
npm run build
```
