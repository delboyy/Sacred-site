// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav__link');
const pages = document.querySelectorAll('.page');

// State management
let currentPage = 'home';
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial__card');
const testimonialDots = document.querySelectorAll('.dot');
const stickyCTA = document.getElementById('mobileStickyCTA');
const stickyCTAButton = document.getElementById('mobileStickyCTAButton');
const mobileCTAMediaQuery = window.matchMedia('(max-width: 767px)');

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTestimonialSlider();
    initializeAccordions();
    initializeFormHandling();
    initializeStickyCTA();

    if (window.location.hash === '#product') {
        navigateToPage('product');
    }
});

window.addEventListener('hashchange', function() {
    if (window.location.hash === '#product') {
        navigateToPage('product');
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
        link.addEventListener('click', handleNavClick);
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

        // Reset testimonial to first one when navigating to product page
        if (pageName === 'product' && testimonials.length > 0) {
            showTestimonial(0);
        }

        updateStickyCTAVisibility(pageName === 'product');
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
        product: 'Menopause Support Guide - Sacred',
        about: 'About Us - Sacred'
    };
    
    document.title = titles[pageName] || 'Sacred';
}

function initializeStickyCTA() {
    if (!stickyCTA) {
        return;
    }

    updateStickyCTAVisibility(currentPage === 'product');

    if (stickyCTAButton) {
        stickyCTAButton.addEventListener('click', function() {
            stickyCTAButton.setAttribute('aria-pressed', 'true');
            setTimeout(() => stickyCTAButton.setAttribute('aria-pressed', 'false'), 1200);
        });
    }

    if (mobileCTAMediaQuery && typeof mobileCTAMediaQuery.addEventListener === 'function') {
        mobileCTAMediaQuery.addEventListener('change', () => {
            updateStickyCTAVisibility(currentPage === 'product');
        });
    } else if (mobileCTAMediaQuery && typeof mobileCTAMediaQuery.addListener === 'function') {
        mobileCTAMediaQuery.addListener(() => {
            updateStickyCTAVisibility(currentPage === 'product');
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

// Smooth Scrolling Functions
function scrollToProduct() {
    const productSection = document.getElementById('product-section');
    if (productSection) {
        const offsetTop = productSection.offsetTop - 80; // Account for fixed nav
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Testimonials Slider Functions
function initializeTestimonialSlider() {
    if (testimonials.length > 0) {
        // Auto-advance testimonials every 6 seconds
        setInterval(nextTestimonial, 6000);
    }
}

function showTestimonial(index) {
    if (index < 0 || index >= testimonials.length) {
        return; // Invalid index
    }
    
    if (index === currentTestimonial) return;
    
    // Hide current testimonial
    if (testimonials[currentTestimonial]) {
        testimonials[currentTestimonial].classList.remove('active');
    }
    
    if (testimonialDots[currentTestimonial]) {
        testimonialDots[currentTestimonial].classList.remove('active');
    }
    
    // Show new testimonial
    currentTestimonial = index;
    
    if (testimonials[currentTestimonial]) {
        testimonials[currentTestimonial].classList.add('active');
    }
    
    if (testimonialDots[currentTestimonial]) {
        testimonialDots[currentTestimonial].classList.add('active');
    }
}

function nextTestimonial() {
    const nextIndex = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(nextIndex);
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
        const animateElements = document.querySelectorAll('.benefit__card, .article__card, .value__card');
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
    const animateElements = document.querySelectorAll('.benefit__card, .article__card, .value__card');
    animateElements.forEach(el => {
        if (el) {
            observer.observe(el);
        }
    });
}

// Animation styles
const animationStyles = `
    .benefit__card, .article__card, .value__card {
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
    
    // Arrow keys for testimonial navigation (only when on product page)
    if (currentPage === 'product' && testimonials.length > 0) {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            const prevIndex = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
            showTestimonial(prevIndex);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            const nextIndex = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(nextIndex);
        }
    }
});

// Touch/Swipe Support for Testimonials
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold && testimonials.length > 0) {
        if (swipeDistance > 0) {
            // Swipe right - previous testimonial
            const prevIndex = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
            showTestimonial(prevIndex);
        } else {
            // Swipe left - next testimonial
            const nextIndex = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(nextIndex);
        }
    }
}

// Add touch listeners to testimonials container
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsSlider = document.getElementById('testimonialsSlider');
    if (testimonialsSlider) {
        testimonialsSlider.addEventListener('touchstart', handleTouchStart, { passive: true });
        testimonialsSlider.addEventListener('touchend', handleTouchEnd, { passive: true });
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
window.scrollToProduct = scrollToProduct;
window.showTestimonial = showTestimonial;
window.toggleAccordion = toggleAccordion;
window.handleEmailSignup = handleEmailSignup;
window.closeNotification = closeNotification;
