// Click any project image to view it larger; close via the button, the backdrop, or Escape.
(function () {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const image = lightbox.querySelector('.lightbox-image');
    const closeButton = lightbox.querySelector('.lightbox-close');
    let lastFocused = null;

    function open(source) {
        lastFocused = source;
        image.src = source.currentSrc || source.src;
        image.alt = source.alt;
        lightbox.hidden = false;
        document.body.classList.add('lightbox-open');
        closeButton.focus();
    }

    function close() {
        lightbox.hidden = true;
        image.removeAttribute('src');
        document.body.classList.remove('lightbox-open');
        if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll('.zigzag-media img').forEach(function (img) {
        // Make images reachable and openable from the keyboard too
        img.tabIndex = 0;
        img.setAttribute('role', 'button');
        img.addEventListener('click', function () { open(img); });
        img.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                open(img);
            }
        });
    });

    closeButton.addEventListener('click', close);

    // Clicking the dark backdrop closes; clicking the image itself doesn't
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) close();
    });

    document.addEventListener('keydown', function (event) {
        if (lightbox.hidden) return;
        if (event.key === 'Escape') close();
        // The close button is the only control, so keep focus inside the modal
        if (event.key === 'Tab') {
            event.preventDefault();
            closeButton.focus();
        }
    });
})();
