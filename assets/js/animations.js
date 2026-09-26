/**
 * Hotel Varn Inn By Epsilon - Master Luxury Motion & Animation Controller
 * 100% Standalone (Vanilla JS + Hardware Accelerated CSS) with GSAP Auto-Enhancement
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        initScrollProgressBar();
        initBackToTopButton();
        initAutoScrollReveal();
        initHeroGoldParticles();
        init3DTiltWithGlare();
        initAnimatedCounters();
        initButtonRipples();
        initMagneticButtons();
        initGSAPIfAvailable();
    });

    /* ==========================================================================
       1. LUXURY READING SCROLL PROGRESS BAR
       ========================================================================== */
    function initScrollProgressBar() {
        let bar = document.getElementById('luxuryProgressBar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'luxuryProgressBar';
            document.body.appendChild(bar);
        }

        const updateBar = () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            bar.style.width = scrolled + '%';
        };

        window.addEventListener('scroll', updateBar, { passive: true });
        updateBar();
    }

    /* ==========================================================================
       2. BACK TO TOP BUTTON WITH GOLD AURA
       ========================================================================== */
    function initBackToTopButton() {
        let topBtn = document.querySelector('.back-to-top-btn');
        if (!topBtn) {
            topBtn = document.createElement('button');
            topBtn.className = 'back-to-top-btn';
            topBtn.setAttribute('type', 'button');
            topBtn.setAttribute('aria-label', 'Return to top of page');
            topBtn.setAttribute('title', 'Return to Top');
            topBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
            `;
            document.body.appendChild(topBtn);
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY > 380) {
                topBtn.classList.add('is-visible');
            } else {
                topBtn.classList.remove('is-visible');
            }
        }, { passive: true });

        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            if (typeof window.playLuxurySound === 'function') {
                window.playLuxurySound('click');
            }
        });
    }

    /* ==========================================================================
       3. HIGH-PERFORMANCE SCROLL REVEAL (INTERSECTION OBSERVER)
       ========================================================================== */
    function initAutoScrollReveal() {
        // Auto-tag key elements for scroll reveal if not already marked
        const autoTargets = [
            { selector: '.facility-card', type: 'reveal-up' },
            { selector: '.room-card', type: 'reveal-up' },
            { selector: '.suite-card-magazine', type: 'reveal-up' },
            { selector: '.stats-strip > div', type: 'reveal-up' },
            { selector: '.amenity-card', type: 'reveal-up' },
            { selector: '.gallery-item', type: 'reveal-zoom' },
            { selector: '.editorial-image-frame', type: 'reveal-left' },
            { selector: '.editorial-content', type: 'reveal-right' },
            { selector: '.sky-media-wrap', type: 'reveal-left' },
            { selector: '.events-banner', type: 'reveal-zoom' },
            { selector: '.stat-card, .stat-item, .highlight-card', type: 'reveal-up' },
            { selector: '.faq-item', type: 'reveal-up' },
            { selector: '.section-header, .section-title-wrap', type: 'reveal-up' }
        ];

        autoTargets.forEach(({ selector, type }) => {
            document.querySelectorAll(selector).forEach((el, index) => {
                if (!el.classList.contains('reveal') &&
                    !el.classList.contains('reveal-up') &&
                    !el.classList.contains('reveal-left') &&
                    !el.classList.contains('reveal-right') &&
                    !el.classList.contains('reveal-zoom')) {
                    el.classList.add(type);
                    // Add subtle stagger to siblings
                    const delay = (index % 4) * 0.12;
                    if (delay > 0) {
                        el.style.transitionDelay = `${delay}s`;
                    }
                }
            });
        });

        // Query all reveal elements
        const reveals = document.querySelectorAll(
            '.reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-zoom, .reveal-flip'
        );

        if (!('IntersectionObserver' in window)) {
            reveals.forEach(el => el.classList.add('is-visible'));
            return;
        }

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        reveals.forEach(el => revealObserver.observe(el));
    }

    /* ==========================================================================
       4. HERO AMBIENT GOLD DUST PARTICLES
       ========================================================================== */
    function initHeroGoldParticles() {
        const hero = document.querySelector('.hero-section');
        if (!hero) return;

        const canvas = document.createElement('canvas');
        canvas.className = 'hero-particles-canvas';
        hero.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let width = canvas.width = hero.offsetWidth;
        let height = canvas.height = hero.offsetHeight;

        let particles = [];
        const particleCount = Math.min(35, Math.floor(width / 35));

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2.2 + 0.6;
                this.speedY = -(Math.random() * 0.45 + 0.15);
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.55 + 0.2;
                this.pulseSpeed = Math.random() * 0.02 + 0.008;
                this.pulse = Math.random() * Math.PI;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.pulse += this.pulseSpeed;

                if (this.y < -10 || this.x < -10 || this.x > width + 10) {
                    this.reset();
                    this.y = height + 10;
                }
            }

            draw() {
                const currentOpacity = this.opacity * (0.6 + 0.4 * Math.sin(this.pulse));
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(229, 168, 38, ${currentOpacity})`;
                ctx.shadowColor = 'rgba(212, 143, 31, 0.7)';
                ctx.shadowBlur = this.size * 3;
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        let isVisible = true;
        const heroObserver = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
        }, { threshold: 0.05 });
        heroObserver.observe(hero);

        window.addEventListener('resize', () => {
            width = canvas.width = hero.offsetWidth;
            height = canvas.height = hero.offsetHeight;
        });

        function animate() {
            if (isVisible) {
                ctx.clearRect(0, 0, width, height);
                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    /* ==========================================================================
       5. 3D CARD TILT WITH DYNAMIC SPECULAR GLARE
       ========================================================================== */
    function init3DTiltWithGlare() {
        if (window.innerWidth < 992) return;

        const tiltCards = document.querySelectorAll(
            '.facility-card, .room-card, .amenity-card, .editorial-image-frame'
        );

        tiltCards.forEach(card => {
            // Add glare layer
            let glare = card.querySelector('.tilt-glare');
            if (!glare) {
                glare = document.createElement('div');
                glare.className = 'tilt-glare';
                card.appendChild(glare);
            }

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5.5;
                const rotateY = ((x - centerX) / centerX) * 5.5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

                // Update glare position
                glare.style.opacity = '1';
                glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.28) 0%, transparent 65%)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                glare.style.opacity = '0';
            });
        });
    }

    /* ==========================================================================
       6. NUMBER COUNTER ANIMATION
       ========================================================================== */
    function initAnimatedCounters() {
        const counterCandidates = document.querySelectorAll(
            '[data-counter], .stat-number, .stat-value, .highlight-number, .stat-num'
        );

        if (counterCandidates.length === 0) return;

        const animateCounter = (el) => {
            const rawText = el.getAttribute('data-counter') || el.textContent.trim();
            const match = rawText.match(/([^\d]*)([\d,.]+)([^\d]*)/);
            if (!match) return;

            const prefix = match[1] || '';
            const numStr = match[2].replace(/,/g, '');
            const suffix = match[3] || '';
            const targetVal = parseFloat(numStr);
            const isFloat = numStr.includes('.');

            if (isNaN(targetVal)) return;

            let startTime = null;
            const duration = 1800; // ms

            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                // Cubic ease-out
                const easeVal = 1 - Math.pow(1 - progress, 3);
                const currentVal = targetVal * easeVal;

                el.textContent = prefix + (isFloat ? currentVal.toFixed(1) : Math.floor(currentVal).toLocaleString('en-IN')) + suffix;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = rawText;
                    el.classList.add('counted');
                }
            };

            requestAnimationFrame(step);
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        counterCandidates.forEach(el => counterObserver.observe(el));
    }

    /* ==========================================================================
       7. BUTTON RIPPLE WAVE EFFECT
       ========================================================================== */
    function initButtonRipples() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                const rect = this.getBoundingClientRect();
                const circle = document.createElement('span');
                const diameter = Math.max(rect.width, rect.height);
                const radius = diameter / 2;

                circle.style.width = circle.style.height = `${diameter}px`;
                circle.style.left = `${e.clientX - rect.left - radius}px`;
                circle.style.top = `${e.clientY - rect.top - radius}px`;
                circle.classList.add('btn-ripple');

                const existingRipple = this.querySelector('.btn-ripple');
                if (existingRipple) {
                    existingRipple.remove();
                }

                this.appendChild(circle);
                setTimeout(() => circle.remove(), 650);
            });
        });
    }

    /* ==========================================================================
       8. MAGNETIC BUTTON INTERACTION
       ========================================================================== */
    function initMagneticButtons() {
        if (window.innerWidth < 992) return;

        const magneticEls = document.querySelectorAll(
            '.nav-reserve-btn, .btn-gold, .back-to-top-btn'
        );

        magneticEls.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate3d(${x * 0.18}px, ${y * 0.18}px, 0)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    /* ==========================================================================
       9. OPTIONAL GSAP ENHANCEMENT
       ========================================================================== */
    function initGSAPIfAvailable() {
        if (typeof window.gsap !== 'undefined') {
            try {
                if (typeof window.ScrollTrigger !== 'undefined') {
                    window.gsap.registerPlugin(window.ScrollTrigger);
                }

                // Hero entrance timeline
                const heroTl = window.gsap.timeline({ defaults: { ease: 'power3.out' } });
                heroTl
                    .from('.hero-badge', { y: -25, opacity: 0, duration: 0.8, delay: 0.15 })
                    .from('.hero-title', { y: 35, opacity: 0, duration: 1.0 }, '-=0.45')
                    .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.85 }, '-=0.55')
                    .from('.hero-cta-group', { y: 20, opacity: 0, duration: 0.75 }, '-=0.45')
                    .from('.booking-bar', { y: 25, opacity: 0, duration: 0.9 }, '-=0.4');
            } catch (err) {
                console.debug('GSAP initialized with standard animations.');
            }
        }
    }

})();
