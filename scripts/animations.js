// Advanced animations and interaction effects

// Counter animation for metrics
function animateCounters() {
    const counters = document.querySelectorAll('.metric-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Trigger counter animation when visible
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const metricsSection = document.querySelector('.proof-metrics');
    if (metricsSection) {
        counterObserver.observe(metricsSection);
    }
});

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width || '75%';
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 2s cubic-bezier(0.4, 0, 0.2, 1)';
            bar.style.width = width;
        }, 500);
    });
}

// Trigger progress animation when visible
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const progressSection = document.querySelector('.app-mockup');
    if (progressSection) {
        progressObserver.observe(progressSection);
    }
});

// Stagger animation for grid items
function staggerGridItems() {
    const grids = document.querySelectorAll('.problem-grid, .features-grid, .faq-grid');
    
    grids.forEach(grid => {
        const items = grid.querySelectorAll('.card');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

// Initialize stagger animations
document.addEventListener('DOMContentLoaded', staggerGridItems);

// Timeline animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        // Initial state
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        observer.observe(item);
    });
}

// Initialize timeline animation
document.addEventListener('DOMContentLoaded', animateTimeline);

// Parallax effect for hero background
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Initialize parallax if not on mobile
if (window.innerWidth > 768) {
    document.addEventListener('DOMContentLoaded', initParallax);
}

// Floating animation for cards
function initFloatingCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        // Add random floating animation
        const duration = 3 + Math.random() * 2; // 3-5 seconds
        const delay = Math.random() * 2; // 0-2 seconds delay
        const distance = 5 + Math.random() * 5; // 5-10px movement
        
        card.style.animation = `float-${index} ${duration}s ease-in-out ${delay}s infinite alternate`;
        
        // Create unique keyframes for each card
        const keyframes = `
            @keyframes float-${index} {
                0% { transform: translateY(0px); }
                100% { transform: translateY(-${distance}px); }
            }
        `;
        
        // Inject keyframes into document
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
    });
}

// Initialize floating cards
document.addEventListener('DOMContentLoaded', initFloatingCards);

// Text typewriter effect
function typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Initialize typewriter for hero title
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        typewriterEffect(heroTitle, originalText, 30);
                    }, 1000);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(heroTitle);
    }
});

// Mouse trail effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(102, 126, 234, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            opacity: ${1 - i / trailLength};
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        for (let i = trail.length - 1; i > 0; i--) {
            trail[i].style.left = trail[i - 1].style.left;
            trail[i].style.top = trail[i - 1].style.top;
        }
        
        trail[0].style.left = mouseX + 'px';
        trail[0].style.top = mouseY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Initialize mouse trail on desktop only
if (window.innerWidth > 768 && !('ontouchstart' in window)) {
    document.addEventListener('DOMContentLoaded', initMouseTrail);
}

// Gradient animation
function animateGradients() {
    const gradientElements = document.querySelectorAll('.hero-background');
    
    gradientElements.forEach(element => {
        let hue = 0;
        
        setInterval(() => {
            hue = (hue + 1) % 360;
            element.style.filter = `hue-rotate(${hue}deg)`;
        }, 50);
    });
}

// Initialize gradient animation
// Uncomment if you want animated gradients
// document.addEventListener('DOMContentLoaded', animateGradients);

// Scroll-triggered animations with GSAP-like easing
function createScrollTrigger(element, animation, options = {}) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animation(entry.target);
                if (!options.repeat) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px'
    });
    
    observer.observe(element);
}

// Custom easing functions
const easing = {
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeOutElastic: (t) => Math.sin(-13 * (t + 1) * Math.PI / 2) * Math.pow(2, -10 * t) + 1
};

// Custom animation function with easing
function animateElement(element, properties, duration = 1000, easingFunction = easing.easeOutCubic) {
    const startValues = {};
    const endValues = {};
    
    for (const prop in properties) {
        startValues[prop] = parseFloat(getComputedStyle(element)[prop]) || 0;
        endValues[prop] = properties[prop];
    }
    
    const startTime = performance.now();
    
    function animate() {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easingFunction(progress);
        
        for (const prop in properties) {
            const currentValue = startValues[prop] + (endValues[prop] - startValues[prop]) * easedProgress;
            element.style[prop] = currentValue + (prop.includes('opacity') ? '' : 'px');
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Initialize advanced scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate pricing card
    const pricingCard = document.querySelector('.pricing-card');
    if (pricingCard) {
        createScrollTrigger(pricingCard, (element) => {
            animateElement(element, {
                transform: 'scale(1.05)',
                opacity: 1
            }, 800, easing.easeOutElastic);
        });
    }
    
    // Animate testimonial
    const testimonial = document.querySelector('.founder-testimonial');
    if (testimonial) {
        createScrollTrigger(testimonial, (element) => {
            animateElement(element, {
                opacity: 1,
                transform: 'translateY(0)'
            }, 600, easing.easeOutCubic);
        });
    }
});

// Performance optimization: Disable animations if user prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable all animations
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    `;
    document.head.appendChild(style);
} 