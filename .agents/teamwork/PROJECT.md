# Project: Mohamed El-Qalshany Bilingual Dual-Persona Portfolio

## Architecture
- **Framework**: Astro 5 Static Site Generation (SSG).
- **Topology**: 6 localized static pages (`/`, `/en`, `/vo`, `/en/vo`, `/marketing`, `/en/marketing`).
- **Styling**: Tailwind CSS + Custom CSS Variables (`tokens.css`) with Earthy Warmth Palette.
- **Typography**: Local `@fontsource-variable/readex-pro` (Headings & Body) and local `Aref Ruqaa` WOFF2 (Poetic accents & artistic headings). Zero remote CDN calls, zero Cumulative Layout Shift (CLS = 0).
- **Media Engine**: Zero-dependency custom HTML5 audio and video controllers with window capture-phase global singleton (`window.addEventListener('play', ..., true)`) guaranteeing 100% concurrency mutual exclusion.
- **Localization**: Bidirectional RTL/LTR support, `hreflang` alternates, dynamic metadata, JSON-LD Schema (`Person`, `AudioObject`, `VideoObject`, `ProfessionalService`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Earthy Warmth Light Palette | Exact brand tokens (`#1E3A2B`, `#E07A5F`, `#F4A261`, `#FAEDCD`, `#1C1C1E`, `#2A9D8F`) + AA link safeguard (`#1D7368`) | M1 | R2 |
| 2 | Earthy Warmth Dark Palette | Exact dark tokens (`#0E1912`, `#16261C`, card `#1C2E23`, text `#FAF3E0`, accent `#E07A5F`, mustard `#F4A261`, links `#52B788`) | M1 | R2 |
| 3 | WCAG 2.2 AA Contrast | Mathematical verification of all text/background pairs ≥ 4.5:1 (large text ≥ 3:1) | M1 | R2, AC |
| 4 | Offline Typography | Local Readex Pro and Aref Ruqaa font preloading without layout shifts | M1 | R2, AC |
| 5 | Theme Toggle Engine | Smooth light/dark switching with localStorage persistence & system preference detection | M1 | R2, AC |
| 6 | Client Studio Cutout | High-res studio portrait (`12.png` -> `public/images/mohamed-el-qalshany.png`) with responsive optimization | M2 | R1, Survey |
| 7 | Poetic Manifesto Gateway | 10-line Arabic poem ("الحبر يكتب حرفاً... والصوت يبعث فيه روحاً") & English translation | M2 | R1, AC |
| 8 | Dual-Persona Portal | Gateway two-path portal routing into VO Hub (`/vo`) and Marketing Hub (`/marketing`) | M2 | R1 |
| 9 | Dual-Hub Mode Switcher | Global sticky navigation header with mode switcher and active status indicators | M2 | R1 |
| 10 | Native Audio Player | Custom scrubber, timecode, play/pause, volume/mute, multi-speed (0.75x to 2x) | M3 | R3, AC |
| 11 | Native Video Player | Inline MP4 player, custom poster, aspect ratios (16:9 & 9:16 vertical), fullscreen | M3 | R3, AC |
| 12 | Media Concurrency Singleton | Global listener pausing any other media immediately when a new audio/video plays | M3 | R3, AC |
| 13 | 7-Category VO Filtering | Instant category filter tabs across Commercial, Acting, Motivational, Educational, Wisdom, IVR, Doc | M3 | R3, AC |
| 14 | 19 Local Media Samples | Complete mapping of probed files from `Voice over Samples` into player catalogue | M3 | R3, Survey |
| 15 | 3 Marketing Pillars | Content Creation, Digital Strategy, and One-Man Crew showcase sections | M4 | R4 |
| 16 | 5-Step Workflow Pipeline | Discovery -> Scripting -> Production/Voice -> Post-production -> Distribution | M4 | R4 |
| 17 | 3 Service Packages | Reels Sprint, Commercial Campaign, Retainer Engine with deliverables & timelines | M4 | R4 |
| 18 | Agency Comparison Matrix | 4-row side-by-side comparison (Traditional Agency vs Mohamed El-Qalshany) | M4 | R4 |
| 19 | Verified Credentials | Presidential Digilians MCIT track, AASTMT marketing diploma, media coaching | M4 | R4, AC |
| 20 | Direct Conversion CTAs | WhatsApp, Phone Call, Email, and LinkedIn profile integration | M4 | R4 |
| 21 | Bidirectional Localization | Seamless RTL (`dir="rtl"`, `lang="ar"`) and LTR (`dir="ltr"`, `lang="en"`) across all 6 routes | M5 | R5 |
| 22 | SEO & Social Meta | Hreflang bidirectional alternates, OpenGraph cards, Twitter preview cards | M5 | R5 |
| 23 | JSON-LD Schema Infrastructure | Structured data for `Person`, `ItemList` (`AudioObject`, `VideoObject`), `ProfessionalService` | M5 | R5 |
| 24 | Astro Production Build | Clean `astro build` compilation with zero errors, zero hydration errors, static export | M5 | AC |
| 25 | E2E Test Suite Validation | 100% pass across Tiers 1-4 requirement-driven test cases from E2E Testing Track | M6 | AC |
| 26 | Adversarial Hardening | Tier 5 white-box challenger stress tests, boundary conditions, edge cases | M6 | Dual Track |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Design System, Tokens & Fonts | Exact palette hex codes (Light & Dark), WCAG AA compliance, local Readex Pro & Aref Ruqaa fonts, theme toggle | None | DONE |
| M2 | Gateway Hero, Poetic Manifesto & Routing | Cutout studio photo integration, 10-line bilingual poem, dual-persona portal (`/`, `/en`, `/vo`, `/marketing`) | M1 | READY |
| M3 | Audio/Video Media Engine & Concurrency | Native custom audio & video players, multi-speed, scrubber, 7-category filtering, global concurrency singleton | M1 | PENDING |
| M4 | Marketing Hub, One-Man Crew & CTAs | 3 pillars, 5-step pipeline, 3 packages, agency comparison, credentials, LinkedIn & WhatsApp CTAs | M1, M2 | PENDING |
| M5 | SEO, Localization & Production Build | Bidirectional RTL/LTR, hreflang, OpenGraph, JSON-LD schemas, sitemap, clean `astro build` | M2, M3, M4 | PENDING |
| M6 | E2E Test Pass & Coverage Hardening | Phase 1: 100% pass of E2E test suite (Tiers 1-4). Phase 2: Tier 5 adversarial stress testing | M5, TEST_READY | PENDING |

## Parallel E2E Testing Track
- **Owner**: E2E Testing Orchestrator / Test Writer.
- **Scope**: Requirements-based opaque-box test suite covering Tiers 1-4 (≥11 × N tests) checking HTML semantics, contrast, media players, routing, JSON-LD schemas, and build outputs.
- **Deliverable**: `TEST_INFRA.md` and `TEST_READY.md`.
