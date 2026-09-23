-- Hotel Varn Inn By Epsilon - Database Schema (SQLite / MySQL compatible)

CREATE TABLE IF NOT EXISTS settings (
    setting_key VARCHAR(100) PRIMARY KEY,
    setting_value TEXT,
    setting_group VARCHAR(50) DEFAULT 'general'
);

CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE,
    category VARCHAR(50) DEFAULT 'Deluxe',
    price_per_night DECIMAL(10,2) NOT NULL,
    discount_price DECIMAL(10,2),
    capacity_adults INT DEFAULT 2,
    capacity_children INT DEFAULT 1,
    size_sqft INT,
    bed_type VARCHAR(100),
    view_type VARCHAR(100),
    short_desc TEXT,
    full_desc TEXT,
    image_url TEXT,
    badge VARCHAR(50),
    amenities_json TEXT,
    is_featured INT DEFAULT 0,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dining_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE,
    sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS dining_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INT,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    is_special INT DEFAULT 0,
    dietary VARCHAR(20) DEFAULT 'veg',
    image_url TEXT
);

CREATE TABLE IF NOT EXISTS event_halls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(150) NOT NULL,
    subtitle VARCHAR(200),
    capacity_theater INT,
    capacity_banquet INT,
    size_sqft INT,
    description TEXT,
    features_json TEXT,
    image_url TEXT,
    sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS amenities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    icon_type VARCHAR(50),
    category VARCHAR(50) DEFAULT 'general',
    is_highlight INT DEFAULT 0,
    sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_code VARCHAR(50) UNIQUE,
    guest_name VARCHAR(150) NOT NULL,
    guest_email VARCHAR(150) NOT NULL,
    guest_phone VARCHAR(50) NOT NULL,
    room_id INT,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    adults INT DEFAULT 1,
    children INT DEFAULT 0,
    total_price DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'pending',
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
