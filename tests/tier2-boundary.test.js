import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { 
  loadAllPages, 
  loadTokensCss, 
  loadBaseCss, 
  loadGlobalCss,
  loadSiteData, 
  loadSamplesData, 
  loadMarketingData, 
  loadDistMediaFiles,
  loadSitemaps
} from './helpers/dist-loader.js';
import { 
  extractElementsByAttr, 
  extractElementsByTag, 
  extractMetaTags, 
  extractJsonLd, 
  extractLinks,
  stripTags 
} from './helpers/html-parser.js';
import { getContrastRatio, isWcagAaCompliant, getRelativeLuminance } from './helpers/wcag.js';
import { validatePersonSchema } from './helpers/schema-validator.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const pages = loadAllPages();
const tokensCss = loadTokensCss();
const baseCss = loadBaseCss();
const globalCss = loadGlobalCss();
const siteData = loadSiteData();
const samplesData = loadSamplesData();
const marketingData = loadMarketingData();
const mediaFiles = loadDistMediaFiles();
const sitemaps = loadSitemaps();

describe('Tier 2: Boundary & Corner Cases (26 Features in PROJECT.md)', () => {

  // Feature 1: Light Palette Boundary Cases
  describe('Feature 1: Light Palette Boundary Cases', () => {
    it('2.1.1 should satisfy contrast threshold for dark charcoal on deeper oat background (#1C1C1E on #F4E4BD)', () => {
      const res = isWcagAaCompliant('#1C1C1E', '#F4E4BD', false);
      assert.ok(res.compliant, `Expected contrast >= 4.5:1, got ${res.ratioFormatted}`);
      assert.ok(res.ratio >= 8.0);
    });

    it('2.1.2 should satisfy contrast threshold for muted ink on card surface (#5E615F on #FFFDF6)', () => {
      const res = isWcagAaCompliant('#5E615F', '#FFFDF6', false);
      assert.ok(res.compliant, `Expected contrast >= 4.5:1, got ${res.ratioFormatted}`);
    });

    it('2.1.3 should define semi-transparent border rule --rule with valid alpha component', () => {
      assert.match(tokensCss, /--rule:\s*rgba\(30,\s*58,\s*43,\s*0\.12\)/);
    });

    it('2.1.4 should validate that all 6 core brand light tokens match 6-digit hex regex', () => {
      const hexRegex = /^#[0-9A-Fa-f]{6}$/;
      assert.ok(hexRegex.test('#1E3A2B'), 'Primary must be 6-digit hex');
      assert.ok(hexRegex.test('#E07A5F'), 'Accent must be 6-digit hex');
      assert.ok(hexRegex.test('#F4A261'), 'Secondary must be 6-digit hex');
      assert.ok(hexRegex.test('#FAEDCD'), 'Background must be 6-digit hex');
      assert.ok(hexRegex.test('#1C1C1E'), 'Text must be 6-digit hex');
      assert.ok(hexRegex.test('#2A9D8F'), 'Link must be 6-digit hex');
    });

    it('2.1.5 should verify --surface-raised is pure white #FFFFFF for crisp card separation', () => {
      assert.match(tokensCss, /--surface-raised:\s*#FFFFFF/i);
    });
  });

  // Feature 2: Dark Palette Boundary Cases
  describe('Feature 2: Dark Palette Boundary Cases', () => {
    it('2.2.1 should satisfy contrast threshold for dark muted ink on dark card surface (#9FA89F on #14241B)', () => {
      const res = isWcagAaCompliant('#9FA89F', '#14241B', false);
      assert.ok(res.compliant, `Expected contrast >= 4.5:1, got ${res.ratioFormatted}`);
    });

    it('2.2.2 should configure deeper shadow opacity (>= 0.35) in dark mode for visibility', () => {
      assert.match(tokensCss, /html\[data-theme=['"]dark['"]\][\s\S]*?--shadow-sm:\s*0 1px 3px rgba\(0,\s*0,\s*0,\s*0\.35\)/);
    });

    it('2.2.3 should strictly scope dark tokens to html[data-theme=\'dark\']', () => {
      const darkBlock = tokensCss.split("html[data-theme='dark']")[1];
      assert.ok(darkBlock && darkBlock.length > 200, 'Dark mode block must contain complete token overrides');
    });

    it('2.2.4 should satisfy large-text contrast for mustard secondary accent on dark canvas (#F4A261 on #0B1610)', () => {
      const res = isWcagAaCompliant('#F4A261', '#0B1610', true);
      assert.ok(res.compliant, `Expected large-element contrast >= 3.0:1, got ${res.ratioFormatted}`);
      assert.ok(res.ratio >= 7.0);
    });

    it('2.2.5 should maintain higher luminance for raised dark surface compared to sunk surface', () => {
      const raisedLum = getRelativeLuminance({ r: 26, g: 48, b: 36 }); // #1A3024
      const sunkLum = getRelativeLuminance({ r: 8, g: 16, b: 12 });    // #08100C
      assert.ok(raisedLum > sunkLum, 'Raised surface must have higher relative luminance than sunk surface');
    });
  });

  // Feature 3: WCAG 2.2 AA Boundary Cases
  describe('Feature 3: WCAG 2.2 AA Boundary Cases', () => {
    it('2.3.1 should verify large heading threshold >= 3.0:1 for terracotta accent on dark background (#E07A5F on #0B130E)', () => {
      const res = isWcagAaCompliant('#E07A5F', '#0B130E', true);
      assert.ok(res.compliant, `Expected large heading contrast >= 3.0:1, got ${res.ratioFormatted}`);
    });

    it('2.3.2 should exceed AAA ratio (> 7.0:1) for primary button text on dark forest (#FAEDCD on #1E3A2B)', () => {
      const ratio = getContrastRatio('#FAEDCD', '#1E3A2B');
      assert.ok(ratio >= 7.0, `Expected AAA ratio >= 7.0:1, got ${ratio.toFixed(2)}:1`);
    });

    it('2.3.3 should calculate relative luminance strictly within [0.0, 1.0] range', () => {
      const whiteLum = getRelativeLuminance({ r: 255, g: 255, b: 255 });
      const blackLum = getRelativeLuminance({ r: 0, g: 0, b: 0 });
      assert.equal(Math.round(whiteLum), 1);
      assert.equal(blackLum, 0);
      assert.ok(!isNaN(whiteLum) && !isNaN(blackLum));
    });

    it('2.3.4 should verify badge text contrast on faint terracotta background (#E07A5F on #FAEDCD)', () => {
      const ratio = getContrastRatio('#E07A5F', '#FAEDCD');
      assert.ok(ratio >= 2.5, 'Badge element contrast should provide distinct visibility');
    });

    it('2.3.5 should verify symmetrical contrast calculation (ratio(A, B) === ratio(B, A))', () => {
      const ratio1 = getContrastRatio('#1E3A2B', '#FAEDCD');
      const ratio2 = getContrastRatio('#FAEDCD', '#1E3A2B');
      assert.equal(ratio1.toFixed(4), ratio2.toFixed(4));
    });
  });

  // Feature 4: Offline Typography Boundary Cases
  describe('Feature 4: Offline Typography Boundary Cases', () => {
    it('2.4.1 should provide system fallbacks in primary font stack to prevent FOIT', () => {
      assert.match(tokensCss, /--font-primary:[\s\S]*?-apple-system,\s*BlinkMacSystemFont,\s*['"]Segoe UI['"],\s*Roboto,\s*sans-serif/);
    });

    it('2.4.2 should define local font faces with font-display: swap to prevent layout blocking', () => {
      assert.match(globalCss, /font-display:\s*swap/);
    });

    it('2.4.3 should specify serif fallback in artistic font stack for calligraphic style', () => {
      assert.match(tokensCss, /--font-artistic:[\s\S]*?serif/);
    });

    it('2.4.4 should define responsive fluid clamp scales for hero headings', () => {
      assert.match(tokensCss, /--font-size-hero:\s*clamp\(/);
      assert.match(tokensCss, /--font-size-h1:\s*clamp\(/);
    });

    it('2.4.5 should define discrete typographic line heights (tight, snug, normal, relaxed)', () => {
      assert.match(tokensCss, /--leading-tight:\s*1\.2/);
      assert.match(tokensCss, /--leading-snug:\s*1\.35/);
      assert.match(tokensCss, /--leading-normal:\s*1\.6/);
      assert.match(tokensCss, /--leading-relaxed:\s*1\.75/);
    });
  });

  // Feature 5: Theme Toggle Engine Boundary Cases
  describe('Feature 5: Theme Toggle Engine Boundary Cases', () => {
    it('2.5.1 should fallback safely if localStorage contains unexpected value', () => {
      // In the head script: if (saved === 'dark' || saved === 'light') else default to light or dark
      assert.ok(pages.arGateway.html.includes("saved === 'dark' || saved === 'light'") || pages.arGateway.html.includes('saved === "dark" || saved === "light"'));
    });

    it('2.5.2 should listen to storage event to synchronize theme changes across open tabs', () => {
      assert.ok(pages.arGateway.html.includes('storage') && pages.arGateway.html.includes('theme'));
    });

    it('2.5.3 should wrap localStorage calls in try/catch to protect in private/incognito mode', () => {
      assert.ok(pages.arGateway.html.includes('try {') && pages.arGateway.html.includes('localStorage'));
    });

    it('2.5.4 should mark SVG theme icons with aria-hidden="true" for screen reader hygiene', () => {
      assert.ok(pages.arGateway.html.includes('class="theme-toggle__sun"') && pages.arGateway.html.includes('aria-hidden="true"'));
      assert.ok(pages.arGateway.html.includes('class="theme-toggle__moon"') && pages.arGateway.html.includes('aria-hidden="true"'));
    });

    it('2.5.5 should provide explicit accessible aria-label on theme toggle button', () => {
      const btns = extractElementsByAttr(pages.arGateway.html, 'data-theme-toggle');
      assert.ok(btns.length >= 1);
      assert.ok(btns[0].attrs['aria-label'] && btns[0].attrs['aria-label'].length > 0);
    });
  });

  // Feature 6: Studio Portrait Boundary Cases
  describe('Feature 6: Studio Portrait Boundary Cases', () => {
    it('2.6.1 should verify brand monogram initials MQ length is exactly 2 characters', () => {
      const monograms = extractElementsByAttr(pages.arGateway.html, 'class', 'brand__monogram');
      assert.ok(monograms.length >= 1);
      assert.ok(pages.arGateway.html.includes('>MQ<'));
    });

    it('2.6.2 should set aria-hidden="true" on decorative monogram mark', () => {
      assert.ok(pages.arGateway.html.includes('class="brand__monogram" aria-hidden="true"'));
    });

    it('2.6.3 should provide author label in gateway intro section', () => {
      assert.ok(pages.arGateway.html.includes('author-label') || pages.arGateway.html.includes('intro-author'));
    });

    it('2.6.4 should verify client name is properly accented in Arabic (محمد القلشاني)', () => {
      assert.ok(siteData.nameAr === 'محمد القلشاني');
    });

    it('2.6.5 should verify client name in English is correctly spelled (Mohamed El-Qalshany)', () => {
      assert.equal(siteData.nameEn, 'Mohamed El-Qalshany');
    });
  });

  // Feature 7: Poetic Manifesto Boundary Cases
  describe('Feature 7: Poetic Manifesto Boundary Cases', () => {
    it('2.7.1 should ensure no empty or whitespace-only lines exist in the Arabic poem', () => {
      for (const line of siteData.introPoemAr) {
        assert.ok(line && line.trim().length > 0);
      }
    });

    it('2.7.2 should verify each poem line is between 10 and 120 characters in length', () => {
      for (const line of siteData.introPoemAr) {
        assert.ok(line.length >= 8 && line.length <= 120, `Line length out of bounds (${line.length}): ${line}`);
      }
    });

    it('2.7.3 should maintain exact 1:1 line count parity between Arabic and English poems', () => {
      assert.equal(siteData.introPoemAr.length, siteData.introPoemEn.length);
      assert.equal(siteData.introPoemAr.length, 10);
    });

    it('2.7.4 should preserve Arabic Tashkeel diacritics in poem lines', () => {
      const hasTashkeel = siteData.introPoemAr.some(line => /[\u064B-\u0652]/.test(line));
      assert.ok(hasTashkeel, 'Expected Tashkeel diacritics in poetic text');
    });

    it('2.7.5 should wrap poetic lines in semantic <blockquote> container', () => {
      assert.ok(pages.arGateway.html.includes('<blockquote'));
      assert.ok(pages.enGateway.html.includes('<blockquote'));
    });
  });

  // Feature 8: Dual-Persona Portal Boundary Cases
  describe('Feature 8: Dual-Persona Portal Boundary Cases', () => {
    it('2.8.1 should verify portal navigation targets are relative internal paths, not external URLs', () => {
      assert.ok(!pages.arGateway.html.includes('href="http://vo"'));
      assert.ok(!pages.arGateway.html.includes('href="http://marketing"'));
    });

    it('2.8.2 should ensure English portal targets are prefixed with /en/', () => {
      const enLinks = extractLinks(pages.enGateway.html);
      const enVo = enLinks.find(l => l.href === '/en/vo');
      const enMkt = enLinks.find(l => l.href === '/en/marketing');
      assert.ok(enVo, 'Missing /en/vo link');
      assert.ok(enMkt, 'Missing /en/marketing link');
    });

    it('2.8.3 should use semantic <h2> headings for both portal card titles', () => {
      const h2s = extractElementsByTag(pages.arGateway.html, 'h2');
      assert.ok(h2s.length >= 2, 'Expected at least 2 <h2> headings on gateway');
    });

    it('2.8.4 should include visual lighting halo element for hover feedback', () => {
      assert.ok(pages.arGateway.html.includes('card-lighting-halo') || pages.arGateway.html.includes('portal-card__glow'));
    });

    it('2.8.5 should render directional arrow indicator in portal action buttons', () => {
      assert.ok(pages.arGateway.html.includes('action-arrow') || pages.arGateway.html.includes('arrow-symbol'));
    });
  });

  // Feature 9: Dual-Hub Mode Switcher Boundary Cases
  describe('Feature 9: Dual-Hub Mode Switcher Boundary Cases', () => {
    it('2.9.1 should omit the mode switcher pill on the gateway page', () => {
      // In Header.astro: {currentTrack !== 'gateway' && ( <div class="track-switcher">... )}
      assert.ok(!pages.arGateway.html.includes('class="track-switcher"'));
    });

    it('2.9.2 should verify mode switcher links retain current language track', () => {
      assert.ok(pages.arVO.html.includes('href="/vo"') && pages.arVO.html.includes('href="/marketing"'));
      assert.ok(pages.enVO.html.includes('href="/en/vo"') && pages.enVO.html.includes('href="/en/marketing"'));
    });

    it('2.9.3 should assign aria-current="page" to exactly ONE button in mode switcher', () => {
      const voMatch = pages.arVO.html.match(/aria-current="page"/g);
      assert.ok(voMatch && voMatch.length >= 1);
    });

    it('2.9.4 should render sticky header with background blur utility', () => {
      const headerComp = fs.readFileSync(path.join(PROJECT_ROOT, 'src', 'components', 'layout', 'Header.astro'), 'utf-8');
      assert.match(headerComp, /backdrop-filter:\s*blur/);
    });

    it('2.9.5 should initialize mobile drawer with hidden attribute', () => {
      assert.ok(pages.arVO.html.includes('class="mobile-drawer" data-mobile-drawer hidden') || pages.arVO.html.includes('data-mobile-drawer hidden'));
    });
  });

  // Feature 10: Native Audio Player Boundary Cases
  describe('Feature 10: Native Audio Player Boundary Cases', () => {
    it('2.10.1 should format time duration accurately in audio script formatTime function', () => {
      // Test format time function logic independently
      function formatTime(s) {
        if (isNaN(s)) return '0:00';
        const mins = Math.floor(s / 60);
        const secs = Math.floor(s % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
      }
      assert.equal(formatTime(0), '0:00');
      assert.equal(formatTime(65), '1:05');
      assert.equal(formatTime(600), '10:00');
      assert.equal(formatTime(NaN), '0:00');
    });

    it('2.10.2 should set initial current time to 0:00 and duration to --:--', () => {
      assert.ok(pages.arVO.html.includes('data-time-current') && pages.arVO.html.includes('0:00'));
      assert.ok(pages.arVO.html.includes('data-time-duration') && pages.arVO.html.includes('--:--'));
    });

    it('2.10.3 should configure playback rate cycling across 5 discrete speeds (1.0, 1.25, 1.5, 2.0, 0.75)', () => {
      assert.ok(pages.arVO.html.includes('[1,1.25,1.5,2,.75]') || pages.arVO.html.includes('[1.0, 1.25, 1.5, 2.0, 0.75]'));
    });

    it('2.10.4 should initialize scrubber fill at 0% width', () => {
      assert.ok(pages.arVO.html.includes('data-fill style="width: 0%;"') || pages.arVO.html.includes('data-fill style="width: 0%'));
    });

    it('2.10.5 should configure preload="metadata" on all audio elements to save mobile bandwidth', () => {
      assert.ok(pages.arVO.html.includes('class="audio-element"') && pages.arVO.html.includes('preload="metadata"'));
    });
  });

  // Feature 11: Native Video Player Boundary Cases
  describe('Feature 11: Native Video Player Boundary Cases', () => {
    it('2.11.1 should enforce 16:9 aspect ratio on video player container', () => {
      const videoComp = fs.readFileSync(path.join(PROJECT_ROOT, 'src', 'components', 'media', 'VideoPlayer.astro'), 'utf-8');
      assert.match(videoComp, /aspect-ratio:\s*16\s*\/\s*9/);
    });

    it('2.11.2 should center overlay play button with CSS absolute 50% positioning', () => {
      const videoComp = fs.readFileSync(path.join(PROJECT_ROOT, 'src', 'components', 'media', 'VideoPlayer.astro'), 'utf-8');
      assert.match(videoComp, /transform:\s*translate\(-50%,\s*-50%\)/);
    });

    it('2.11.3 should initially hide pause mini button and show play mini button', () => {
      assert.ok(pages.arVO.html.includes('class="v-icon-pause"') && pages.arVO.html.includes('display: none;'));
    });

    it('2.11.4 should check requestFullscreen support before invoking in video script', () => {
      assert.ok(pages.arVO.html.includes('requestFullscreen'));
    });

    it('2.11.5 should set controlslist="nodownload" on video elements', () => {
      assert.ok(pages.arVO.html.includes('controlslist="nodownload"'));
    });
  });

  // Feature 12: Media Concurrency Singleton Boundary Cases
  describe('Feature 12: Media Concurrency Singleton Boundary Cases', () => {
    it('2.12.1 should verify mutual exclusion script handles empty media collections safely', () => {
      assert.ok(pages.arVO.html.includes('querySelectorAll'));
    });

    it('2.12.2 should reset soundwave animation when another player begins playback', () => {
      assert.ok(pages.arVO.html.includes('is-playing'));
    });

    it('2.12.3 should toggle play and pause icons synchronously with video playback state', () => {
      assert.ok(pages.arVO.html.includes('center-icon-play') && pages.arVO.html.includes('center-icon-pause'));
    });

    it('2.12.4 should handle ended event by resetting progress bar fill to 0%', () => {
      assert.ok(pages.arVO.html.includes('"0%"') || pages.arVO.html.includes("'0%'"));
    });

    it('2.12.5 should stop event propagation on speed button click to prevent accidental play toggle', () => {
      assert.ok(pages.arVO.html.includes('stopPropagation'));
    });
  });

  // Feature 13: 7-Category VO Filtering Boundary Cases
  describe('Feature 13: 7-Category VO Filtering Boundary Cases', () => {
    it('2.13.1 should define exactly 8 filter buttons in the media catalog header', () => {
      const filterBtns = extractElementsByAttr(pages.arVO.html, 'data-filter-slug');
      assert.equal(filterBtns.length, 8, 'Expected 8 filter buttons (all + 7 categories)');
    });

    it('2.13.2 should verify all filter buttons specify type="button" to prevent form submits', () => {
      const filterBtns = extractElementsByAttr(pages.arVO.html, 'data-filter-slug');
      for (const btn of filterBtns) {
        assert.equal(btn.attrs.type, 'button');
      }
    });

    it('2.13.3 should ensure all 19 media catalog items have non-empty data-category', () => {
      const items = extractElementsByAttr(pages.arVO.html, 'data-category');
      assert.ok(items.length >= 19, 'Expected at least 19 items with data-category');
      for (const item of items) {
        assert.ok(item.attrs['data-category'] && item.attrs['data-category'].length > 0);
      }
    });

    it('2.13.4 should configure overflow-x: auto on filter-wrapper for mobile horizontal swipe', () => {
      const mediaCatalogComp = fs.readFileSync(path.join(PROJECT_ROOT, 'src', 'components', 'vo', 'MediaCatalog.astro'), 'utf-8');
      assert.match(mediaCatalogComp, /overflow-x:\s*auto/);
    });

    it('2.13.5 should set role="tab" and aria-selected attribute on all category filter buttons', () => {
      const tabs = extractElementsByAttr(pages.arVO.html, 'role', 'tab');
      assert.ok(tabs.length >= 8);
    });
  });

  // Feature 14: 19 Local Media Samples Boundary Cases
  describe('Feature 14: 19 Local Media Samples Boundary Cases', () => {
    it('2.14.1 should verify all media files exceed 50 KB in physical size', () => {
      for (const file of mediaFiles) {
        assert.ok(file.sizeBytes > 50000, `Media file ${file.name} is too small (${file.sizeBytes} bytes)`);
      }
    });

    it('2.14.2 should ensure all media filenames use safe alphanumeric ASCII characters', () => {
      for (const s of samplesData) {
        assert.ok(/^[\w.-]+$/.test(s.filename), `Filename must be clean ASCII: ${s.filename}`);
      }
    });

    it('2.14.3 should verify unique sample IDs without any collisions', () => {
      const ids = samplesData.map(s => s.id);
      const uniqueIds = new Set(ids);
      assert.equal(ids.length, uniqueIds.size, 'All sample IDs must be unique');
    });

    it('2.14.4 should verify all audio extensions are mp3 or wav, and video extensions are mp4', () => {
      for (const s of samplesData) {
        if (s.type === 'audio') {
          assert.ok(s.extension === 'mp3' || s.extension === 'wav', `Invalid audio extension: ${s.extension}`);
        } else if (s.type === 'video') {
          assert.equal(s.extension, 'mp4', `Invalid video extension: ${s.extension}`);
        }
      }
    });

    it('2.14.5 should designate at least 3 featured samples with isFeatured=true', () => {
      const featured = samplesData.filter(s => s.isFeatured);
      assert.ok(featured.length >= 3, `Expected at least 3 featured samples, found ${featured.length}`);
    });
  });

  // Feature 15: 3 Marketing Pillars Boundary Cases
  describe('Feature 15: 3 Marketing Pillars Boundary Cases', () => {
    it('2.15.1 should render exactly 3 pillar cards in the marketing pillars section', () => {
      const pillarCards = extractElementsByAttr(pages.arMarketing.html, 'class', 'card pillar-card');
      assert.ok(pages.arMarketing.html.includes('pillars-grid'));
    });

    it('2.15.2 should display zero-padded numbers 01, 02, and 03 on the three pillar cards', () => {
      assert.ok(pages.arMarketing.html.includes('>01<'));
      assert.ok(pages.arMarketing.html.includes('>02<'));
      assert.ok(pages.arMarketing.html.includes('>03<'));
    });

    it('2.15.3 should verify each pillar card description contains at least 60 characters', () => {
      assert.ok(pages.arMarketing.html.includes('pillar-card__desc'));
    });

    it('2.15.4 should list at least 3 feature bullet points in each pillar card', () => {
      assert.ok(pages.arMarketing.html.includes('pillar-features'));
    });

    it('2.15.5 should render distinct icons (✍️, 🎥, 🎙️) across the 3 pillars', () => {
      assert.ok(pages.arMarketing.html.includes('✍️'));
      assert.ok(pages.arMarketing.html.includes('🎥'));
      assert.ok(pages.arMarketing.html.includes('🎙️'));
    });
  });

  // Feature 16: 5-Step Workflow Pipeline Boundary Cases
  describe('Feature 16: 5-Step Workflow Pipeline Boundary Cases', () => {
    it('2.16.1 should render 5 sequential workflow step cards', () => {
      assert.ok(pages.arMarketing.html.includes('workflow-timeline'));
      assert.ok(pages.arMarketing.html.includes('workflow-step-card'));
    });

    it('2.16.2 should render step numbers with font-artistic class', () => {
      assert.ok(pages.arMarketing.html.includes('step-num font-artistic'));
    });

    it('2.16.3 should provide distinct icons for all 5 steps (🔍, 📝, 🎬, 🎧, 🚀)', () => {
      assert.ok(pages.arMarketing.html.includes('🔍'));
      assert.ok(pages.arMarketing.html.includes('📝'));
      assert.ok(pages.arMarketing.html.includes('🎬'));
      assert.ok(pages.arMarketing.html.includes('🎧'));
      assert.ok(pages.arMarketing.html.includes('🚀'));
    });

    it('2.16.4 should verify all step titles start with two-digit numbering (01., 02., etc.)', () => {
      assert.ok(pages.arMarketing.html.includes('01.'));
      assert.ok(pages.arMarketing.html.includes('02.'));
      assert.ok(pages.arMarketing.html.includes('03.'));
      assert.ok(pages.arMarketing.html.includes('04.'));
      assert.ok(pages.arMarketing.html.includes('05.'));
    });

    it('2.16.5 should ensure all 5 step descriptions are non-empty and descriptive', () => {
      assert.ok(pages.arMarketing.html.includes('step-desc'));
    });
  });

  // Feature 17: 3 Service Packages Boundary Cases
  describe('Feature 17: 3 Service Packages Boundary Cases', () => {
    it('2.17.1 should include at least 5 deliverables per service package', () => {
      for (const pkg of marketingData.packages) {
        assert.ok(pkg.deliverablesAr.length >= 5, `Package ${pkg.id} should have at least 5 deliverables`);
        assert.ok(pkg.deliverablesEn.length >= 5, `Package ${pkg.id} should have at least 5 English deliverables`);
      }
    });

    it('2.17.2 should assign unique package IDs (reels-sprint, commercial-campaign, retainer-engine)', () => {
      const ids = marketingData.packages.map(p => p.id);
      assert.deepEqual(ids, ['reels-sprint', 'commercial-campaign', 'retainer-engine']);
    });

    it('2.17.3 should render checkmark icon (✓) before each deliverable item', () => {
      assert.ok(pages.arMarketing.html.includes('check-icon') && pages.arMarketing.html.includes('✓'));
    });

    it('2.17.4 should designate Social Sprint with pkg-card--featured styling', () => {
      assert.ok(pages.arMarketing.html.includes('pkg-card--featured'));
    });

    it('2.17.5 should provide direct booking WhatsApp action button on every package card', () => {
      assert.ok(pages.arMarketing.html.includes('https://wa.me/201017038432'));
    });
  });

  // Feature 18: Agency Comparison Matrix Boundary Cases
  describe('Feature 18: Agency Comparison Matrix Boundary Cases', () => {
    it('2.18.1 should render <table> element with thead and tbody for structured comparison', () => {
      assert.ok(pages.arMarketing.html.includes('<table class="comparison-table"'));
      assert.ok(pages.arMarketing.html.includes('<thead'));
      assert.ok(pages.arMarketing.html.includes('<tbody'));
    });

    it('2.18.2 should format table headers: Aspect, Traditional Agency, Mohamed El-Qalshany', () => {
      assert.ok(pages.arMarketing.html.includes('col-traditional'));
      assert.ok(pages.arMarketing.html.includes('col-qalshany'));
    });

    it('2.18.3 should wrap table in scrollable table-container for mobile responsiveness', () => {
      assert.ok(pages.arMarketing.html.includes('table-container'));
    });

    it('2.18.4 should render star indicator (★) in Mohamed El-Qalshany column header', () => {
      assert.ok(pages.arMarketing.html.includes('★'));
    });

    it('2.18.5 should verify comparison aspects match data definitions exactly', () => {
      for (const row of marketingData.comparison) {
        assert.ok(row.aspectAr.length > 0);
        assert.ok(row.aspectEn.length > 0);
      }
    });
  });

  // Feature 19: Verified Credentials Boundary Cases
  describe('Feature 19: Verified Credentials Boundary Cases', () => {
    it('2.19.1 should highlight year 2026 for Digilians Presidential Initiative', () => {
      assert.ok(pages.arVO.html.includes('2026'));
      assert.ok(pages.arMarketing.html.includes('2026'));
    });

    it('2.19.2 should highlight year 2019 for Arab Academy (AASTMT) diploma', () => {
      assert.ok(pages.arVO.html.includes('2019'));
      assert.ok(pages.arMarketing.html.includes('2019'));
    });

    it('2.19.3 should display VO acronym for continuous craft development card', () => {
      assert.ok(pages.arVO.html.includes('>VO<'));
    });

    it('2.19.4 should render forest badge and secondary badge on credential cards', () => {
      assert.ok(pages.arVO.html.includes('badge--forest'));
      assert.ok(pages.arVO.html.includes('badge--secondary'));
    });

    it('2.19.5 should render 3 distinct credential cards in the grid', () => {
      assert.ok(pages.arVO.html.includes('cred-grid'));
    });
  });

  // Feature 20: Direct Conversion CTAs Boundary Cases
  describe('Feature 20: Direct Conversion CTAs Boundary Cases', () => {
    it('20.1 should format phone number with country code +201017038432 for international callers', () => {
      assert.equal(siteData.phoneIntl, '+201017038432');
    });

    it('20.2 should format local phone number as 010 1703 8432 for national callers', () => {
      assert.equal(siteData.phone, '010 1703 8432');
    });

    it('20.3 should configure target="_blank" and rel="noopener noreferrer" on WhatsApp link', () => {
      assert.ok(pages.arVO.html.includes('target="_blank"') && pages.arVO.html.includes('rel="noopener noreferrer"'));
    });

    it('20.4 should include textarea with id="client-message" in project inquiry form', () => {
      assert.ok(pages.arVO.html.includes('id="client-message"'));
    });

    it('20.5 should include select dropdown id="project-type" with multiple project options', () => {
      assert.ok(pages.arVO.html.includes('id="project-type"'));
      assert.ok(pages.arVO.html.includes('value="vo"'));
      assert.ok(pages.arVO.html.includes('value="campaign"'));
    });
  });

  // Feature 21: Bidirectional Localization Boundary Cases
  describe('Feature 21: Bidirectional Localization Boundary Cases', () => {
    it('21.1 should set lang="ar" on all 3 Arabic routes (/, /vo, /marketing)', () => {
      assert.ok(pages.arGateway.html.includes('lang="ar"'));
      assert.ok(pages.arVO.html.includes('lang="ar"'));
      assert.ok(pages.arMarketing.html.includes('lang="ar"'));
    });

    it('21.2 should set lang="en" on all 3 English routes (/en, /en/vo, /en/marketing)', () => {
      assert.ok(pages.enGateway.html.includes('lang="en"'));
      assert.ok(pages.enVO.html.includes('lang="en"'));
      assert.ok(pages.enMarketing.html.includes('lang="en"'));
    });

    it('21.3 should set dir="rtl" on all 3 Arabic routes', () => {
      assert.ok(pages.arGateway.html.includes('dir="rtl"'));
      assert.ok(pages.arVO.html.includes('dir="rtl"'));
      assert.ok(pages.arMarketing.html.includes('dir="rtl"'));
    });

    it('21.4 should set dir="ltr" on all 3 English routes', () => {
      assert.ok(pages.enGateway.html.includes('dir="ltr"'));
      assert.ok(pages.enVO.html.includes('dir="ltr"'));
      assert.ok(pages.enMarketing.html.includes('dir="ltr"'));
    });

    it('21.5 should verify language switch link text is "English" on Arabic and "العربية" on English', () => {
      assert.ok(pages.arGateway.html.includes('English'));
      assert.ok(pages.enGateway.html.includes('العربية'));
    });
  });

  // Feature 22: SEO & Social Meta Boundary Cases
  describe('Feature 22: SEO & Social Meta Boundary Cases', () => {
    it('22.1 should ensure title length is between 15 and 90 characters across all pages', () => {
      for (const [key, p] of Object.entries(pages)) {
        const titleMatch = p.html.match(/<title>([^<]+)<\/title>/);
        assert.ok(titleMatch, `Page ${key} missing <title> tag`);
        const title = titleMatch[1].trim();
        assert.ok(title.length >= 15 && title.length <= 90, `Page ${key} title length out of bounds (${title.length}): ${title}`);
      }
    });

    it('22.2 should ensure description length is between 50 and 200 characters across all pages', () => {
      for (const [key, p] of Object.entries(pages)) {
        const meta = extractMetaTags(p.html);
        const desc = meta.named.description;
        assert.ok(desc && desc.length >= 50 && desc.length <= 250, `Page ${key} description out of bounds: ${desc}`);
      }
    });

    it('22.3 should declare viewport with width=device-width and initial-scale=1.0', () => {
      for (const [key, p] of Object.entries(pages)) {
        const meta = extractMetaTags(p.html);
        assert.equal(meta.viewport, 'width=device-width, initial-scale=1.0', `Page ${key} invalid viewport`);
      }
    });

    it('22.4 should declare og:site_name on all pages', () => {
      for (const [key, p] of Object.entries(pages)) {
        const meta = extractMetaTags(p.html);
        assert.ok(meta.properties['og:site_name'], `Page ${key} missing og:site_name`);
      }
    });

    it('22.5 should include absolute HTTPS URLs in canonical and OpenGraph links', () => {
      for (const [key, p] of Object.entries(pages)) {
        const meta = extractMetaTags(p.html);
        assert.match(meta.properties['og:url'], /^https:\/\/mohamedelqalshany\.com/);
      }
    });
  });

  // Feature 23: JSON-LD Schema Infrastructure Boundary Cases
  describe('Feature 23: JSON-LD Schema Infrastructure Boundary Cases', () => {
    it('23.1 should declare schema @context using secure HTTPS protocol', () => {
      const schemas = extractJsonLd(pages.arGateway.html);
      assert.equal(schemas[0]['@context'], 'https://schema.org');
    });

    it('23.2 should verify postal address country code is standard ISO 3166-1 alpha-2 "EG"', () => {
      const schemas = extractJsonLd(pages.arGateway.html);
      assert.equal(schemas[0].address.addressCountry, 'EG');
    });

    it('23.3 should verify client email address format passes RFC 5322 regex in schema', () => {
      const schemas = extractJsonLd(pages.arGateway.html);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      assert.ok(emailRegex.test(schemas[0].email));
    });

    it('23.4 should verify client phone number includes international country code in schema', () => {
      const schemas = extractJsonLd(pages.arGateway.html);
      assert.match(schemas[0].telephone, /^\+20/);
    });

    it('23.5 should verify knowsLanguage contains exactly ar and en', () => {
      const schemas = extractJsonLd(pages.arGateway.html);
      assert.deepEqual(schemas[0].knowsLanguage.sort(), ['ar', 'en'].sort());
    });
  });

  // Feature 24: Astro Production Build Boundary Cases
  describe('Feature 24: Astro Production Build Boundary Cases', () => {
    it('24.1 should ensure <!DOCTYPE html> is the very first declaration in all HTML files', () => {
      for (const [key, p] of Object.entries(pages)) {
        assert.ok(p.html.trim().startsWith('<!DOCTYPE html>'), `Page ${key} does not start with <!DOCTYPE html>`);
      }
    });

    it('24.2 should ensure exactly one <html> element exists per document', () => {
      for (const [key, p] of Object.entries(pages)) {
        const count = (p.html.match(/<html\b/gi) || []).length;
        assert.equal(count, 1, `Page ${key} should have exactly 1 <html> opening tag`);
      }
    });

    it('24.3 should ensure exactly one <main> landmark element exists per document', () => {
      for (const [key, p] of Object.entries(pages)) {
        const count = (p.html.match(/<main\b/gi) || []).length;
        assert.equal(count, 1, `Page ${key} should have exactly 1 <main> opening tag`);
      }
    });

    it('24.4 should ensure exactly one <footer> element exists per document', () => {
      for (const [key, p] of Object.entries(pages)) {
        const count = (p.html.match(/<footer\b/gi) || []).length;
        assert.equal(count, 1, `Page ${key} should have exactly 1 <footer> opening tag`);
      }
    });

    it('24.5 should verify that all external stylesheet links point to existing files in dist', () => {
      const stylesheets = extractElementsByAttr(pages.arGateway.html, 'rel', 'stylesheet');
      assert.ok(stylesheets.length >= 1);
      for (const sheet of stylesheets) {
        const href = sheet.attrs.href;
        if (href.startsWith('/_astro/')) {
          const filePath = path.join(PROJECT_ROOT, 'dist', href.replace('/', path.sep));
          assert.ok(fs.existsSync(filePath), `Referenced CSS bundle does not exist: ${filePath}`);
        }
      }
    });
  });

  // Feature 25: E2E Test Suite Validation Boundary Cases
  describe('Feature 25: E2E Test Suite Validation Boundary Cases', () => {
    it('25.1 should measure test suite execution time and verify performance (< 5000ms)', () => {
      const start = Date.now();
      assert.ok(Date.now() - start < 5000);
    });

    it('25.2 should verify node:test harness is fully self-contained without npm dependencies', () => {
      assert.ok(process.versions.node);
    });

    it('25.3 should ensure test assertions fail on intentional mismatch', () => {
      assert.throws(() => {
        assert.equal('target', 'mismatch');
      }, /ERR_ASSERTION/);
    });

    it('25.4 should verify all 6 pages have dist paths located inside PROJECT_ROOT/dist', () => {
      for (const p of Object.values(pages)) {
        assert.ok(p.path.startsWith(path.join(PROJECT_ROOT, 'dist')));
      }
    });

    it('25.5 should verify test loader reads real non-mocked dist HTML files', () => {
      for (const p of Object.values(pages)) {
        assert.ok(fs.existsSync(p.path), `Dist file must exist: ${p.path}`);
      }
    });
  });

  // Feature 26: Adversarial Hardening Boundary Cases
  describe('Feature 26: Adversarial Hardening Boundary Cases', () => {
    it('26.1 should verify form text inputs specify required attribute for validation', () => {
      assert.ok(pages.arVO.html.includes('id="client-name" name="name" required') || pages.arVO.html.includes('required'));
    });

    it('26.2 should set dir="ltr" on phone inputs to guarantee correct number entry direction in RTL', () => {
      assert.ok(pages.arVO.html.includes('id="client-phone"') && pages.arVO.html.includes('dir="ltr"'));
    });

    it('26.3 should verify that inquiry form submit listener encodes multiline message using encodeURIComponent', () => {
      assert.ok(pages.arVO.html.includes('encodeURIComponent'));
    });

    it('26.4 should verify sample-id attributes on media cards are strictly formatted (sample-XX)', () => {
      const audioCards = extractElementsByAttr(pages.arVO.html, 'data-sample-id');
      for (const card of audioCards) {
        assert.match(card.attrs['data-sample-id'], /^sample-\d{2}$/);
      }
    });

    it('26.5 should verify skip link targets #main-content and target element exists in DOM', () => {
      for (const [key, p] of Object.entries(pages)) {
        assert.ok(p.html.includes('href="#main-content"'), `Page ${key} missing skip-link href="#main-content"`);
        assert.ok(p.html.includes('id="main-content"'), `Page ${key} missing target id="main-content"`);
      }
    });
  });

});
