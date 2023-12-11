const backgroundImageUrl = 'index_data/images/header_ink.gif';

function loadImage(url, callback) {
    const image = new Image();
    image.onload = callback;
    image.src = url;
}

loadImage(backgroundImageUrl, function () {
    const hiddenElement = document.querySelector('.hidden');
    if (hiddenElement) {
        hiddenElement.classList.remove('hidden');
    }
    const animatedSvgElement = document.querySelector('.animated-svg');
    if (animatedSvgElement) {
        animatedSvgElement.classList.add('hidden');
    }
    const audio = new Audio('index_data/intro_audio.mp3');
    audio.play();
});