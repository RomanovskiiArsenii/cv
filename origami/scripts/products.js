const productsControl = (() => {
    const card = document.querySelector('.product-inner');
    const slider = document.querySelector('.section-product-info');
    const buttons = document.querySelectorAll('.product-btn-slider');
    const controlButtons = document.querySelectorAll('.product-ctrl-btn');
    let counter = 0;

    const changeSlide = (coeff) => {
        counter = coeff;
        slider.style.transform = `translateX(${coeff * -100}vw)`;
        console.log(`translateX(${coeff * -100}%)`);
    };

    const changeCard = (coeff) => {
        card.style.transform = `translateX(${coeff * -100}vw)`;
    };

    const defaultCardStyle = () => {
        card.style.transform = `translateX(0)`;
    };

    const listenersInit = () => {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', () => changeSlide(i));
        }
        controlButtons[0].addEventListener('click', () => {
            counter = counter > 0 ? counter - 1 : 0;
            changeSlide(counter);
            changeCard(counter);
        });
        controlButtons[1].addEventListener('click', () => {
            counter = counter < buttons.length - 1 ? counter + 1 : buttons.length - 1;
            changeSlide(counter);
            changeCard(counter);
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 660) {
                defaultCardStyle();
            }
        });
    };

    return listenersInit;
})();

export default productsControl;
