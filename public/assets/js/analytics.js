// Analytics and Tracking Setup for Sacred
// Includes GA4 and Meta Pixel integration

// Configuration - Replace with your actual tracking IDs
const GA4_MEASUREMENT_ID = 'G-07JR5BCFXW';
const GTM_CONTAINER_ID = 'GTM-NN9V3L8M';
const META_PIXEL_ID = 'XXXXXXXXXXXXXXXX'; // Replace with your Meta Pixel ID

const DEFAULT_PRODUCT = {
    id: 'menopause-relief',
    name: 'Menopause Support Guide',
    category: 'Digital Product',
    price: 19.99,
    currency: 'USD',
    url: 'https://sacredankh.gumroad.com/l/menopause-relief'
};

function getProductDetails() {
    const commerce = typeof window !== 'undefined' && typeof window.getCommerceConfig === 'function'
        ? window.getCommerceConfig()
        : null;
    const product = commerce?.product || {};

    return {
        id: product.id || DEFAULT_PRODUCT.id,
        name: product.name || DEFAULT_PRODUCT.name,
        category: DEFAULT_PRODUCT.category,
        price: Number(product.price) || DEFAULT_PRODUCT.price,
        currency: product.currency || DEFAULT_PRODUCT.currency,
        url: product.url || DEFAULT_PRODUCT.url
    };
}

// Initialize analytics when DOM is ready
function initializeAnalytics() {
    initGA4();
    initMetaPixel();
    setupEcommerceTracking();
}

// Google Analytics 4 Setup
function initGA4() {
    const configureGA4 = () => {
        if (typeof gtag !== 'function') {
            console.warn('gtag not available for GA4 configuration');
            return;
        }

        gtag('config', GA4_MEASUREMENT_ID, {
            'custom_map': {'custom_parameter': 'custom_value'},
            'send_page_view': false,
            'ecommerce': true
        });

        console.log('GA4 configured with ID:', GA4_MEASUREMENT_ID);
    };

    if (typeof gtag === 'function') {
        configureGA4();
        return;
    }

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);} // eslint-disable-line no-inner-declarations
    window.gtag = gtag;

    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    gtagScript.addEventListener('load', configureGA4);
    document.head.appendChild(gtagScript);

    gtag('js', new Date());
}

// Meta Pixel Setup
function initMetaPixel() {
    // Load Meta Pixel script
    const fbScript = document.createElement('script');
    fbScript.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
    `;
    document.head.appendChild(fbScript);

    // Also load noscript pixel
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
        <img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1"/>
    `;
    document.body.appendChild(noscript);

    console.log('Meta Pixel initialized with ID:', META_PIXEL_ID);
}

// E-commerce Tracking Setup
function setupEcommerceTracking() {
    // Track product views
    trackProductViews();

    // Track add to cart events
    trackAddToCart();

    // Track checkout initiation
    trackCheckout();

    // Enhanced ecommerce setup for GA4
    if (typeof gtag !== 'undefined') {
        const product = getProductDetails();
        gtag('event', 'view_item', {
            currency: product.currency,
            value: product.price,
            items: [{
                item_id: product.id,
                item_name: product.name,
                category: product.category,
                price: product.price,
                quantity: 1
            }]
        });
    }
}

// Track product view events
function trackProductViews() {
    // Track when user views product details
    const productSections = document.querySelectorAll('.sap-landing__product, .product-page__hero, .product-summary__details');

    if (productSections.length > 0) {
        const product = getProductDetails();
        // Track product view on page load for product pages
        if (typeof gtag !== 'undefined') {
            gtag('event', 'view_item', {
                currency: product.currency,
                value: product.price,
                items: [{
                    item_id: product.id,
                    item_name: product.name,
                    category: product.category,
                    price: product.price
                }]
            });
        }

        // Meta Pixel ViewContent event
        if (typeof fbq !== 'undefined') {
            fbq('track', 'ViewContent', {
                content_name: product.name,
                content_category: product.category,
                value: product.price,
                currency: product.currency
            });
        }
    }
}

// Track add to cart events
function trackAddToCart() {
    const buttons = new Set([
        ...document.querySelectorAll('[data-commerce-url]'),
        ...document.querySelectorAll('a[href="checkout.html"], .btn[href="checkout.html"]')
    ]);

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const product = getProductDetails();
            // GA4 Add to Cart event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'add_to_cart', {
                    currency: product.currency,
                    value: product.price,
                    items: [{
                        item_id: product.id,
                        item_name: product.name,
                        category: product.category,
                        price: product.price,
                        quantity: 1
                    }]
                });
            }

            // Meta Pixel AddToCart event
            if (typeof fbq !== 'undefined') {
                fbq('track', 'AddToCart', {
                    content_name: product.name,
                    content_category: product.category,
                    value: product.price,
                    currency: product.currency
                });
            }

            console.log('Add to cart tracked');
        });
    });
}

// Track checkout initiation
function trackCheckout() {
    // Track when user visits checkout page
    if (window.location.pathname.includes('checkout')) {
        const product = getProductDetails();
        // GA4 Begin Checkout event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'begin_checkout', {
                currency: product.currency,
                value: product.price,
                items: [{
                    item_id: product.id,
                    item_name: product.name,
                    category: product.category,
                    price: product.price,
                    quantity: 1
                }]
            });
        }

        // Meta Pixel InitiateCheckout event
        if (typeof fbq !== 'undefined') {
            fbq('track', 'InitiateCheckout', {
                content_name: product.name,
                value: product.price,
                currency: product.currency,
                num_items: 1
            });
        }

        console.log('Checkout initiation tracked');
    }
}

// Track email signups
function trackEmailSignup() {
    const signupContainers = document.querySelectorAll('[data-mailerlite-signup]');

    signupContainers.forEach(container => {
        container.addEventListener('click', function handleMailerLiteSignup(event) {
            const interactive = event.target.closest('button, a, input[type="submit"]');
            if (!interactive) {
                return;
            }

            // GA4 Lead generation event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'generate_lead', {
                    currency: 'USD',
                    value: 0,
                    method: 'mailerlite_embed'
                });
            }

            // Meta Pixel Lead event
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'Email Signup',
                    content_category: 'Newsletter',
                    signup_method: 'mailerlite_embed'
                });
            }

            console.log('Email signup tracked');
        });
    });
}

// Track blog engagement
function trackBlogEngagement() {
    // Track blog post views
    if (window.location.pathname.includes('/blog/')) {
        const postTitle = document.querySelector('h1')?.textContent || 'Blog Post';

        // GA4 Article engagement
        if (typeof gtag !== 'undefined') {
            gtag('event', 'article_engagement', {
                article_title: postTitle,
                article_category: 'Wellness Blog'
            });
        }
    }

    // Track blog link clicks
    const blogLinks = document.querySelectorAll('a[href*="blog"]');
    blogLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'blog_navigation', {
                    blog_destination: this.href
                });
            }
        });
    });
}

// Track social media engagement
function trackSocialEngagement() {
    const socialLinks = document.querySelectorAll('.social-link, .footer__social a');

    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.href.includes('instagram') ? 'Instagram' :
                           this.href.includes('facebook') ? 'Facebook' :
                           this.href.includes('pinterest') ? 'Pinterest' : 'Social';

            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_interaction', {
                    social_platform: platform,
                    social_action: 'follow'
                });
            }
        });
    });
}

// Error tracking
function setupErrorTracking() {
    window.addEventListener('error', function(e) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: e.message,
                fatal: false
            });
        }
    });

    window.addEventListener('unhandledrejection', function(e) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: e.reason,
                fatal: false
            });
        }
    });
}

// Performance tracking
function trackPerformance() {
    // Track page load performance
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (typeof gtag !== 'undefined' && 'performance' in window) {
                const perfData = performance.getEntriesByType('navigation')[0];

                gtag('event', 'page_load_time', {
                    page_load_time: perfData.loadEventEnd - perfData.fetchStart,
                    page_location: window.location.href
                });
            }
        }, 0);
    });
}

// Utility function to track custom events
function trackCustomEvent(eventName, parameters = {}) {
    // GA4 custom event
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }

    // Meta Pixel custom event (if applicable)
    if (typeof fbq !== 'undefined' && parameters.pixelEvent) {
        fbq('trackCustom', parameters.pixelEvent, parameters);
    }

    console.log('Custom event tracked:', eventName, parameters);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeAnalytics();
    trackEmailSignup();
    trackBlogEngagement();
    trackSocialEngagement();
    setupErrorTracking();
    trackPerformance();
});

// Export functions for global access
window.initializeAnalytics = initializeAnalytics;
window.trackCustomEvent = trackCustomEvent;
