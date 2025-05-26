// DOM Elements
const sidebar = document.getElementById('sidebar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const overlay = document.getElementById('overlay');
const searchInput = document.getElementById('searchInput');
const filterBtn = document.getElementById('filterBtn');
const categoryTabs = document.querySelectorAll('.tab-btn');
const itemCards = document.querySelectorAll('.item-card');
const noResults = document.getElementById('noResults');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeSearch();
    initializeCategoryTabs();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);
    
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keypress', handleSearchKeypress);
    
    // Filter button
    filterBtn.addEventListener('click', handleFilter);
    
    // Category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', handleCategoryChange);
    });
    
    // Item cards click - HANYA ANIMASI, TANPA AKSI LAIN
    itemCards.forEach(card => {
        card.addEventListener('click', handleItemClick);
    });
    
    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', handleNavigation);
    });
    
    // Window resize handler
    window.addEventListener('resize', handleWindowResize);
}

// Mobile menu functions
function toggleMobileMenu() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Search functionality
function initializeSearch() {
    // Add search suggestions or autocomplete here if needed
    searchInput.placeholder = 'Cari jenis sampah...';
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const activeCategory = document.querySelector('.tab-btn.active').dataset.category;
    
    filterItems(searchTerm, activeCategory);
}

function handleSearchKeypress(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        // Disable search selection functionality for now
        // const firstVisibleCard = document.querySelector('.item-card:not([style*="display: none"])');
        // if (firstVisibleCard) {
        //     firstVisibleCard.click();
        // }
    }
}

// Category tab functionality
function initializeCategoryTabs() {
    // Set default active category
    const defaultTab = document.querySelector('.tab-btn.active');
    if (defaultTab) {
        showCategory(defaultTab.dataset.category);
    }
}

function handleCategoryChange(e) {
    const clickedTab = e.target;
    const category = clickedTab.dataset.category;
    
    // Update active tab
    categoryTabs.forEach(tab => tab.classList.remove('active'));
    clickedTab.classList.add('active');
    
    // Clear search when changing category
    searchInput.value = '';
    
    // Show category items
    showCategory(category);
}

function showCategory(category) {
    itemCards.forEach(card => {
        if (card.dataset.category === category) {
            card.style.display = 'block';
            // Add animation
            card.style.animation = 'fadeIn 0.3s ease-in';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Hide no results message when switching categories
    noResults.style.display = 'none';
}

// Filter and search items
function filterItems(searchTerm, category) {
    let visibleCount = 0;
    
    itemCards.forEach(card => {
        const itemName = card.dataset.name.toLowerCase();
        const itemCategory = card.dataset.category;
        
        const matchesSearch = searchTerm === '' || itemName.includes(searchTerm);
        const matchesCategory = itemCategory === category;
        
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease-in';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide no results message
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}

// Handle item card clicks - HANYA ANIMASI KLIK, TIDAK ADA FUNGSI LAIN
function handleItemClick(e) {
    const card = e.currentTarget;
    
    // Add click animation - scale down then back to normal
    card.style.transform = 'scale(0.95)';
    card.style.transition = 'transform 0.15s ease';
    
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 150);
    
    // Reset transition after animation
    setTimeout(() => {
        card.style.transition = '';
    }, 300);
    
    // TIDAK ADA AKSI LAIN - hanya animasi klik
}

// Handle filter button
function handleFilter() {
    // Create filter dropdown or modal
    const filterOptions = createFilterModal();
    document.body.appendChild(filterOptions);
}

function createFilterModal() {
    const modal = document.createElement('div');
    modal.className = 'filter-modal';
    modal.innerHTML = `
        <div class="filter-content">
            <h3>Filter Sampah</h3>
            <div class="filter-options">
                <label><input type="checkbox" value="recyclable"> Dapat Didaur Ulang</label>
                <label><input type="checkbox" value="hazardous"> Berbahaya</label>
                <label><input type="checkbox" value="compostable"> Dapat Dikompos</label>
            </div>
            <div class="filter-actions">
                <button class="apply-filter">Terapkan</button>
                <button class="close-filter">Tutup</button>
            </div>
        </div>
    `;
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-filter');
    const applyBtn = modal.querySelector('.apply-filter');
    
    closeBtn.addEventListener('click', () => {
        modal.parentNode.removeChild(modal);
    });
    
    applyBtn.addEventListener('click', () => {
        // Apply filter logic here
        modal.parentNode.removeChild(modal);
    });
    
    return modal;
}

// Handle navigation - HANYA ANIMASI KLIK, KECUALI LOGOUT
function handleNavigation(e) {
    e.preventDefault();
    const navItem = e.currentTarget;
    const navText = navItem.querySelector('span').textContent;
    
    // Add click animation to nav item
    navItem.style.transform = 'scale(0.95)';
    navItem.style.transition = 'transform 0.15s ease';
    
    setTimeout(() => {
        navItem.style.transform = 'scale(1)';
    }, 150);
    
    // Reset transition after animation
    setTimeout(() => {
        navItem.style.transition = '';
    }, 300);
    
    // Handle logout - TETAP BERFUNGSI
    if (navText === 'Logout') {
        handleLogout();
        return; // Exit early, don't change active states for logout
    }
    
    // Remove active class from all nav items (except logout)
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item (except logout)
    navItem.classList.add('active');
    
    // TIDAK ADA NAVIGASI UNTUK ITEM LAIN - hanya animasi klik dan perubahan active state
    // Halaman sudah siap tapi belum diintegrasikan
    
    // Close mobile menu if open
    if (window.innerWidth <= 768) {
        closeMobileMenu();
    }
}

function handleLogout() {
    // Kirim request ke Django logout URL
    fetch('/logout/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => {
        if (response.redirected) {
            // Simpan notifikasi ke localStorage
            localStorage.setItem('logoutSuccess', 'true');
            // Redirect ke login
            window.location.href = response.url;
        } else {
            throw new Error('Logout gagal');
        }
    })
    .catch(error => {
        showNotification("Gagal logout. Coba lagi.", 'error');
        console.error(error);
    });
}

// Utility function to get CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Handle window resize
function handleWindowResize() {
    if (window.innerWidth > 768) {
        // Close mobile menu on desktop
        closeMobileMenu();
    }
}

// Utility function for notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for modals and notifications
const additionalStyles = `
    .filter-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    }
    
    .filter-content {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .filter-options {
        margin: 1rem 0;
    }
    
    .filter-options label {
        display: block;
        margin-bottom: 0.5rem;
        cursor: pointer;
    }
    
    .filter-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 1rem;
    }
    
    .filter-actions button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }
    
    .apply-filter {
        background: #f39c12;
        color: white;
    }
    
    .close-filter {
        background: #6c757d;
        color: white;
    }
    
    .notification {
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: #2c3e50;
        color: white;
        border-radius: 8px;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-info {
        background: #17a2b8;
    }
    
    .notification-success {
        background: #28a745;
    }
    
    .notification-warning {
        background: #ffc107;
        color: #212529;
    }
    
    .notification-error {
        background: #dc3545;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    /* Keep hover effects and cursor pointer for item cards */
    .item-card {
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .item-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    /* Click animation */
    .item-card:active {
        transform: scale(0.95);
    }
    
    /* Navigation items hover and click effects */
    .nav-item {
        cursor: pointer;
        transition: transform 0.2s ease, background-color 0.2s ease;
    }
    
    .nav-item:hover {
        background-color: rgba(85, 228, 14, 0.2);
        transform: translateX(5px);
    }
    
    .nav-item:active {
        transform: scale(0.95);
    }
    
    /* Active nav item styling */
    .nav-item.active {
        background-color: rgba(85, 228, 14, 0.2);
        border-right: 3px solidrgb(121, 204, 4);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);