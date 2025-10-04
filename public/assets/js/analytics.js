// Analytics and Tracking Setup for Sacred
// Includes GA4 and Meta Pixel integration

// Configuration - Replace with your actual tracking IDs
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 Measurement ID
const META_PIXEL_ID = 'XXXXXXXXXXXXXXXX'; // Replace with your Meta Pixel ID

// Initialize analytics when DOM is ready
function initializeAnalytics() {
    initGA4();
    initMetaPixel();
    setupEcommerceTracking();
}

// Google Analytics 4 Setup
function initGA4() {
    // Load Google Analytics script
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(gtagScript);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, {
        'custom_map': {'custom_parameter': 'custom_value'},
        'send_page_view': true,
        'ecommerce': true
    });

    console.log('GA4 initialized with ID:', GA4_MEASUREMENT_ID);
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
        gtag('event', 'view_item', {
            currency: 'USD',
            value: 37,
            items: [{
                item_id: 'menopause-guide',
                item_name: 'Menopause Support Guide',
                category: 'Digital Product',
                price: 37,
                quantity: 1
            }]
        });
    }
}

// Track product view events
function trackProductViews() {
    // Track when user views product details
    const productSections = document.querySelectorAll('.product-hero, .featured-product');

    if (productSections.length > 0) {
        // Track product view on page load for product pages
        if (typeof gtag !== 'undefined') {
            gtag('event', 'view_item', {
                currency: 'USD',
                value: 37,
                items: [{
                    item_id: 'menopause-guide',
                    item_name: 'Menopause Support Guide',
                    category: 'Digital Product',
                    price: 37
                }]
            });
        }

        // Meta Pixel ViewContent event
        if (typeof fbq !== 'undefined') {
            fbq('track', 'ViewContent', {
                content_name: 'Menopause Support Guide',
                content_category: 'Digital Product',
                value: 37,
                currency: 'USD'
            });
        }
    }
}

// Track add to cart events
function trackAddToCart() {
    const addToCartButtons = document.querySelectorAll('a[href="checkout.html"], .btn[href="checkout.html"]');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // GA4 Add to Cart event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'add_to_cart', {
                    currency: 'USD',
                    value: 37,
                    items: [{
                        item_id: 'menopause-guide',
                        item_name: 'Menopause Support Guide',
                        category: 'Digital Product',
                        price: 37,
                        quantity: 1
                    }]
                });
            }

            // Meta Pixel AddToCart event
            if (typeof fbq !== 'undefined') {
                fbq('track', 'AddToCart', {
                    content_name: 'Menopause Support Guide',
                    content_category: 'Digital Product',
                    value: 37,
                    currency: 'USD'
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
        // GA4 Begin Checkout event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'begin_checkout', {
                currency: 'USD',
                value: 37,
                items: [{
                    item_id: 'menopause-guide',
                    item_name: 'Menopause Support Guide',
                    category: 'Digital Product',
                    price: 37,
                    quantity: 1
                }]
            });
        }

        // Meta Pixel InitiateCheckout event
        if (typeof fbq !== 'undefined') {
            fbq('track', 'InitiateCheckout', {
                content_name: 'Menopause Support Guide',
                value: 37,
                currency: 'USD',
                num_items: 1
            });
        }

        console.log('Checkout initiation tracked');
    }
}

// Track email signups
function trackEmailSignup() {
    const signupForms = document.querySelectorAll('.signup__form');

    signupForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // GA4 Lead generation event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'generate_lead', {
                    currency: 'USD',
                    value: 0
                });
            }

            // Meta Pixel Lead event
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'Email Signup',
                    content_category: 'Newsletter'
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

