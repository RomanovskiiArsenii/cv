document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.fade-in');

    function fadeInSequentially() {
        let delay = 0;
        let previousTop = null;

        elements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowBottom = window.innerHeight;

            if (elementTop < windowBottom) {
                if (previousTop === null || Math.floor(previousTop) !== Math.floor(elementTop)) {
                    delay = 0; // Сбросить задержку, если это новый уровень элементов
                }

                setTimeout(() => {
                    element.classList.add('show');
                }, delay);

                previousTop = elementTop;
                delay += 200; // Задержка в миллисекундах (можно изменить)
            }
        });
    }

    window.addEventListener('scroll', fadeInSequentially);
    fadeInSequentially();
});
