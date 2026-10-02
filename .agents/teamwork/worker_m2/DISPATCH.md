# Dispatch for Milestone 2 Worker (worker_m2)

## 2026-09-30T17:27:00Z
- **Role**: Gateway, Poetic Manifesto & Portal Worker
- **Working Directory**: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\worker_m2`
- **Project Root**: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany`
- **Authoritative Request**: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\ORIGINAL_REQUEST.md`
- **Project Specification**: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\PROJECT.md`
- **Spec Miner Content Blueprint**: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\spec_miner_survey_2\survey_content_spec.md`
- **Assets Survey Report**: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\explorer_survey_1\survey_assets_report.md`

### MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

### File Ownership (Exclusive to worker_m2):
- `public/images/mohamed-el-qalshany.png` (and any optimized webp)
- `src/components/gateway/` (GatewayHero.astro, etc.)
- `src/components/common/Header.astro`
- `src/pages/index.astro` and `src/pages/en/index.astro`
- `src/layouts/GatewayLayout.astro`
- `src/layouts/BaseLayout.astro` (locale-aware font preloading)

### Tasks for Milestone 2:
1. **Client Studio Photo Integration**:
   - Copy client cutout photo from `C:\Users\mohmad\Downloads\MohamedEl-Qalshany\12.png` to `public/images/mohamed-el-qalshany.png`.
   - Ensure the image is integrated into the Gateway hero and VO / Marketing intros with high visual appeal, proper aspect ratio, and responsive sizing.
2. **Gateway Hero & Poetic Manifesto**:
   - Format and present the exact 10-line Arabic poem from `src/data/site.json` / `intro.txt` ("الحبر يكتب حرفاً... والصوت يبعث فيه روحاً") on `/` and its literary English translation on `/en`.
   - Use `font-arabic-artistic` (Aref Ruqaa) for poetic calligraphy accents and `font-sans` (Readex Pro) for crisp legibility.
   - Include bilingual toggle seamlessly switching between Arabic and English without losing scroll position or state.
3. **Dual-Persona Portal**:
   - Two-path portal routing visitors cleanly into either:
     1. Voice Over Artist Hub (`/vo` and `/en/vo`)
     2. Marketing, Content Creation & One-Man Crew Hub (`/marketing` and `/en/marketing`)
   - Interactive hover cards with Earthy Warmth palette styling, distinct badge indicators, and clear descriptive copy.
4. **Header Navigation & Mode-Switcher**:
   - Polish `Header.astro` mode-switcher allowing seamless navigation between Gateway (`/`), VO Hub (`/vo`), and Marketing Hub (`/marketing`), along with Language toggle (العربية / English) and ThemeToggle.
   - Active route highlighting.
5. **Adversarial Hardening (From M1 Reviewers)**:
   - Make font preloading in `BaseLayout.astro` locale-aware (preload Arabic fonts when `lang === 'ar'`, Latin fonts when `lang === 'en'`) to eliminate FOUT on English pages.
   - Clean up orphaned CSS in `Header.astro`.
6. **Build and Verification**:
   - Run `npx astro build` to confirm 0 compilation errors.
   - Test both `/` and `/en` routes in `dist/`.
7. **Report**:
   - Write comprehensive report to `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\worker_m2\handoff.md`.
