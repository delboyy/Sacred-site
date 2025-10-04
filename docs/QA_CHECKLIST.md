# Final QA Checklist - Sacred Wellness Website

## Pre-Flight Checks
- [ ] Local development server running: `npm run dev`
- [ ] No console errors or warnings
- [ ] All pages load without 404 errors
- [ ] Build completes successfully: `npm run build`

## Navigation & Links
### Header Navigation
- [ ] Logo links to homepage (/)
- [ ] "Blog" link goes to `/blog/`
- [ ] "About" link goes to `/about`
- [ ] "Product" link goes to `/product`
- [ ] Mobile hamburger menu opens/closes properly
- [ ] Mobile menu links work correctly

### Footer Links
- [ ] All social media links open in new tabs
- [ ] Email signup form visible and functional
- [ ] Privacy policy and terms links (if applicable)
- [ ] Logo links to homepage

### Call-to-Action Buttons
- [ ] Hero section "Buy Now" button triggers overlay
- [ ] Product section CTA button triggers overlay
- [ ] Checkout page "Complete Purchase" button works
- [ ] All buttons have proper hover states

## E-commerce Functionality
### Lemon Squeezy Overlay
- [ ] Overlay opens when clicking "Buy Now" buttons
- [ ] Overlay closes when clicking outside or X button
- [ ] Form validation works (email, payment details)
- [ ] Test purchase completes successfully
- [ ] Redirect to thank-you page after purchase

### Thank-You Page
- [ ] URL parameters parsed correctly (`?order_id=...&total=...&status=success`)
- [ ] Order details display properly
- [ ] GA4 purchase event fires (check network tab)
- [ ] Meta Pixel purchase event fires (check network tab)
- [ ] "Return to downloads" and "Contact support" links work
- [ ] Page renders correctly on mobile

## Blog System
### Blog Index Page (`/blog/`)
- [ ] Page loads with blog post previews
- [ ] Each post shows: title, description, date, tags, reading time
- [ ] Tag filtering works (click tags to filter)
- [ ] Post links navigate to individual posts
- [ ] Cover images load properly
- [ ] Pagination works (if more than page limit)

### Individual Blog Posts
- [ ] Post loads with full content
- [ ] Cover image displays at top
- [ ] Title, date, and tags show correctly
- [ ] Table of contents (if implemented)
- [ ] Social sharing buttons work
- [ ] Related posts or navigation (if implemented)

### Content Management
- [ ] TinaCMS admin accessible at `/admin` (if enabled)
- [ ] Visual editor loads blog content
- [ ] Save/publish functionality works

## Technical Assets
### SEO & Meta Tags
- [ ] Homepage has proper title and description
- [ ] Blog posts have individual meta tags
- [ ] Open Graph tags present (Facebook sharing)
- [ ] Twitter Card tags present
- [ ] Canonical URLs set correctly

### RSS & Sitemap
- [ ] RSS feed loads at `/rss.xml`
- [ ] RSS contains recent blog posts
- [ ] Sitemap loads at `/sitemap.xml`
- [ ] Sitemap includes all pages and posts
- [ ] XML validates properly

### Analytics
- [ ] GA4 tracking code present on all pages
- [ ] Meta Pixel code present on all pages
- [ ] Events fire on user interactions
- [ ] No tracking blockers interfere with events

## Responsive Design
### Mobile Layout
- [ ] Header collapses to hamburger menu
- [ ] Content reflows properly on small screens
- [ ] Images are responsive
- [ ] Touch targets are appropriately sized (44px+)
- [ ] Forms are usable on mobile

### Tablet Layout
- [ ] Content displays well on medium screens
- [ ] Navigation adapts appropriately
- [ ] No horizontal scrolling

### Desktop Layout
- [ ] Full navigation visible
- [ ] Multi-column layouts work
- [ ] Hover states functional

## Performance
### Core Web Vitals
- [ ] Lighthouse performance score > 80
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

### Loading Performance
- [ ] Images lazy load properly
- [ ] CSS and JS minified
- [ ] Unused code eliminated
- [ ] Caching headers set correctly

## Accessibility
### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Tab order logical
- [ ] Skip links present (if needed)

### Screen Reader Support
- [ ] Alt text on all images
- [ ] Semantic HTML structure
- [ ] ARIA labels where needed
- [ ] Color contrast meets WCAG standards

## Cross-Browser Testing
- [ ] Chrome/Edge: Full functionality
- [ ] Firefox: Full functionality
- [ ] Safari: Full functionality
- [ ] Mobile Safari: Full functionality
- [ ] Mobile Chrome: Full functionality

## Error Handling
### 404 Pages
- [ ] Custom 404 page displays
- [ ] Navigation back to homepage works

### Form Validation
- [ ] Email validation works
- [ ] Required fields enforced
- [ ] Error messages clear and helpful

### Network Issues
- [ ] Graceful degradation when offline
- [ ] Loading states during API calls
- [ ] Error boundaries work

## Content Quality
### Copy & Messaging
- [ ] All text proofread for errors
- [ ] Calls-to-action clear and compelling
- [ ] Value propositions communicated effectively

### Visual Design
- [ ] Brand colors consistent throughout
- [ ] Typography hierarchy clear
- [ ] Images high quality and relevant
- [ ] White space balanced

## Final Checks
- [ ] All checklist items completed
- [ ] Stakeholder review completed
- [ ] Performance benchmarks met
- [ ] Analytics events validated
- [ ] Mobile experience tested on real devices
- [ ] Ready for production deployment

## Post-Launch Monitoring
- [ ] Error tracking set up (Sentry, etc.)
- [ ] Performance monitoring active
- [ ] Analytics dashboards configured
- [ ] User feedback collection ready
