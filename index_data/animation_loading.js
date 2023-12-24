//анимация загрузчика и сокрытие страницы до завершения загрузки img_1_cut.jpg
// const backgroundImageUrl = 'index_data/images/img_1_cut.jpg';

// function loadImage(url, callback) {
//     const image = new Image();
//     image.onload = callback;
//     image.src = url;
// }

// loadImage(backgroundImageUrl, function () {
//     const hiddenElement = document.querySelector('.hidden');
//     if (hiddenElement) {
//         hiddenElement.classList.remove('hidden');
//     }
//     const animatedSvgElement = document.querySelector('.loading_animation');
//     if (animatedSvgElement) {
//         animatedSvgElement.classList.add('hidden');
//     }
//     // const audio = new Audio('index_data/intro_audio.mp3');
//     // audio.play();
// });


//ожидание загрузки изображений, но с таймером на 10 секунд
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

    // Проверка через 10 секунд
    timer = setTimeout(() => {
        callback();
    }, 15000);
}

executeAfterBackgroundImagesLoaded(function () {
    const hiddenElement = document.querySelector('.hidden');
    if (hiddenElement) {
        hiddenElement.classList.remove('hidden');
    }
    const animatedSvgElement = document.querySelector('.loading_animation');
    if (animatedSvgElement) {
        animatedSvgElement.classList.add('hidden');
    }
});
