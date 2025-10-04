# Analytics Setup Guide

## GA4 Base Tag (Global Site Tag)

Add this to the `<head>` of every HTML page, replacing `GA4_MEASUREMENT_ID` with your actual Google Analytics 4 Measurement ID:

```html
<!-- GA4 Base Tag - REPLACE GA4_MEASUREMENT_ID with your actual ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA4_MEASUREMENT_ID"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA4_MEASUREMENT_ID');
</script>
```

### How to Get Your GA4 Measurement ID:
1. Go to [Google Analytics](https://analytics.google.com)
2. Select your property (or create one)
3. Go to Admin → Property → Data Streams
4. Click on your web data stream
5. Copy the "Measurement ID" (format: `G-XXXXXXXXXX`)

## Meta Pixel Base Code

Add this to the `<head>` of every HTML page, replacing `META_PIXEL_ID` with your actual Facebook Pixel ID:

```html
<!-- Meta Pixel Base Code - REPLACE META_PIXEL_ID with your actual ID -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'META_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=META_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
```

### How to Get Your Meta Pixel ID:
1. Go to [Facebook Business Manager](https://business.facebook.com)
2. Navigate to Events Manager
3. Select your Pixel (or create one)
4. Go to Settings tab
5. Copy the "Pixel ID"

## Combined Implementation

For the thank-you page, both are already included. For other pages, use this pattern:

```html
<head>
    <!-- GA4 Base Tag -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=GA4_MEASUREMENT_ID"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA4_MEASUREMENT_ID');
    </script>

    <!-- Meta Pixel Base Code -->
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'META_PIXEL_ID');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=META_PIXEL_ID&ev=PageView&noscript=1"
    /></noscript>
</head>
```

## Testing Events

### GA4 Purchase Event:
```javascript
gtag('event', 'purchase', {
    transaction_id: orderId,
    value: total,
    currency: 'USD',
    items: [{
        item_id: 'menopause-guide',
        item_name: 'Menopause Support Guide',
        category: 'Digital Product',
        price: total,
        quantity: 1
    }]
});
```

### Meta Pixel Purchase Event:
```javascript
fbq('track', 'Purchase', {
    value: total,
    currency: 'USD',
    content_name: 'Menopause Support Guide',
    content_type: 'product'
});
```

## Thank You Page URL Structure

The thank-you page expects these query parameters:
- `order_id`: Transaction ID from payment processor
- `total`: Total amount paid (numeric)
- `status`: Payment status (usually "success")

Example URL:
```
/thank-you/?order_id=12345&total=37.00&status=success
```

## Verification

To test the implementation:

1. **GA4 Events**: Check browser Network tab for requests to `googletagmanager.com`
2. **Meta Pixel Events**: Check browser Network tab for requests to `facebook.com/tr`
3. **Console Logs**: The page logs successful event firing
4. **UI**: Order details should display correctly from URL parameters

Both events should fire automatically when the thank-you page loads with valid query parameters.
