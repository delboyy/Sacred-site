# Handover Notes - Sacred Wellness Website Maintenance

## How to Add a New Blog Post

### Method 1: Using TinaCMS (Visual Editor)
1. Navigate to `http://localhost:4001/admin` (run `npm run tinacms` locally)
2. Click "Create New Post" or edit existing post
3. Fill in the fields:
   - **Title**: Post headline
   - **Cover**: Upload/select cover image from `assets/images/`
   - **Body**: Write content in the rich text editor
4. Set frontmatter automatically (title, description, date, tags, readingTime)
5. Click "Save" to publish

### Method 2: Manual File Creation
1. Create new `.mdx` file in `src/content/blog/`
2. Use this template:

```mdx
---
title: "Your Post Title"
description: "Brief description for SEO and previews"
date: "2024-12-03"
tags: ["wellness", "natural-health"]
cover: "/assets/images/your-cover-image.jpg"
readingTime: 5
---

# Your Post Title

Your content here...

## Subheading

More content...

```

3. Add cover image to `assets/images/`
4. Test locally: `npm run dev` and visit `/blog/your-post-slug`

### Publishing
- Commit changes and push to trigger Vercel deployment
- New posts appear automatically in blog index
- RSS feed and sitemap update automatically

---

## How to Update Product Price

### Lemon Squeezy Dashboard
1. Go to [app.lemonsqueezy.com](https://app.lemonsqueezy.com)
2. Navigate to Products → Your Product
3. Click "Edit" on the variant
4. Update the price
5. Save changes

### Code Updates (If Needed)
If you need to update price display in the UI:

1. **Static HTML** (`public/index.html`):
   ```html
   <!-- Find price mentions and update -->
   <span class="price">$37</span>  <!-- Change to new price -->
   ```

2. **Structured Data** (`src/pages/product.astro`):
   ```javascript
   const productPrice = 37;  // Update this value
   ```

3. **Analytics Events** (if price affects tracking):
   - Update price values in GA4/Meta tracking code
   - Ensure consistent pricing across all systems

---

## How to Change OG Images (Open Graph)

### Homepage OG Image
1. Replace `assets/images/ankh-logo.png` or create new image
2. Update references in `src/layouts/BaseLayout.astro`:
   ```astro
   <meta property="og:image" content={new URL(image, Astro.url)} />
   ```

### Blog Post OG Images
1. Upload new cover image to `assets/images/`
2. Update the `cover` field in the blog post frontmatter:
   ```yaml
   cover: "/assets/images/new-cover-image.jpg"
   ```

### Social Media Testing
1. Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)
3. Clear cache if images don't update immediately

---

## How to Rotate Hero Assets

### Hero Background/Image
1. **Replace hero image**: Put new image in `assets/images/`
2. **Update CSS** (`assets/css/style.css`):
   ```css
   .hero {
     background-image: url('/assets/images/new-hero-bg.jpg');
   }
   ```

### Hero Content Updates
1. **Edit homepage** (`public/index.html`):
   ```html
   <section class="hero">
     <h1>New Headline</h1>
     <p>New subheading text</p>
     <button>New CTA text</button>
   </section>
   ```

### Hero Logo
1. **Replace logo file**: `assets/images/ankh-logo.png`
2. **Or update path** in HTML/Astro files if changing filename
3. **Test all locations**:
   - Header navigation
   - Hero section
   - Footer
   - Blog layout

---

## Common Maintenance Tasks

### Update Contact Information
- Edit footer in `public/index.html`
- Update social media links
- Modify contact email/phone

### Change Colors/Branding
- Update CSS custom properties in `assets/css/style.css`:
  ```css
  :root {
    --forest: #2d5a3d;  /* Update brand colors */
    --sage: #8fa68e;
    --gold: #d4af37;
  }
  ```

### Add New Pages
1. Create HTML file in `public/` (static) or Astro file in `src/pages/` (dynamic)
2. Add to navigation in `public/index.html` and `src/layouts/BaseLayout.astro`
3. Update sitemap: `assets/seo/sitemap.xml`
4. Test all links

### Update Analytics
- GA4: Update measurement ID in `assets/js/analytics.js`
- Meta: Update pixel ID in same file
- Test events still fire correctly

### Content Updates
- **Homepage text**: Edit `public/index.html`
- **About page**: Edit `src/pages/about.astro`
- **Product page**: Edit `src/pages/product.astro`
- **Footer content**: Edit in both locations

---

## Development Workflow

### Local Development
```bash
# Start development server
npm run dev

# Start TinaCMS (optional)
npm run tinacms

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment
- Push to `main` branch for automatic Vercel deployment
- Monitor build status in Vercel dashboard
- Check function logs for webhook activity

### File Structure Reminder
```
├── public/                 # Static HTML pages
├── src/
│   ├── content/blog/      # Blog posts (.mdx)
│   ├── layouts/          # Shared layouts
│   └── pages/            # Dynamic routes
├── assets/
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript
│   └── images/           # Images and assets
└── docs/                 # Documentation
```

---

## Troubleshooting Quick Reference

### Blog Posts Not Appearing
- Check file extension (.mdx not .md)
- Verify frontmatter syntax
- Restart dev server

### Images Not Loading
- Check file path in assets/images/
- Verify correct relative/absolute paths
- Clear browser cache

### Analytics Not Working
- Check console for JavaScript errors
- Verify measurement IDs are correct
- Test with browser dev tools network tab

### Build Failing
- Check for syntax errors in Astro/MDX files
- Verify all imports are correct
- Check Vercel build logs for specific errors

---

## Support Resources

- **Astro Docs**: [astro.build](https://astro.build)
- **TinaCMS Docs**: [tina.io](https://tina.io)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Lemon Squeezy Docs**: [docs.lemonsqueezy.com](https://docs.lemonsqueezy.com)
- **GA4 Docs**: [developers.google.com/analytics](https://developers.google.com/analytics)

For technical issues, check the project documentation in the `docs/` folder or review the implementation in the codebase.
