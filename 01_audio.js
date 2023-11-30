// аудио воспроизводится только после возвращения на основную страницу с побочных и после ее полной загрузки

document.addEventListener('DOMContentLoaded', function () {
    const audio = new Audio('intro_audio.mp3');
    let audioPlayed = false;

    window.addEventListener('load', function () {
        if (!audioPlayed) {
            audio.play();
            audioPlayed = true;
        }
    });
});