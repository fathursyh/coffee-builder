// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [tailwindcss()],
      appType: 'custom',
  },
  trailingSlash: 'ignore',
  integrations: [react()],
  security: {checkOrigin: true},
  redirects: {
    '/products': '/products/1'
  }
});