# Dispatch for Milestone 1 Worker (worker_m1)

## 2026-09-30T17:01:00Z
- **Role**: Design System & Theme Worker
- **Working Directory**: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\worker_m1`
- **Project Root**: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany`
- **Authoritative Request**: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\ORIGINAL_REQUEST.md`
- **Project Specification**: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\PROJECT.md`
- **Architecture & Design Blueprint**: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\explorer_survey_3\survey_architecture_report.md`
- **Recommended Skill**: `C:\Users\mohmad\.gemini\config\skills\a11y-audit\SKILL.md`

### MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

### File Ownership (Exclusive to worker_m1):
- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/layouts/BaseLayout.astro`
- `src/components/common/ThemeToggle.astro`
- `public/fonts/` (and any local font configuration)

### Tasks for Milestone 1:
1. **Design Tokens Alignment**:
   - Update `src/styles/tokens.css` so both Light and Dark themes strictly adhere to the prompt's exact hex values:
     - **Light Theme**:
       - Primary: `#1E3A2B` (Dark Forest Green)
       - Accent: `#E07A5F` (Warm Terracotta)
       - Secondary: `#F4A261` (Soft Mustard)
       - Background: `#FAEDCD` (Warm Oat)
       - Primary Text: `#1C1C1E` (Dark Charcoal Gray)
       - Link Color / Accent: `#2A9D8F` (Deep Teal)
       - Inline Link Text: Add `--link-text: #1D7368` (or compliant teal/green achieving ≥4.5:1 AA contrast against `#FAEDCD`) for inline text links, while keeping `--color-link: #2A9D8F` for decorative borders and badges.
     - **Dark Theme**:
       - Background Canvas: `#0E1912`
       - Background Surface: `#16261C`
       - Card Surface: `#1C2E23`
       - Primary Text: `#FAF3E0`
       - Accent: `#E07A5F`
       - Mustard / Secondary: `#F4A261`
       - Link Color: `#52B788`
2. **Typography & Font Preloading**:
   - Remove any external Google Fonts CDN `<link>` tags in `BaseLayout.astro`.
   - Ensure `@fontsource-variable/readex-pro` is imported or configured locally.
   - Place local `Aref Ruqaa` font files into `public/fonts/` and define `@font-face` in `global.css` with `font-display: swap` and preload `<link rel="preload">` in `BaseLayout.astro` to eliminate layout shift (CLS = 0).
3. **Theme Toggle Component**:
   - Verify `ThemeToggle.astro` correctly toggles `data-theme` attribute between `light` and `dark` on `document.documentElement`.
   - Ensure the theme is persisted in `localStorage` and respects `prefers-color-scheme`.
   - Prevent flash of incorrect theme (FOIT/FOUC) via inline blocking script in `<head>`.
4. **Build and Verification**:
   - Run `npx astro build` to confirm zero compilation errors.
   - Run contrast check or verify WCAG 2.2 AA contrast across all token combinations.
5. **Report**:
   - Write your implementation details, build results, and verification to `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\worker_m1\handoff.md`.
