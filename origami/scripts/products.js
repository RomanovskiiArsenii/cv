const productsControl = (() => {
    // product category cards
    const card = document.querySelector('.product-inner');
    // product info container
    const slider = document.querySelector('.section-product-info');
    // buttons on full screnn
    const buttons = document.querySelectorAll('.product-btn-slider');
    // control buttons
    const controlButtons = document.querySelectorAll('.product-ctrl-btn');
    // info slide index
    let counter = 0;

    // change info slide
    const changeSlide = (coeff) => {
        counter = coeff;
        slider.style.transform = `translateX(${coeff * -100}vw)`;
    };

    // change card
    const changeCard = (coeff) => {
        card.style.transform = `translateX(${coeff * -100}vw)`;
    };

    // to default position on resize
    const defaultCardStyle = () => {
        card.style.transform = `translateX(0)`;
    };

    const listenersInit = () => {
        // full screen buttons
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', () => changeSlide(i));
        }
        // narrow screen buttons
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
