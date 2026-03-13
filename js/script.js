// ===================================
// MODERN PORTFOLIO - ENHANCED SCRIPTS
// ===================================

document.addEventListener('DOMContentLoaded', function () {
    
    // ===================================
    // SMOOTH SCROLL NAVIGATION
    // ===================================
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.top-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // Close mobile menu if open
                const navLinksContainer = document.querySelector('.nav-links');
                const mobileToggle = document.getElementById('mobileMenuToggle');
                if (navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });

    // ===================================
    // SCROLL PROGRESS BAR
    // ===================================
    const scrollProgress = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // ===================================
    // ACTIVE SECTION HIGHLIGHTING
    // ===================================
    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = document.querySelector('.top-nav').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // ===================================
    // BACK TO TOP BUTTON
    // ===================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // ===================================
    // STICKY NAVIGATION EFFECT
    // ===================================
    const nav = document.querySelector('.top-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ===================================
    // TYPING EFFECT FOR SUBTITLE (Optional)
    // ===================================
    const subtitle = document.querySelector('.subtitle');
    
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let index = 0;

        function typeWriter() {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // ===================================
    // CARD TILT EFFECT (3D Hover)
    // ===================================
    const cards = document.querySelectorAll('.news-card, .project-card, .achievement-card, .recommendation-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ===================================
    // SKILL TAGS ANIMATION ON SCROLL
    // ===================================
    const skillTags = document.querySelectorAll('.skill-tag');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillTags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        tag.style.transition = 'all 0.5s ease';
        skillObserver.observe(tag);
    });

    // ===================================
    // DYNAMIC YEAR IN FOOTER
    // ===================================
    const footer = document.querySelector('footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = footer.innerHTML.replace('2026', currentYear);
    }

    // ===================================
    // LAZY LOADING IMAGES
    // ===================================
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ===================================
    // COPY EMAIL TO CLIPBOARD
    // ===================================
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const email = link.textContent;

            navigator.clipboard.writeText(email).then(() => {
                // Create temporary notification
                const notification = document.createElement('div');
                notification.textContent = 'Email copied to clipboard!';
                notification.style.cssText = `
                    position: fixed;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 10px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    z-index: 10000;
                    font-weight: 600;
                    animation: slideUp 0.3s ease;
                `;

                document.body.appendChild(notification);

                setTimeout(() => {
                    notification.style.animation = 'slideDown 0.3s ease';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email:', err);
                window.location.href = link.href;
            });
        });
    });

    // ===================================
    // PARTICLE CURSOR EFFECT (Optional)
    // ===================================
    let particles = [];
    const particleCount = 15;

    document.addEventListener('mousemove', (e) => {
        if (particles.length < particleCount) {
            createParticle(e.clientX, e.clientY);
        }
    });

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.cssText = `
            position: fixed;
            width: 5px;
            height: 5px;
            background: linear-gradient(135deg, #ff6b35, #f77f00);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            opacity: 1;
            transition: all 0.5s ease;
        `;

        document.body.appendChild(particle);
        particles.push(particle);

        setTimeout(() => {
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0)';
        }, 100);

        setTimeout(() => {
            particle.remove();
            particles = particles.filter(p => p !== particle);
        }, 600);
    }

    // ===================================
    // KEYBOARD NAVIGATION
    // ===================================
    document.addEventListener('keydown', (e) => {
        // Press 'T' to scroll to top
        if (e.key === 't' || e.key === 'T') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Press 'B' to scroll to bottom
        if (e.key === 'b' || e.key === 'B') {
            window.scrollTo({ 
                top: document.documentElement.scrollHeight, 
                behavior: 'smooth' 
            });
        }
    });

    // ===================================
    // PERFORMANCE OPTIMIZATION
    // ===================================
    // Debounce function for scroll events
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

    // Apply debounce to scroll-heavy functions
    const debouncedScroll = debounce(() => {
        // Any heavy scroll calculations can go here
    }, 100);

    window.addEventListener('scroll', debouncedScroll);

    // ===================================
    // CONSOLE EASTER EGG
    // ===================================
    console.log('%c👋 Hello, Developer!', 'color: #ff6b35; font-size: 24px; font-weight: bold;');
    console.log('%cInterested in the code? Check out my GitHub!', 'color: #004e89; font-size: 14px;');
    console.log('%chttps://github.com/abdul-basit-ai', 'color: #f77f00; font-size: 12px;');

    // ===================================
    // ANALYTICS TRACKING (Optional)
    // ===================================
    function trackEvent(category, action, label) {
        // Placeholder for analytics tracking
        console.log(`Event: ${category} - ${action} - ${label}`);
        
        // Example: Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', action, {
        //         'event_category': category,
        //         'event_label': label
        //     });
        // }
    }

    // Track social link clicks
    document.querySelectorAll('.social-btn, .footer-links a').forEach(link => {
        link.addEventListener('click', () => {
            const platform = link.textContent.trim() || link.getAttribute('aria-label');
            trackEvent('Social', 'Click', platform);
        });
    });

    // ===================================
    // DARK MODE TOGGLE (Optional Feature)
    // ===================================
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 999;
    `;

    document.body.appendChild(darkModeToggle);

    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    darkModeToggle.addEventListener('mouseenter', () => {
        darkModeToggle.style.transform = 'translateY(-5px) rotate(15deg)';
    });

    darkModeToggle.addEventListener('mouseleave', () => {
        darkModeToggle.style.transform = 'translateY(0) rotate(0)';
    });

    // ===================================
    // LOADING ANIMATION
    // ===================================
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // ===================================
    // PRINT FUNCTIONALITY
    // ===================================
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i>';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        bottom: 150px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #f77f00 0%, #ff6b35 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 999;
    `;

    document.body.appendChild(printButton);

    printButton.addEventListener('click', () => {
        window.print();
    });

    printButton.addEventListener('mouseenter', () => {
        printButton.style.transform = 'translateY(-5px) scale(1.1)';
    });

    printButton.addEventListener('mouseleave', () => {
        printButton.style.transform = 'translateY(0) scale(1)';
    });

    // ===================================
    // INITIALIZE ALL FEATURES
    // ===================================
    console.log('✅ Portfolio initialized successfully!');
});

// ===================================
// CSS ANIMATIONS (Add to style.css)
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(20px);
            opacity: 0;
        }
    }

    .dark-mode {
        --text-primary: #f7fafc;
        --text-secondary: #cbd5e0;
        --text-light: #a0aec0;
        --bg-primary: #1a202c;
        --bg-secondary: #2d3748;
        --bg-card: #2d3748;
        --border-color: #4a5568;
    }

    .dark-mode .bg-animation {
        background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
    }

    .dark-mode .top-nav {
        background: rgba(45, 55, 72, 0.95);
    }

    .dark-mode .profile-card,
    .dark-mode .news-card,
    .dark-mode .experience-card,
    .dark-mode .project-card,
    .dark-mode .achievement-card,
    .dark-mode .recommendation-card,
    .dark-mode .timeline-content,
    .dark-mode .skill-category {
        background: var(--bg-card);
        border-color: var(--border-color);
    }

    /* Smooth transitions for dark mode */
    body,
    .top-nav,
    .profile-card,
    .news-card,
    .experience-card,
    .project-card,
    .achievement-card,
    .recommendation-card,
    .timeline-content,
    .skill-category {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }
`;

document.head.appendChild(style);
