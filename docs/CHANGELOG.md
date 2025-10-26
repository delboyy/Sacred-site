# Changelog

## [Unreleased]
- Rebuilt the landing page with the updated Perplexity design (`public/assets/css/homepage.css`) while preserving nav, analytics, and newsletter integrations.
- Switched all Gumroad CTAs to direct checkout buttons and synced sitewide pricing to $12.99.
- Introduced countdown/testimonial slider/urgency behaviours tied into existing JS without global conflicts.
- Archived the legacy Perplexity landing styles/scripts and trimmed `public/assets/js/app.js` to only the functionality used by the new homepage.
- Blog navigation now closes the mobile menu before opening the external blog.
- Added standalone `public/privacy.html` page with updated footers linking to it.

### Revert instructions
- Restore `public/index.html`, `public/assets/css/style.css`, `archive/legacy-landing/perplexity-landing.css`, `public/assets/js/app.js`, `public/assets/js/analytics.js`, `public/checkout.html`, `src/pages/product.astro`, and `docs/CHANGELOG.md` from the previous commit.
