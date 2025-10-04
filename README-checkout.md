# Checkout & Gumroad Integration Guide

## 1. Where the Gumroad link is configured
- Primary source of truth lives in `config/commerce.json:4`. Update the `sleep_guide` URL there first.
- The storefront templates read the same value via build scripts, but there are hard-coded fallbacks you should keep in sync:
  - `public/index.html:178` (hero CTA) and `public/index.html:315` (product CTA)
  - `public/checkout.html:152`
  - `public/thank-you/index.html:307` (embed script include)

## 2. Set the redirect after purchase in Gumroad
1. Log in to Gumroad → `Products` → select the product linked above.
2. Open the **Checkout** tab and expand **Post-purchase** → **Redirect to URL**.
3. Enter your thank-you URL, e.g. `https://sacredapothecary.xyz/thank-you/`.
4. (Optional) Append static query params if you want to pre-fill data: `https://sacredapothecary.xyz/thank-you/?status=paid`.
5. Save changes. Gumroad will send buyers to that page immediately after checkout, whether they bought via the overlay or the hosted page.

> Gumroad currently does not expose order variables in the redirect URL; you’ll need server/webhook data for dynamic IDs.

## 3. Test `/thank-you` locally or in production
Use query parameters to simulate a return from Gumroad:

```
https://sacredapothecary.xyz/thank-you/?order_id=TEST123&total=37.00&status=paid&email=test%40example.com
```

Locally you can hit `http://localhost:4321/thank-you/?order_id=TEST123&total=37.00&status=paid` while the Astro preview server is running.

## 4. Content Security Policy allow-list
If you enforce CSP headers, include these domains in addition to your own origin:

- `script-src`: allow `https://gumroad.com/js/gumroad-embed.js`
- `frame-src`: allow `https://gumroad.com`
- `img-src`: allow `https://gumroadusercontent.com`
- `connect-src` (if you lock it down): allow `https://gumroad.com`

Example snippet:

```
Content-Security-Policy: \
  default-src 'self'; \
  script-src 'self' https://gumroad.com/js/gumroad-embed.js; \
  frame-src 'self' https://gumroad.com; \
  img-src 'self' https://gumroadusercontent.com data:; \
  connect-src 'self' https://gumroad.com;
```

## 5. Flip providers in `commerce.json`
1. Open `config/commerce.json`.
2. Change the `provider` key to either `"gumroad"` or `"lemonsqueezy"`.
3. Update the product URLs under `links` to match the provider you selected.
4. Search the public templates for the old provider URLs (see section 1) and update fallback anchors if needed.
5. Rebuild (`npm run build`) before deploying so Astro regenerates any server output that reads this config.
