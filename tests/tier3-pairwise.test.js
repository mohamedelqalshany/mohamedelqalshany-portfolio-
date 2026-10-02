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
  parseAttributes,
  extractTagAttributes,
  extractElementsByTag,
  extractElementsByAttr,
  extractMetaTags,
  extractJsonLd,
  extractLinks,
  stripTags
} from './helpers/html-parser.js';
import {
  getContrastRatio,
  isWcagAaCompliant
} from './helpers/wcag.js';

describe('Tier 3: Cross-Feature Combinations & Pairwise Interactions', () => {
  const pages = loadAllPages();
  const tokensCss = loadTokensCss();
  const baseCss = loadBaseCss();
  const globalCss = loadGlobalCss();
  const siteData = loadSiteData();
  const samplesData = loadSamplesData();
  const marketingData = loadMarketingData();
  const mediaFiles = loadDistMediaFiles();
  const sitemaps = loadSitemaps();

  // --------------------------------------------------------------------------
  // Pair 1: Theme Toggle (F2) + Color System (F1) + WCAG Contrast (F3)
  // --------------------------------------------------------------------------
  describe('Pairwise 1: Theme State Switching & Color Contrast Compliance', () => {
    it('P1.1 should ensure both light and dark mode body text satisfy WCAG 2.2 AA (>= 4.5:1)', () => {
      // Light Mode: text on warm oat
      const lightRatio = getContrastRatio('#1C1C1E', '#FAEDCD');
      assert.ok(lightRatio >= 4.5, `Light mode contrast ${lightRatio.toFixed(2)} must be >= 4.5`);

      // Dark Mode: text on obsidian forest
      const darkRatio = getContrastRatio('#FAF3E0', '#0B1610');
      assert.ok(darkRatio >= 4.5, `Dark mode contrast ${darkRatio.toFixed(2)} must be >= 4.5`);
    });

    it('P1.2 should ensure surface card contrast against base background in both themes', () => {
      // Light surface #FFFDF6 on base #FAEDCD
      const lightCardContrast = getContrastRatio('#FFFDF6', '#FAEDCD');
      assert.ok(lightCardContrast >= 1.05, 'Light card surface must have distinct luminance from base');

      // Dark surface #111A15 on base #0B1610 (subtle dark base distinction)
      const darkCardContrast = getContrastRatio('#111A15', '#0B1610');
      assert.ok(darkCardContrast >= 1.03, 'Dark card surface must have distinct luminance from base');

      // Dark raised surface #18241D on base #0B1610
      const darkRaisedContrast = getContrastRatio('#18241D', '#0B1610');
      assert.ok(darkRaisedContrast >= 1.10, 'Dark raised surface must be visibly differentiated');
    });

    it('P1.3 should verify terracotta accent maintains >= 3.0:1 large heading contrast on dark theme backgrounds', () => {
      const res = isWcagAaCompliant('#E07A5F', '#0B1610', true);
      assert.ok(res.compliant, `Terracotta on dark base contrast ${res.ratioFormatted} must be >= 3.0:1`);
    });
  });

  // --------------------------------------------------------------------------
  // Pair 2: Bidirectional Localization (F21) + Poetic Manifesto (F5)
  // --------------------------------------------------------------------------
  describe('Pairwise 2: Bidirectional Localization & Poetic Manifesto Parity', () => {
    it('P2.1 should render 10 poetic manifesto line segments in both Arabic and English gateways', () => {
      const arSegments = extractElementsByAttr(pages.arGateway.html, 'class')
        .filter(el => el.attrs.class && el.attrs.class.includes('poem-segment'));
      const enSegments = extractElementsByAttr(pages.enGateway.html, 'class')
        .filter(el => el.attrs.class && el.attrs.class.includes('poem-segment'));

      assert.equal(arSegments.length, 10, `Arabic gateway should contain 10 poem segments, got ${arSegments.length}`);
      assert.equal(enSegments.length, 10, `English gateway should contain 10 poem segments, got ${enSegments.length}`);
    });

    it('P2.2 should verify typography font classes match language direction (ar = Aref Ruqaa / en = Readex Pro or Playfair)', () => {
      const arGateway = pages.arGateway.html;
      const enGateway = pages.enGateway.html;

      assert.ok(arGateway.includes('font-artistic'), 'Arabic gateway must use font-artistic for poetry');
      assert.ok(enGateway.includes('font-artistic') || enGateway.includes('font-primary'), 'English gateway must declare font styles');
      assert.match(arGateway, /dir=["']rtl["']/);
      assert.match(enGateway, /dir=["']ltr["']/);
    });
  });

  // --------------------------------------------------------------------------
  // Pair 3: Dual-Persona Portal (F6) + Localization (F21) + Mode Switcher (F7)
  // --------------------------------------------------------------------------
  describe('Pairwise 3: Dual-Persona Portals & Mode Switcher Route Harmonization', () => {
    it('P3.1 should direct users to correct localized Hub routes from Gateway portals', () => {
      const arLinks = extractLinks(pages.arGateway.html).map(l => l.href);
      const enLinks = extractLinks(pages.enGateway.html).map(l => l.href);

      // Arabic Gateway points to /vo and /marketing
      assert.ok(arLinks.some(h => h === '/vo' || h === '/vo/'), 'AR Gateway must link to /vo');
      assert.ok(arLinks.some(h => h === '/marketing' || h === '/marketing/'), 'AR Gateway must link to /marketing');

      // English Gateway points to /en/vo and /en/marketing
      assert.ok(enLinks.some(h => h === '/en/vo' || h === '/en/vo/'), 'EN Gateway must link to /en/vo');
      assert.ok(enLinks.some(h => h === '/en/marketing' || h === '/en/marketing/'), 'EN Gateway must link to /en/marketing');
    });

    it('P3.2 should cross-link between VO and Marketing personas within the same language context', () => {
      const arVoLinks = extractLinks(pages.arVO.html).map(l => l.href);
      const enVoLinks = extractLinks(pages.enVO.html).map(l => l.href);
      const arMktLinks = extractLinks(pages.arMarketing.html).map(l => l.href);
      const enMktLinks = extractLinks(pages.enMarketing.html).map(l => l.href);

      // From AR VO -> AR Marketing
      assert.ok(arVoLinks.some(h => h.startsWith('/marketing')), 'AR VO must cross-link to AR Marketing');
      // From EN VO -> EN Marketing
      assert.ok(enVoLinks.some(h => h.startsWith('/en/marketing')), 'EN VO must cross-link to EN Marketing');
      // From AR Marketing -> AR VO
      assert.ok(arMktLinks.some(h => h.startsWith('/vo')), 'AR Marketing must cross-link to AR VO');
      // From EN Marketing -> EN VO
      assert.ok(enMktLinks.some(h => h.startsWith('/en/vo')), 'EN Marketing must cross-link to EN VO');
    });
  });

  // --------------------------------------------------------------------------
  // Pair 4: Media Players (F10 & F11) + Concurrency Singleton (F12)
  // --------------------------------------------------------------------------
  describe('Pairwise 4: Audio/Video Players & Media Concurrency Synchronization', () => {
    it('P4.1 should include unified media query selecting both audio and video elements in VO hub', () => {
      const voHtml = pages.arVO.html;
      assert.ok(
        voHtml.includes('audio, video') || voHtml.includes('audio,video') || voHtml.includes('pauseAllOtherMedia'),
        'VO Hub must contain combined audio and video concurrency query'
      );
    });

    it('P4.2 should verify both audio-card and video-card elements receive media player data attributes', () => {
      const audioCards = extractElementsByAttr(pages.arVO.html, 'data-audio-player');
      const videoCards = extractElementsByAttr(pages.arVO.html, 'data-video-player');

      assert.equal(audioCards.length, 9, `VO Hub must render 9 cataloged audio players, found ${audioCards.length}`);
      assert.ok(videoCards.length >= 10, `VO Hub must render at least 10 video players, found ${videoCards.length}`);
    });

    it('P4.3 should reset playing class and pause other elements regardless of whether source is audio or video', () => {
      const voHtml = pages.arVO.html;
      assert.ok(
        voHtml.includes('is-playing') && (voHtml.includes('pause()') || voHtml.includes('.pause')),
        'VO Hub scripts must coordinate is-playing state and pause execution across all media cards'
      );
    });
  });

  // --------------------------------------------------------------------------
  // Pair 5: 7-Category VO Filtering (F13) + 19 Local Media Samples (F14)
  // --------------------------------------------------------------------------
  describe('Pairwise 5: 7-Category VO Filtering & 19 Media Samples Distribution', () => {
    it('P5.1 should ensure all 19 media samples map to valid defined category slugs', () => {
      const validCategories = new Set([
        'commercial',
        'acting',
        'motivational',
        'educational',
        'reflections',
        'ivr',
        'demo',
        'documentary'
      ]);

      assert.equal(samplesData.length, 19, 'Must have exactly 19 samples in catalog');
      for (const sample of samplesData) {
        assert.ok(
          validCategories.has(sample.categorySlug),
          `Sample "${sample.id}" has invalid categorySlug "${sample.categorySlug}"`
        );
      }
    });

    it('P5.2 should verify that filter tabs in VO hub cover all categories present in the samples catalog', () => {
      const filterButtons = extractElementsByAttr(pages.arVO.html, 'data-filter-slug');
      const renderedSlugs = new Set(filterButtons.map(b => b.attrs['data-filter-slug']));

      assert.ok(renderedSlugs.has('all'), 'Filters must contain "all" option');
      // Verify category slugs present in catalog (excluding spotlight demo) are present in rendered filters
      for (const sample of samplesData) {
        if (sample.categorySlug !== 'demo') {
          assert.ok(
            renderedSlugs.has(sample.categorySlug),
            `Rendered filter tabs missing category: ${sample.categorySlug}`
          );
        }
      }
    });

    it('P5.3 should verify that filtering by any specific category matches real sample cards in the DOM', () => {
      const renderedCards = extractElementsByAttr(pages.arVO.html, 'data-category');
      const renderedCategories = new Set(renderedCards.map(c => c.attrs['data-category']));

      assert.ok(renderedCategories.size >= 4, 'DOM must render items across multiple distinct categories');
    });
  });

  // --------------------------------------------------------------------------
  // Pair 6: VO Hero Spotlight (F8) + Master Showreel Media Asset (F14)
  // --------------------------------------------------------------------------
  describe('Pairwise 6: VO Hero Spotlight & Master Showreel Integration', () => {
    it('P6.1 should bind master showreel video demo_18_VO.mp4 to the hero spotlight player', () => {
      const voHtml = pages.arVO.html;
      assert.ok(
        voHtml.includes('demo_18_VO.mp4'),
        'Master showreel demo_18_VO.mp4 must be referenced in VO Hub'
      );
    });

    it('P6.2 should verify demo_18_VO.mp4 exists in dist/media with physical size > 500 KB', () => {
      const showreel = mediaFiles.find(f => f.name === 'demo_18_VO.mp4');
      assert.ok(showreel, 'Master showreel demo_18_VO.mp4 must exist in dist/media');
      assert.ok(showreel.sizeBytes > 500000, `Showreel size ${showreel.sizeBytes} must be > 500 KB`);
    });
  });

  // --------------------------------------------------------------------------
  // Pair 7: Marketing Pillars (F15) + Service Packages (F17) + WhatsApp CTA (F20)
  // --------------------------------------------------------------------------
  describe('Pairwise 7: Marketing Pillars, Service Packages & Conversion WhatsApp Links', () => {
    it('P7.1 should align 3 Service Packages with 3 Marketing Pillars', () => {
      const packages = marketingData.packages;
      assert.equal(packages.length, 3, 'Must have exactly 3 service packages');

      // Check package IDs match expected tiers
      const pkgIds = packages.map(p => p.id);
      assert.ok(pkgIds.includes('reels-sprint'), 'Should include reels-sprint package');
      assert.ok(pkgIds.includes('commercial-campaign'), 'Should include commercial-campaign package');
      assert.ok(pkgIds.includes('retainer-engine'), 'Should include retainer-engine package');

      // Marketing Hub pages render the 3 pillars
      assert.ok(pages.arMarketing.html.includes('id="pillars"'), 'AR Marketing must render pillars section');
      assert.ok(pages.enMarketing.html.includes('id="pillars"'), 'EN Marketing must render pillars section');
    });

    it('P7.2 should include pre-filled WhatsApp links for each service package on marketing hub', () => {
      const links = extractLinks(pages.arMarketing.html);
      const waLinks = links.filter(l => l.href.includes('wa.me') || l.href.includes('whatsapp.com'));

      assert.ok(waLinks.length >= 3, `Expected at least 3 WhatsApp CTAs on marketing hub, found ${waLinks.length}`);
      for (const link of waLinks) {
        assert.ok(link.href.includes('201017038432'), 'WhatsApp link must target +201017038432');
      }
    });
  });

  // --------------------------------------------------------------------------
  // Pair 8: Verified Credentials (F19) + JSON-LD Person Schema (F23)
  // --------------------------------------------------------------------------
  describe('Pairwise 8: Verified Credentials & Structured Schema Alignment', () => {
    it('P8.1 should harmonize credentials between visible DOM and Person JSON-LD', () => {
      const jsonLdList = extractJsonLd(pages.arVO.html);
      assert.ok(jsonLdList.length > 0, 'JSON-LD must be present');
      const person = jsonLdList[0];

      // Person schema name and job title
      assert.equal(person['@type'], 'Person');
      assert.ok(
        person.name === 'محمد القلشاني' || person.name === 'Mohamed El-Qalshany',
        'Person name must be Mohamed El-Qalshany in Arabic or English'
      );

      // Credentials in DOM
      const domText = stripTags(pages.arVO.html);
      assert.ok(domText.includes('Digilians') || domText.includes('ديجيليانز'), 'DOM must mention Digilians credential');
      assert.ok(domText.includes('AASTMT') || domText.includes('الأكاديمية العربية'), 'DOM must mention Arab Academy credential');
    });

    it('P8.2 should declare dual-language capability (ar, en) in both Person schema and localized content', () => {
      const jsonLd = extractJsonLd(pages.arVO.html)[0];
      assert.deepEqual(jsonLd.knowsLanguage.sort(), ['ar', 'en'].sort());
      assert.ok(pages.arVO.locale === 'ar');
      assert.ok(pages.enVO.locale === 'en');
    });
  });

  // --------------------------------------------------------------------------
  // Pair 9: Route Switching Matrix Across All 6 Pages (F6, F7, F21)
  // --------------------------------------------------------------------------
  describe('Pairwise 9: 6-Route Cross-Navigation Link Consistency', () => {
    it('P9.1 should provide language switch link pointing to corresponding translation route on all 6 pages', () => {
      const routePairs = [
        { page: pages.arGateway, expectedTarget: '/en' },
        { page: pages.enGateway, expectedTarget: '/' },
        { page: pages.arVO, expectedTarget: '/en/vo' },
        { page: pages.enVO, expectedTarget: '/vo' },
        { page: pages.arMarketing, expectedTarget: '/en/marketing' },
        { page: pages.enMarketing, expectedTarget: '/marketing' }
      ];

      for (const { page, expectedTarget } of routePairs) {
        const links = extractLinks(page.html);
        const hasSwitch = links.some(l => l.href === expectedTarget || l.href === `${expectedTarget}/`);
        assert.ok(
          hasSwitch,
          `Page ${page.route} must have language switch link to ${expectedTarget}`
        );
      }
    });

    it('P9.2 should provide persona switcher between VO and Marketing on both language hubs', () => {
      // AR VO to AR Marketing
      const arVoLinks = extractLinks(pages.arVO.html).map(l => l.href);
      assert.ok(arVoLinks.some(h => h.startsWith('/marketing')), 'AR VO must have mode switcher to AR Marketing');

      // EN VO to EN Marketing
      const enVoLinks = extractLinks(pages.enVO.html).map(l => l.href);
      assert.ok(enVoLinks.some(h => h.startsWith('/en/marketing')), 'EN VO must have mode switcher to EN Marketing');

      // Return links to home/gateway
      assert.ok(arVoLinks.some(h => h === '/' || h === '/#'), 'AR VO must have brand/home link to /');
      const enMktLinks = extractLinks(pages.enMarketing.html).map(l => l.href);
      assert.ok(enMktLinks.some(h => h === '/en' || h === '/en/'), 'EN Marketing must have brand/home link to /en');
    });
  });

  // --------------------------------------------------------------------------
  // Pair 10: Multi-Speed Playback (F10, F11) + Interactive Control Accessibility
  // --------------------------------------------------------------------------
  describe('Pairwise 10: Multi-Speed Playback & Player Control Accessibility', () => {
    it('P10.1 should render playback speed control buttons in audio and video players', () => {
      const voHtml = pages.arVO.html;
      const audioSpeedBtns = extractElementsByAttr(voHtml, 'data-speed-btn');
      const videoSpeedBtns = extractElementsByAttr(voHtml, 'data-video-speed-btn');

      assert.ok(audioSpeedBtns.length >= 1, 'Audio players must render data-speed-btn');
      assert.ok(videoSpeedBtns.length >= 1, 'Video players must render data-video-speed-btn');
      assert.ok(voHtml.includes('data-speed-val') || voHtml.includes('data-video-speed-val'), 'Players must render speed indicator');
    });

    it('P10.2 should ensure play/pause buttons have descriptive aria-label or title attributes', () => {
      const playButtons = extractElementsByAttr(pages.arVO.html, 'data-action', 'toggle-play');
      for (const btn of playButtons) {
        const hasAria = btn.attrs['aria-label'] || btn.attrs['title'];
        assert.ok(hasAria, 'Every play toggle button must have aria-label or title for screen readers');
      }
    });
  });

  // --------------------------------------------------------------------------
  // Pair 11: Dark Theme (F2) + Typography (F4) + Text Readability (F3)
  // --------------------------------------------------------------------------
  describe('Pairwise 11: Dark Theme Readability & Typography Stacks', () => {
    it('P11.1 should define dark theme variables maintaining contrast ratio >= 7.0:1 for primary headings', () => {
      // In dark theme: text-heading #FAF3E0 on bg-primary #0B1610
      const ratio = getContrastRatio('#FAF3E0', '#0B1610');
      assert.ok(ratio >= 7.0, `Dark theme heading contrast ${ratio.toFixed(2)}:1 must exceed AAA threshold (7:1)`);
    });

    it('P11.2 should define dark theme muted text with contrast ratio >= 4.5:1', () => {
      // In dark theme: text-muted #A8B2A9 on bg-primary #0B1610
      const ratio = getContrastRatio('#A8B2A9', '#0B1610');
      assert.ok(ratio >= 4.5, `Dark muted text contrast ${ratio.toFixed(2)}:1 must satisfy AA threshold (4.5:1)`);
    });
  });

  // --------------------------------------------------------------------------
  // Pair 12: RTL Direction (F21) + LTR Phone Input (F26) + WhatsApp Form (F20)
  // --------------------------------------------------------------------------
  describe('Pairwise 12: RTL Layout & LTR Telephone Input Directionality', () => {
    it('P12.1 should preserve LTR text direction on phone input fields inside RTL Arabic pages', () => {
      const arVoHtml = pages.arVO.html;
      const phoneInputs = extractElementsByAttr(arVoHtml, 'type', 'tel');

      assert.ok(phoneInputs.length >= 1, 'AR VO Hub must contain phone input');
      for (const input of phoneInputs) {
        assert.equal(input.attrs.dir, 'ltr', 'Phone input in RTL page must explicitly specify dir="ltr"');
      }
    });

    it('P12.2 should format WhatsApp phone number with international country code without spaces or symbols in link', () => {
      const links = extractLinks(pages.arVO.html);
      const waLinks = links.filter(l => l.href.includes('wa.me') || l.href.includes('api.whatsapp.com'));

      assert.ok(waLinks.length >= 1, 'Must have at least one WhatsApp link');
      for (const link of waLinks) {
        assert.match(link.href, /wa\.me\/201017038432/, 'WhatsApp link must use canonical international format');
      }
    });
  });

  // --------------------------------------------------------------------------
  // Pair 13: 5-Step Workflow Pipeline (F16) + Agency Comparison Matrix (F18)
  // --------------------------------------------------------------------------
  describe('Pairwise 13: 5-Step Workflow Pipeline & Agency Comparison Synergy', () => {
    it('P13.1 should reflect single-partner turnaround speed (4-7 business days) across workflow and comparison data', () => {
      const comparisonAspects = marketingData.comparison;
      const turnaroundAspect = comparisonAspects.find(a => a.aspectEn === 'Turnaround Speed' || a.aspectAr.includes('سرعة'));

      assert.ok(turnaroundAspect, 'Turnaround aspect must exist in comparison matrix');
      assert.ok(turnaroundAspect.qalshanyEn.includes('4 to 7') || turnaroundAspect.qalshanyAr.includes('4 إلى 7'), 'Turnaround must cite 4-7 business days');
      assert.ok(turnaroundAspect.traditionalEn.includes('3 to 5') || turnaroundAspect.traditionalAr.includes('3 إلى 5'), 'Agency turnaround must cite 3-5 weeks');
    });

    it('P13.2 should reflect unified creative control across 5-step workflow in both Arabic and English', () => {
      const arWorkflow = stripTags(pages.arMarketing.html);
      const enWorkflow = stripTags(pages.enMarketing.html);

      assert.ok(arWorkflow.includes('01') && arWorkflow.includes('05'), 'AR Marketing must render steps 01 through 05');
      assert.ok(enWorkflow.includes('01') && enWorkflow.includes('05'), 'EN Marketing must render steps 01 through 05');
    });
  });

  // --------------------------------------------------------------------------
  // Pair 14: XML Sitemap (F22) + Canonical URLs (F22) + Physical Build (F24)
  // --------------------------------------------------------------------------
  describe('Pairwise 14: Sitemap XML, Canonical URLs & Physical Build Artifacts', () => {
    it('P14.1 should include all 6 production routes in sitemap-0.xml', () => {
      const sitemap = sitemaps.urlsetXml;
      assert.ok(sitemap.length > 0, 'sitemap-0.xml must not be empty');

      const expectedRoutes = [
        'https://mohamedelqalshany.com/',
        'https://mohamedelqalshany.com/en/',
        'https://mohamedelqalshany.com/vo/',
        'https://mohamedelqalshany.com/en/vo/',
        'https://mohamedelqalshany.com/marketing/',
        'https://mohamedelqalshany.com/en/marketing/'
      ];

      for (const route of expectedRoutes) {
        assert.ok(sitemap.includes(route), `Sitemap must contain canonical URL: ${route}`);
      }
    });

    it('P14.2 should match canonical link in each HTML page with sitemap entry', () => {
      for (const [key, page] of Object.entries(pages)) {
        const canonicalMatches = extractTagAttributes(page.html, 'link')
          .filter(l => l.rel === 'canonical');

        assert.equal(canonicalMatches.length, 1, `Page ${page.route} must have exactly 1 canonical tag`);
        const canonicalUrl = canonicalMatches[0].href;
        assert.ok(
          sitemaps.urlsetXml.includes(canonicalUrl),
          `Canonical URL ${canonicalUrl} must be present in sitemap-0.xml`
        );
      }
    });
  });

  // --------------------------------------------------------------------------
  // Pair 15: Skip-Link Landmark (F26) + Keyboard Accessibility (F3) + Header (F7)
  // --------------------------------------------------------------------------
  describe('Pairwise 15: Skip Navigation Link & Semantic Main Landmark Synergy', () => {
    it('P15.1 should render skip-link as first interactive element pointing to existing #main-content', () => {
      for (const [key, page] of Object.entries(pages)) {
        const links = extractLinks(page.html);
        assert.ok(links.length > 0, `Page ${page.route} must contain links`);
        const firstLink = links[0];

        assert.equal(
          firstLink.href,
          '#main-content',
          `First link on ${page.route} must be skip-link targeting #main-content`
        );

        // Target landmark must exist in page
        assert.ok(
          page.html.includes('id="main-content"'),
          `Target landmark #main-content must exist in DOM of ${page.route}`
        );
      }
    });

    it('P15.2 should verify skip-link is styled with visually-hidden / sr-only focusable pattern', () => {
      assert.ok(
        globalCss.includes('.skip-link') || baseCss.includes('.skip-link') || tokensCss.includes('.skip-link'),
        'Stylesheet must contain explicit .skip-link rules for keyboard accessibility'
      );
    });
  });
});
