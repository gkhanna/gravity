// ============================================
// U²GRC — JavaScript
// ============================================

// ── Smooth nav scrolling ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Active nav highlight on scroll ────────────
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section[id]').forEach(s => {
        if (pageYOffset >= s.offsetTop - 200) current = s.id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        // For top-level nav, match against the page filename
        const isActive = (href === 'index.html' && current === 'home') || 
                         (href === '#' + current);
        link.classList.toggle('active', isActive);
    });
});
