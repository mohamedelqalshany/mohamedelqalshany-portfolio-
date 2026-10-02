# Original User Request

## 2026-09-30T16:46:54Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Multi-agent execution & iterative refinement
> Requested team: Full team (Astro 5 SSG, bilingual AR/EN, Dark/Light modes, native audio/video engines)

Build a high-performance, bilingual (Arabic primary, English secondary) dual-job portfolio website for Mohamed El-Qalshany (Voice Over Artist & Marketing / Content Creation / One-Man Crew) following the Astro architecture and design caliber of mohamedelbana.net.

Working directory: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany`
Integrity mode: development

## Requirements

### R1. Cinematic Gateway & Dual-Persona Architecture
Provide an evocative gateway landing page (`/` and `/en`) featuring the client's poetic manifesto ("الحبر يكتب حرفاً... والصوت يبعث فيه روحاً") with a two-path portal routing visitors cleanly into either:
1. **Voice Over Artist Hub** (`/vo` and `/en/vo`)
2. **Marketing, Content Creation & One-Man Crew Hub** (`/marketing` and `/en/marketing`)

Each hub operates as a dedicated, fully fleshed-out portfolio while sharing a seamless header mode-switcher and the global Earthy Warmth design system.

### R2. Earthy Warmth Visual Identity & Dark/Light Mode
Implement the client's exact brand palette and typography:
- **Light Theme**:
  - Primary: `#1E3A2B` (Dark Forest Green)
  - Accent: `#E07A5F` (Warm Terracotta)
  - Secondary: `#F4A261` (Soft Mustard)
  - Background: `#FAEDCD` (Warm Oat)
  - Primary Text: `#1C1C1E` (Dark Charcoal Gray)
  - Link Color: `#2A9D8F` (Deep Teal)
- **Dark Theme Counterpart**: Deep forest/charcoal canvas (`#0E1912`, `#16261C`, card `#1C2E23`, text `#FAF3E0`, accent `#E07A5F`, mustard `#F4A261`, links `#52B788`) maintaining WCAG 2.2 AA contrast.
- **Typography**: Readex Pro (Primary headings and body), Aref Ruqaa (Artistic headings, poetic intro, Arabic calligraphic accents).

### R3. Interactive Native Audio & Video Showcases
Build zero-dependency native audio and video players with customized controls:
- Waveform/progress visualization, play/pause, scrub, volume/mute.
- Multi-speed playback (0.75x, 1x, 1.25x, 1.5x, 2x).
- Instant category filtering across Commercial (`أداء إعلاني`), Acting (`أداء تمثيلي`), Motivational (`أداء حماسي`), Educational/Audiobook (`تعليمي`), Wisdom (`حكم ومواعظ`), IVR, and Retirement/Doc.
- Embedded local assets mapped directly from `Voice over Samples`.

### R4. Complete Marketing & One-Man Crew Showcase
Structure the marketing section with conversion copywriting principles:
- Core pillars: Content Creation, Digital Strategy, and One-Man Crew (Full production: scriptwriting, shooting, voice, editing, distribution).
- Clear service packages, case studies/deliverables, workflow pipeline, and direct conversion CTAs (WhatsApp, Email, LinkedIn).

### R5. Full Arabic/English Localization & SEO Infrastructure
- Native RTL/LTR support with semantic HTML, hreflang tags, OpenGraph metadata, JSON-LD Schema (`Person`, `AudioObject`, `VideoObject`), sitemap generation, and offline-ready fast loading.

## Acceptance Criteria

### Visual & Theming
- [ ] Strict adherence to the 6 brand color hex codes in light mode with smooth theme toggle to dark mode.
- [ ] Readex Pro and Aref Ruqaa web fonts loaded locally/via Fontsource with no layout shifts.
- [ ] Responsive design verified from mobile (360px) to ultra-wide desktop (1920px).

### Audio & Video Playback
- [ ] Audio player plays native WAV/MP3 files with working scrubber, timecode, and speed controls.
- [ ] Video player handles native MP4 files with inline playback, poster frame, and fullscreen toggle.
- [ ] Only one media track plays at a time (automatic pausing of previous audio/video upon new playback).

### Structure & Content Integrity
- [ ] Gateway page features the exact 10-line Arabic poem with bilingual toggle.
- [ ] VO page contains all categorized sample files and professional background credentials (Digilians, AASTMT).
- [ ] Marketing & One-Man Crew page articulates strategy, equipment/production capabilities, and packages.
- [ ] Production build (`astro build`) completes with zero errors and passes static checks.
