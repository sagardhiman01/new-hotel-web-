/**
 * Admin Panel Framework & Shared Logic
 * 100% Pure HTML, CSS, & JavaScript (No PHP required!)
 * Hotel Varn Inn By Epsilon
 */

// Format INR helper
function formatINR(val) {
    return '₹' + Number(val || 0).toLocaleString('en-IN');
}

// Format Date helper
function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return isNaN(d) ? dateStr : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Toast notification
function showAdminToast(msg, type = 'success') {
    let container = document.getElementById('adminToastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'adminToastContainer';
        container.style.cssText = 'position:fixed;bottom:2rem;right:2rem;z-index:99999;display:flex;flex-direction:column;gap:0.75rem;pointer-events:none;';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bg = type === 'success' ? '#10b981' : type === 'danger' ? '#ef4444' : '#f59e0b';
    toast.style.cssText = `background:${bg};color:#fff;padding:0.85rem 1.4rem;border-radius:8px;font-weight:600;font-size:0.9rem;box-shadow:0 10px 30px rgba(0,0,0,0.5);display:flex;align-items:center;gap:0.6rem;pointer-events:auto;animation:slideIn 0.3s ease;`;
    toast.innerHTML = `<span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

// Auth Guard & Sidebar Injector
function initAdminPage(activePageName, pageTitle = 'Executive Portal') {
    // 1. Check Auth (except for login page)
    if (activePageName !== 'login') {
        if (!HotelStore.isAdminLoggedIn()) {
            window.location.href = 'login.html';
            return;
        }
    } else {
        if (HotelStore.isAdminLoggedIn()) {
            window.location.href = 'index.html';
            return;
        }
        return; // Don't build sidebar on login page
    }

    // Counts for badges
    const bookings = HotelStore.getBookings();
    const pendingCount = bookings.filter(b => b.status === 'pending').length;
    const messages = HotelStore.getMessages();
    const unreadCount = messages.filter(m => m.status === 'unread').length;

    // 2. Build Sidebar
    const sidebar = document.getElementById('adminSidebar');
    if (sidebar) {
        sidebar.innerHTML = `
            <div class="admin-brand">
                <div>
                    <div class="admin-brand-title">HOTEL VARN INN</div>
                    <div class="admin-brand-subtitle">Executive CMS Portal</div>
                </div>
            </div>

            <nav class="admin-nav">
                <a href="index.html" class="admin-nav-item ${activePageName === 'dashboard' ? 'active' : ''}">
                    <span>Dashboard</span>
                </a>

                <a href="bookings.html" class="admin-nav-item ${activePageName === 'bookings' ? 'active' : ''}">
                    <span>Reservations</span>
                    ${pendingCount > 0 ? `<span class="admin-nav-badge">${pendingCount}</span>` : ''}
                </a>

                <a href="settings.html" class="admin-nav-item ${activePageName === 'settings' ? 'active' : ''}">
                    <span>Website Customizer</span>
                </a>

                <a href="rooms.html" class="admin-nav-item ${activePageName === 'rooms' ? 'active' : ''}">
                    <span>Rooms & Suites</span>
                </a>

                <a href="dining.html" class="admin-nav-item ${activePageName === 'dining' ? 'active' : ''}">
                    <span>Sky Lounge & Dining</span>
                </a>

                <a href="events.html" class="admin-nav-item ${activePageName === 'events' ? 'active' : ''}">
                    <span>Banquets & Events</span>
                </a>

                <a href="amenities.html" class="admin-nav-item ${activePageName === 'amenities' ? 'active' : ''}">
                    <span>Hotel Amenities</span>
                </a>

                <a href="gallery.html" class="admin-nav-item ${activePageName === 'gallery' ? 'active' : ''}">
                    <span>Photo Gallery</span>
                </a>

                <a href="messages.html" class="admin-nav-item ${activePageName === 'messages' ? 'active' : ''}">
                    <span>Guest Inquiries</span>
                    ${unreadCount > 0 ? `<span class="admin-nav-badge" style="background:#a78bfa;color:#1e1b4b;">${unreadCount}</span>` : ''}
                </a>
            </nav>

            <div class="admin-sidebar-footer">
                <div class="admin-user-info">
                    <div class="admin-avatar">AD</div>
                    <div>
                        <div class="admin-username">Executive Admin</div>
                        <div class="admin-role">Super Administrator</div>
                    </div>
                </div>
                <div style="display:flex;gap:0.5rem;margin-top:0.75rem;">
                    <a href="../index.html" target="_blank" class="btn btn-adm-secondary btn-adm-sm" style="flex:1;text-align:center;text-decoration:none;">View Site &rarr;</a>
                    <button type="button" id="adminLogoutBtn" class="btn btn-adm-danger btn-adm-sm" style="flex:1;">Logout</button>
                </div>
            </div>
        `;

        document.getElementById('adminLogoutBtn')?.addEventListener('click', () => {
            HotelStore.adminLogout();
            window.location.href = 'login.html';
        });
    }

    // 3. Build Topbar
    const topbar = document.getElementById('adminTopbar');
    if (topbar) {
        topbar.innerHTML = `
            <div style="display:flex;align-items:center;gap:1rem;">
                <button type="button" class="btn btn-adm-secondary btn-adm-sm" id="sidebarToggle" style="display:none;">Menu</button>
                <h1 class="font-heading" style="font-size:1.4rem;color:#fff;">${pageTitle}</h1>
            </div>
            <div style="display:flex;align-items:center;gap:1.25rem;">
                <div style="color:var(--adm-text-muted);font-size:0.85rem;display:flex;align-items:center;gap:0.5rem;">
                    <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10b981;"></span>
                    <span>Hotel Varn Inn By Epsilon • Roorkee</span>
                </div>
                <a href="../index.html" target="_blank" class="btn btn-adm-gold btn-adm-sm" style="text-decoration:none;">Live Website ↗</a>
            </div>
        `;
    }
}

window.initAdminPage = initAdminPage;
window.showAdminToast = showAdminToast;
window.formatINR = formatINR;
window.formatDate = formatDate;
