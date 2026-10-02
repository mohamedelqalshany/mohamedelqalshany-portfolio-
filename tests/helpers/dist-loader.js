import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const PROJECT_ROOT = path.resolve(__dirname, '../..');
export const DIST_DIR = path.join(PROJECT_ROOT, 'dist');
export const SRC_DIR = path.join(PROJECT_ROOT, 'src');

export function loadAllPages() {
  const pages = {
    arGateway: {
      route: '/',
      path: path.join(DIST_DIR, 'index.html'),
      html: safeReadFile(path.join(DIST_DIR, 'index.html')),
      locale: 'ar',
      track: 'gateway'
    },
    enGateway: {
      route: '/en',
      path: path.join(DIST_DIR, 'en', 'index.html'),
      html: safeReadFile(path.join(DIST_DIR, 'en', 'index.html')),
      locale: 'en',
      track: 'gateway'
    },
    arVO: {
      route: '/vo',
      path: path.join(DIST_DIR, 'vo', 'index.html'),
      html: safeReadFile(path.join(DIST_DIR, 'vo', 'index.html')),
      locale: 'ar',
      track: 'vo'
    },
    enVO: {
      route: '/en/vo',
      path: path.join(DIST_DIR, 'en', 'vo', 'index.html'),
      html: safeReadFile(path.join(DIST_DIR, 'en', 'vo', 'index.html')),
      locale: 'en',
      track: 'vo'
    },
    arMarketing: {
      route: '/marketing',
      path: path.join(DIST_DIR, 'marketing', 'index.html'),
      html: safeReadFile(path.join(DIST_DIR, 'marketing', 'index.html')),
      locale: 'ar',
      track: 'marketing'
    },
    enMarketing: {
      route: '/en/marketing',
      path: path.join(DIST_DIR, 'en', 'marketing', 'index.html'),
      html: safeReadFile(path.join(DIST_DIR, 'en', 'marketing', 'index.html')),
      locale: 'en',
      track: 'marketing'
    }
  };
  return pages;
}

export function loadTokensCss() {
  return safeReadFile(path.join(SRC_DIR, 'styles', 'tokens.css'));
}

export function loadBaseCss() {
  return safeReadFile(path.join(SRC_DIR, 'styles', 'base.css'));
}

export function loadGlobalCss() {
  return safeReadFile(path.join(SRC_DIR, 'styles', 'global.css'));
}

export function loadSiteData() {
  const content = safeReadFile(path.join(SRC_DIR, 'data', 'site.json'));
  try {
    return JSON.parse(content);
  } catch {
    return {};
  }
}

export function loadSamplesData() {
  const content = safeReadFile(path.join(SRC_DIR, 'data', 'samples.json'));
  try {
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export function loadMarketingData() {
  const content = safeReadFile(path.join(SRC_DIR, 'data', 'marketing.json'));
  try {
    return JSON.parse(content);
  } catch {
    return {};
  }
}

export function loadDistMediaFiles() {
  const mediaDir = path.join(DIST_DIR, 'media');
  if (!fs.existsSync(mediaDir)) return [];
  const entries = fs.readdirSync(mediaDir);
  return entries.map(name => {
    const fullPath = path.join(mediaDir, name);
    const stats = fs.statSync(fullPath);
    return {
      name,
      fullPath,
      sizeBytes: stats.size,
      extension: path.extname(name).replace('.', '').toLowerCase()
    };
  });
}

export function loadSitemaps() {
  const indexPath = path.join(DIST_DIR, 'sitemap-index.xml');
  const index0Path = path.join(DIST_DIR, 'sitemap-0.xml');
  return {
    indexXml: safeReadFile(indexPath),
    urlsetXml: safeReadFile(index0Path)
  };
}

export function safeReadFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8');
    }
  } catch {}
  return '';
}
