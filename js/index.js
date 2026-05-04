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

    // Mobile Menu Toggle
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if(toggle) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = toggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = toggle.querySelector('i');
            if(icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // Custom Lightbox Modal Logic
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-modal');
    const nextBtn = document.querySelector('.next-modal');

    let currentImages = [];
    let currentIndex = 0;

    const updateModalImage = (index) => {
        const item = currentImages[index];
        const imgSrc = item.getAttribute('href');
        const imgAlt = item.querySelector('img').getAttribute('alt');
        
        modalImg.style.animation = 'none';
        modalImg.offsetHeight; // trigger reflow
        modalImg.style.animation = 'zoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        modalImg.src = imgSrc;
        if(modalCaption) modalCaption.innerHTML = imgAlt;
        currentIndex = index;
    };

    document.querySelectorAll('.gallery-grid').forEach(grid => {
        const images = Array.from(grid.querySelectorAll('.gallery-item'));
        
        images.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                currentImages = images;
                currentIndex = index;
                
                if(modal && modalImg) {
                    modal.style.display = "flex";
                    updateModalImage(currentIndex);
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    });

    if(prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let nextIdx = currentIndex - 1;
            if (nextIdx < 0) nextIdx = currentImages.length - 1;
            updateModalImage(nextIdx);
        });
    }

    if(nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let nextIdx = currentIndex + 1;
            if (nextIdx >= currentImages.length) nextIdx = 0;
            updateModalImage(nextIdx);
        });
    }

    if(closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === "flex") {
            if (e.key === "ArrowLeft") prevBtn.click();
            if (e.key === "ArrowRight") nextBtn.click();
            if (e.key === "Escape") closeModal.click();
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });
});
