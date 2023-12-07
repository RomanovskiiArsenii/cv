window.addEventListener('load', function () {
    const hiddenElement = document.querySelector('.hidden');
    if (hiddenElement) {
        hiddenElement.classList.remove('hidden');
    }
});

window.addEventListener('load', function () {
    const animatedSvgElement = document.querySelector('.animated-svg');
    if (animatedSvgElement) {
        animatedSvgElement.classList.add('hidden');
    }
});
