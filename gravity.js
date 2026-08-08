(function () {
    let modal, modalImg, images = [], idx = 0;
    function create() {
        if (modal) return;
        modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = '<span class="modal-close" title="Close">&times;</span><span class="modal-nav modal-prev">&#8249;</span><img id="modal-img" src="" alt=""><span class="modal-nav modal-next">&#8250;</span>';
        document.body.appendChild(modal);
        modalImg = modal.querySelector('#modal-img');
        modal.querySelector('.modal-close').addEventListener('click', close);
        modal.querySelector('.modal-prev').addEventListener('click', () => show((idx - 1 + images.length) % images.length));
        modal.querySelector('.modal-next').addEventListener('click', () => show((idx + 1) % images.length));
        modal.addEventListener('click', e => { if (e.target === modal) close(); });
        document.addEventListener('keydown', e => {
            if (!modal.classList.contains('show')) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') show((idx - 1 + images.length) % images.length);
            if (e.key === 'ArrowRight') show((idx + 1) % images.length);
        });
    }
    function show(i) { idx = i; modalImg.src = images[i]; modal.classList.add('show'); document.body.style.overflow = 'hidden'; }
    function close() { modal.classList.remove('show'); document.body.style.overflow = ''; modalImg.src = ''; }
    document.addEventListener('click', function (e) {
        const tile = e.target.closest('.photo-tile');
        if (!tile) return;
        const grid = tile.closest('.photo-grid');
        images = Array.from(grid.querySelectorAll('.photo-tile')).map(t => t.dataset.full || t.querySelector('img').src);
        idx = Array.from(grid.querySelectorAll('.photo-tile')).indexOf(tile);
        create(); show(idx);
    });
})();
