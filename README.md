# Hotel Varn Inn By Epsilon

> **5-Star Luxury Architectural Web Application**  
> Inspired by the architectural aesthetic and typography of [Sunny Sanitations](https://sunnysanitations.com), Aman, Taj, and Oberoi.

---

## 🌟 Key Features

- **Architectural Dark Palette**: Deep Obsidian Pitch Black (`#050505`), rich charcoal surfaces (`#0a0a0a`), and luxury card containers (`#0e0e0e`).
- **Radiant Brass Accents**: Champagne brass gold gradients (`#F5E6CC` &rarr; `#E1C298` &rarr; `#C8A46B` &rarr; `#B89B74`).
- **Editorial Typography**:
  - **Headings & Hero**: `Cormorant Garamond` (Light 300 weight, architectural serif).
  - **Body & Text**: `Inter` (300 weight, pure alabaster `#ffffff`).
  - **Micro Tags & Badges**: `Space Mono` (Uppercase, `0.32em` letter-spacing).
- **Motion & Interactions**:
  - Luxury scroll progress indicator.
  - Interactive 3D card tilt with specular glare tracking.
  - IntersectionObserver scroll reveal engine (`.reveal-up`, `.reveal-scale`, `.reveal-left`, `.reveal-right`).
  - Hero particle dust canvas animation.
  - Floating WhatsApp concierge with dual radar ripple.
- **Full Booking & Admin Suite**:
  - Direct suite booking modal and quick reservation bar.
  - Dynamic pricing calculator.
  - Full executive administration dashboard (`/admin/index.html`).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)

### Run Locally
```bash
# Start the web server
npm start
# or
node server.js
```

Open your browser at:
- **Main Website**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:3000/admin/index.html](http://localhost:3000/admin/index.html)

---

## 📁 Project Structure

```text
├── admin/               # Executive administration panel pages
├── assets/
│   ├── css/
│   │   ├── style.css         # Deep Obsidian & Champagne Brass design system
│   │   ├── animations.css    # 3D tilt, radar ripples, particles, scroll reveals
│   │   └── admin.css         # Clean administrative panel stylesheet
│   ├── js/
│   │   ├── main.js           # Client interactions and booking drawer logic
│   │   ├── animations.js     # Standalone motion engine & 3D tilt calculations
│   │   ├── api.js            # Frontend API adapters
│   │   ├── store.js          # Client-side state & local persistence
│   │   └── admin.js          # Admin data manipulation & tables
│   └── images/               # High-definition architectural assets
├── index.html           # Grand Home page
├── rooms.html           # Suites & Sanctuaries
├── dining.html          # Sky Lounge & Fine Dining
├── events.html          # 6,500 sq.ft Grand Ballroom & Celebrations
├── amenities.html       # Bespoke Services & Facilities
├── gallery.html         # Visual Portfolio & Architecture
├── contact.html         # Direct Concierge & Directions
├── schema.sql           # Database schema definition
├── server.js            # Zero-dependency Node.js HTTP static server
└── package.json         # Project manifests and scripts
```
