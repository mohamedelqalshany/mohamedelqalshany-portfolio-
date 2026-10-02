import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export const SITE = 'https://mohamedelqalshany.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ar',
        locales: { ar: 'ar-EG', en: 'en-US' },
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
