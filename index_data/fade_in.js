document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.fade-in');

    function fadeInSequentially() {
        let delay = 0;
        let previousTop = null;

        elements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowBottom = window.innerHeight;

            if (elementTop < windowBottom) {
                
                setTimeout(() => {
                    element.classList.add('show');
                }, delay);

                previousTop = elementTop;
                delay += 100; // Задержка в миллисекундах
            }
        });
    }

    window.addEventListener('scroll', fadeInSequentially);
    fadeInSequentially();
});