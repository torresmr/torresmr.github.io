// Legacy script.js - Kept for compatibility
// Note: This file is deprecated in favor of modular JS files (main.js, arrays.js, etc.)

// Redirect function for backward compatibility
function showScreen(screenId) {
    console.warn('showScreen is deprecated. Use page-based navigation instead.');
    
    switch(screenId) {
        case 'mainScreen':
            window.location.href = 'main.html';
            break;
        case 'arrayScreen':
            window.location.href = 'arrays.html';
            break;
        case 'linkListScreen':
            window.location.href = 'linked-list.html';
            break;
        default:
            window.location.href = 'main.html';
    }
}

// Close modal function for backward compatibility
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Legacy navigation function
function navigateToMain() {
    window.location.href = 'main.html';
}

// Global app object for compatibility
window.DataStructuresApp = {
    currentScreen: 'mainScreen',
    
    navigateTo: function(screenId) {
        showScreen(screenId);
    },
    
    getCurrentScreen: function() {
        const path = window.location.pathname;
        if (path.includes('arrays.html')) return 'arrayScreen';
        if (path.includes('linked-list.html')) return 'linkListScreen';
        return 'mainScreen';
    },
    
    goBack: function() {
        navigateToMain();
    },
    
    isMainScreen: function() {
        return this.getCurrentScreen() === 'mainScreen';
    }
};

console.log('Legacy script.js loaded. Consider using modular JS files for better performance.');