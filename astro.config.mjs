import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  site: 'https://sacred-site.com',
  output: 'static',
  integrations: [
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.5,
      lastmod: new Date(),
      // Custom pages to include in sitemap
      customPages: [
        'https://sacred-site.com/',
        'https://sacred-site.com/product',
      ],
    }),
  ],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  // Important: Don't process existing HTML files - they will be served statically
  // Astro will only handle the new routes (/blog, /admin)
});
