// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  vite: {
      plugins: [tailwindcss()],
      appType: 'custom',
  },
  prefetch: {prefetchAll: true, defaultStrategy: 'hover'},
  trailingSlash: 'ignore',
  integrations: [react()],
  security: {checkOrigin: true},

  redirects: {
    '/products': '/products/1'
  },

  adapter: netlify({imageCDN: true}),
  experimental: {
    session: true,
  }
});