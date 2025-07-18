// Main JavaScript functionality for the landing page

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Observe all elements with animation class
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Initialize other functionality
    initSmoothScrolling();
    initCalculator();
    initCTAButtons();
    initMobileMenu();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
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
}

// Calculator functionality
function initCalculator() {
    const slider = document.getElementById('income-slider');
    const display = document.getElementById('income-display');
    const dailyCost = document.getElementById('daily-cost');

    if (slider && display && dailyCost) {
        function updateCalculator() {
            const income = parseInt(slider.value);
            const daily = Math.round(income / 365);
            
            display.textContent = `$${income.toLocaleString()}`;
            dailyCost.textContent = `$${daily}`;
        }

        slider.addEventListener('input', updateCalculator);
        
        // Initialize with default value
        updateCalculator();
    }
}

// CTA Button functionality
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Analytics tracking (placeholder)
            trackEvent('CTA_CLICKED', {
                button_text: this.textContent,
                section: getSection(this)
            });

            // You would integrate with your payment/signup system here
            console.log('CTA clicked:', this.textContent);
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Utility function to get section name
function getSection(element) {
    const section = element.closest('section');
    return section ? section.className.split(' ')[0] : 'unknown';
}

// Analytics tracking function (placeholder)
function trackEvent(eventName, properties = {}) {
    // Integrate with your analytics service here
    console.log('Analytics Event:', eventName, properties);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, properties);
    
    // Example: Facebook Pixel
    // fbq('track', eventName, properties);
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 10000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress on load
document.addEventListener('DOMContentLoaded', initScrollProgress);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Form validation (for future contact forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Testimonial cycling (if you add more later)
function initTestimonialCycling() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;

    if (testimonials.length > 1) {
        setInterval(() => {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }, 5000);
    }
}

// Exit intent popup (optional)
function initExitIntent() {
    let exitIntentShown = false;

    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitIntentShown = true;
            showExitIntentPopup();
        }
    });
}

function showExitIntentPopup() {
    // Create and show exit intent popup
    const popup = document.createElement('div');
    popup.innerHTML = `
        <div class="exit-popup-overlay">
            <div class="exit-popup card">
                <button class="exit-popup-close">&times;</button>
                <h3>Wait! Don't Miss Out</h3>
                <p>Transform your life for just $1. This launch price won't last long!</p>
                <button class="btn-primary btn-large">Get Started Now - $1</button>
            </div>
        </div>
    `;
    
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
    `;

    document.body.appendChild(popup);

    // Close popup functionality
    popup.querySelector('.exit-popup-close').addEventListener('click', () => {
        popup.remove();
    });

    popup.querySelector('.exit-popup-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            popup.remove();
        }
    });
}

// Scroll to top button functionality is handled in index.html
// Removed duplicate scroll-to-top button creation to avoid conflicts

// Performance monitoring
function initPerformanceMonitoring() {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log('Page load time:', loadTime.toFixed(2), 'ms');
        
        // Track to analytics
        trackEvent('page_performance', {
            load_time: Math.round(loadTime),
            page_url: window.location.href
        });
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        line: e.lineno
    });
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Theme toggle for app screenshots
function toggleTheme() {
    const lightMode = document.getElementById('light-mode');
    const darkMode = document.getElementById('dark-mode');
    const toggleBtn = document.querySelector('.theme-toggle');
    
    if (lightMode.classList.contains('active')) {
        lightMode.classList.remove('active');
        darkMode.classList.add('active');
        toggleBtn.textContent = '☀️';
    } else {
        darkMode.classList.remove('active');
        lightMode.classList.add('active');
        toggleBtn.textContent = '🌙';
    }
}

// Initialize fallback screen if images fail to load
document.addEventListener('DOMContentLoaded', function() {
    const screenshots = document.querySelectorAll('.app-screenshot');
    const fallbackScreen = document.querySelector('.fallback-screen');
    let imagesLoaded = 0;
    let imagesErrored = 0;
    
    screenshots.forEach(img => {
        img.addEventListener('load', () => {
            imagesLoaded++;
        });
        
        img.addEventListener('error', () => {
            imagesErrored++;
            img.style.display = 'none';
            
            // If all images failed, show fallback
            if (imagesErrored === screenshots.length) {
                fallbackScreen.style.opacity = '1';
                document.querySelector('.theme-toggle').style.display = 'none';
            }
        });
    });
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        trackEvent,
        getSection,
        toggleTheme
    };
} 