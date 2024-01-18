//ожидание загрузки изображений с таймером
function executeAfterBackgroundImagesLoaded(callback) {
    const elements = document.querySelectorAll('*');
    const imagesToLoad = [];
    let imagesLoaded = 0;
    let timer;

    function checkAllImagesLoaded() {
        imagesLoaded++;
        if (imagesLoaded === imagesToLoad.length) {
            clearTimeout(timer);
            callback();
        }
    }

    elements.forEach(element => {
        const backgroundImage = window.getComputedStyle(element).backgroundImage;
        const imageURL = backgroundImage.match(/\burl\((.*?)\)/);
        if (imageURL) {
            const img = new Image();
            img.src = imageURL[1].replace(/["']/g, '');
            img.onload = checkAllImagesLoaded;
            imagesToLoad.push(img);
        }
    });

    timer = setTimeout(() => {
        callback();
    }, 30000);
}

executeAfterBackgroundImagesLoaded(function () {
    const hiddenElement = document.querySelector('.hidden');
    if (hiddenElement) {
        hiddenElement.classList.remove('hidden');
    }
    const animatedSvgElement = document.getElementById('loading_animation');
    if (animatedSvgElement) {
        animatedSvgElement.classList.add('hidden');
    }
});