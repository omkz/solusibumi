document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    
    // Navbar Shrink Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    });

    // Simple Mobile Menu (Optional expansion)
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    
    if(toggle) {
        toggle.addEventListener('click', () => {
            // Add mobile menu logic if needed
            alert('Mobile menu coming soon!');
        });
    }
});
