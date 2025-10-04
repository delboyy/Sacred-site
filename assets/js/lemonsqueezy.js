// Lemon Squeezy Overlay Checkout Integration
// Handles overlay checkout functionality with fallback to hosted checkout

(function() {
    'use strict';

    // Configuration
    const LEMON_SQUEEZY_SCRIPT_URL = 'https://assets.lemonsqueezy.com/lemon.js';

    // Initialize Lemon Squeezy when DOM is ready
    function initLemonSqueezy() {
        // Load Lemon Squeezy script if not already loaded
        if (!window.LemonSqueezy || !window.LemonSqueezyOverlay) {
            loadLemonSqueezyScript();
        }

        // Set up event listeners for CTA buttons
        setupOverlayButtons();
    }

    // Load Lemon Squeezy script dynamically
    function loadLemonSqueezyScript() {
        if (document.querySelector('script[src="' + LEMON_SQUEEZY_SCRIPT_URL + '"]')) {
            return; // Script already loaded
        }

        const script = document.createElement('script');
        script.src = LEMON_SQUEEZY_SCRIPT_URL;
        script.async = true;
        script.onload = function() {
            console.log('Lemon Squeezy script loaded successfully');
            setupOverlayButtons(); // Re-setup buttons after script loads
        };
        script.onerror = function() {
            console.error('Failed to load Lemon Squeezy script');
        };

        document.head.appendChild(script);
    }

    // Set up overlay buttons with data attributes
    function setupOverlayButtons() {
        const overlayButtons = document.querySelectorAll('[data-ls-overlay]');

        overlayButtons.forEach(button => {
            // Remove existing event listeners to avoid duplicates
            button.removeEventListener('click', handleOverlayClick);

            // Add click handler
            button.addEventListener('click', handleOverlayClick);
        });
    }

    // Handle overlay button clicks
    function handleOverlayClick(event) {
        event.preventDefault();

        const button = event.currentTarget;
        const productUrl = button.getAttribute('data-ls-overlay');

        if (!productUrl) {
            console.error('No Lemon Squeezy URL provided for overlay');
            return;
        }

        // Check if Lemon Squeezy is available
        if (window.LemonSqueezy && window.LemonSqueezyOverlay) {
            try {
                // Open overlay checkout
                window.LemonSqueezyOverlay(productUrl).open();

                // Track the click event
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

                // Meta Pixel tracking
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'InitiateCheckout', {
                        content_name: 'Menopause Support Guide',
                        value: 37,
                        currency: 'USD',
                        num_items: 1
                    });
                }

                console.log('Lemon Squeezy overlay opened for:', productUrl);
            } catch (error) {
                console.error('Failed to open Lemon Squeezy overlay:', error);
                fallbackToHostedCheckout(productUrl);
            }
        } else {
            console.warn('Lemon Squeezy not available, falling back to hosted checkout');
            fallbackToHostedCheckout(productUrl);
        }
    }

    // Fallback to hosted checkout when overlay fails or JS is disabled
    function fallbackToHostedCheckout(url) {
        window.open(url, '_blank');
    }

    // Public API for manual initialization (useful for dynamic content)
    window.initLemonSqueezy = initLemonSqueezy;
    window.LemonSqueezyUtils = {
        refreshButtons: setupOverlayButtons,
        openOverlay: function(url) {
            if (window.LemonSqueezy && window.LemonSqueezyOverlay) {
                window.LemonSqueezyOverlay(url).open();
            } else {
                fallbackToHostedCheckout(url);
            }
        }
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLemonSqueezy);
    } else {
        initLemonSqueezy();
    }

    // Handle dynamic content (if buttons are added after initial load)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if any new overlay buttons were added
                const hasNewButtons = Array.from(mutation.addedNodes).some(node => {
                    return node.nodeType === 1 && (
                        node.hasAttribute && node.hasAttribute('data-ls-overlay') ||
                        node.querySelector && node.querySelector('[data-ls-overlay]')
                    );
                });

                if (hasNewButtons) {
                    setTimeout(setupOverlayButtons, 100); // Small delay to ensure DOM is ready
                }
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
