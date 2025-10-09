# Changelog

## [Unreleased]
- Replace landing page layout with Perplexity Labs design scoped under `.sap-landing`, preserving existing nav, analytics, and MailerLite newsletter embed.
- Added Gumroad product widget (image, price, CTA) to hero and product sections; updated pricing to $19.99 across site and analytics.
- Introduced countdown/testimonial slider/urgency behaviours tied into existing JS without global conflicts.
- Added `public/assets/css/perplexity-landing.css` for scoped styling and extended `public/assets/js/app.js` with landing helpers.
- Blog navigation now closes the mobile menu before opening the external blog.
- Added standalone `public/privacy.html` page with updated footers linking to it.

### Revert instructions
- Restore `public/index.html`, `public/assets/css/style.css`, `public/assets/css/perplexity-landing.css`, `public/assets/js/app.js`, `public/assets/js/analytics.js`, `public/checkout.html`, `src/pages/product.astro`, and `docs/CHANGELOG.md` from the previous commit.
