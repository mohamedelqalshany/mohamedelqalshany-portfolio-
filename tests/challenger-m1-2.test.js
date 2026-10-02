import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

function getAllFiles(dir, extensions = []) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(full, extensions));
    } else {
      if (extensions.length === 0 || extensions.some(ext => file.endsWith(ext))) {
        results.push(full);
      }
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// SUITE 1: Font Binary Integrity & Magic Bytes Verification
// ---------------------------------------------------------------------------
describe('Challenger M1-2 Suite 1: Font Binary Integrity & Magic Bytes', () => {
  const publicFontsDir = path.join(PUBLIC_DIR, 'fonts');
  const distFontsDir = path.join(DIST_DIR, 'fonts');

  it('1.1 should have public/fonts directory with exactly 24 font files', () => {
    assert.ok(fs.existsSync(publicFontsDir), 'public/fonts must exist');
    const files = fs.readdirSync(publicFontsDir);
    assert.equal(files.length, 24, `Expected 24 font files in public/fonts, found ${files.length}`);
  });

  it('1.2 should verify every font file in public/fonts is non-empty (> 1000 bytes)', () => {
    const files = fs.readdirSync(publicFontsDir);
    for (const file of files) {
      const fullPath = path.join(publicFontsDir, file);
      const stat = fs.statSync(fullPath);
      assert.ok(stat.size > 1000, `Font ${file} is suspiciously small: ${stat.size} bytes`);
    }
  });

  it('1.3 should verify correct magic bytes for all WOFF2 and WOFF font files', () => {
    const files = fs.readdirSync(publicFontsDir);
    for (const file of files) {
      const fullPath = path.join(publicFontsDir, file);
      const fd = fs.openSync(fullPath, 'r');
      const buf = Buffer.alloc(4);
      fs.readSync(fd, buf, 0, 4, 0);
      fs.closeSync(fd);
      const magic = buf.toString('ascii');

      if (file.endsWith('.woff2')) {
        assert.equal(magic, 'wOF2', `File ${file} has invalid WOFF2 magic header: ${magic}`);
      } else if (file.endsWith('.woff')) {
        assert.equal(magic, 'wOFF', `File ${file} has invalid WOFF magic header: ${magic}`);
      }
    }
  });

  it('1.4 should verify all 24 font files are replicated in dist/fonts with identical sizes', () => {
    assert.ok(fs.existsSync(distFontsDir), 'dist/fonts must exist after build');
    const publicFiles = fs.readdirSync(publicFontsDir);
    const distFiles = fs.readdirSync(distFontsDir);
    assert.equal(distFiles.length, 24, `Expected 24 font files in dist/fonts, found ${distFiles.length}`);

    for (const file of publicFiles) {
      const pubPath = path.join(publicFontsDir, file);
      const distPath = path.join(distFontsDir, file);
      assert.ok(fs.existsSync(distPath), `dist/fonts missing file ${file}`);
      const pubStat = fs.statSync(pubPath);
      const distStat = fs.statSync(distPath);
      assert.equal(distStat.size, pubStat.size, `File size mismatch for ${file} between public and dist`);
    }
  });
});

// ---------------------------------------------------------------------------
// SUITE 2: CSS Font-Face Declarations & Preload Linking
// ---------------------------------------------------------------------------
describe('Challenger M1-2 Suite 2: CSS Font-Face Declarations & Preloading', () => {
  const globalCssPath = path.join(SRC_DIR, 'styles', 'global.css');
  const baseLayoutPath = path.join(SRC_DIR, 'layouts', 'BaseLayout.astro');
  const globalCss = fs.readFileSync(globalCssPath, 'utf8');
  const baseLayout = fs.readFileSync(baseLayoutPath, 'utf8');

  it('2.1 should declare @font-face rules with local /fonts/ URLs only', () => {
    const fontFaceUrls = [...globalCss.matchAll(/url\(['"]?(\/fonts\/[^'"]+)['"]?\)/g)].map(m => m[1]);
    assert.ok(fontFaceUrls.length >= 8, `Expected at least 8 @font-face url() rules, found ${fontFaceUrls.length}`);
    for (const url of fontFaceUrls) {
      assert.ok(url.startsWith('/fonts/'), `Font URL must be local: ${url}`);
      const filename = path.basename(url);
      const diskPath = path.join(PUBLIC_DIR, 'fonts', filename);
      assert.ok(fs.existsSync(diskPath), `Font declared in global.css does not exist on disk: ${diskPath}`);
    }
  });

  it('2.2 should specify font-display: swap on all @font-face definitions', () => {
    const fontFaces = globalCss.match(/@font-face\s*\{[^}]*\}/g) || [];
    assert.ok(fontFaces.length >= 6, `Expected at least 6 @font-face blocks, found ${fontFaces.length}`);
    for (const ff of fontFaces) {
      assert.ok(ff.includes('font-display: swap'), `@font-face block missing font-display: swap:\n${ff}`);
    }
  });

  it('2.3 should declare unicode-range for Arabic and Latin in @font-face definitions', () => {
    assert.ok(globalCss.includes('U+0600-06FF'), 'Missing Arabic unicode-range U+0600-06FF in global.css');
    assert.ok(globalCss.includes('U+0000-00FF'), 'Missing Latin unicode-range U+0000-00FF in global.css');
  });

  it('2.4 should preload primary Readex Pro and Aref Ruqaa fonts in BaseLayout.astro', () => {
    const preloadReadex = /<link\s+[^>]*rel=["']preload["'][^>]*href=["']\/fonts\/readex-pro-arabic-wght-normal\.woff2["'][^>]*>/i;
    const preloadAref = /<link\s+[^>]*rel=["']preload["'][^>]*href=["']\/fonts\/aref-ruqaa-arabic-700-normal\.woff2["'][^>]*>/i;
    assert.ok(preloadReadex.test(baseLayout), 'BaseLayout.astro must preload readex-pro-arabic-wght-normal.woff2');
    assert.ok(preloadAref.test(baseLayout), 'BaseLayout.astro must preload aref-ruqaa-arabic-700-normal.woff2');
  });

  it('2.5 should specify as="font", type="font/woff2", and crossorigin on font preloads', () => {
    const preloadLinks = [...baseLayout.matchAll(/<link\s+[^>]*rel=["']preload["'][^>]*>/gi)].map(m => m[0]);
    assert.ok(preloadLinks.length >= 2, `Expected at least 2 preload links, found ${preloadLinks.length}`);
    for (const link of preloadLinks) {
      if (link.includes('/fonts/')) {
        assert.ok(link.includes('as="font"'), `Preload link missing as="font": ${link}`);
        assert.ok(link.includes('type="font/woff2"'), `Preload link missing type="font/woff2": ${link}`);
        assert.ok(link.includes('crossorigin'), `Preload link missing crossorigin: ${link}`);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// SUITE 3: Zero External CDN Network Leaks
// ---------------------------------------------------------------------------
describe('Challenger M1-2 Suite 3: Zero External Network Font/CDN Leaks', () => {
  const allDistFiles = getAllFiles(DIST_DIR, ['.html', '.css', '.js']);
  const allSrcFiles = getAllFiles(SRC_DIR, ['.astro', '.css', '.js', '.json']);

  const forbiddenDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'cdnjs.cloudflare.com',
    'unpkg.com',
    'cdn.jsdelivr.net'
  ];

  it('3.1 should have zero references to remote font CDNs in all built dist files', () => {
    assert.ok(allDistFiles.length > 0, 'dist directory must contain built files');
    const leaks = [];
    for (const filePath of allDistFiles) {
      const content = fs.readFileSync(filePath, 'utf8');
      for (const domain of forbiddenDomains) {
        if (content.includes(domain)) {
          leaks.push({ file: path.relative(PROJECT_ROOT, filePath), domain });
        }
      }
    }
    assert.deepEqual(leaks, [], `External CDN references detected in dist: ${JSON.stringify(leaks)}`);
  });

  it('3.2 should have zero references to remote font CDNs in all source files', () => {
    assert.ok(allSrcFiles.length > 0, 'src directory must contain source files');
    const leaks = [];
    for (const filePath of allSrcFiles) {
      const content = fs.readFileSync(filePath, 'utf8');
      for (const domain of forbiddenDomains) {
        if (content.includes(domain)) {
          leaks.push({ file: path.relative(PROJECT_ROOT, filePath), domain });
        }
      }
    }
    assert.deepEqual(leaks, [], `External CDN references detected in src: ${JSON.stringify(leaks)}`);
  });

  it('3.3 should have no remote font stylesheet imports in any CSS bundle', () => {
    const cssFiles = getAllFiles(DIST_DIR, ['.css']);
    for (const cssPath of cssFiles) {
      const content = fs.readFileSync(cssPath, 'utf8');
      const remoteImport = /@import\s+(?:url\(['"]?)?https?:\/\//i;
      assert.ok(!remoteImport.test(content), `Remote @import found in ${cssPath}`);
    }
  });
});

// ---------------------------------------------------------------------------
// SUITE 4: Theme Toggle Engine Logic & Edge Case Stress Testing
// ---------------------------------------------------------------------------
describe('Challenger M1-2 Suite 4: Theme Toggle Logic & Edge-Case Resilience', () => {
  // Extract the exact inline script function from BaseLayout.astro to execute against edge cases
  const baseLayoutPath = path.join(SRC_DIR, 'layouts', 'BaseLayout.astro');
  const baseLayout = fs.readFileSync(baseLayoutPath, 'utf8');
  
  // Extract inline script body between <script is:inline> and </script>
  const scriptMatch = baseLayout.match(/<script\s+is:inline>([\s\S]*?)<\/script>/);
  assert.ok(scriptMatch, 'BaseLayout.astro must contain <script is:inline>');
  const inlineScriptCode = scriptMatch[1];

  function runThemeInit(mockLocalStorage, mockMatchMediaMatches, throwOnLocalStorage = false) {
    let appliedTheme = null;
    const documentElement = {
      setAttribute: (k, v) => {
        if (k === 'data-theme') appliedTheme = v;
      },
      getAttribute: (k) => (k === 'data-theme' ? appliedTheme : null)
    };

    const localStorage = {
      getItem: (key) => {
        if (throwOnLocalStorage) throw new Error('SecurityError: LocalStorage blocked');
        return mockLocalStorage[key] !== undefined ? mockLocalStorage[key] : null;
      },
      setItem: (key, val) => {
        if (throwOnLocalStorage) throw new Error('SecurityError: LocalStorage blocked');
        mockLocalStorage[key] = String(val);
      }
    };

    const window = {
      matchMedia: (query) => ({
        matches: query.includes('dark') ? mockMatchMediaMatches : !mockMatchMediaMatches
      })
    };

    // Execute inline script under mocked context
    const fn = new Function('document', 'localStorage', 'window', inlineScriptCode);
    fn({ documentElement }, localStorage, window);

    return appliedTheme;
  }

  it('4.1 should correctly apply "dark" when localStorage contains "dark"', () => {
    const theme = runThemeInit({ theme: 'dark' }, false);
    assert.equal(theme, 'dark');
  });

  it('4.2 should correctly apply "light" when localStorage contains "light"', () => {
    const theme = runThemeInit({ theme: 'light' }, true);
    assert.equal(theme, 'light');
  });

  it('4.3 should fall back to dark when localStorage is null and system preference is dark', () => {
    const theme = runThemeInit({}, true);
    assert.equal(theme, 'dark');
  });

  it('4.4 should fall back to light when localStorage is null and system preference is light', () => {
    const theme = runThemeInit({}, false);
    assert.equal(theme, 'light');
  });

  it('4.5 should recover gracefully from corrupted localStorage values (adversarial edge cases)', () => {
    const corruptedValues = [
      '',
      'undefined',
      'null',
      'random_string',
      'DARK',
      'LIGHT',
      ' dark ',
      '{"theme":"dark"}',
      'true',
      '0',
      'NaN',
      '\0',
      '../../etc/passwd',
      '<script>alert(1)</script>'
    ];

    for (const val of corruptedValues) {
      // With system dark preference
      const resDark = runThemeInit({ theme: val }, true);
      assert.equal(resDark, 'dark', `Expected system fallback "dark" for corrupted value: "${val}"`);

      // With system light preference
      const resLight = runThemeInit({ theme: val }, false);
      assert.equal(resLight, 'light', `Expected system fallback "light" for corrupted value: "${val}"`);
    }
  });

  it('4.6 should recover gracefully if localStorage throws SecurityError (private browsing)', () => {
    const theme = runThemeInit({}, false, true);
    assert.equal(theme, 'light', 'Must fall back to "light" when localStorage throws SecurityError');
  });

  // Client-side toggle button click logic stress testing
  it('4.7 should simulate 100 rapid toggles and verify strict alternating states', () => {
    let currentTheme = 'light';
    const storage = {};
    const events = [];

    const toggle = () => {
      const current = currentTheme || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      currentTheme = next;
      try {
        storage['theme'] = next;
      } catch (e) {}
      events.push(next);
    };

    for (let i = 0; i < 100; i++) {
      toggle();
      const expected = i % 2 === 0 ? 'dark' : 'light';
      assert.equal(currentTheme, expected, `Toggle mismatch at step ${i}`);
      assert.equal(storage['theme'], expected, `Storage mismatch at step ${i}`);
    }
    assert.equal(events.length, 100);
  });

  it('4.8 should verify ThemeToggle.astro avoids duplicate listener registration with data-theme-bound', () => {
    const toggleComponentPath = path.join(SRC_DIR, 'components', 'common', 'ThemeToggle.astro');
    const toggleComponent = fs.readFileSync(toggleComponentPath, 'utf8');

    assert.ok(toggleComponent.includes("btn.hasAttribute('data-theme-bound')"), 'Missing data-theme-bound check');
    assert.ok(toggleComponent.includes("btn.setAttribute('data-theme-bound', 'true')"), 'Missing data-theme-bound set');
  });

  it('4.9 should verify ThemeToggle.astro synchronizes on cross-tab storage events', () => {
    const toggleComponentPath = path.join(SRC_DIR, 'components', 'common', 'ThemeToggle.astro');
    const toggleComponent = fs.readFileSync(toggleComponentPath, 'utf8');

    assert.ok(toggleComponent.includes("window.addEventListener('storage'"), 'Missing storage event listener');
    assert.ok(toggleComponent.includes("e.key === 'theme'"), 'Missing e.key check for theme');
  });

  it('4.10 should verify ThemeToggle.astro listens to prefers-color-scheme media query changes', () => {
    const toggleComponentPath = path.join(SRC_DIR, 'components', 'common', 'ThemeToggle.astro');
    const toggleComponent = fs.readFileSync(toggleComponentPath, 'utf8');

    assert.ok(toggleComponent.includes("prefers-color-scheme: dark"), 'Missing prefers-color-scheme query');
    assert.ok(toggleComponent.includes(".addEventListener('change'"), 'Missing change listener on matchMedia');
  });
});

// ---------------------------------------------------------------------------
// SUITE 5: Static Output HTML Inspection
// ---------------------------------------------------------------------------
describe('Challenger M1-2 Suite 5: Built HTML Inspection in dist/', () => {
  const routes = [
    'index.html',
    'en/index.html',
    'vo/index.html',
    'en/vo/index.html',
    'marketing/index.html',
    'en/marketing/index.html'
  ];

  for (const route of routes) {
    const htmlPath = path.join(DIST_DIR, route);

    it(`5.1 [${route}] should exist with non-zero size`, () => {
      assert.ok(fs.existsSync(htmlPath), `Missing built HTML file: ${route}`);
      const stat = fs.statSync(htmlPath);
      assert.ok(stat.size > 1000, `Built HTML file is too small: ${stat.size} bytes`);
    });

    it(`5.2 [${route}] should contain blocking inline theme init script in <head>`, () => {
      const html = fs.readFileSync(htmlPath, 'utf8');
      assert.ok(html.includes("localStorage.getItem('theme')") || html.includes('localStorage.getItem("theme")'), `${route} missing theme init script`);
      assert.ok(html.includes("prefers-color-scheme: dark"), `${route} missing prefers-color-scheme check`);
    });

    it(`5.3 [${route}] should contain font preload tags for Readex Pro and Aref Ruqaa`, () => {
      const html = fs.readFileSync(htmlPath, 'utf8');
      assert.ok(html.includes('href="/fonts/readex-pro-arabic-wght-normal.woff2"'), `${route} missing Readex Pro preload`);
      assert.ok(html.includes('href="/fonts/aref-ruqaa-arabic-700-normal.woff2"'), `${route} missing Aref Ruqaa preload`);
    });

    it(`5.4 [${route}] should render accessible theme toggle button with data-theme-toggle`, () => {
      const html = fs.readFileSync(htmlPath, 'utf8');
      assert.ok(html.includes('data-theme-toggle'), `${route} missing data-theme-toggle`);
      assert.ok(html.includes('theme-toggle__sun'), `${route} missing sun icon`);
      assert.ok(html.includes('theme-toggle__moon'), `${route} missing moon icon`);
      assert.ok(html.includes('aria-label='), `${route} missing aria-label on theme toggle`);
    });
  }
});
