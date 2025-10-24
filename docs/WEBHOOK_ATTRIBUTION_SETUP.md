# Webhook Attribution Setup Guide

This guide explains how to set up server-side purchase attribution using Lemon Squeezy webhooks, GA4 Measurement Protocol, and Meta Conversions API.

> **Note:** Gumroad is the active storefront. The Lemon Squeezy webhook remains available as a legacy integration for teams who still rely on that provider.

## Overview

The serverless function at `/api/webhooks/lemon-squeezy` receives Lemon Squeezy purchase webhooks and automatically sends server-side Purchase events to both Google Analytics 4 and Meta (Facebook) Pixel.

## Environment Variables Setup

### 1. Lemon Squeezy Webhook Secret

1. Go to your [Lemon Squeezy Dashboard](https://app.lemonsqueezy.com)
2. Navigate to Settings → Webhooks
3. Create a new webhook for "Order Created" events
4. Set the URL to: `https://your-domain.com/api/webhooks/lemon-squeezy`
5. Copy the "Signing Secret" - this becomes `LEMON_SQUEEZY_WEBHOOK_SECRET`

### 2. Google Analytics 4 Setup

1. Go to your [GA4 Property](https://analytics.google.com)
2. Navigate to Admin → Data Streams → Web → [Your Stream]
3. Click "Measurement Protocol API secrets"
4. Create a new secret and copy the API Secret - this becomes `GA4_API_SECRET`
5. Your Measurement ID (starts with "G-") becomes `GA4_MEASUREMENT_ID`

### 3. Meta (Facebook) Pixel Setup

1. Go to your [Meta Events Manager](https://business.facebook.com/events_manager)
2. Select your Pixel
3. Go to Settings → Conversions API
4. Generate an Access Token - this becomes `META_ACCESS_TOKEN`
5. Your Pixel ID becomes `META_PIXEL_ID`

### 4. Vercel Environment Variables

Set these in your Vercel dashboard under Project Settings → Environment Variables:

```
LEMON_SQUEEZY_WEBHOOK_SECRET=your_webhook_signing_secret
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_API_SECRET=your_ga4_api_secret
META_PIXEL_ID=your_pixel_id
META_ACCESS_TOKEN=your_meta_access_token
```

## Testing the Webhook

### Option 1: Lemon Squeezy Test Webhook

1. In Lemon Squeezy webhook settings, click "Test Webhook"
2. The function will log the event and attempt to send tracking data
3. Check your Vercel function logs for success/failure messages

### Option 2: Manual Test with cURL

```bash
curl -X POST https://your-domain.com/api/webhooks/lemon-squeezy \
  -H "Content-Type: application/json" \
  -H "x-signature: test_signature" \
  -d '{
    "meta": {
      "event_name": "order_created"
    },
    "data": {
      "id": "12345",
      "attributes": {
        "total": 3700,
        "currency": "usd",
        "user_email": "test@example.com",
        "user_name": "Test User",
        "created_at": "2024-12-03T12:00:00Z"
      }
    }
  }'
```

## Validation

### Check GA4 Events

1. Go to GA4 → Reports → Realtime
2. Look for Purchase events
3. Check DebugView for detailed event data

### Check Meta Events

1. Go to Events Manager → Test Events
2. Look for Purchase events with your test_event_code
3. Verify event parameters match expected values

## Troubleshooting

### Webhook Not Received

- Check webhook URL is correct and publicly accessible
- Verify webhook secret is set correctly
- Check Vercel function logs for errors

### GA4 Events Not Appearing

- Verify GA4_MEASUREMENT_ID and GA4_API_SECRET are correct
- Check GA4 DebugView for rejected events
- Ensure Measurement Protocol is enabled in GA4

### Meta Events Not Appearing

- Verify META_PIXEL_ID and META_ACCESS_TOKEN are correct
- Check Conversions API settings in Meta Events Manager
- Look for API errors in Vercel function logs

## Security Notes

- Webhook signatures are validated using HMAC-SHA256
- All user data is hashed before sending to Meta (required by their API)
- No sensitive payment data is logged or stored
- Environment variables are server-side only

## Event Data Mapping

The webhook maps Lemon Squeezy order data to tracking events:

- **Transaction ID**: `ls_{order_id}` (prefixed to avoid conflicts)
- **Value**: Order total in dollars (converted from cents)
- **Currency**: Order currency (converted to uppercase)
- **Items**: Single item "Menopause Sleep Recovery Guide" with order value
- **Customer Data**: Email and name (hashed for Meta, not sent to GA4)

## Monitoring

Check Vercel function logs regularly for:
- Successful webhook processing
- Failed tracking calls
- Invalid signatures or malformed data
- Rate limiting or API errors
