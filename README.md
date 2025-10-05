# Sacred Wellness Website

A static website for Sacred, providing natural wellness solutions and a comprehensive menopause support guide.

## Project Structure

```
/
├── README.md                 # This file
├── astro.config.mjs         # Astro configuration
├── package.json             # Dependencies and scripts
├── vercel.json              # Vercel deployment config
├── docs/                    # Documentation
│   ├── PROJECT_STATUS.md    # Development progress
│   ├── ANALYTICS_SETUP.md   # Analytics setup
│   └── ASTRO_BLOG_SETUP.md  # Blog implementation guide
├── src/                     # Astro source files
│   ├── content/
│   │   ├── config.ts        # Content collections schema
│   │   └── blog/            # MDX blog posts
│   ├── layouts/
│   │   └── BaseLayout.astro # Blog layout template
│   ├── pages/
│   │   ├── api/
│   │   │   └── webhooks/
│   │   │       └── lemon-squeezy.js # Purchase attribution webhook
│   │   ├── blog/
│   │   │   ├── index.astro # Blog listing with pagination
│   │   │   └── [...slug].astro # Individual blog posts
│   │   ├── product.astro    # Redirect to product section
│   │   ├── about.astro      # Redirect to about section
│   │   └── rss.xml.js       # RSS feed generation
│   └── styles/              # Additional styles
├── public/assets/           # Static assets (styles, scripts, images)
│   ├── css/
│   │   └── style.css        # Main stylesheet
│   ├── js/
│   │   ├── app.js           # Main application logic
│   │   ├── analytics.js     # Analytics integration
│   │   └── lemonsqueezy.js  # Overlay checkout
│   ├── images/
│   │   └── ankh-logo.png    # Brand logo
│   └── seo/
│       ├── sitemap.xml      # Search engine sitemap
│       └── robots.txt       # Crawler instructions
├── blog/                    # Legacy static blog pages
│   ├── index.html           # Old blog listing
│   ├── hormone-balance.html
│   ├── mindful-eating.html
│   └── morning-rituals.html
├── checkout.html            # Checkout page
├── index.html               # Homepage (static)
├── thank-you/
│   └── index.html           # Post-purchase page
└── archive/                 # Old/backup files
    ├── app_1.js
    └── index_1.html
```

## Features

- **Hybrid Architecture**: Astro-powered blog + static HTML pages
- **MDX Blog System**: Structured for future MDX-powered posts
- **Serverless Attribution (optional)**: Legacy Lemon Squeezy webhook handler retained for GA4 + Meta CAPI
- **Responsive Design**: Mobile-first approach with modern CSS
- **E-commerce Integration**: Gumroad overlay checkout powered by `config/commerce.json`
- **Analytics**: GA4 and Meta Pixel tracking with conversion events
- **SEO Optimized**: Meta tags, structured data, sitemap, RSS feeds
- **Email Capture**: ESP-ready signup with localStorage fallback
- **Performance**: Static generation with optimized assets and caching

## Quick Start

### Development Setup
1. **Install dependencies**: `npm install`
2. **Start Astro dev server**: `npm run dev`
3. **Access the site**: `http://localhost:4321`

### Content Management
- **Blog posts**: Add new MDX entries under `src/content/blog/`
- **Static pages**: Edit HTML files directly
- **Assets**: Place images in `public/assets/images/`

### Build & Deploy
1. **Build**: `npm run build`
2. **Preview**: `npm run preview`
3. **Deploy to Vercel**: Follow `docs/VERCEL_DEPLOYMENT.md` for complete setup

**⚠️ Important**: Vercel deployment requires the serverless functions to use ES modules format. The webhook API has been updated to use the correct `export async function POST({ request })` format compatible with nodejs18 runtime.

## Key Files

### Documentation
- `docs/PROJECT_STATUS.md` - Complete development status and roadmap
- `docs/VERCEL_DEPLOYMENT.md` - Production deployment guide
- `docs/QA_CHECKLIST.md` - Final QA testing checklist
- `docs/HANDOVER_NOTES.md` - Maintenance and content management guide
- `docs/ASTRO_BLOG_SETUP.md` - Blog system implementation guide
- `docs/WEBHOOK_ATTRIBUTION_SETUP.md` - Server-side attribution setup
- `docs/ANALYTICS_SETUP.md` - Analytics implementation guide
- `docs/EMAIL_SETUP.md` - Email capture setup guide

### Core Files
- `astro.config.mjs` - Astro configuration
- `src/content/config.ts` - Blog content schema
- `thank-you/index.html` - Post-purchase page with analytics

### Routes
- `/` - Homepage (static HTML)
- `/blog` - Blog listing (Astro + pagination)
- `/blog/[slug]` - Individual blog posts (MDX)
- `/product` - Product section (redirects to homepage)
- `/about` - About section (redirects to homepage)

## Development Commands

```bash
# Development
npm run dev          # Start Astro dev server
# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Deployment
npm run astro        # Run Astro CLI commands
```

## Tech Stack

- **Astro**: Static site generation framework
- **MDX**: Markdown with JSX components
- **Tailwind CSS**: Utility-first styling (integrated)
- **Gumroad**: E-commerce platform
- **Google Analytics 4**: Web analytics
- **Meta Pixel**: Social media tracking

## Support

For technical support or questions about the implementation, refer to the documentation in the `docs/` directory.
