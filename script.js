// Portfolio Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeInteractions();
    logPageLoad();
});

// Initialize scroll animations
function initializeAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
}

// Initialize interactive elements
function initializeInteractions() {
    const techTags = document.querySelectorAll('.tech');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        tag.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // GitHub link interactions
    const githubLinks = document.querySelectorAll('.github-link');
    githubLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Opening GitHub link:', this.href);
        });
    });

    // Contact link interactions
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function() {
            console.log('Email clicked');
        });
    }
}

// Log page load
function logPageLoad() {
    console.log('Portfolio page loaded successfully');
    console.log('Current time:', new Date().toLocaleString());
}

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Press 'g' to go to GitHub profile
    if (event.key === 'g' && !event.ctrlKey && !event.metaKey) {
        const githubProfile = document.querySelector('a[href*="github.com/Yang-Hyunseok"]');
        if (githubProfile) {
            window.open(githubProfile.href, '_blank');
        }
    }
});

// Performance monitoring
function measurePerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    }
}

window.addEventListener('load', measurePerformance);

// Add dark mode toggle functionality
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
    }

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Responsive image loading
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
}

// Analytics helper
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
}

// Example usage of tracking
document.querySelectorAll('.github-link').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('github_link_click', {
            url: this.href,
            timestamp: new Date().toISOString()
        });
    });
});
