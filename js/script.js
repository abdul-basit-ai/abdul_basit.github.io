// ===================================
// PROFESSIONAL PORTFOLIO - JAVASCRIPT
// Clean, Efficient, Production-Ready
// ===================================

(function() {
    'use strict';

    // ===================================
    // DOM ELEMENTS
    // ===================================
    const nav = document.getElementById('mainNav');
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    const navItems = document.querySelectorAll('.nav-item');
    const scrollIndicator = document.getElementById('scrollIndicator');
    const scrollTop = document.getElementById('scrollTop');
    const sections = document.querySelectorAll('.content-section, .hero-section');
    const currentYearSpan = document.getElementById('currentYear');

    // ===================================
    // SMOOTH SCROLL NAVIGATION
    // ===================================
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = nav.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active state
                navItems.forEach(link => link.classList.remove('active'));
                this.classList.add('active');

                // Close mobile menu
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // ===================================
    // SCROLL PROGRESS INDICATOR
    // ===================================
    function updateScrollIndicator() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollIndicator.style.width = scrolled + '%';
    }

    // ===================================
    // ACTIVE SECTION HIGHLIGHTING
    // ===================================
    function updateActiveSection() {
        const navHeight = nav.offsetHeight;
        let current = 'home';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    // ===================================
    // SCROLL TO TOP BUTTON
    // ===================================
    function toggleScrollTopButton() {
        if (window.scrollY > 400) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    }

    if (scrollTop) {
        scrollTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // NAVIGATION SHADOW ON SCROLL
    // ===================================
    function updateNavShadow() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
