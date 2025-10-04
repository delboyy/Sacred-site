// Serverless function for Lemon Squeezy webhook attribution
// Handles purchase events and sends server-side tracking to GA4 and Meta

import crypto from 'crypto';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      LEMON_SQUEEZY_WEBHOOK_SECRET,
      GA4_MEASUREMENT_ID,
      GA4_API_SECRET,
      META_PIXEL_ID,
      META_ACCESS_TOKEN
    } = process.env;

    // Validate required environment variables
    if (!LEMON_SQUEEZY_WEBHOOK_SECRET) {
      console.error('Missing LEMON_SQUEEZY_WEBHOOK_SECRET');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Verify webhook signature
    const signature = req.headers['x-signature'];
    if (!signature) {
      console.error('Missing webhook signature');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', LEMON_SQUEEZY_WEBHOOK_SECRET)
      .update(body)
      .digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const event = req.body;

    // Log the event for debugging
    console.log('Lemon Squeezy webhook received:', {
      event_name: event.meta?.event_name,
      order_id: event.data?.id,
      customer_email: event.data?.attributes?.user_email,
      total: event.data?.attributes?.total_formatted
    });

    // Only process order_created events (successful purchases)
    if (event.meta?.event_name !== 'order_created') {
      console.log('Ignoring non-purchase event:', event.meta?.event_name);
      return res.status(200).json({ message: 'Event ignored' });
    }

    const orderData = event.data.attributes;
    const customerData = event.data.attributes;

    // Prepare event data
    const purchaseData = {
      transaction_id: `ls_${event.data.id}`,
      value: parseFloat(orderData.total) / 100, // Convert cents to dollars
      currency: orderData.currency.toUpperCase(),
      customer_email: customerData.user_email,
      customer_name: customerData.user_name,
      order_id: event.data.id,
      timestamp: new Date(orderData.created_at).getTime()
    };

    console.log('Processing purchase event:', purchaseData);

    // Send to GA4 Measurement Protocol
    const ga4Promises = [];
    if (GA4_MEASUREMENT_ID && GA4_API_SECRET) {
      ga4Promises.push(sendToGA4(purchaseData, GA4_MEASUREMENT_ID, GA4_API_SECRET));
    } else {
      console.warn('GA4 credentials not configured');
    }

    // Send to Meta Conversions API
    const metaPromises = [];
    if (META_PIXEL_ID && META_ACCESS_TOKEN) {
      metaPromises.push(sendToMeta(purchaseData, META_PIXEL_ID, META_ACCESS_TOKEN));
    } else {
      console.warn('Meta credentials not configured');
    }

    // Wait for all tracking calls to complete
    const results = await Promise.allSettled([...ga4Promises, ...metaPromises]);

    // Log results
    results.forEach((result, index) => {
      const service = index < ga4Promises.length ? 'GA4' : 'Meta';
      if (result.status === 'fulfilled') {
        console.log(`${service} tracking successful:`, result.value);
      } else {
        console.error(`${service} tracking failed:`, result.reason);
      }
    });

    // Check if any tracking failed
    const hasFailures = results.some(result => result.status === 'rejected');
    if (hasFailures) {
      console.warn('Some tracking calls failed, but webhook processed successfully');
    }

    res.status(200).json({
      message: 'Purchase attribution processed successfully',
      transaction_id: purchaseData.transaction_id,
      ga4_sent: ga4Promises.length > 0,
      meta_sent: metaPromises.length > 0
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Send event to Google Analytics 4 Measurement Protocol
async function sendToGA4(purchaseData, measurementId, apiSecret) {
  const ga4Payload = {
    client_id: `lemon_squeezy_${purchaseData.transaction_id}`,
    events: [{
      name: 'purchase',
      params: {
        transaction_id: purchaseData.transaction_id,
        value: purchaseData.value,
        currency: purchaseData.currency,
        items: [{
          item_name: 'Menopause Support Guide',
          item_id: 'menopause_guide',
          price: purchaseData.value,
          quantity: 1,
          category: 'digital_product'
        }]
      }
    }]
  };

  const response = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ga4Payload)
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GA4 API error: ${response.status} - ${errorText}`);
  }

  return { status: response.status, success: true };
}

// Send event to Meta Conversions API
async function sendToMeta(purchaseData, pixelId, accessToken) {
  // Create a test event code for server-side tracking
  const testEventCode = `TEST_${Date.now()}`;

  const metaPayload = {
    data: [{
      event_name: 'Purchase',
      event_time: Math.floor(purchaseData.timestamp / 1000),
      event_id: purchaseData.transaction_id,
      user_data: {
        em: hashString(purchaseData.customer_email?.toLowerCase()),
        fn: hashString(purchaseData.customer_name?.split(' ')[0]?.toLowerCase()),
        ln: hashString(purchaseData.customer_name?.split(' ').slice(1).join(' ')?.toLowerCase()),
        external_id: hashString(purchaseData.order_id)
      },
      custom_data: {
        value: purchaseData.value,
        currency: purchaseData.currency,
        content_name: 'Menopause Support Guide',
        content_type: 'product',
        content_ids: ['menopause_guide']
      },
      event_source_url: 'https://sacred-site.com/thank-you/',
      action_source: 'website'
    }],
    test_event_code: testEventCode
  };

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(metaPayload)
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Meta API error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const result = await response.json();
  return { ...result, test_event_code: testEventCode };
}

// Hash function for Meta's user data requirements
function hashString(str) {
  if (!str) return null;
  return crypto.createHash('sha256').update(str).digest('hex');
}
