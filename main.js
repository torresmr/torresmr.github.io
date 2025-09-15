// Main Dashboard JavaScript Logic
class MainDashboard {
    constructor() {
        console.log('MainDashboard constructor called');
        this.init();
    }

    init() {
        console.log('MainDashboard init called');
        this.addEventListeners();
        this.handleResponsiveLayout();
        this.addAccessibilityFeatures();
        window.addEventListener('resize', () => this.handleResponsiveLayout());
    }

    addEventListeners() {
        // Add click event listeners to data structure cards
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const dataType = card.getAttribute('data-type');
            console.log('Setting up card:', dataType);
            
            card.addEventListener('click', (e) => {
                console.log('Card clicked:', dataType);
                this.handleCardClick(e, card);
            });
            card.addEventListener('mouseenter', (e) => this.handleCardHover(e, card, true));
            card.addEventListener('mouseleave', (e) => this.handleCardHover(e, card, false));
        });

        // Add click handler to logo for refresh/home
        const collegeLogo = document.querySelector('.college-logo');
        if (collegeLogo) {
            collegeLogo.addEventListener('click', () => window.location.reload());
            collegeLogo.style.cursor = 'pointer';
        }

        // Add click handler to dashboard nav for refresh
        const navItem = document.querySelector('.nav-item');
        if (navItem) {
            navItem.addEventListener('click', () => window.location.reload());
            navItem.style.cursor = 'pointer';
        }
    }

    handleCardClick(event, card) {
        const dataType = card.getAttribute('data-type');
        const dataUrl = card.getAttribute('data-url');
        
        console.log('handleCardClick called with dataType:', dataType);
        
        if (!dataType || card.classList.contains('empty')) {
            console.log('Returning early - no dataType or empty card');
            return;
        }
        
        // Navigate based on data type
        switch(dataType) {
            case 'arrays':
                window.location.href = 'arrays.html';
                break;
            case 'linked-list':
                window.location.href = 'linked-list.html';
                break;
            case 'stack':
                window.location.href = 'stack.html';
                break;
            case 'tree':
                window.location.href = 'tree.html';
                break;
            case 'hash-table':
                window.location.href = 'hash-table.html';
                break;
            case 'priority-queue':
                window.location.href = 'priority-queue.html';
                break;
            case 'binary-search':
                window.location.href = 'binary-search.html';
                break;
            default:
                console.warn('Unknown data type:', dataType);
        }
    }

    handleCardHover(event, card, isEntering) {
        if (card.classList.contains('empty')) return;
        
        if (isEntering) {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        } else {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }
    }

   

    formatDataTypeName(dataType) {
        return dataType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }


    handleResponsiveLayout() {
        const width = window.innerWidth;
        const sidebar = document.querySelector('.sidebar');
        const appContainer = document.querySelector('.app-container');
        
        if (width <= 768) {
            // Mobile layout adjustments
            if (appContainer) {
                appContainer.style.flexDirection = 'column';
            }
            if (sidebar) {
                sidebar.style.width = '100%';
            }
        } else {
            // Desktop layout restoration
            if (appContainer) {
                appContainer.style.flexDirection = 'row';
            }
            if (sidebar) {
                sidebar.style.width = '200px';
            }
        }
    }

    addAccessibilityFeatures() {
        const cards = document.querySelectorAll('.card:not(.empty)');
        cards.forEach(card => {
            const dataType = card.getAttribute('data-type');
            if (dataType) {
                const formattedName = this.formatDataTypeName(dataType);
                card.setAttribute('role', 'button');
                card.setAttribute('aria-label', `Navigate to ${formattedName} section`);
                card.setAttribute('tabindex', '0');
                
                // Add keyboard support
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        card.click();
                    }
                });
            }
        });
    }


}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing MainDashboard');
    const dashboard = new MainDashboard();
    console.log('MainDashboard initialized');
});

// Global utility functions
window.DataStructuresApp = {
    navigateToPage: (url) => {
        window.location.href = url;
    },
    
    getCurrentPage: () => {
        return window.location.pathname.split('/').pop() || 'main.html';
    }
};