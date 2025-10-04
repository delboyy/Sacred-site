# Astro + MDX + TinaCMS Blog Setup Guide

## Overview

The Sacred website now includes a powerful blog system built with:
- **Astro**: Fast static site generation
- **MDX**: Markdown with JSX components
- **TinaCMS**: Visual content editing

## Project Structure

```
src/
├── content/blog/          # MDX blog posts
│   ├── getting-started-with-natural-wellness.mdx
│   └── the-power-of-adaptogenic-herbs.mdx
├── layouts/
│   └── BaseLayout.astro   # Shared layout for blog pages
├── pages/
│   ├── blog/
│   │   ├── index.astro   # Blog listing with pagination
│   │   └── [...slug].astro # Individual blog posts
│   ├── admin/
│   │   └── [...routes].astro # TinaCMS admin interface
│   ├── product.astro     # Redirect to existing product page
│   ├── about.astro       # Redirect to existing about page
│   └── rss.xml.js        # RSS feed generation
├── content/
│   └── config.ts         # Content collection schema
└── styles/               # Additional styles (if needed)
```

## Blog Post Frontmatter Schema

Each blog post uses this frontmatter structure:

```yaml
---
title: "Your Blog Post Title"
description: "Brief description for SEO and previews"
date: 2024-12-04
tags: ["tag1", "tag2", "tag3"]
cover: "/assets/images/your-cover-image.jpg"
readingTime: 5
---
```

## Development Commands

### Start Astro Development Server
```bash
npm run dev
```
- Serves at `http://localhost:4321`
- Hot reload enabled
- Blog routes available at `/blog`

### Start TinaCMS Admin
```bash
npm run tinacms
```
- Serves admin at `http://localhost:4001/admin`
- Requires Git authentication setup
- Allows visual editing of MDX content

### Build for Production
```bash
npm run build
```
- Generates static files in `dist/`
- Includes all blog posts, RSS feed, and sitemap

### Preview Production Build
```bash
npm run preview
```
- Serves the built site locally
- Test before deployment

## TinaCMS Setup

### 1. Create Tina Account
1. Go to [TinaCMS](https://tina.io)
2. Sign up for an account
3. Create a new project

### 2. Configure Authentication
1. Set up GitHub OAuth in Tina dashboard
2. Connect your repository
3. Configure branch (usually `main`)

### 3. Environment Variables
Create `.env` file:
```bash
TINA_CLIENT_ID=your_client_id_here
TINA_TOKEN=your_token_here
```

### 4. Access Admin Interface
- Visit `http://localhost:4001/admin` (when TinaCMS server is running)
- Authenticate with GitHub
- Edit blog posts visually

## Blog Features

### Blog Index (`/blog`)
- **Pagination**: 6 posts per page
- **Tag Filtering**: Filter posts by tags
- **Responsive Grid**: Adapts to screen size
- **SEO Optimized**: Meta tags and structured data

### Blog Posts (`/blog/[slug]`)
- **Cover Images**: Responsive hero images
- **Table of Contents**: Auto-generated from headings
- **Pretty Typography**: Enhanced readability
- **Social Sharing**: Open Graph and Twitter cards
- **Related Navigation**: Links between posts

### RSS Feed (`/rss.xml`)
- Auto-generated from blog content
- Includes title, description, date, and categories
- Compatible with all RSS readers

## Adding New Blog Posts

### Method 1: TinaCMS (Recommended)
1. Start TinaCMS server: `npm run tinacms`
2. Visit admin interface
3. Click "Create New Post"
4. Fill in frontmatter fields
5. Write content in visual editor
6. Save and publish

### Method 2: Manual MDX File
1. Create new `.mdx` file in `src/content/blog/`
2. Add proper frontmatter
3. Write content in Markdown + JSX
4. Commit and push

## Frontmatter Fields

### Required Fields
- `title`: Post title (used for SEO and display)
- `description`: Brief summary (used for SEO)
- `date`: Publication date (ISO format)
- `tags`: Array of tags for filtering
- `cover`: Image path (relative to site root)
- `readingTime`: Estimated reading time in minutes

### Optional Fields
- Custom fields can be added to the schema in `src/content/config.ts`

## Content Guidelines

### Writing Tips
- Use descriptive headings (H1, H2, H3)
- Include alt text for images
- Keep paragraphs to 3-4 sentences
- Use bullet points and lists for readability
- Include internal links to other posts

### MDX Features
- **JSX Components**: Import and use React components
- **Embedded Images**: Use Astro's Image component
- **Code Blocks**: Syntax highlighting with language tags
- **Tables**: Markdown table syntax
- **Links**: Standard markdown links

## Deployment

### Vercel Configuration
The project includes `vercel.json` for optimal deployment:
- Static site generation
- Proper caching headers
- Security headers

### Build Process
1. Astro builds static HTML for blog routes
2. Existing HTML files remain unchanged
3. RSS feed and sitemap are generated
4. All assets are optimized and cached

## Troubleshooting

### Common Issues

**TinaCMS won't load**
- Check environment variables
- Verify GitHub OAuth setup
- Ensure TinaCMS server is running

**Blog posts not showing**
- Check frontmatter syntax
- Verify file location in `src/content/blog/`
- Restart development server

**Images not loading**
- Use relative paths from site root
- Place images in `assets/images/`
- Check image file formats

**Build fails**
- Check for syntax errors in MDX files
- Verify all required frontmatter fields
- Check console for detailed error messages

## Performance Optimization

- **Static Generation**: All blog pages pre-built
- **Image Optimization**: Astro handles responsive images
- **Lazy Loading**: Images load as needed
- **Minimal JavaScript**: Only essential scripts included

## SEO Features

- **Meta Tags**: Title, description, Open Graph, Twitter Cards
- **Structured Data**: Article schema for rich snippets
- **Sitemap**: Auto-generated XML sitemap
- **RSS Feed**: Content syndication
- **Canonical URLs**: Prevents duplicate content issues

## Future Enhancements

- **Search Functionality**: Add Algolia or local search
- **Comments**: Integrate Disqus or similar
- **Newsletter Integration**: Add subscription forms
- **Social Sharing**: Enhanced sharing buttons
- **Analytics**: Track blog post performance
- **Categories**: Organize posts by categories
