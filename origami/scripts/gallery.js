const galleryControl = (() => {
    const content = [
        '<h3>Строительные леса</h3><p>Леса рамные ЛСПР-200 используются для проведения строительных и монтажных работ на высоте до 40 метров. Леса производятся из трубы диаметром 42 мм, что делает леса легкими и не дорогими, а сама конструкция лесов позволяет быстро осуществлять монтаж и демонтаж. Узлы крепления деталей представляют собой флажковые замочки, позволяющие собирать леса без дополнительных инструментов.</p>',
        '<h3>Ножничные подъемники</h3><p>Ножничные подъемники Haulotte представляют собой механизированные платформы, которые поднимаются вертикально с помощью системы подъемных ножниц. Подъемники Haulotte характеризуются высокой надежностью, прочностью и простотой в использовании. Они также могут быть оборудованы различными опциями и функциями, такими как электрический или дизельный привод, платформа расширяемой ширины и другие.</p>',
        '<h3>Фасадные подъемники</h3><p>Фасадный подъемник ZLP 630 - самая востребованная модель грузоподъёмностью до 630 кг. Имеет модульную разборную платформу, состоящую из секций разной длины, что позволяет быстро изменять её размеры. Удобная платформа с рифлёным металлическим настилом имеет ширину 0,74 м. Увеличенный вылет консоли удобно использовать для работы на фасадах сложной конфигурации.</p>',
        '<h3>Автовышки JMC</h3><p>Автовышка JMC - это высококачественное мобильное оборудование, предназначенное для подъема и доступа на высоту. Автовышка JMC отличается надежностью, безопасностью и удобством в использовании.</p>',
        '<h3>Манипуляторы JMC</h3><p>Манипулятор JMC - это многофункциональное оборудование, предназначенное для подъема и перемещения грузов на различные расстояния. Он широко используется в логистике, строительстве, грузоперевозках и других сферах деятельности, где требуется эффективное управление грузами.</p>',
        '<h3>Вышка-туры</h3><p>Вышка-тура - это сборно-разборная мобильная конструкция, используемая для выполнения работ на высоте. Она состоит из рамы, стоек, перекладин и платформы. Преимущества вышек-туров включают простоту сборки и разборки, высокую мобильность, возможность установки на неровных поверхностях и высокую надежность и безопасность работы на высоте.</p>',
    ];

    const imageContainer = document.querySelector('.section-gallery');
    const contentContainer = document.querySelector('.gallery-content-wrapper');
    const galleryButtons = document.querySelectorAll('.gallery-btn');
    let pauseBeforeSwitch = null;
    let switchingInterval = null;
    let counter = 0;

    const setSlide = () => {
        clearTimeout(pauseBeforeSwitch);
        pauseBeforeSwitch = setTimeout(() => {
            imageContainer.style.backgroundImage = `url(images/products/pr-${counter}.jpg)`;
            contentContainer.innerHTML = content[counter];
        }, 300);
    };

    const switchLeft = () => {
        clearInterval(switchingInterval);
        if (counter > 0) {
            counter--;
            setSlide();
        } else {
            counter = content.length - 1;
            setSlide();
        }
    };
    const switchRight = () => {
        clearInterval(switchingInterval);
        if (counter < content.length - 1) {
            counter++;
            setSlide();
        } else {
            counter = 0;
            setSlide();
        }
    };

    const startSwitching = () => {
        switchingInterval = setInterval(() => {
            if (counter == content.length - 1) {
                counter = 0;
            } else {
                counter++;
            }
            setSlide();
        }, 4000);
    };

    const gallerySwitchingInit = () => {
        startSwitching();
        galleryButtons[0].addEventListener('click', switchLeft);
        galleryButtons[1].addEventListener('click', switchRight);
    };

    return gallerySwitchingInit;
})();

export default galleryControl;
