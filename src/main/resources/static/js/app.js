document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navCenter = document.querySelector('.nav-center');
    const navLeft = document.querySelector('.nav-left');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // Simple toggle logic for mobile navigation
            if (navCenter.style.display === 'flex') {
                navCenter.style.display = 'none';
                navLeft.style.display = 'none';
            } else {
                navCenter.style.display = 'flex';
                navCenter.style.flexDirection = 'column';
                navLeft.style.display = 'flex';
                navLeft.style.flexDirection = 'column';
            }
        });
    }
});