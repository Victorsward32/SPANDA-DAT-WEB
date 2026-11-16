import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://victorsward32.github.io',
  base: process.env.GITHUB_ACTIONS ? '/SPANDA-DAT-WEB' : '/',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
