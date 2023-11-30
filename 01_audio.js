// аудио воспроизводится только после возвращения на основную страницу с побочных

document.addEventListener('DOMContentLoaded', function () {
    const audio = new Audio('intro_audio.mp3');
    let audioPlayed = false;

    document.addEventListener('mousemove', function () {
        if (!audioPlayed) {
            audio.play();
            audioPlayed = true;
        }
    });
});


