// home.js - Complete JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page
    initializeEventListeners();
    showAllItems();
});

function initializeEventListeners() {
    // Search input functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Category tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
            
            // Update active tab
            tabButtons.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Filter button functionality
    const filterBtn = document.getElementById('filterBtn');
    const filtersPanel = document.getElementById('filtersPanel');
    const filtersBackdrop = document.getElementById('filtersBackdrop');
    const closeFilters = document.getElementById('closeFilters');

    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            filtersPanel.classList.add('active');
            filtersBackdrop.classList.add('active');
        });
    }

    if (closeFilters) {
        closeFilters.addEventListener('click', closeFiltersPanel);
    }

    if (filtersBackdrop) {
        filtersBackdrop.addEventListener('click', closeFiltersPanel);
    }

    // Filter options functionality
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    const statusFilters = document.querySelectorAll('input[type="checkbox"]');
    statusFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Item cards click functionality
    const itemCards = document.querySelectorAll('.item-card');
    itemCards.forEach(card => {
        card.addEventListener('click', function() {
            const itemName = this.getAttribute('data-name');
            showItemDetails(itemName);
        });
    });
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const items = document.querySelectorAll('.item-card');
    
    items.forEach(item => {
        const itemName = item.getAttribute('data-name').toLowerCase();
        const itemDescription = item.querySelector('.item-description').textContent.toLowerCase();
        const itemTitle = item.querySelector('.item-name').textContent.toLowerCase();
        
        if (itemName.includes(searchTerm) || 
            itemDescription.includes(searchTerm) || 
            itemTitle.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    checkNoResults();
}

function filterByCategory(category) {
    const items = document.querySelectorAll('.item-card');
    
    items.forEach(item => {
        if (category === 'all') {
            item.style.display = 'block';
        } else {
            const itemCategory = item.getAttribute('data-category');
            if (itemCategory === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
    
    checkNoResults();
}

function showAllItems() {
    const items = document.querySelectorAll('.item-card');
    items.forEach(item => {
        item.style.display = 'block';
    });
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const allTab = document.querySelector('[data-category="all"]');
    if (allTab) {
        allTab.classList.add('active');
    }
    
    // Clear search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    checkNoResults();
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    showAllItems();
}

function toggleView() {
    const grid = document.getElementById('itemsGrid');
    if (grid) {
        grid.classList.toggle('list-view');
        
        // Update button text
        const toggleBtn = document.querySelector('.quick-action-btn:nth-child(3) span');
        if (toggleBtn) {
            if (grid.classList.contains('list-view')) {
                toggleBtn.textContent = 'Tampilan Grid';
            } else {
                toggleBtn.textContent = 'Tampilan List';
            }
        }
    }
}

function closeFiltersPanel() {
    const filtersPanel = document.getElementById('filtersPanel');
    const filtersBackdrop = document.getElementById('filtersBackdrop');
    
    if (filtersPanel) {
        filtersPanel.classList.remove('active');
    }
    if (filtersBackdrop) {
        filtersBackdrop.classList.remove('active');
    }
}

function applyFilters() {
    const selectedCategory = document.querySelector('input[name="category"]:checked').value;
    const selectedStatuses = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                                  .map(cb => cb.value);
    
    const items = document.querySelectorAll('.item-card');
    
    items.forEach(item => {
        let showItem = true;
        
        // Filter by category
        if (selectedCategory !== 'all') {
            const itemCategory = item.getAttribute('data-category');
            if (itemCategory !== selectedCategory) {
                showItem = false;
            }
        }
        
        // Filter by status
        if (selectedStatuses.length > 0 && showItem) {
            const hasPopularBadge = item.querySelector('.item-badge.popular');
            const hasNewBadge = item.querySelector('.item-badge.new');
            
            let hasMatchingStatus = false;
            
            if (selectedStatuses.includes('popular') && hasPopularBadge) {
                hasMatchingStatus = true;
            }
            if (selectedStatuses.includes('new') && hasNewBadge) {
                hasMatchingStatus = true;
            }
            
            if (!hasMatchingStatus) {
                showItem = false;
            }
        }
        
        // Apply visibility
        item.style.display = showItem ? 'block' : 'none';
    });
    
    // Update category tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeTab = document.querySelector(`[data-category="${selectedCategory}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    checkNoResults();
}

function checkNoResults() {
    const visibleItems = document.querySelectorAll('.item-card[style*="block"], .item-card:not([style*="none"])');
    const noResults = document.getElementById('noResults');
    
    if (noResults) {
        if (visibleItems.length === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }
}

function showItemDetails(itemName) {
    // This function can be expanded to show item details
    // For now, just log the item name
    console.log('Clicked item:', itemName);
    
    // You can add modal functionality here or redirect to detail page
    // Example: window.location.href = /item/${itemName}/;
}

// Additional utility functions
function resetAllFilters() {
    // Reset category filter
    const allCategoryFilter = document.getElementById('filter-all');
    if (allCategoryFilter) {
        allCategoryFilter.checked = true;
    }
    
    // Reset status filters
    const statusFilters = document.querySelectorAll('input[type="checkbox"]');
    statusFilters.forEach(filter => {
        filter.checked = false;
    });
    
    // Clear search
    clearSearch();
}

// Export functions for inline onclick handlers
window.showAllItems = showAllItems;
window.clearSearch = clearSearch;
window.toggleView = toggleView;
window.resetAllFilters = resetAllFilters;