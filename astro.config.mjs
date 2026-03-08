// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://team-bitsec.github.io',
  base: '/bitsec-portfolio',
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Enable CSS minification
      cssMinify: true,
      // Minify JS
      minify: 'esbuild',
      // Rollup options for better code splitting and caching
      rollupOptions: {
        output: {
          // Stable asset file names for long-term caching
          assetFileNames: '_astro/[name].[hash][extname]',
          chunkFileNames: '_astro/[name].[hash].js',
          entryFileNames: '_astro/[name].[hash].js',
        }
      }
    }
  },
  compressHTML: true,
  integrations: [react(), sitemap()],
  i18n: {
    defaultLocale: "bn",
    locales: ["bn", "en"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});