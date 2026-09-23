/**
 * Client-Side LocalStorage CMS & Data Store
 * 100% Pure HTML, CSS, & JavaScript (Zero PHP required!)
 * Hotel Varn Inn By Epsilon
 */

const STORAGE_KEY_SETTINGS = 'varn_hotel_settings';
const STORAGE_KEY_ROOMS = 'varn_hotel_rooms';
const STORAGE_KEY_DINING = 'varn_hotel_dining';
const STORAGE_KEY_EVENTS = 'varn_hotel_events';
const STORAGE_KEY_AMENITIES = 'varn_hotel_amenities';
const STORAGE_KEY_GALLERY = 'varn_hotel_gallery';
const STORAGE_KEY_BOOKINGS = 'varn_hotel_bookings';
const STORAGE_KEY_MESSAGES = 'varn_hotel_messages';
const STORAGE_KEY_AUTH = 'varn_admin_session';

// Default Seed Data
const DEFAULT_SETTINGS = {
    hotel_name: 'Hotel Varn Inn By Epsilon',
    hotel_brand: 'By Epsilon',
    tagline: 'Opening Soon • Booking Open Now',
    banner_status: 'OPENING SOON - BOOKING OPEN NOW',
    sub_tagline: 'Comfort Beyond Expectations • Perfect Place For Every Occasion',
    phone_1: '+91 7534999777',
    phone_2: '+91 8937999777',
    whatsapp: '917534999777',
    email: 'reservations@epsilonhotels.in',
    website: 'www.epsilonhotels.in',
    address: 'NH-58, Haridwar Road, near Vedandam Banquet Hall, Sherpur, ROORKEE, Uttarakhand 247667',
    google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13838.318288593444!2d77.8821946!3d29.8660312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eb36e2fefec77%3A0x63351d38260d3d2!2sNH-58%2C%20Roorkee%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    hero_title: 'Where Luxury Meets Royal Grandeur',
    hero_subtitle: 'Roorkee’s premier destination featuring opulent suites, grand banquet celebrations, open-air sky lounge dining, and royal hospitality.',
    sky_lounge_hours: '5:00 PM – 11:30 PM Daily',
    restaurant_hours: '7:00 AM – 11:00 PM Daily',
    social_facebook: 'https://facebook.com/epsilonhotels',
    social_instagram: 'https://instagram.com/varninnhotel'
};

const DEFAULT_ROOMS = [
    {
        id: 1,
        title: 'Deluxe Executive Room',
        category: 'Deluxe',
        price_per_night: 3499,
        discount_price: 2799,
        capacity_adults: 2,
        capacity_children: 1,
        size_sqft: 380,
        bed_type: 'King Bed or Twin Beds',
        view_type: 'Garden & City View',
        short_desc: 'Elegantly furnished with plush Italian linens, ergonomic work desk, ambient lighting, and high-speed optical Wi-Fi.',
        full_desc: 'The Deluxe Executive Room delivers a soothing sanctuary with custom warm wood paneling, designer furnishings, smart climate control, and a marble bath with premium organic toiletries.',
        image_url: 'assets/images/room-deluxe.jpg',
        badge: 'Most Popular',
        amenities: ['High Speed Wi-Fi', 'Smart 55" 4K TV', 'Rain Shower', 'Mini Bar', '24/7 Room Service'],
        is_featured: 1
    },
    {
        id: 2,
        title: 'Super Deluxe Luxury Suite',
        category: 'Luxury',
        price_per_night: 5499,
        discount_price: 4499,
        capacity_adults: 3,
        capacity_children: 1,
        size_sqft: 520,
        bed_type: 'Royal King Bed',
        view_type: 'Panoramic Sunset Skyline',
        short_desc: 'Spacious haven with separate lounge seating, illuminated golden headboards, bespoke art, and panoramic sunset vistas.',
        full_desc: 'Designed for discerning travelers seeking sophistication. Includes private dressing area, automated blackout curtains, Nespresso bar, deep soaking tub, and priority Sky Lounge access.',
        image_url: 'assets/images/room-luxury.jpg',
        badge: 'Luxury Choice',
        amenities: ['Panoramic View', 'Bathtub & Rain Shower', 'Private Lounge', 'Free Breakfast', 'Nespresso Bar'],
        is_featured: 1
    },
    {
        id: 3,
        title: 'Presidential Royal Suite',
        category: 'Presidential',
        price_per_night: 8999,
        discount_price: 7499,
        capacity_adults: 4,
        capacity_children: 2,
        size_sqft: 950,
        bed_type: 'Imperial Master King Bed',
        view_type: '360° Skyline & Haridwar Road View',
        short_desc: 'The zenith of opulence. Features private dining salon, marble fireplace, powder room, butler pantry, and luxury jacuzzis.',
        full_desc: 'Experience supreme luxury in our flagship Presidential Suite. Handcrafted gold-leaf trims, Italian marble flooring, dedicated 24-hour butler assistance, private sound system, and VIP privileges.',
        image_url: 'assets/images/room-suite.jpg',
        badge: 'Royal Flagship',
        amenities: ['Dedicated Butler', 'Private Dining Salon', 'Jacuzzi Bath', 'Sky Lounge Access', 'Free Airport Pickup'],
        is_featured: 1
    }
];

const DEFAULT_DINING = [
    {
        category: 'Signature Starters',
        items: [
            { id: 1, name: 'Bhatti Da Murgh Tikka', price: 495, desc: 'Tender chicken morsels marinated in Kashmiri chili and roasted in clay tandoor.', dietary: 'non-veg', is_special: true },
            { id: 2, name: 'Truffle & Cheese Dahi Ke Kebab', price: 425, desc: 'Silky hung yogurt infused with melted aged cheese and a hint of truffle oil.', dietary: 'veg', is_special: true }
        ]
    },
    {
        category: 'Royal Main Course',
        items: [
            { id: 3, name: 'Varn Inn Dal Makhani', price: 385, desc: 'Slow-cooked black lentils simmered for 24 hours with churned white butter.', dietary: 'veg', is_special: true },
            { id: 4, name: 'Awadhi Dum Gosht Nihari', price: 645, desc: 'Melt-in-mouth mutton shanks braised in aromatic Lucknowi spices.', dietary: 'non-veg', is_special: true }
        ]
    },
    {
        category: 'Sky Lounge Elixirs & Mocktails',
        items: [
            { id: 5, name: 'Roorkee Sunset Gold', price: 295, desc: 'Passion fruit, smoked rosemary sprig, sparkling tonic, and 24k gold leaf rim.', dietary: 'veg', is_special: true },
            { id: 6, name: 'Epsilon Botanical Elixir', price: 450, desc: 'Elderflower, cucumber ribbons, pink peppercorns, and Mediterranean tonic.', dietary: 'veg', is_special: false }
        ]
    }
];

const DEFAULT_EVENTS = [
    {
        id: 1,
        name: 'The Grand Varn Banquet Hall',
        subtitle: 'Roorkee’s Most Prestigious Celebration Destination',
        capacity_theater: 600,
        capacity_banquet: 400,
        size_sqft: 6500,
        description: 'A breath-taking pillarless ballroom adorned with crystal chandeliers, customizable mood lighting, grand stage, and royal bridal suite. Perfect for weddings, sangeet, and grand galas.',
        features: ['Crystal Chandeliers', 'Pillarless Architecture', 'Dedicated Dining Hall', 'Bridal Dressing Suite', 'Valet Parking for 200+ Cars'],
        image_url: 'assets/images/banquet.jpg'
    },
    {
        id: 2,
        name: 'Epsilon Executive Conference Hall',
        subtitle: 'High-Tech Boardroom & Corporate Center',
        capacity_theater: 150,
        capacity_banquet: 80,
        size_sqft: 2200,
        description: 'Engineered for high-stakes meetings, corporate summits, and seminars. Fitted with laser projectors, surround acoustics, dual video conferencing hubs, and ergonomic executive seating.',
        features: ['4K Laser Projection', 'Dual Video Conferencing', 'High-Speed Wi-Fi', 'Podium & Mic Systems', 'Dedicated Coffee Lounge'],
        image_url: 'assets/images/conference.jpg'
    }
];

const DEFAULT_AMENITIES = [
    { id: 1, title: 'Opulent Luxury Rooms & Suites', desc: 'King plush bedding, marble bathrooms, smart climate control and 24/7 in-room dining.', icon: '🛏️', image_url: 'assets/images/room-luxury.jpg' },
    { id: 2, title: 'Grand Banquet Hall (6,500 sq.ft)', desc: 'Pillarless architectural marvel accommodating 600+ guests for weddings and royal celebrations.', icon: '👑', image_url: 'assets/images/banquet.jpg' },
    { id: 3, title: 'Open Rooftop Sky Lounge', desc: 'Mesmerizing skyline vistas, handcrafted elixirs, live grills, and ambient starlit seating.', icon: '🍸', image_url: 'assets/images/rooftop.jpg' },
    { id: 4, title: 'Pool Party & Cabana Zone', desc: 'Crystal azure waters with poolside loungers, sunken bar, and sound systems for private gatherings.', icon: '🏊', image_url: 'assets/images/pool.jpg' },
    { id: 5, title: 'Executive Conference Hall', desc: '4K laser projection, dual video conferencing, high-speed optical Wi-Fi, and acoustic sound.', icon: '🎤', image_url: 'assets/images/conference.jpg' },
    { id: 6, title: 'Fine Dining Multi-Cuisine Restaurant', desc: 'Master chefs curating authentic Awadhi, Mughlai, Continental, and Pan-Asian delicacies.', icon: '🍽️', image_url: 'assets/images/dining.jpg' }
];

const DEFAULT_GALLERY = [
    { id: 1, title: 'Grand Facade at Twilight', category: 'Exterior', image_url: 'assets/images/facade.jpg' },
    { id: 2, title: 'Super Deluxe Master Suite', category: 'Rooms', image_url: 'assets/images/room-luxury.jpg' },
    { id: 3, title: 'Deluxe King Executive Room', category: 'Rooms', image_url: 'assets/images/room-deluxe.jpg' },
    { id: 4, title: 'Presidential Skyline Penthouse', category: 'Rooms', image_url: 'assets/images/room-suite.jpg' },
    { id: 5, title: 'Royal Wedding Banquet Setup', category: 'Banquet', image_url: 'assets/images/banquet.jpg' },
    { id: 6, title: 'Sky Lounge Rooftop at Sunset', category: 'Rooftop', image_url: 'assets/images/rooftop.jpg' },
    { id: 7, title: 'Illuminated Pool Party Zone', category: 'Pool', image_url: 'assets/images/pool.jpg' },
    { id: 8, title: 'Executive Boardroom & Conference', category: 'Events', image_url: 'assets/images/conference.jpg' },
    { id: 9, title: 'Gourmet Cuisine & Cocktail Plating', category: 'Dining', image_url: 'assets/images/dining.jpg' }
];

const DEFAULT_BOOKINGS = [
    {
        id: 101,
        booking_code: 'VARN-9821',
        guest_name: 'Rajesh Sharma',
        guest_email: 'rajesh.sharma@example.com',
        guest_phone: '+91 9876543210',
        room_id: 2,
        room_title: 'Super Deluxe Luxury Suite',
        check_in: '2026-10-05',
        check_out: '2026-10-08',
        guests_count: 2,
        special_requests: 'Anniversary celebration, high floor with skyline view requested.',
        total_price: 13497,
        status: 'confirmed',
        created_at: '2026-09-14T10:15:00.000Z'
    },
    {
        id: 102,
        booking_code: 'VARN-7412',
        guest_name: 'Dr. Ananya Verma',
        guest_email: 'ananya.v@iitr.ac.in',
        guest_phone: '+91 9837012345',
        room_id: 1,
        room_title: 'Deluxe Executive Room',
        check_in: '2026-10-12',
        check_out: '2026-10-14',
        guests_count: 1,
        special_requests: 'IIT Roorkee academic conference guest. Late check-in at 8 PM.',
        total_price: 5598,
        status: 'pending',
        created_at: '2026-09-15T08:30:00.000Z'
    },
    {
        id: 103,
        booking_code: 'VARN-3654',
        guest_name: 'Vikramjit Singh Oberoi',
        guest_email: 'vikram.oberoi@globaltech.com',
        guest_phone: '+91 9911223344',
        room_id: 3,
        room_title: 'Presidential Royal Suite',
        check_in: '2026-10-20',
        check_out: '2026-10-23',
        guests_count: 3,
        special_requests: 'VIP airport transfer and dedicated butler service required.',
        total_price: 22497,
        status: 'pending',
        created_at: '2026-09-15T11:45:00.000Z'
    }
];

const DEFAULT_MESSAGES = [
    {
        id: 201,
        name: 'Pradeep Goel',
        email: 'pgoel.industries@gmail.com',
        phone: '+91 9897123456',
        subject: 'Wedding Banquet Inquiry for Dec 2026',
        message: 'Looking to book The Grand Varn Banquet Hall for 450 guests wedding reception. Please provide menu packages and bridal suite inclusions.',
        status: 'unread',
        created_at: '2026-09-15T09:20:00.000Z'
    },
    {
        id: 202,
        name: 'Meenakshi Sundaram',
        email: 'meenakshi@designcorp.in',
        phone: '+91 9756112233',
        subject: 'Corporate Annual Meet at Conference Hall',
        message: 'We require the Executive Conference Hall for full-day seminar with 70 attendees. Need AV equipment, projector, and lunch buffet arrangements.',
        status: 'unread',
        created_at: '2026-09-15T12:05:00.000Z'
    }
];

const HotelStore = {
    // 1. Settings
    getSettings() {
        const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
        if (!data) {
            localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
            return DEFAULT_SETTINGS;
        }
        return JSON.parse(data);
    },
    saveSettings(newSettings) {
        const current = this.getSettings();
        const updated = { ...current, ...newSettings };
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(updated));
        return updated;
    },

    // 2. Rooms
    getRooms() {
        const data = localStorage.getItem(STORAGE_KEY_ROOMS);
        if (!data) {
            localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(DEFAULT_ROOMS));
            return DEFAULT_ROOMS;
        }
        return JSON.parse(data);
    },
    saveRoom(room) {
        const rooms = this.getRooms();
        if (room.id) {
            const idx = rooms.findIndex(r => r.id === Number(room.id));
            if (idx !== -1) {
                rooms[idx] = { ...rooms[idx], ...room };
            } else {
                rooms.push(room);
            }
        } else {
            room.id = Date.now();
            rooms.push(room);
        }
        localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(rooms));
        return rooms;
    },
    deleteRoom(id) {
        const rooms = this.getRooms().filter(r => r.id !== Number(id));
        localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(rooms));
        return rooms;
    },

    // 3. Dining
    getDining() {
        const data = localStorage.getItem(STORAGE_KEY_DINING);
        if (!data) {
            localStorage.setItem(STORAGE_KEY_DINING, JSON.stringify(DEFAULT_DINING));
            return DEFAULT_DINING;
        }
        return JSON.parse(data);
    },
    saveDish(categoryName, dish) {
        const dining = this.getDining();
        let cat = dining.find(c => c.category.toLowerCase() === categoryName.toLowerCase());
        if (!cat) {
            cat = { category: categoryName, items: [] };
            dining.push(cat);
        }
        if (dish.id) {
            const idx = cat.items.findIndex(i => i.id === Number(dish.id));
            if (idx !== -1) {
                cat.items[idx] = { ...cat.items[idx], ...dish };
            } else {
                cat.items.push(dish);
            }
        } else {
            dish.id = Date.now();
            cat.items.push(dish);
        }
        localStorage.setItem(STORAGE_KEY_DINING, JSON.stringify(dining));
        return dining;
    },
    deleteDish(id) {
        const dining = this.getDining();
        dining.forEach(cat => {
            cat.items = cat.items.filter(i => i.id !== Number(id));
        });
        localStorage.setItem(STORAGE_KEY_DINING, JSON.stringify(dining));
        return dining;
    },

    // 4. Events
    getEvents() {
        const data = localStorage.getItem(STORAGE_KEY_EVENTS);
        if (!data) {
            localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(DEFAULT_EVENTS));
            return DEFAULT_EVENTS;
        }
        return JSON.parse(data);
    },
    saveEvent(eventItem) {
        const events = this.getEvents();
        if (eventItem.id) {
            const idx = events.findIndex(e => e.id === Number(eventItem.id));
            if (idx !== -1) {
                events[idx] = { ...events[idx], ...eventItem };
            } else {
                events.push(eventItem);
            }
        } else {
            eventItem.id = Date.now();
            events.push(eventItem);
        }
        localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(events));
        return events;
    },
    deleteEvent(id) {
        const events = this.getEvents().filter(e => e.id !== Number(id));
        localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(events));
        return events;
    },

    // 5. Amenities
    getAmenities() {
        const data = localStorage.getItem(STORAGE_KEY_AMENITIES);
        if (!data) {
            localStorage.setItem(STORAGE_KEY_AMENITIES, JSON.stringify(DEFAULT_AMENITIES));
            return DEFAULT_AMENITIES;
        }
        return JSON.parse(data);
    },
    saveAmenity(amenity) {
        const amenities = this.getAmenities();
        if (amenity.id) {
            const idx = amenities.findIndex(a => a.id === Number(amenity.id));
            if (idx !== -1) {
                amenities[idx] = { ...amenities[idx], ...amenity };
            } else {
                amenities.push(amenity);
            }
        } else {
            amenity.id = Date.now();
            amenities.push(amenity);
        }
        localStorage.setItem(STORAGE_KEY_AMENITIES, JSON.stringify(amenities));
        return amenities;
    },
    deleteAmenity(id) {
        const amenities = this.getAmenities().filter(a => a.id !== Number(id));
        localStorage.setItem(STORAGE_KEY_AMENITIES, JSON.stringify(amenities));
        return amenities;
    },

    // 6. Gallery
    getGallery() {
        const data = localStorage.getItem(STORAGE_KEY_GALLERY);
        if (!data) {
            localStorage.setItem(STORAGE_KEY_GALLERY, JSON.stringify(DEFAULT_GALLERY));
            return DEFAULT_GALLERY;
        }
        return JSON.parse(data);
    },
    saveGalleryItem(item) {
        const gallery = this.getGallery();
        if (item.id) {
            const idx = gallery.findIndex(g => g.id === Number(item.id));
            if (idx !== -1) {
                gallery[idx] = { ...gallery[idx], ...item };
            } else {
                gallery.unshift(item);
            }
        } else {
            item.id = Date.now();
            gallery.unshift(item);
        }
        localStorage.setItem(STORAGE_KEY_GALLERY, JSON.stringify(gallery));
        return gallery;
    },
    deleteGalleryItem(id) {
        const gallery = this.getGallery().filter(g => g.id !== Number(id));
        localStorage.setItem(STORAGE_KEY_GALLERY, JSON.stringify(gallery));
        return gallery;
    },

    // 7. Bookings
    getBookings() {
        const data = localStorage.getItem(STORAGE_KEY_BOOKINGS);
        if (!data) {
            localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(DEFAULT_BOOKINGS));
            return DEFAULT_BOOKINGS;
        }
        return JSON.parse(data);
    },
    addBooking(booking) {
        const bookings = this.getBookings();
        booking.id = Date.now();
        booking.booking_code = 'VARN-' + Math.floor(1000 + Math.random() * 9000);
        booking.created_at = new Date().toISOString();
        booking.status = 'pending';
        bookings.unshift(booking);
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
        return booking;
    },
    updateBookingStatus(id, status) {
        const bookings = this.getBookings();
        const b = bookings.find(item => item.id === Number(id));
        if (b) b.status = status;
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
        return bookings;
    },
    deleteBooking(id) {
        const bookings = this.getBookings().filter(item => item.id !== Number(id));
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
        return bookings;
    },

    // 8. Messages
    getMessages() {
        const data = localStorage.getItem(STORAGE_KEY_MESSAGES);
        if (!data) {
            localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(DEFAULT_MESSAGES));
            return DEFAULT_MESSAGES;
        }
        return JSON.parse(data);
    },
    addMessage(msg) {
        const msgs = this.getMessages();
        msg.id = Date.now();
        msg.created_at = new Date().toISOString();
        msg.status = 'unread';
        msgs.unshift(msg);
        localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(msgs));
        return msg;
    },
    updateMessageStatus(id, status) {
        const msgs = this.getMessages();
        const m = msgs.find(item => item.id === Number(id));
        if (m) m.status = status;
        localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(msgs));
        return msgs;
    },
    deleteMessage(id) {
        const msgs = this.getMessages().filter(item => item.id !== Number(id));
        localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(msgs));
        return msgs;
    },

    // 9. Auth (Client-side Session)
    isAdminLoggedIn() {
        return sessionStorage.getItem(STORAGE_KEY_AUTH) === 'logged_in';
    },
    adminLogin(user, pass) {
        if (user === 'admin' && pass === 'admin123') {
            sessionStorage.setItem(STORAGE_KEY_AUTH, 'logged_in');
            return true;
        }
        return false;
    },
    adminLogout() {
        sessionStorage.removeItem(STORAGE_KEY_AUTH);
    },

    // 10. Factory Reset
    resetAllData() {
        localStorage.removeItem(STORAGE_KEY_SETTINGS);
        localStorage.removeItem(STORAGE_KEY_ROOMS);
        localStorage.removeItem(STORAGE_KEY_DINING);
        localStorage.removeItem(STORAGE_KEY_EVENTS);
        localStorage.removeItem(STORAGE_KEY_AMENITIES);
        localStorage.removeItem(STORAGE_KEY_GALLERY);
        localStorage.removeItem(STORAGE_KEY_BOOKINGS);
        localStorage.removeItem(STORAGE_KEY_MESSAGES);
        return true;
    }
};

window.HotelStore = HotelStore;
