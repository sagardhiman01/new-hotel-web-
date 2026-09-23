/**
 * Client-Side Controller & Hydration Layer
 * 100% Pure HTML, CSS, & JavaScript (Zero PHP required!)
 * Hotel Varn Inn By Epsilon
 */

// Helper to format Indian Rupee
function formatINR(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
}

// 1. Hydrate Site Settings from HotelStore
function hydrateSiteSettings() {
    if (!window.HotelStore) return;
    const s = HotelStore.getSettings();

    // Hotel name & Brand
    document.querySelectorAll('[data-bind="hotel_name"]').forEach(el => {
        el.textContent = s.hotel_name || 'Hotel Varn Inn By Epsilon';
    });
    document.querySelectorAll('[data-bind="hotel_brand"]').forEach(el => {
        el.textContent = s.hotel_brand || 'By Epsilon';
    });

    // Phone 1
    document.querySelectorAll('[data-bind="phone_1"]').forEach(el => {
        el.textContent = s.phone_1 || '+91 7534999777';
        if (el.tagName === 'A') el.href = `tel:${(s.phone_1 || '').replace(/[^0-9+]/g, '')}`;
    });

    // Phone 2
    document.querySelectorAll('[data-bind="phone_2"]').forEach(el => {
        el.textContent = s.phone_2 || '+91 8937999777';
        if (el.tagName === 'A') el.href = `tel:${(s.phone_2 || '').replace(/[^0-9+]/g, '')}`;
    });

    // Address
    document.querySelectorAll('[data-bind="address"]').forEach(el => {
        el.textContent = s.address || 'NH-58, Haridwar Road, near Vedandam Banquet Hall, Sherpur, ROORKEE, Uttarakhand 247667';
    });

    // Email
    document.querySelectorAll('[data-bind="email"]').forEach(el => {
        el.textContent = s.email || 'reservations@epsilonhotels.in';
        if (el.tagName === 'A') el.href = `mailto:${s.email || 'reservations@epsilonhotels.in'}`;
    });

    // Website
    document.querySelectorAll('[data-bind="website"]').forEach(el => {
        el.textContent = s.website || 'www.epsilonhotels.in';
    });

    // Banner Status / Tagline
    document.querySelectorAll('[data-bind="banner_status"]').forEach(el => {
        el.textContent = s.banner_status || 'OPENING SOON - BOOKING OPEN NOW';
    });
    document.querySelectorAll('[data-bind="tagline"]').forEach(el => {
        el.textContent = s.tagline || 'Opening Soon • Booking Open Now';
    });

    // WhatsApp links
    document.querySelectorAll('[data-bind="whatsapp_link"]').forEach(el => {
        const num = (s.whatsapp || '917534999777').replace(/[^0-9]/g, '');
        el.href = `https://wa.me/${num}?text=Hello%20Hotel%20Varn%20Inn,%20I%20would%20like%20to%20inquire%20about%20room%20booking%20and%20events.`;
    });

    // Operating Hours
    document.querySelectorAll('[data-bind="sky_lounge_hours"]').forEach(el => {
        el.textContent = s.sky_lounge_hours || '5:00 PM – 11:30 PM Daily';
    });
    document.querySelectorAll('[data-bind="restaurant_hours"]').forEach(el => {
        el.textContent = s.restaurant_hours || '7:00 AM – 11:00 PM Daily';
    });
}

// 2. Populate Rooms in Booking Modal
function hydrateBookingModalRooms() {
    if (!window.HotelStore) return;
    const select = document.getElementById('modalRoomSelect');
    if (!select) return;

    const rooms = HotelStore.getRooms();
    if (Array.isArray(rooms) && rooms.length > 0) {
        select.innerHTML = '<option value="">-- Choose your preferred room --</option>';
        rooms.forEach(room => {
            const opt = document.createElement('option');
            const price = room.discount_price || room.price_per_night;
            opt.value = room.id;
            opt.setAttribute('data-price', price);
            opt.textContent = `${room.title} (${formatINR(price)} / night)`;
            select.appendChild(opt);
        });
    }
}

// 3. Dynamic Hydration for Rooms Page
function hydrateRoomsPage() {
    const container = document.getElementById('roomsCatalogContainer');
    if (!container || !window.HotelStore) return;

    const rooms = HotelStore.getRooms();
    if (!Array.isArray(rooms) || rooms.length === 0) return;

    container.innerHTML = '';
    rooms.forEach((room, idx) => {
        const isReversed = idx % 2 === 1;
        const amenitiesHtml = (room.amenities || []).map(a => `<span class="amenity-pill">${a}</span>`).join('');
        const price = room.discount_price || room.price_per_night;
        const originalPrice = room.price_per_night ? `<span style="color:var(--text-dim);text-decoration:line-through;font-size:0.9rem;margin-right:0.5rem;">${formatINR(room.price_per_night)}</span>` : '';

        const card = document.createElement('div');
        card.className = 'suite-card-magazine';
        
        card.innerHTML = `
            <div class="suite-photo-wrap" style="${isReversed ? 'order:2;' : ''}">
                <img src="${room.image_url || 'assets/images/room-luxury.jpg'}" alt="${room.title}" loading="lazy">
                ${room.badge ? `<span class="suite-badge">${room.badge}</span>` : ''}
            </div>
            <div class="suite-details-wrap" style="${isReversed ? 'order:1;' : ''}">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.5rem;flex-wrap:wrap;gap:0.5rem;">
                    <span class="suite-class-eyebrow" style="margin-bottom:0;">${room.category || 'Luxury'} Class</span>
                    <div>
                        ${originalPrice}
                        <span class="suite-rate-num">${formatINR(price)}</span>
                        <span class="suite-rate-period">/ night</span>
                    </div>
                </div>
                <h2 class="suite-title">${room.title}</h2>
                <div class="suite-specs-row">
                    <span>${room.bed_type || 'King Bed'}</span> • <span>${room.capacity_adults || 2} Adults</span> • <span>${room.size_sqft || 400} sq.ft</span> • <span>${room.view_type || 'City View'}</span>
                </div>
                <p class="suite-desc">
                    ${room.short_desc || room.full_desc || ''}
                </p>
                <div style="display:flex;flex-wrap:wrap;gap:0.3rem;margin-bottom:1.5rem;">
                    ${amenitiesHtml}
                </div>
                <div class="suite-pricing-action" style="border-top:none;padding-top:0;">
                    <button type="button" class="btn btn-gold btn-sm" data-open-booking data-room-id="${room.id}" style="flex:1;">Reserve Suite</button>
                    <a href="tel:7534999777" class="btn btn-outline-gold btn-sm">Direct Desk</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    if (typeof attachBookingTriggers === 'function') {
        attachBookingTriggers();
    }
}

// 4. Dynamic Hydration for Dining Page
function hydrateDiningPage() {
    const container = document.getElementById('diningMenuContainer');
    if (!container || !window.HotelStore) return;

    const dining = HotelStore.getDining();
    if (!Array.isArray(dining) || dining.length === 0) return;

    container.innerHTML = '';
    dining.forEach(cat => {
        const catCard = document.createElement('div');
        catCard.style.cssText = 'background:var(--bg-card);border:1px solid var(--gold-border);border-radius:10px;padding:2rem;box-shadow:var(--shadow-subtle);';

        let dishesHtml = '';
        (cat.items || []).forEach(item => {
            const vegIcon = item.dietary === 'veg' ? '<span class="dietary-symbol veg"></span>' : '<span class="dietary-symbol nonveg"></span>';

            dishesHtml += `
                <div>
                    <div style="display:flex;justify-content:space-between;font-weight:600;color:var(--text-primary);font-size:0.95rem;">
                        <span>${vegIcon}${item.name} ${specialTag}</span>
                        <span class="text-gold">${formatINR(item.price)}</span>
                    </div>
                    <p style="font-size:0.82rem;color:var(--text-secondary);margin-top:0.25rem;">${item.desc || ''}</p>
                </div>
            `;
        });

        catCard.innerHTML = `
            <h3 class="font-serif" style="font-size:1.5rem;color:var(--gold);margin-bottom:1.25rem;border-bottom:1px solid var(--gold-border);padding-bottom:0.6rem;">${cat.category}</h3>
            <div class="dining-menu-grid">
                ${dishesHtml}
            </div>
        `;
        container.appendChild(catCard);
    });
}

// 5. Dynamic Hydration for Gallery Page
function hydrateGalleryPage() {
    const container = document.getElementById('galleryGrid');
    if (!container || !window.HotelStore) return;

    const gallery = HotelStore.getGallery();
    if (!Array.isArray(gallery) || gallery.length === 0) return;

    container.innerHTML = '';
    gallery.forEach(item => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.setAttribute('data-category', item.category || 'Exterior');
        div.setAttribute('data-src', item.image_url || 'assets/images/facade.jpg');
        div.setAttribute('data-title', item.title || 'Hotel Varn Inn');

        div.innerHTML = `
            <img src="${item.image_url || 'assets/images/facade.jpg'}" alt="${item.title}" class="gallery-item-img" loading="lazy">
            <div class="gallery-item-overlay">
                <span class="gallery-item-category">${item.category || 'Luxury'}</span>
                <h3 class="gallery-item-title">${item.title}</h3>
            </div>
        `;
        container.appendChild(div);
    });
}

// 6. Booking Submission (100% Client-side via HotelStore)
function handleBookingSubmit(form) {
    if (!window.HotelStore) return;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Securing Reservation...</span>';

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    // Match selected room
    const rooms = HotelStore.getRooms();
    const selectedRoom = rooms.find(r => r.id === Number(payload.room_id)) || rooms[0];
    if (selectedRoom) {
        payload.room_title = selectedRoom.title;
        const rate = selectedRoom.discount_price || selectedRoom.price_per_night;
        payload.total_price = rate;
    }

    setTimeout(() => {
        const newBooking = HotelStore.addBooking(payload);

        if (typeof playChime === 'function') playChime();

        if (typeof showToast === 'function') {
            showToast(`Reservation Confirmed! Booking Ref: ${newBooking.booking_code}. Our concierge desk will contact you.`, 'success');
        } else {
            alert(`Reservation Confirmed!\nYour Booking Reference: ${newBooking.booking_code}\nOur front desk will contact you at ${payload.guest_phone}.`);
        }

        form.reset();
        const modal = document.getElementById('globalBookingModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 450);
}

// 7. Contact Form Submission (100% Client-side via HotelStore)
function handleContactSubmit(form) {
    if (!window.HotelStore) return;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending Message...</span>';

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setTimeout(() => {
        HotelStore.addMessage(payload);

        if (typeof playChime === 'function') playChime();

        if (typeof showToast === 'function') {
            showToast('Thank you! Your message has been received by our concierge desk.', 'success');
        } else {
            alert('Thank you! Your message has been received by Hotel Varn Inn. We will contact you shortly.');
        }

        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 400);
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    hydrateSiteSettings();
    hydrateBookingModalRooms();
    hydrateRoomsPage();
    hydrateDiningPage();
    hydrateGalleryPage();

    // Attach booking form listener
    const bookingForm = document.getElementById('globalBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleBookingSubmit(bookingForm);
        });
    }

    // Attach contact form listener
    const contactForm = document.getElementById('contactInquiryForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleContactSubmit(contactForm);
        });
    }
});
