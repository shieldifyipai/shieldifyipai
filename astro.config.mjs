import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://shieldifyip.com',
  trailingSlash: 'never',
  integrations: [sitemap({
    filter: (page) => !page.endsWith('/404') && !page.endsWith('/about') && !page.endsWith('/services'),
  })],
});
