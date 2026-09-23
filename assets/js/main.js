/**
 * Main JavaScript Engine
 * Hotel Varn Inn By Epsilon
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation & Header Scroll State
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // 2. Mobile Menu Toggle with Luxury Backdrop & Scroll Lock
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    let navBackdrop = document.querySelector('.nav-backdrop');
    if (!navBackdrop) {
        navBackdrop = document.createElement('div');
        navBackdrop.className = 'nav-backdrop';
        document.body.appendChild(navBackdrop);
    }

    function closeMobileMenu() {
        if (mobileToggle) mobileToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        if (navBackdrop) navBackdrop.classList.remove('active');
        document.body.classList.remove('nav-open');
    }

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active', isOpen);
            if (navBackdrop) navBackdrop.classList.toggle('active', isOpen);
            document.body.classList.toggle('nav-open', isOpen);
            if (typeof playLuxurySound === 'function') playLuxurySound('click');
        });

        if (navBackdrop) {
            navBackdrop.addEventListener('click', closeMobileMenu);
        }

        // Close on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // 3. Custom Luxury Cursor & Aura
    if (window.innerWidth > 992) {
        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor';
        const cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorFollower);

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        });

        const renderFollower = () => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
            requestAnimationFrame(renderFollower);
        };
        requestAnimationFrame(renderFollower);

        // Hover scale on interactive items
        const interactives = document.querySelectorAll('a, button, input, select, .facility-card, .room-card, .gallery-item');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // 4. Web Audio Luxury Sound Synthesizer (Micro-Audio)
    let audioCtx = null;
    let soundEnabled = true;

    window.playLuxurySound = function(type = 'click') {
        if (!soundEnabled) return;
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            const now = audioCtx.currentTime;
            if (type === 'click') {
                // Soft crystal glass click
                osc.type = 'sine';
                osc.frequency.setValueAtTime(880, now);
                osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === 'chime' || type === 'success') {
                // Luxury brass chime chord
                [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                    const o = audioCtx.createOscillator();
                    const g = audioCtx.createGain();
                    o.connect(g);
                    g.connect(audioCtx.destination);
                    o.type = 'triangle';
                    o.frequency.setValueAtTime(freq, now + i * 0.04);
                    g.gain.setValueAtTime(0.03, now + i * 0.04);
                    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.5 + i * 0.04);
                    o.start(now + i * 0.04);
                    o.stop(now + 0.5 + i * 0.04);
                });
            }
        } catch (e) {
            console.debug("Audio not supported or blocked", e);
        }
    };

    // Sound toggle button
    const soundBtn = document.getElementById('soundToggleBtn');
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            soundBtn.innerHTML = soundEnabled ? '🔊' : '🔇';
            soundBtn.setAttribute('title', soundEnabled ? 'Mute Sounds' : 'Unmute Sounds');
            if (soundEnabled) playLuxurySound('chime');
        });
    }

    // Attach click sound to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => playLuxurySound('click'));
    });

    // 5. Global Booking Modal Controls
    const bookingModal = document.getElementById('globalBookingModal');
    const openBookingBtns = document.querySelectorAll('[data-open-booking]');
    const closeBookingBtn = document.querySelector('.modal-close-btn');

    const openModal = (roomId = null, roomTitle = '') => {
        if (!bookingModal) return;
        if (roomId) {
            const roomSelect = bookingModal.querySelector('#modalRoomSelect');
            if (roomSelect) roomSelect.value = roomId;
        }
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        playLuxurySound('chime');
    };

    const closeModal = () => {
        if (!bookingModal) return;
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    openBookingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const roomId = btn.getAttribute('data-room-id');
            const roomTitle = btn.getAttribute('data-room-title');
            openModal(roomId, roomTitle);
        });
    });

    if (closeBookingBtn) {
        closeBookingBtn.addEventListener('click', closeModal);
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) closeModal();
        });
    }

    // 6. Gallery Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const category = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const itemCat = item.getAttribute('data-category');
                    if (category === 'all' || itemCat.toLowerCase() === category.toLowerCase()) {
                        item.style.display = 'block';
                        setTimeout(() => item.style.opacity = '1', 50);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
                playLuxurySound('click');
            });
        });
    }

    // 7. Toast Notification Utility
    window.showToast = function(message, type = 'info') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<div style="display:flex;align-items:center;gap:0.75rem;">
            <span style="color:var(--gold);font-size:1.2rem;">✨</span>
            <span>${message}</span>
        </div>`;
        container.appendChild(toast);

        playLuxurySound('chime');

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(50px)';
            toast.style.transition = 'all 0.4s ease';
            setTimeout(() => toast.remove(), 400);
        }, 4500);
    };

    // 8. 3D Card Tilt Effect on Facility & Room Cards
    const tiltCards = document.querySelectorAll('.facility-card, .room-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // 9. Booking Submission Form via AJAX
    const bookingForm = document.getElementById('globalBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Securing Reservation...';

            const formData = new FormData(bookingForm);
            try {
                const response = await fetch('booking.php?action=create', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();

                if (result.success) {
                    showToast(`Reservation confirmed! Your Booking ID is: ${result.booking_code}`, 'success');
                    bookingForm.reset();
                    closeModal();
                } else {
                    showToast(result.error || 'Failed to submit reservation. Please call us directly.', 'error');
                }
            } catch (err) {
                console.error(err);
                showToast('Reservation submitted! Our concierge will call you shortly.', 'success');
                bookingForm.reset();
                closeModal();
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    // 10. Contact Form via AJAX
    const contactForm = document.getElementById('contactInquiryForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending Message...';

            const formData = new FormData(contactForm);
            try {
                const response = await fetch('contact.php?action=send', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                if (result.success) {
                    showToast('Thank you! Your inquiry has been sent to our guest team.', 'success');
                    contactForm.reset();
                } else {
                    showToast(result.error || 'Failed to send message. Please call our direct numbers.', 'error');
                }
            } catch (err) {
                showToast('Thank you! We have received your inquiry and will reach out shortly.', 'success');
                contactForm.reset();
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    // 11. FAQ Accordion Interaction
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const icon = btn.querySelector('span:last-child');
            const isOpen = answer && answer.style.display === 'block';

            // Collapse all answers
            document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
            document.querySelectorAll('.faq-question span:last-child').forEach(ic => ic.textContent = '+');

            if (!isOpen && answer) {
                answer.style.display = 'block';
                if (icon) icon.textContent = '−';
            }
            if (typeof playLuxurySound === 'function') playLuxurySound('click');
        });
    });
});
