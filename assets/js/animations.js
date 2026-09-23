/**
 * GSAP & ScrollTrigger Luxury Animation Controller
 * Hotel Varn Inn By Epsilon
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is loaded
    if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Hero Curtain & Text Timeline
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        heroTl
            .from('.hero-badge', { y: -30, opacity: 0, duration: 0.8, delay: 0.2 })
            .from('.hero-title', { y: 40, opacity: 0, duration: 1.1 }, '-=0.5')
            .from('.hero-subtitle', { y: 25, opacity: 0, duration: 0.9 }, '-=0.6')
            .from('.hero-cta-group', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
            .from('.booking-bar', { y: 30, opacity: 0, duration: 1 }, '-=0.4');

        // ScrollTrigger animations for sections
        if (typeof ScrollTrigger !== 'undefined') {
            // Facility Cards Stagger
            gsap.from('.facility-card', {
                scrollTrigger: {
                    trigger: '.facilities-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: 'power2.out'
            });

            // Room Cards Stagger
            gsap.from('.room-card', {
                scrollTrigger: {
                    trigger: '.rooms-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power2.out'
            });

            // Sky Lounge Spotlight Image Reveal
            gsap.from('.sky-media-wrap', {
                scrollTrigger: {
                    trigger: '.sky-lounge-spotlight',
                    start: 'top 75%'
                },
                x: -50,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out'
            });

            // Events Banner Reveal
            gsap.from('.events-banner', {
                scrollTrigger: {
                    trigger: '.events-spotlight',
                    start: 'top 75%'
                },
                scale: 0.95,
                opacity: 0,
                duration: 1.1,
                ease: 'power2.out'
            });

            // Amenities Grid Stagger
            gsap.from('.amenity-card', {
                scrollTrigger: {
                    trigger: '.amenities-grid',
                    start: 'top 85%'
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: 'power2.out'
            });
        }
    } else {
        // Graceful CSS fallback: all elements remain standard visible
        console.info('GSAP animations operating in lightweight mode.');
    }
});
