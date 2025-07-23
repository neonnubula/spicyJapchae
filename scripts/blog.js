// Blog-specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Newsletter signup functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const subscribeButton = newsletterForm?.querySelector('.btn-primary');

    if (newsletterForm && subscribeButton) {
        subscribeButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = newsletterInput.value.trim();
            
            if (!email) {
                showMessage('Please enter your email address.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate newsletter signup
            subscribeButton.textContent = 'Subscribing...';
            subscribeButton.disabled = true;
            
            setTimeout(() => {
                showMessage('Thanks for subscribing! We\'ll notify you when our first article is published.', 'success');
                newsletterInput.value = '';
                subscribeButton.textContent = 'Subscribe';
                subscribeButton.disabled = false;
            }, 1500);
        });
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Message display function
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.newsletter-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `newsletter-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            margin-top: 1rem;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            font-weight: 500;
            text-align: center;
        `;
        
        if (type === 'success') {
            messageDiv.style.background = 'rgba(34, 197, 94, 0.1)';
            messageDiv.style.color = '#16a34a';
            messageDiv.style.border = '1px solid rgba(34, 197, 94, 0.2)';
        } else {
            messageDiv.style.background = 'rgba(239, 68, 68, 0.1)';
            messageDiv.style.color = '#dc2626';
            messageDiv.style.border = '1px solid rgba(239, 68, 68, 0.2)';
        }
        
        // Insert after the form
        const newsletterSignup = document.querySelector('.newsletter-signup');
        if (newsletterSignup) {
            newsletterSignup.appendChild(messageDiv);
        }
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
    
    // Enter key support for newsletter input
    if (newsletterInput) {
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                subscribeButton.click();
            }
        });
    }
    
    // Animate article cards on scroll
    const articleCards = document.querySelectorAll('.article-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    articleCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}); 