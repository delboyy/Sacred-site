# Lemon Squeezy Overlay Checkout Setup Guide

## Overview
This implementation adds Lemon Squeezy overlay checkout to your Sacred wellness website. The overlay opens inline without redirecting users away from your site, improving conversion rates while maintaining your beautiful design.

## 🚀 Quick Setup (3 Steps)

### Step 1: Get Your Lemon Squeezy Buy URL
1. Log into your [Lemon Squeezy dashboard](https://app.lemonsqueezy.com)
2. Navigate to your product → Share → Copy the "Buy" URL
3. It will look like: `https://yourstore.lemonsqueezy.com/checkout/buy/abc123`

### Step 2: Replace Placeholder URLs
Replace `YOUR_LEMON_SQUEEZY_BUY_URL_HERE` in these files with your actual buy URL:

**Files to update:**
- `index.html` (2 instances - hero section and product section)
- `checkout.html` (1 instance - main checkout button)

**Search and replace:**
```bash
# Replace in all files:
YOUR_LEMON_SQUEEZY_BUY_URL_HERE
# With your actual URL:
https://yourstore.lemonsqueezy.com/checkout/buy/abc123
```

### Step 3: Test the Integration
1. Open your website in a browser
2. Click any "Buy Now" button
3. Verify the overlay opens with your Lemon Squeezy checkout
4. Complete a test purchase to ensure everything works

## 📁 Files Modified

### Core Files
- `js/lemonsqueezy.js` - Overlay functionality and fallback handling
- `index.html` - Updated CTA buttons with overlay attributes
- `checkout.html` - Updated checkout button with overlay

### Script Location
The Lemon Squeezy script is automatically loaded by `js/lemonsqueezy.js` and included in:
- `index.html`
- `checkout.html`
- All blog pages (via template updates)

## 🎯 How It Works

### Overlay Mode (JavaScript Enabled)
```html
<a href="checkout.html" class="btn btn--primary" data-ls-overlay="YOUR_BUY_URL">
    Buy Now - $37
</a>
```
- User clicks → Overlay opens inline
- Purchase completes in overlay
- User redirected to thank-you page

### Fallback Mode (JavaScript Disabled)
```html
<noscript>
    <a href="YOUR_BUY_URL" class="btn btn--primary" target="_blank">
        Buy Now - $37
    </a>
</noscript>
```
- Opens hosted checkout in new tab
- Maintains functionality without JavaScript

## 🔧 Button Pattern for Reuse

### Basic Overlay Button
```html
<a href="checkout.html"
   class="btn btn--primary"
   data-ls-overlay="YOUR_LEMON_SQUEEZY_BUY_URL">
    Buy Now - $37
</a>
<noscript>
    <a href="YOUR_LEMON_SQUEEZY_BUY_URL"
       class="btn btn--primary"
       target="_blank">
        Buy Now - $37
    </a>
</noscript>
```

### Advanced Button (with custom styling)
```html
<a href="checkout.html"
   class="btn btn--primary btn--lg btn--full"
   data-ls-overlay="YOUR_LEMON_SQUEEZY_BUY_URL"
   id="checkout-button">
    Complete Purchase - $37
</a>
<noscript>
    <a href="YOUR_LEMON_SQUEEZY_BUY_URL"
       class="btn btn--primary btn--lg btn--full"
       target="_blank">
        Complete Purchase - $37
    </a>
</noscript>
```

## 🔄 Updating Product URLs Later

### For New Products
1. Create product in Lemon Squeezy
2. Copy the new buy URL
3. Update `data-ls-overlay` and `<noscript>` href attributes
4. Update placeholder URLs in all button locations

### For Multiple Products
```html
<!-- Product A -->
<a href="checkout.html" data-ls-overlay="URL_A">Buy Product A</a>

<!-- Product B -->
<a href="checkout.html" data-ls-overlay="URL_B">Buy Product B</a>
```

## 🧪 Testing Checklist

- [ ] Overlay opens when clicking CTA buttons
- [ ] Checkout completes successfully in overlay
- [ ] Thank-you page loads after purchase
- [ ] Fallback works when JS is disabled
- [ ] Analytics events fire (check browser dev tools)
- [ ] Mobile overlay works correctly
- [ ] No console errors in browser

## 🐛 Troubleshooting

### Overlay Not Opening
1. Check browser console for errors
2. Verify Lemon Squeezy URL is correct
3. Ensure `js/lemonsqueezy.js` is loaded
4. Test in incognito mode (clear cache)

### Script Loading Issues
1. Check network tab for failed requests
2. Verify CDN availability (assets.lemonsqueezy.com)
3. Ensure script tag placement in `<head>`

### Analytics Not Tracking
1. Check GA4 and Meta Pixel setup in `js/analytics.js`
2. Verify tracking IDs are correct
3. Test with browser dev tools network tab

## 📊 Analytics Integration

The overlay automatically tracks:
- **GA4**: `begin_checkout` events
- **Meta Pixel**: `InitiateCheckout` events
- **Custom events**: Overlay opens and interactions

## 🎨 Customization

### Styling the Overlay
The overlay inherits Lemon Squeezy's styling. Customize in your Lemon Squeezy dashboard:
- Colors and branding
- Product display
- Checkout flow
- Success/thank-you pages

### Button Styling
Use existing CSS classes:
- `.btn` - Base button
- `.btn--primary` - Primary color
- `.btn--secondary` - Secondary color
- `.btn--lg` - Large size
- `.btn--full` - Full width

## 🔒 Security & Performance

- **Secure**: Uses HTTPS and Lemon Squeezy's PCI-compliant checkout
- **Fast**: Script loads asynchronously, doesn't block page rendering
- **Fallback**: Works without JavaScript enabled
- **Tracking**: Respects user privacy and consent

## 📞 Support

For Lemon Squeezy specific issues:
- [Lemon Squeezy Documentation](https://docs.lemonsqueezy.com)
- [Lemon Squeezy Support](https://lemonsqueezy.com/support)

For integration issues with this implementation, check the console logs and verify all placeholder URLs have been replaced.
