# Astro + MDX Blog Setup Guide

## Overview

The Sacred site includes a lightweight blog powered by Astro and MDX. Posts live in `src/content/blog/` and are rendered with the shared layout in `src/layouts/BaseLayout.astro`. This guide walks through adding new posts and keeping the experience consistent.

## Project Structure

```
src/
├── content/
│   ├── blog/              # MDX articles
│   └── config.ts          # Content collection schema
├── layouts/
│   └── BaseLayout.astro   # Blog/article shell
└── pages/
    └── blog/
        ├── index.astro    # Listing + tag filter
        └── [...slug].astro# Individual posts
```

## Frontmatter Schema

Each `.mdx` file must provide the following fields:

```yaml
---
title: "Your Post Title"
description: "Short summary for previews"
date: 2024-12-04
cover: "/assets/images/post-cover.jpg"
tags: ["wellness", "hormones"]
readingTime: 6
---
```

The schema is enforced in `src/content/config.ts`. Build failures usually mean a required field is missing or mistyped.

## Adding A Post

1. Duplicate an existing file in `src/content/blog/` or create a new `.mdx` file.
2. Update the frontmatter fields—`title`, `description`, `date`, `cover`, `tags`, and `readingTime`.
3. Write the body content using Markdown and optional JSX components.
4. Drop any new images into `public/assets/images/` and reference them with absolute paths (e.g. `/assets/images/...`).
5. Run `npm run dev` and visit `http://localhost:4321/blog` to verify formatting.
6. Commit the new post; the RSS feed and sitemap update automatically during build.

## Styling & Components

- Base typography and layout live in `BaseLayout.astro` and the global CSS files under `public/assets/css/`.
- Add reusable MDX components (callouts, embeds, etc.) in `src/components/` and import them inside posts as needed.
- Keep heading levels sequential (`h2` under `h1`, etc.) so the table of contents in `src/pages/blog/[...slug].astro` stays consistent.

## Troubleshooting

- **Post missing from listing**: confirm the file extension is `.mdx` and the frontmatter `draft` flag (if present) is `false`.
- **Images not loading**: ensure the image exists in `public/assets/images/` and the path in frontmatter/body starts with `/`.
- **Build errors**: run `npm run build` locally to surface schema validation errors before deploying.

For deeper customization, update the collection schema in `src/content/config.ts` or extend the Astro pages under `src/pages/blog/`.
