// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://maisondenude.com',
  // Static-first (D-ARCH-02): every page sets `prerender = true`; the server
  // output exists only for the injected /_actions/* endpoint (booking submit).
  output: 'server',
  // 'compile' = sharp optimizes images at build time (prerendered pages only —
  // another reason every page must stay prerendered). The previous manual
  // `image.service` entrypoint pointed at a module that doesn't exist in Astro 7,
  // which silently degraded to passthrough and shipped original multi-MB files.
  adapter: cloudflare({ imageService: 'compile' }),
});