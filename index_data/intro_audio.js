// аудио воспроизводится только после возвращения на основную страницу с побочных

document.addEventListener('DOMContentLoaded', function () {
    const audio = new Audio('index_data/intro_audio.mp3');
    let audioPlayed = false;

    window.addEventListener('load', function () {
        if (!audioPlayed) {
            audio.play();
            audioPlayed = true;
        }
    });
});