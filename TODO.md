# Portfolio Todo

## 1. CLI fixes
- [x] Make CLI output area scrollable when text exceeds box height (no container growth).
- [x] Improve CLI command behavior/available actions (`help`, suggestions, invalid command UX).
- [x] Improve Gemini response formatting in CLI (line wrapping, spacing, readability).
- [ ] Making the knowledge of it beter like it has my resume, points about me and fun facts in general. a better expereince and more personalized 

## 2. Projects section
- [x] Update `Projects` window with the exact project list to showcase.
- [x] Ensure each project has: title, short description, tech stack, and link(s).

## 3. Experience section
- [x] Update `Experience` window content to accurate/latest roles, dates, and impact.
- [x] Standardize formatting across all entries.

## 4. Me section improvements
- [x] Make Enter behavior in `Me` section feel better (clear interaction + improved text).
- [x] Center name/header text properly.
- [x] Improve visual styling for name/introduction (typography, spacing, emphasis).

## 5. Music widget keyboard UX
- [x] Make `Up/Down` arrow navigation highlight the Play button.
- [x] Allow `Enter` (or expected key) to trigger play when Play button is focused.

## 6. ASCII/background art
- [x] Replace current ASCII art with “effecto” computer-style art.

### 14-day strip bugs
- [x] Fix timezone issue: submissions showing on wrong day (e.g. Thursday submission shows as Friday) — likely UTC vs local timezone mismatch in API response parsing
- [x] Fix hover tooltip getting clipped/cutoff by container overflow — make tooltip use `position: fixed` or `z-index` to render above/outside the box


## 9. Mobile responsiveness — remove hardcoded values
### Critical
- [ ] Main grid layout (lines 192-197): 4-column grid needs 910px min — add breakpoints for tablet/mobile
- [ ] Experience/CLI fixed height (lines 204-209): 620px hardcoded — add tablet breakpoint (768-1024px)

### High
- [ ] Horizontal preview cards (lines 565-572): `minmax(250px, 1fr)` too wide for 375px phones
- [ ] Split layout (lines 708-712): only activates at 960px+ — add explicit mobile layout

### Medium
- [ ] Metric chip grid (lines 790-798): always 3 columns — reduce to 2 on mobile
- [ ] Difficulty row (lines 847-851): always 3 columns — same fix
- [ ] LeetCode strip grid (lines 955-959): 7 columns, tiny touch targets on mobile
- [ ] LeetCode month grid (lines 1031-1036): 7 columns — same issue
- [ ] ASCII preview (lines 361-368): max-height 13rem takes half the mobile viewport
- [ ] Terminal window min-height (lines 239-248): 220px is too tall in landscape

### Low
- [ ] CLI suggestions (lines 1294-1298): 2 columns may overflow at 320px
- [ ] Taskbar (lines 1346-1360): no safe-area padding for iPhone notch

# Cool add on
## 8. Stroop test
- [ ]. make mini stroop test game in the bottom bar. 
- [] Add a link to "twitter" in the bottom bar for quick access.