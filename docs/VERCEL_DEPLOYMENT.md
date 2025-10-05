# Vercel Deployment Guide

This guide provides step-by-step instructions for deploying the Sacred wellness website to Vercel.

## Prerequisites

- GitHub repository with the Sacred website code
- Vercel account (free tier available)
- Environment variables configured

## Environment Variables

Configure these in Vercel dashboard under Project Settings → Environment Variables:

### Required for Production
```
LEMON_SQUEEZY_WEBHOOK_SECRET=your_webhook_signing_secret_from_lemon_squeezy
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_API_SECRET=your_ga4_api_secret
META_PIXEL_ID=your_facebook_pixel_id
META_ACCESS_TOKEN=your_meta_access_token
```

### Optional (for testing)
```
NODE_ENV=production
```

## Deployment Steps

### Step 1: Connect Repository
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository `sacred-site`
4. Vercel will auto-detect Astro framework

### Step 2: Configure Project
1. **Framework Preset**: Astro (should auto-detect)
2. **Root Directory**: Leave as `./` (root)
3. **Build Settings**:
   - Build Command: `npm run build` (default)
   - Output Directory: `dist` (default)
   - Install Command: `npm install` (default)

### Step 3: Add Environment Variables
1. In Vercel dashboard, go to Project Settings → Environment Variables
2. Add all required environment variables (see list above)
3. Set environment to "Production" for all

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete (usually 2-3 minutes)
3. Your site will be available at `https://sacred-site.vercel.app`

## Custom Domain (Optional)

### Step 1: Add Domain
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `sacred-site.com`)
3. Follow DNS configuration instructions

### Step 2: Update Environment Variables
Update any hardcoded URLs in your code to use the custom domain instead of `sacred-site.vercel.app`.

## Webhook Configuration

### Lemon Squeezy Webhook Setup (Legacy Optional)
1. After deployment, get your production URL (e.g., `https://sacred-site.vercel.app`)
2. Go to Lemon Squeezy Dashboard → Settings → Webhooks
3. Create new webhook:
   - URL: `https://your-domain.com/api/webhooks/lemon-squeezy`
   - Events: "Order Created"
   - Copy the Signing Secret to `LEMON_SQUEEZY_WEBHOOK_SECRET`

## Testing Deployment

### Basic Functionality
- ✅ Homepage loads: `https://your-domain.com/`
- ✅ Blog pages: `https://your-domain.com/blog/`
- ✅ About page: `https://your-domain.com/about`
- ✅ Product page: `https://your-domain.com/product`
- ✅ Thank you page: `https://your-domain.com/thank-you/`

### Email Signup
- Fill out the email form and check localStorage for submissions

### Webhook Testing
- (Optional) Use Lemon Squeezy's "Test Webhook" feature
- Check Vercel function logs for successful attribution

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

### 404 Errors
- Check that static files are in `public/` directory
- Verify Astro routes are working
- Check Vercel function logs for API errors

### Webhook Not Working
- Verify webhook URL is correct
- Check webhook secret matches environment variable
- Review Vercel function logs for errors

### Analytics Not Tracking
- Ensure GA4 and Meta credentials are correct
- Check that webhooks are firing events
- Verify event parameters in respective dashboards

## Performance Optimization

### Automatic Optimizations
- ✅ Static asset optimization
- ✅ Image optimization (Astro handles this)
- ✅ Code splitting and tree shaking
- ✅ CDN distribution worldwide

### Manual Optimizations
- Enable Vercel Analytics for performance monitoring
- Set up proper caching headers (already configured)
- Monitor Core Web Vitals in Vercel dashboard

## Environment Comparison

| Feature | Local Development | Vercel Production |
|---------|------------------|-------------------|
| URL | `localhost:4321` | `your-domain.vercel.app` |
| API Routes | Local functions | Vercel serverless |
| Environment | `.env.local` | Vercel env vars |
| Build | Manual | Automatic on push |
| Performance | Local machine | Global CDN |

## Maintenance

### Updates
- Push changes to `main` branch for automatic deployment
- Monitor Vercel dashboard for build status
- Check function logs for webhook activity

### Monitoring
- Vercel Analytics for performance
- GA4 for user behavior
- Meta Events Manager for attribution
- Lemon Squeezy dashboard for sales (legacy accounts only)

## Support

If you encounter issues:
1. Check Vercel build logs
2. Review environment variable configuration
3. Verify webhook URLs and secrets
4. Test locally before deploying

For more help, refer to the main documentation in `docs/` or Vercel documentation.
