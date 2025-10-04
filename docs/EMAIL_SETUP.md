# Email Signup Setup Guide

This guide explains how to connect your email signup form to Mailchimp or other email service providers (ESPs).

## Current Setup

The email signup form currently saves submissions to localStorage as a fallback. This allows you to test the form functionality while setting up your ESP.

### To view saved subscribers (for testing):

1. Open browser developer console (F12)
2. Run: `exportSubscribers()`
3. This will log all saved subscriber data to the console

## Connecting to Mailchimp

### Step 1: Get your Mailchimp form endpoint

1. Go to your Mailchimp dashboard
2. Navigate to Audience → Signup forms → Embedded forms
3. Copy the form action URL from the generated code
4. It will look like: `https://yourusername.us1.list-manage.com/subscribe/post?u=YOUR_USER_ID&id=YOUR_LIST_ID`

### Step 2: Update the configuration

In `assets/js/app.js`, find the `EMAIL_CONFIG` object and update:

```javascript
const EMAIL_CONFIG = {
    // Replace with your Mailchimp endpoint
    endpoint: 'https://yourusername.us1.list-manage.com/subscribe/post?u=YOUR_USER_ID&id=YOUR_LIST_ID',
    apiKey: null,
    privacyText: 'We respect your privacy. Unsubscribe at any time.'
};
```

### Step 3: Test the integration

1. Submit the form with test data
2. Check your Mailchimp audience to confirm the subscriber was added
3. The form will still save to localStorage as a backup

## Alternative ESPs

### ConvertKit

```javascript
const EMAIL_CONFIG = {
    endpoint: 'https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe',
    apiKey: 'YOUR_API_KEY',
    privacyText: 'We respect your privacy. Unsubscribe at any time.'
};
```

### Beehiiv

```javascript
const EMAIL_CONFIG = {
    endpoint: 'https://api.beehiiv.com/v2/publications/YOUR_PUBLICATION_ID/subscriptions',
    apiKey: 'YOUR_API_KEY',
    privacyText: 'We respect your privacy. Unsubscribe at any time.'
};
```

## Form Features

- ✅ Client-side validation (name and email required)
- ✅ Email format validation
- ✅ Loading states during submission
- ✅ Success/error notifications
- ✅ Form reset after successful submission
- ✅ Privacy notice
- ✅ localStorage backup
- ✅ Easy ESP configuration

## Troubleshooting

- **Form not submitting**: Check browser console for JavaScript errors
- **ESP not receiving data**: Verify endpoint URL and field names
- **CORS errors**: Some ESPs require server-side proxy for CORS
- **Subscribers not saving**: Check localStorage permissions in browser

## Privacy & Compliance

- The privacy notice is configurable in `EMAIL_CONFIG.privacyText`
- Consider adding GDPR consent checkboxes for EU users
- Review your ESP's privacy policy and data handling practices
