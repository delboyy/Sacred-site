// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const exitModal = document.getElementById('exit-intent-modal');
const closeModal = document.querySelector('.close');
const emailForm = document.getElementById('email-form');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed nav
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Countdown Timer
function startCountdown() {
    // Set countdown to 24 hours from now
    const countdownDate = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update countdown displays
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        const finalCountdown = document.getElementById('final-countdown');
        
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        if (finalCountdown) {
            finalCountdown.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // Reset countdown when it reaches zero
        if (distance < 0) {
            clearInterval(timer);
            // Reset to 24 hours
            startCountdown();
        }
    }, 1000);
}

// Testimonial Slider
let currentTestimonial = 1;
const totalTestimonials = 3;

function showSlide(n) {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    if (n > totalTestimonials) currentTestimonial = 1;
    if (n < 1) currentTestimonial = totalTestimonials;
    
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    if (testimonials[currentTestimonial - 1]) {
        testimonials[currentTestimonial - 1].classList.add('active');
    }
    
    if (dots[currentTestimonial - 1]) {
        dots[currentTestimonial - 1].classList.add('active');
    }
}

function currentSlide(n) {
    currentTestimonial = n;
    showSlide(currentTestimonial);
}

function nextSlide() {
    currentTestimonial++;
    showSlide(currentTestimonial);
}

// Auto-advance testimonials every 5 seconds
function autoSlideTestimonials() {
    setInterval(() => {
        nextSlide();
    }, 5000);
}

// Exit Intent Detection
let exitIntentShown = false;

function detectExitIntent() {
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !exitIntentShown) {
            showExitModal();
            exitIntentShown = true;
        }
    });
    
    // Mobile exit intent - detect when user tries to go back
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', (e) => {
        const touchY = e.touches[0].clientY;
        const touchDiff = touchY - touchStartY;
        
        if (touchDiff > 100 && window.scrollY === 0 && !exitIntentShown) {
            showExitModal();
            exitIntentShown = true;
        }
    });
}

function showExitModal() {
    exitModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideExitModal() {
    exitModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Modal Event Listeners
if (closeModal) {
    closeModal.addEventListener('click', hideExitModal);
}

if (exitModal) {
    exitModal.addEventListener('click', (e) => {
        if (e.target === exitModal) {
            hideExitModal();
        }
    });
}

// Email Form Handling
if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('email-input');
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            // Simulate form submission
            showSuccessMessage();
            emailInput.value = '';
        } else {
            showErrorMessage('Please enter a valid email address');
        }
    });
}

// Email Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Success Message
function showSuccessMessage() {
    const formContainer = document.querySelector('.email-form-container');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="background: var(--sacred-gold); color: var(--sacred-forest); padding: 2rem; border-radius: 15px; text-align: center; animation: fadeIn 0.5s ease-in;">
            <h3 style="margin-bottom: 1rem;">🎉 Welcome to Sacred Wellness!</h3>
            <p style="margin-bottom: 1rem;">Check your email for instant access to your transformation guide.</p>
            <p style="font-size: 0.9rem; opacity: 0.8;">Redirecting to secure checkout...</p>
        </div>
    `;
    
    formContainer.innerHTML = '';
    formContainer.appendChild(successMessage);
    
    // Simulate redirect after 3 seconds
    setTimeout(() => {
        // In a real application, this would redirect to a payment processor
        console.log('Redirecting to checkout...');
    }, 3000);
}

// Error Message
function showErrorMessage(message) {
    const emailInput = document.getElementById('email-input');
    const existingError = document.querySelector('.error-message');
    
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        color: #FF6B6B;
        background: rgba(255, 107, 107, 0.1);
        padding: 10px;
        border-radius: 8px;
        margin-top: 10px;
        text-align: center;
        animation: shake 0.5s ease-in-out;
    `;
    errorDiv.textContent = message;
    
    emailInput.parentNode.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Add shake animation for errors
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = shakeCSS;
document.head.appendChild(styleSheet);

// Dynamic Urgency Updates
function updateUrgencyElements() {
    const guidesLeftElements = document.querySelectorAll('#guides-left, #guides-left-2');
    let currentCount = 47;
    
    // Randomly decrease guides left every 30-60 seconds
    setInterval(() => {
        if (currentCount > 20) {
            const decrease = Math.floor(Math.random() * 3) + 1;
            currentCount -= decrease;
            
            guidesLeftElements.forEach(element => {
                if (element) {
                    element.textContent = currentCount;
                    // Add flash effect
                    element.style.animation = 'flash 0.5s ease-in-out';
                    setTimeout(() => {
                        element.style.animation = '';
                    }, 500);
                }
            });
        }
    }, Math.floor(Math.random() * 30000) + 30000); // 30-60 seconds
}

// Flash animation for urgency updates
const flashCSS = `
@keyframes flash {
    0%, 100% { background-color: transparent; }
    50% { background-color: var(--sacred-gold); color: var(--sacred-forest); padding: 2px 6px; border-radius: 4px; }
}
`;

styleSheet.textContent += flashCSS;

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.problem-item, .authority-item, .testimonial');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Modal Email Form Handler
function handleModalEmailSubmit() {
    const modalEmail = document.querySelector('.modal-email');
    const modalBtn = document.querySelector('.modal-content .btn-primary');
    
    if (modalBtn) {
        modalBtn.addEventListener('click', () => {
            const email = modalEmail.value.trim();
            if (validateEmail(email)) {
                // Show success state
                const modalContent = document.querySelector('.modal-content');
                modalContent.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                        <h3 style="margin-bottom: 1rem; color: var(--sacred-forest);">Success!</h3>
                        <p style="margin-bottom: 1.5rem;">Check your email for your free guide.</p>
                        <button onclick="hideExitModal()" class="btn-primary">Continue Reading</button>
                    </div>
                `;
            } else {
                modalEmail.style.borderColor = '#FF6B6B';
                modalEmail.placeholder = 'Please enter a valid email';
            }
        });
    }
}

// Add to global scope for onclick handlers
window.hideExitModal = hideExitModal;
window.scrollToSection = scrollToSection;
window.currentSlide = currentSlide;

// Performance Optimization - Debounced Scroll Handler
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

// Add scroll-based effects
const debouncedScrollHandler = debounce(() => {
    const scrolled = window.scrollY;
    const nav = document.querySelector('.mobile-nav');
    
    if (scrolled > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = 'var(--sacred-white)';
        nav.style.backdropFilter = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start countdown timer
    startCountdown();
    
    // Initialize testimonial slider
    showSlide(currentTestimonial);
    autoSlideTestimonials();
    
    // Setup exit intent detection
    detectExitIntent();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Setup modal email handler
    handleModalEmailSubmit();
    
    // Start urgency updates
    updateUrgencyElements();
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Preload critical animations
    const preloadAnimations = () => {
        const style = document.createElement('style');
        style.textContent = `
            .preload-fade { opacity: 0; transform: translateY(20px); }
            .fade-in { opacity: 1; transform: translateY(0); transition: all 0.6s ease-out; }
        `;
        document.head.appendChild(style);
    };
    
    preloadAnimations();
    
    // Add loading states for better UX
    document.body.classList.add('loaded');
    
    console.log('Sacred Wellness Landing Page Initialized Successfully! 🌿');
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Error handling for any JavaScript errors
window.addEventListener('error', (e) => {
    console.warn('Sacred Wellness: Minor script error handled gracefully', e.error);
});

// Add touch support enhancements for mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-enabled');
    
    // Improve button feedback on mobile
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        btn.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}