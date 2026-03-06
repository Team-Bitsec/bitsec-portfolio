// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://Team-Bitsec.github.io',
  base: '/bitsec-portfolio',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react(), sitemap()],
  i18n: {
    defaultLocale: "bn",
    locales: ["bn", "en"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});