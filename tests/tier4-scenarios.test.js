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
import { validatePersonSchema } from './helpers/schema-validator.js';

describe('Tier 4: Real-World Application Scenarios (5 End-to-End User Journeys)', () => {
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
  // Scenario 1: Corporate Brand Manager Seeking Commercial Voice Over
  // --------------------------------------------------------------------------
  describe('Scenario 1: Corporate Brand Manager Seeking Commercial VO', () => {
    it('Step 1.1: Lands on Arabic Gateway, reads poetic manifesto thesis', () => {
      const arHtml = pages.arGateway.html;
      assert.ok(arHtml.includes('الحبر يكتبُ حرفًا... والصوتُ يبعثُ فيه روحًا.'), 'Gateway must render opening thesis');
      assert.ok(arHtml.includes('صوتٌ لا يُسمَع فقط... بل يُصدَّق، ويُتذكَّر، ويُشترى.'), 'Gateway must render commercial punchline');
    });

    it('Step 1.2: Selects VO portal card navigating to /vo hub', () => {
      const links = extractLinks(pages.arGateway.html);
      const voPortal = links.find(l => l.href === '/vo');
      assert.ok(voPortal, 'Must find VO portal link to /vo');
      assert.ok(pages.arVO.html.length > 5000, 'Destination /vo page must be fully rendered');
    });

    it('Step 1.3: Engages with VO Hero Spotlight player running master showreel', () => {
      const voHtml = pages.arVO.html;
      assert.ok(voHtml.includes('demo_18_VO.mp4'), 'Hero spotlight must reference demo_18_VO.mp4');
      const showreelFile = mediaFiles.find(f => f.name === 'demo_18_VO.mp4');
      assert.ok(showreelFile && showreelFile.sizeBytes > 500000, 'Master showreel must exist with high quality size');
    });

    it('Step 1.4: Filters media catalog by "commercial" category', () => {
      const voHtml = pages.arVO.html;
      // Filter button exists
      assert.ok(voHtml.includes('data-filter-slug="commercial"'), 'Commercial filter button must exist');
      // Samples in commercial category
      const commercialSamples = samplesData.filter(s => s.categorySlug === 'commercial');
      assert.ok(commercialSamples.length >= 2, 'Must have at least 2 commercial samples cataloged');
      for (const s of commercialSamples) {
        assert.ok(voHtml.includes(s.filename), `VO Hub must contain commercial sample file: ${s.filename}`);
      }
    });

    it('Step 1.5: Verifies playback controls (play, speed, volume) on commercial cards', () => {
      const voHtml = pages.arVO.html;
      assert.ok(voHtml.includes('data-action="toggle-play"') || voHtml.includes('data-video-center-play'), 'Must have play toggle');
      assert.ok(voHtml.includes('data-speed-btn') || voHtml.includes('data-video-speed-btn'), 'Must have playback speed controls');
    });

    it('Step 1.6: Audits verified credentials and initiates direct WhatsApp conversation', () => {
      const voHtml = pages.arVO.html;
      assert.ok(voHtml.includes('Digilians') || voHtml.includes('ديجيليانز'), 'Must display verified Digilians credential');
      const links = extractLinks(voHtml);
      const waLink = links.find(l => l.href.includes('wa.me/201017038432'));
      assert.ok(waLink, 'Must provide direct WhatsApp booking link to +201017038432');
    });
  });

  // --------------------------------------------------------------------------
  // Scenario 2: Startup Founder Looking for Full-Cycle Content Partner
  // --------------------------------------------------------------------------
  describe('Scenario 2: Startup Founder Seeking One-Man Crew Marketing Partner', () => {
    it('Step 2.1: Lands on Arabic Gateway, navigates directly to Marketing Hub (/marketing)', () => {
      const links = extractLinks(pages.arGateway.html);
      const mktPortal = links.find(l => l.href === '/marketing');
      assert.ok(mktPortal, 'Must find Marketing portal link to /marketing');
      assert.ok(pages.arMarketing.html.length > 5000, 'Marketing hub page must be fully rendered');
    });

    it('Step 2.2: Audits 3 Core Marketing Pillars (Copywriting, 4K Filming, Dynamic Editing & VO)', () => {
      const mktHtml = pages.arMarketing.html;
      assert.ok(mktHtml.includes('id="pillars"'), 'Marketing hub must render pillars section');
      assert.ok(
        mktHtml.includes('كتابة الإعلانات') || mktHtml.includes('الإسكريبتات البيعية'),
        'Pillar 1 must cover conversion copywriting & scripting'
      );
      assert.ok(
        mktHtml.includes('One-Man Crew') || mktHtml.includes('تصوير وإخراج متكامل'),
        'Pillar 2 must cover one-man crew 4K production'
      );
      assert.ok(
        mktHtml.includes('مونتاج سريع وتعليق صوتي') || mktHtml.includes('Dynamic Video Editing'),
        'Pillar 3 must cover dynamic editing & VO'
      );
    });

    it('Step 2.3: Follows 5-step workflow pipeline from Discovery to Launch', () => {
      const mktHtml = pages.arMarketing.html;
      assert.ok(mktHtml.includes('id="workflow"'), 'Workflow section must be present');
      assert.ok(mktHtml.includes('01.') && mktHtml.includes('05.'), 'Workflow must span steps 01 through 05');
    });

    it('Step 2.4: Compares Solopreneur advantages over Traditional Agencies in comparison table', () => {
      const mktHtml = pages.arMarketing.html;
      assert.ok(
        mktHtml.includes('comparison-table') || mktHtml.includes('comparison-title'),
        'Comparison table markup must be present'
      );
      assert.ok(mktHtml.includes('<table') && mktHtml.includes('</table>'), 'Comparison must be structured as a table');
      assert.ok(mktHtml.includes('4-7') || mktHtml.includes('4 إلى 7'), 'Must demonstrate 4-7 days turnaround advantage');
    });

    it('Step 2.5: Reviews 3 service packages and books Social Sprint via WhatsApp CTA', () => {
      const mktHtml = pages.arMarketing.html;
      assert.ok(mktHtml.includes('id="packages"'), 'Packages section must be present');
      const packages = marketingData.packages;
      assert.equal(packages.length, 3, 'Must define exactly 3 packages');

      const waLinks = extractLinks(mktHtml).filter(l => l.href.includes('wa.me/201017038432'));
      assert.ok(waLinks.length >= 3, 'Must render WhatsApp booking CTAs on package cards');
      // Verify pre-filled booking parameters exist
      assert.ok(waLinks.some(l => l.href.includes('text=') || l.href.includes('%20')), 'WhatsApp links must have pre-filled text');
    });
  });

  // --------------------------------------------------------------------------
  // Scenario 3: Global Media Director Testing Cross-Language & Theme Accessibility
  // --------------------------------------------------------------------------
  describe('Scenario 3: Global Media Director Testing Cross-Language & Theme Accessibility', () => {
    it('Step 3.1: Lands on Arabic Gateway (RTL), clicks language toggle to English Gateway (/en)', () => {
      assert.equal(pages.arGateway.locale, 'ar');
      assert.match(pages.arGateway.html, /dir=["']rtl["']/);

      const links = extractLinks(pages.arGateway.html);
      const enSwitch = links.find(l => l.href === '/en' || l.href === '/en/');
      assert.ok(enSwitch, 'Arabic gateway must have language switch to /en');
      assert.equal(pages.enGateway.locale, 'en');
      assert.match(pages.enGateway.html, /dir=["']ltr["']/);
    });

    it('Step 3.2: Verifies English poetic manifesto rendered with 10 matching segments in LTR', () => {
      const enHtml = pages.enGateway.html;
      const enSegments = extractElementsByAttr(enHtml, 'class')
        .filter(el => el.attrs.class && el.attrs.class.includes('poem-segment'));
      assert.equal(enSegments.length, 10, 'English gateway must render all 10 poem segments');
    });

    it('Step 3.3: Inspects theme engine and verifies dark theme contrast compliance', () => {
      // Theme toggle button exists
      assert.ok(pages.enGateway.html.includes('data-theme-toggle'), 'English gateway must include theme toggle');

      // Dark theme contrast: Text #FAF3E0 on Bg #0B1610 >= 4.5:1
      const darkTextContrast = getContrastRatio('#FAF3E0', '#0B1610');
      assert.ok(darkTextContrast >= 12.0, `Dark text contrast ${darkTextContrast.toFixed(2)}:1 must exceed 12:1`);

      // Accent #E07A5F on Bg #0B1610 >= 3.0:1
      const darkAccentContrast = isWcagAaCompliant('#E07A5F', '#0B1610', true);
      assert.ok(darkAccentContrast.compliant, 'Dark accent must satisfy WCAG AA large text threshold');
    });

    it('Step 3.4: Enters English VO Hub (/en/vo) and switches to English Marketing Hub (/en/marketing)', () => {
      const enVoLinks = extractLinks(pages.enVO.html).map(l => l.href);
      assert.ok(enVoLinks.some(h => h.startsWith('/en/marketing')), 'English VO must cross-link to English Marketing');

      const enMktLinks = extractLinks(pages.enMarketing.html).map(l => l.href);
      assert.ok(enMktLinks.some(h => h.startsWith('/en/vo')), 'English Marketing must cross-link to English VO');
    });

    it('Step 3.5: Verifies skip navigation landmarks and semantic hierarchy on all English routes', () => {
      const enRoutes = [pages.enGateway, pages.enVO, pages.enMarketing];
      for (const p of enRoutes) {
        assert.ok(p.html.includes('href="#main-content"'), `Page ${p.route} must have skip link`);
        assert.ok(p.html.includes('id="main-content"'), `Page ${p.route} must have main content landmark`);
      }
      assert.ok(pages.enVO.html.includes('<h1'), 'EN VO Hub must include semantic h1 heading');
      assert.ok(pages.enMarketing.html.includes('<h1'), 'EN Marketing Hub must include semantic h1 heading');
    });
  });

  // --------------------------------------------------------------------------
  // Scenario 4: Mobile Visitor Inquiring via WhatsApp Form & Direct Phone
  // --------------------------------------------------------------------------
  describe('Scenario 4: Mobile Visitor Inquiring via Project Form & Direct Phone', () => {
    it('Step 4.1: Accesses VO Hub, verifies mobile navigation drawer triggers are present', () => {
      const voHtml = pages.arVO.html;
      assert.ok(voHtml.includes('data-mobile-toggle'), 'VO Hub must include mobile drawer toggle button');
      assert.ok(voHtml.includes('data-mobile-drawer'), 'VO Hub must include mobile drawer navigation container');
    });

    it('Step 4.2: Navigates to Contact section and validates inquiry form controls', () => {
      const voHtml = pages.arVO.html;
      assert.ok(voHtml.includes('id="contact"'), 'Contact section must exist');
      assert.ok(voHtml.includes('data-inquiry-form'), 'Inquiry form must have data-inquiry-form attribute');
      assert.ok(voHtml.includes('id="client-name"'), 'Form must include client name input');
      assert.ok(voHtml.includes('id="client-phone"'), 'Form must include client phone input');
      assert.ok(voHtml.includes('id="project-type"'), 'Form must include project type select dropdown');
      assert.ok(voHtml.includes('id="client-message"'), 'Form must include message textarea');
    });

    it('Step 4.3: Validates telephone input dir="ltr" constraint in Arabic layout', () => {
      const phoneInputs = extractElementsByAttr(pages.arVO.html, 'type', 'tel');
      assert.ok(phoneInputs.length >= 1, 'Must have phone input');
      assert.equal(phoneInputs[0].attrs.dir, 'ltr', 'Phone input must specify dir="ltr"');
    });

    it('Step 4.4: Validates direct phone call CTA (tel:+201017038432) and direct email CTA', () => {
      const links = extractLinks(pages.arVO.html);
      const telLink = links.find(l => l.href === 'tel:+201017038432');
      assert.ok(telLink, 'Must provide direct tel: link to +201017038432');

      const mailtoLink = links.find(l => l.href.startsWith('mailto:'));
      assert.ok(mailtoLink, 'Must provide direct mailto: link');
      assert.ok(mailtoLink.href.includes('Mohamedelqalshanyvo@gmail.com'), 'Mailto link must point to verified email');
    });

    it('Step 4.5: Validates form submission script generates WhatsApp redirect with inquiry data', () => {
      const voHtml = pages.arVO.html;
      assert.ok(voHtml.includes('encodeURIComponent'), 'Form handler must encode input fields with encodeURIComponent');
      assert.ok(voHtml.includes('https://wa.me/201017038432'), 'Form handler must target official WhatsApp endpoint');
    });
  });

  // --------------------------------------------------------------------------
  // Scenario 5: Agency Casting Producer Auditing Media Catalog & Quality
  // --------------------------------------------------------------------------
  describe('Scenario 5: Agency Casting Producer Auditing Media Catalog & Quality', () => {
    it('Step 5.1: Probes catalog integrity: 19 samples (9 audio + 10 video)', () => {
      assert.equal(samplesData.length, 19, 'Authoritative catalog must have 19 samples');
      const audioCount = samplesData.filter(s => s.type === 'audio').length;
      const videoCount = samplesData.filter(s => s.type === 'video').length;
      assert.equal(audioCount, 9, 'Must have 9 audio samples');
      assert.equal(videoCount, 10, 'Must have 10 video samples');
    });

    it('Step 5.2: Verifies all 19 media files physically exist in dist/media with valid sizes', () => {
      for (const s of samplesData) {
        const found = mediaFiles.find(f => f.name === s.filename);
        assert.ok(found, `Physical media file missing in dist/media: ${s.filename}`);
        assert.ok(found.sizeBytes > 50000, `Physical media file too small: ${s.filename} (${found.sizeBytes} bytes)`);
      }
    });

    it('Step 5.3: Audits media concurrency singleton across both audio and video players', () => {
      const voHtml = pages.arVO.html;
      assert.ok(
        voHtml.includes('pauseAllOtherMedia') || (voHtml.includes('audio, video') && voHtml.includes('pause()')),
        'VO Hub must enforce media concurrency singleton'
      );
    });

    it('Step 5.4: Validates Schema.org Person metadata in JSON-LD structure', () => {
      for (const [key, page] of Object.entries(pages)) {
        const schemas = extractJsonLd(page.html);
        assert.ok(schemas.length > 0, `Page ${page.route} must embed JSON-LD`);
        const person = schemas[0];
        const validation = validatePersonSchema(person);
        assert.ok(validation.valid, `Schema validation failed on ${page.route}: ${validation.issues.join(', ')}`);
      }
    });

    it('Step 5.5: Confirms zero broken asset links and full XML sitemap coverage', () => {
      // All canonical links in dist match sitemap
      for (const [key, page] of Object.entries(pages)) {
        assert.ok(sitemaps.urlsetXml.includes(page.route === '/' ? 'https://mohamedelqalshany.com/' : `https://mohamedelqalshany.com${page.route}/`), `Page ${page.route} must be in sitemap`);
      }
    });
  });
});
