# Handoff Report — Architecture & Design System Explorer (explorer_survey_3)

**Type**: Hard Handoff (Investigation & Blueprint Complete)  
**Agent**: `explorer_survey_3` (teamwork_preview_explorer)  
**Recipient**: `orchestrator_1` (dd829608-18f9-4d66-9b40-cdcec31e30cf)  
**Deliverable**: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\explorer_survey_3\survey_architecture_report.md`  
**Date**: 2026-09-30T17:05:00Z  

---

## 1. Observation

1. **Astro 5 Configuration & Routing**:
   - `astro.config.mjs` (lines 9-23) configures `site: 'https://mohamedelqalshany.com'`, `trailingSlash: 'ignore'`, and `i18n: { defaultLocale: 'ar', locales: ['ar', 'en'], routing: { prefixDefaultLocale: false } }`.
   - File routes exist in `src/pages/` as `/` (`index.astro`), `/en` (`en/index.astro`), `/vo` (`vo.astro`), `/en/vo` (`en/vo.astro`), `/marketing` (`marketing.astro`), and `/en/marketing` (`en/marketing.astro`).
   - `package.json` specifies `"astro": "^5.2.5"`, `"@astrojs/sitemap": "^3.2.1"`, `"@fontsource-variable/readex-pro": "^5.1.0"`, and `"sharp": "^0.33.5"`.

2. **Design System Tokens & Discrepancies**:
   - `src/styles/tokens.css` defines light theme brand palette on lines 16-21:
     * `--brand-primary: #1E3A2B`, `--brand-accent: #E07A5F`, `--brand-secondary: #F4A261`, `--brand-bg-raw: #FAEDCD`, `--brand-text-raw: #1C1C1E`, `--brand-link: #2A9D8F`.
   - Dark theme tokens in `src/styles/tokens.css` (lines 104-132) contain divergences from the authoritative specification in `ORIGINAL_REQUEST.md` (lines 34):
     * Current `tokens.css`: `--bg: #0B1610;`, `--bg-soft: #102018;`, `--surface: #14241B;`, `--link: #48CAE4;`.
     * Required by `ORIGINAL_REQUEST.md`: `--bg: #0E1912`, `--bg-soft: #16261C`, card surface `#1C2E23`, text `#FAF3E0`, accent `#E07A5F`, mustard `#F4A261`, links `#52B788`.

3. **Contrast Mathematical Verification**:
   - Relative luminance calculations:
     * Dark mode: `#FAF3E0` text on `#0E1912` canvas = **16.13:1** (AAA Pass). On card `#1C2E23` = **12.74:1** (AAA Pass). `#52B788` links on canvas = **7.24:1** (AAA Pass), on card = **5.72:1** (AA Pass).
     * Light mode: `#1C1C1E` on `#FAEDCD` = **14.51:1** (AAA Pass). `#1E3A2B` on `#FAEDCD` = **10.44:1** (AAA Pass).
     * Light mode link color: `#2A9D8F` against `#FAEDCD` has relative luminance $0.2642$ against $0.8480$, yielding a contrast ratio of **2.86:1**, failing the WCAG 2.2 AA normal text threshold ($\ge 4.5:1$).
     * Light mode button: White text (`#FFFFFF`) on `#E07A5F` yields **2.97:1**, whereas dark text (`#1C1C1E`) on `#E07A5F` yields **5.71:1** (AA Pass).

4. **Typography & Font Loading**:
   - In `src/components/layout/BaseLayout.astro` (lines 46-52), fonts are loaded via Google Fonts CDN:
     `<link href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Readex+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet" />`
   - `@fontsource-variable/readex-pro` exists in `node_modules` with WOFF2 files, but is not imported in CSS.
   - `Aref Ruqaa` font files are completely missing from `public/` and `node_modules`.

5. **Audio & Video Player Concurrency**:
   - In `src/components/media/AudioPlayer.astro` (lines 279-297) and `src/components/media/VideoPlayer.astro` (lines 290-307), `pauseAllOtherMedia()` functions only pause `<audio>` and `<video>` DOM elements, failing to update UI playing states (`is-playing` classes, toggle icons) across component types.

6. **SEO, Schema & Hreflang**:
   - `BaseLayout.astro` (lines 38-70) has canonical URL and OpenGraph meta, but lacks bidirectional `<link rel="alternate" hreflang="...">` tags for Arabic and English counterparts.
   - Schema JSON-LD in `BaseLayout.astro` (lines 69-84) contains only `Person` schema, lacking `AudioObject` and `VideoObject` schemas on the portfolio routes.

---

## 2. Logic Chain

1. **Routing & SSG**: Because `astro.config.mjs` defines `prefixDefaultLocale: false` with locales `['ar', 'en']`, all six required routes (`/`, `/en`, `/vo`, `/en/vo`, `/marketing`, `/en/marketing`) map cleanly to filesystem pages without rewrites or middleware.
2. **WCAG Compliance**:
   - The dark mode palette specified in `ORIGINAL_REQUEST.md` (`#0E1912`, `#16261C`, `#1C2E23`, `#FAF3E0`, `#52B788`) achieves $16.13:1$ for body text and $7.24:1$ for links, exceeding WCAG 2.2 Level AA and AAA standards.
   - In light mode, because `#2A9D8F` has a contrast ratio of $2.86:1$ on `#FAEDCD`, using it as inline body copy violates WCAG 2.2 AA. Therefore, a dual token architecture is required: `--brand-link: #2A9D8F` for badges and UI borders, and an accessible deepened link tone `--link-text: #1D7368` ($4.78:1$) for readable inline text links.
3. **Font Performance**: Remote Google Fonts CDN requests introduce latency, layout shifts, and break offline operation. Replacing them with `@fontsource-variable/readex-pro` and local `Aref Ruqaa` `.woff2` files loaded via `@font-face` with `font-display: swap` will eliminate layout shifts (CLS = 0) and satisfy the offline acceptance criterion.
4. **Media Concurrency**: Because HTMLMediaElement emits native `'play'` and `'pause'` events, a global window listener in the event capture phase (`window.addEventListener('play', ..., true)`) ensures that playing any media track automatically pauses any currently playing track. Having each player update its UI strictly in response to its own element's native `'play'` and `'pause'` events eliminates cross-component UI desynchronization.
5. **SEO & Discoverability**: Adding explicit `hreflang` tags and structured data (`ItemList` containing `AudioObject` and `VideoObject` on `/vo` and `/en/vo`) ensures complete search engine indexing of voiceover media assets.

---

## 3. Caveats

1. **No Source Code Edits Made**: In strict adherence to Explorer read-only constraints, no changes were applied to `src/`. All findings, fixes, and code samples are documented for subsequent Workers.
2. **Missing Aref Ruqaa Font Files**: `Aref Ruqaa` WOFF2 files are not currently present in `public/` or `node_modules`. Worker agents must either download the two WOFF2 files (Regular 400 and Bold 700) or install `@fontsource/aref-ruqaa`.
3. **External Network Constraints**: When workers execute, font files should be committed locally into the repository rather than relying on dynamic build-time fetching.

---

## 4. Conclusion

The existing Astro 5 project structure provides a solid foundation, but contains specific discrepancies that must be rectified:
1. **Tokens**: Align dark theme variables in `tokens.css` with prompt specifications (`#0E1912`, `#16261C`, `#1C2E23`, `#FAF3E0`, `#52B788`) and implement `--link-text: #1D7368` for light mode AA compliance.
2. **Fonts**: Migrate from Google Fonts CDN to local `@fontsource-variable/readex-pro` and local WOFF2 `Aref Ruqaa`.
3. **Media Mutex**: Unify audio/video player concurrency into a native event capture coordinator.
4. **Localization & SEO**: Add bidirectional `hreflang` tags and `AudioObject`/`VideoObject` JSON-LD schemas.

---

## 5. Verification Method

To verify the implementation of this blueprint:
1. **Static Analysis**:
   ```powershell
   npm run check
   ```
   *Expected result*: `astro check` passes with 0 errors.
2. **Static Site Build**:
   ```powershell
   npm run build
   ```
   *Expected result*: Build succeeds with all six static HTML outputs generated in `dist/`.
3. **Offline Font Verification**:
   Inspect `dist/` build output and verify zero external requests to `fonts.googleapis.com` or `fonts.gstatic.com`.
4. **Media Concurrency Testing**:
   Serve `dist` via `npm run preview`, open `/vo`, click Play on any audio player, then click Play on any video player. Verify that the audio player pauses immediately, its soundwave stops, its button returns to Play, and the video plays smoothly.
