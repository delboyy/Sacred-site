// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav__link');
const pages = document.querySelectorAll('.page');

// State management
let currentPage = 'home';
const stickyCTA = document.getElementById('mobileStickyCTA');
const stickyCTAButton = document.getElementById('mobileStickyCTAButton');
const mobileCTAMediaQuery = window.matchMedia('(max-width: 767px)');

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAccordions();
    initializeFormHandling();
    initializeStickyCTA();
    initializeLandingComponents();

    if (window.location.hash === '#product') {
        scrollToLandingSection('product');
    }
});

window.addEventListener('hashchange', function() {
    if (window.location.hash === '#product') {
        scrollToLandingSection('product');
    }
});

// Navigation Functions
function initializeNavigation() {
    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }
    
    // Navigation link clicks
    navLinks.forEach(link => {
        const targetPage = link.getAttribute('data-page');
        const scrollTarget = link.getAttribute('data-scroll-target');

        if (targetPage) {
            link.addEventListener('click', handleNavClick);
        } else if (scrollTarget) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                closeMobileNav();
                scrollToLandingSection(scrollTarget);
            });
        }
    });
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navToggle && !navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            closeMobileNav();
        }
    });
}

function toggleMobileNav() {
    if (navMenu && navToggle) {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    }
}

function closeMobileNav() {
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}

function handleNavClick(event) {
    const link = event.currentTarget;
    const targetPage = link.getAttribute('data-page');

    if (!targetPage) {
        closeMobileNav();
        return; // allow default navigation for external links
    }

    event.preventDefault();
    navigateToPage(targetPage);
    closeMobileNav();
}

function navigateToPage(pageName) {
    if (pageName === currentPage) return;

    // Hide current page
    const currentPageElement = document.getElementById(currentPage);
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }
    
    // Show new page
    const newPageElement = document.getElementById(pageName);
    if (newPageElement) {
        newPageElement.classList.add('active');
        currentPage = pageName;
        
        // Update navigation active state
        updateNavActiveState(pageName);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update page title
        updatePageTitle(pageName);

        updateStickyCTAVisibility(false);
    }
}

function updateNavActiveState(activePage) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === activePage) {
            link.classList.add('active');
        }
    });
}

function updatePageTitle(pageName) {
    const titles = {
        home: 'Sacred - Nature\'s Secret for Everlasting Balance',
        about: 'About Us - Sacred'
    };
    
    document.title = titles[pageName] || 'Sacred';
}

function initializeStickyCTA() {
    if (!stickyCTA) {
        return;
    }
    const productSection = document.querySelector('.sap-landing__product');
    let productSectionVisible = productSection ? false : true;

    if (productSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                productSectionVisible = entry.isIntersecting;
                updateStickyCTAVisibility(productSectionVisible);
            });
        }, { threshold: 0.25 });

        observer.observe(productSection);
    }

    updateStickyCTAVisibility(productSectionVisible);

    if (stickyCTAButton) {
        stickyCTAButton.addEventListener('click', function() {
            stickyCTAButton.setAttribute('aria-pressed', 'true');
            setTimeout(() => stickyCTAButton.setAttribute('aria-pressed', 'false'), 1200);
        });
    }

    if (mobileCTAMediaQuery && typeof mobileCTAMediaQuery.addEventListener === 'function') {
        mobileCTAMediaQuery.addEventListener('change', () => {
            updateStickyCTAVisibility(productSectionVisible);
        });
    } else if (mobileCTAMediaQuery && typeof mobileCTAMediaQuery.addListener === 'function') {
        mobileCTAMediaQuery.addListener(() => {
            updateStickyCTAVisibility(productSectionVisible);
        });
    }
}

function updateStickyCTAVisibility(shouldShow) {
    if (!stickyCTA) {
        return;
    }

    let hasCompletedPurchase = false;

    try {
        hasCompletedPurchase = sessionStorage.getItem('sacredPurchaseCompleted') === 'true';
    } catch (error) {
        hasCompletedPurchase = false;
    }
    const canDisplay = shouldShow && mobileCTAMediaQuery.matches && !hasCompletedPurchase;

    if (canDisplay) {
        stickyCTA.classList.add('mobile-sticky-cta--visible');
        document.body.classList.add('mobile-cta-visible');
    } else {
        stickyCTA.classList.remove('mobile-sticky-cta--visible');
        document.body.classList.remove('mobile-cta-visible');
    }
}

// Landing page enhancements
function initializeLandingComponents() {
    const landingRoot = document.querySelector('.sap-landing');
    if (!landingRoot) {
        return;
    }

    setupLandingScrollLinks(landingRoot);
    setupLandingCountdown();
    setupLandingTestimonials();
    setupGuideInventoryTicker();
}

function setupLandingScrollLinks(root) {
    const triggers = root.querySelectorAll('[data-scroll-target]');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = trigger.getAttribute('data-scroll-target');
            scrollToLandingSection(targetId);
        });
    });
}

function scrollToLandingSection(targetId) {
    if (!targetId) {
        return;
    }

    const resolvedId = resolveLandingTarget(targetId);

    if (currentPage !== 'home') {
        navigateToPage('home');
        setTimeout(() => smoothScrollToId(resolvedId), 350);
    } else {
        smoothScrollToId(resolvedId);
    }
}

function smoothScrollToId(id) {
    const element = document.getElementById(id);
    if (!element) {
        return;
    }

    const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
}

function resolveLandingTarget(targetId) {
    if (targetId === 'product') {
        if (document.getElementById('product')) {
            return 'product';
        }
        return 'product-section';
    }
    return targetId;
}

function setupLandingCountdown() {
    const hoursEl = document.getElementById('sap-countdown-hours');
    const minutesEl = document.getElementById('sap-countdown-minutes');
    const secondsEl = document.getElementById('sap-countdown-seconds');

    if (!hoursEl || !minutesEl || !secondsEl) {
        return;
    }

    const calculateTarget = () => {
        const now = new Date();
        const target = new Date();
        target.setHours(24, 0, 0, 0); // midnight next day
        if (target <= now) {
            target.setDate(target.getDate() + 1);
        }
        return target.getTime();
    };

    let targetTime = calculateTarget();

    const updateCountdown = () => {
        const now = Date.now();
        if (now >= targetTime) {
            targetTime = calculateTarget();
        }

        const distance = targetTime - now;
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        hoursEl.textContent = String(Math.max(hours, 0)).padStart(2, '0');
        minutesEl.textContent = String(Math.max(minutes, 0)).padStart(2, '0');
        secondsEl.textContent = String(Math.max(seconds, 0)).padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function setupLandingTestimonials() {
    const slider = document.querySelector('.sap-landing__testimonials');
    const testimonials = slider ? Array.from(slider.querySelectorAll('.sap-landing__testimonial')) : [];
    const dotsContainer = document.getElementById('sap-testimonial-dots');
    const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('button[data-sap-slide]')) : [];

    if (!slider || testimonials.length === 0) {
        return;
    }

    let index = 0;
    let autoplayTimer;

    const show = (nextIndex) => {
        testimonials.forEach((item, i) => {
            item.classList.toggle('is-active', i === nextIndex);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === nextIndex);
        });
        index = nextIndex;
    };

    const resetAutoplay = () => {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
        }
        autoplayTimer = setInterval(() => {
            const next = (index + 1) % testimonials.length;
            show(next);
        }, 7000);
    };

    resetAutoplay();

    dots.forEach((dot, dotIndex) => {
        dot.addEventListener('click', () => show(dotIndex));
        dot.addEventListener('click', resetAutoplay);
    });
}

function setupGuideInventoryTicker() {
    const counters = [
        document.getElementById('sap-guides-left'),
        document.getElementById('sap-guides-left-cta')
    ].filter(Boolean);

    if (counters.length === 0) {
        return;
    }

    let current = 47;
    counters.forEach(counter => counter.textContent = String(current));

    setInterval(() => {
        if (current <= 12) {
            return;
        }
        const decrement = Math.floor(Math.random() * 3);
        if (decrement === 0) {
            return;
        }
        current = Math.max(current - decrement, 12);
        counters.forEach(counter => counter.textContent = String(current));
    }, 20000);
}

// Accordion Functions
function initializeAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion__header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            toggleAccordion(this);
        });
    });
}

function toggleAccordion(headerElement) {
    const accordionItem = headerElement.closest('.accordion__item');
    if (!accordionItem) return;
    
    const isActive = accordionItem.classList.contains('active');
    
    // Close all other accordions in the same container
    const container = headerElement.closest('.product__accordion');
    if (container) {
        const allItems = container.querySelectorAll('.accordion__item');
        allItems.forEach(item => {
            item.classList.remove('active');
        });
    }
    
    // Toggle current accordion
    if (!isActive) {
        accordionItem.classList.add('active');
    }
}

// Form Handling Functions
function initializeFormHandling() {
    const emailForm = document.querySelector('.signup__form');
    if (emailForm) {
        emailForm.addEventListener('submit', handleEmailSignup);
    }
    
    // Ensure form inputs are properly initialized
    const nameInput = document.querySelector('.signup-name');
    const emailInput = document.querySelector('.signup-email');
    
    if (nameInput) {
        nameInput.addEventListener('input', function(e) {
            // Ensure input is working properly
            console.log('Name input:', e.target.value);
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', function(e) {
            // Ensure input is working properly
            console.log('Email input:', e.target.value);
        });
    }
}

// Email signup configuration - Easy to change for different ESPs
const EMAIL_CONFIG = {
    // Change this to your Mailchimp form endpoint
    // Format: 'https://yourusername.us1.list-manage.com/subscribe/post?u=youruserid&id=yourlistid'
    endpoint: null, // Set to null to use localStorage fallback

    // Or use ConvertKit, Beehiiv, etc.
    // ConvertKit example: 'https://api.convertkit.com/v3/forms/{form_id}/subscribe'
    apiKey: null,

    // Privacy notice text
    privacyText: 'We respect your privacy. Unsubscribe at any time.'
};

function handleEmailSignup(event) {
    event.preventDefault();

    const form = event.target;
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');

    if (!nameInput || !emailInput) {
        showNotification('Form inputs not found. Please try again.', 'error');
        return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    // Basic validation
    if (!name || !email) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) {
        showNotification('Submit button not found. Please try again.', 'error');
        return;
    }

    const originalText = submitButton.textContent;

    submitButton.textContent = 'Joining...';
    submitButton.disabled = true;

    // Try to submit to ESP, fallback to localStorage
    submitToESP(name, email)
        .then(() => {
            showNotification(`Thank you, ${name}! You've successfully joined our wellness community.`, 'success');
            form.reset();
        })
        .catch((error) => {
            console.error('Email signup error:', error);
            showNotification('Something went wrong. Please try again later.', 'error');
        })
        .finally(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
}

// Handle ESP submission with localStorage fallback
async function submitToESP(name, email) {
    const subscriberData = {
        name: name,
        email: email,
        timestamp: new Date().toISOString(),
        source: window.location.pathname
    };

    // If ESP endpoint is configured, try to submit there
    if (EMAIL_CONFIG.endpoint) {
        try {
            const formData = new FormData();
            formData.append('NAME', name);
            formData.append('EMAIL', email);
            // Add other fields as needed for your ESP

            const response = await fetch(EMAIL_CONFIG.endpoint, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // For Mailchimp forms
            });

            // Always save to localStorage as backup
            saveToLocalStorage(subscriberData);
            return Promise.resolve();

        } catch (error) {
            console.warn('ESP submission failed, saving locally:', error);
            saveToLocalStorage(subscriberData);
            throw error;
        }
    }

    // Fallback: Save to localStorage
    saveToLocalStorage(subscriberData);

    // Simulate network delay for realistic UX
    return new Promise(resolve => setTimeout(resolve, 1000));
}

// Save subscriber data to localStorage
function saveToLocalStorage(subscriberData) {
    try {
        const existing = JSON.parse(localStorage.getItem('sacred_subscribers') || '[]');
        existing.push(subscriberData);
        localStorage.setItem('sacred_subscribers', JSON.stringify(existing));
        console.log('Subscriber saved to localStorage:', subscriberData);
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
}

// Utility function to export subscribers (for admin use)
function exportSubscribers() {
    try {
        const subscribers = JSON.parse(localStorage.getItem('sacred_subscribers') || '[]');
        console.log('Current subscribers:', subscribers);
        return subscribers;
    } catch (error) {
        console.error('Failed to export subscribers:', error);
        return [];
    }
}

// Make functions available globally for easy access
window.exportSubscribers = exportSubscribers;

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close" onclick="closeNotification(this)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;
    
    // Add styles for notification
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 90px;
            right: 20px;
            max-width: 400px;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1100;
            animation: slideIn 0.3s ease-out;
            backdrop-filter: blur(10px);
        }
        
        .notification--success {
            background: rgba(124, 139, 106, 0.95);
            color: white;
            border: 1px solid #7C8B6A;
        }
        
        .notification--error {
            background: rgba(220, 38, 38, 0.95);
            color: white;
            border: 1px solid #dc2626;
        }
        
        .notification--info {
            background: rgba(59, 130, 246, 0.95);
            color: white;
            border: 1px solid #3b82f6;
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }
        
        .notification__message {
            flex: 1;
            font-size: 14px;
            line-height: 1.4;
        }
        
        .notification__close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease;
        }
        
        .notification__close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @media (max-width: 640px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    
    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification.querySelector('.notification__close'));
        }
    }, 5000);
}

function closeNotification(closeButton) {
    const notification = closeButton.closest('.notification');
    if (notification) {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll Effects
let lastScrollY = window.scrollY;

function handleScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        nav.classList.add('nav--scrolled');
    } else {
        nav.classList.remove('nav--scrolled');
    }
    
    lastScrollY = scrollY;
}

// Add scroll effect styles
const scrollStyles = `
    .nav--scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
`;

const scrollStyleSheet = document.createElement('style');
scrollStyleSheet.textContent = scrollStyles;
document.head.appendChild(scrollStyleSheet);

// Throttled scroll handler
const throttledScrollHandler = debounce(handleScroll, 10);
window.addEventListener('scroll', throttledScrollHandler);

// Intersection Observer for animations
function initializeAnimations() {
    if (!('IntersectionObserver' in window)) {
        // Fallback for browsers without IntersectionObserver support
        const animateElements = document.querySelectorAll('.benefit__card, .article__card, .value__card, .sap-landing__problem-card, .sap-landing__science-grid article, .sap-landing__highlight-card, .sap-landing__cta-card');
        animateElements.forEach(el => el.classList.add('animate-in'));
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.benefit__card, .article__card, .value__card, .sap-landing__problem-card, .sap-landing__science-grid article, .sap-landing__highlight-card, .sap-landing__cta-card');
    animateElements.forEach(el => {
        if (el) {
            observer.observe(el);
        }
    });
}

// Animation styles
const animationStyles = `
    .benefit__card, .article__card, .value__card, .sap-landing__problem-card, .sap-landing__science-grid article, .sap-landing__highlight-card, .sap-landing__cta-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = animationStyles;
document.head.appendChild(animationStyleSheet);

// Initialize animations after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeAnimations, 100);
});

// Keyboard Navigation
document.addEventListener('keydown', function(event) {
    // ESC key closes mobile nav
    if (event.key === 'Escape') {
        closeMobileNav();
        
        // Close any open notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            const closeButton = notification.querySelector('.notification__close');
            if (closeButton) {
                closeNotification(closeButton);
            }
        }
    }
});

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Error handling for global errors
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    // Could show user-friendly error message here if needed
});

// Export functions for global access
window.navigateToPage = navigateToPage;
window.toggleAccordion = toggleAccordion;
window.handleEmailSignup = handleEmailSignup;
window.closeNotification = closeNotification;
