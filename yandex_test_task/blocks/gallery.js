const galleryControl = (() => {
    //wrapper for animation
    const galleryCardsWrapper = document.querySelector('.gallery__card__wrapper');
    //array of cards
    const galleryCards = document.querySelectorAll('.gallery__card');
    //control buttons
    const galleryButtons = document.querySelectorAll('.ctnums-counter-btns__btn');
    //current card
    const currentCounter = document.querySelector('.ctnums-counter-btns-counter-current');
    //total cards
    const totalCounter = document.querySelector('.ctnums-counter-btns-counter-total');

    //setInterval var
    let swapInterval;

    const params = {
        //ini qty of cards
        initCardQty: galleryCards.length,
        //3 cards on the page at the same time on wide screen
        counterMaxValue: 3,
        //swap var
        swapCoeff: 0,
        //swipes counter
        counter: 0,

        //btns modifiers
        btnBlackModifier: 'ctnums-counter-btns__btn_color_black',
        btnOrangeModifier: 'ctnums-counter-btns__btn_color_orange',

        //animation
        mouseooverBtnAnimation: 'mouseooverBtnAnimationGallery',
        mouseoleaveBtnAnimation: 'mouseoleaveBtnAnimationGallery',

        //screen width
        narrowDisplayWidth: 1158,
    };

    /**
     * calculated swipes intervals depending on window width
     */
    const getSwapCoeff = () => {
        if (window.innerWidth > params.narrowDisplayWidth) {
            params.swapCoeff = 33.87;
        } else {
            params.swapCoeff = 109.57;
        }
    };

    /**
     * toggle button
     * @param {*} button
     * @param {*} secondColor
     * @param {*} animation
     */
    const toggleBtnClass = (button, secondColor, animation) => {
        button.classList.toggle(params.btnBlackModifier, false);
        button.classList.toggle(params.btnOrangeModifier, false);
        button.classList.toggle(secondColor, true);
        button.style.animation = `${animation} .8s ease forwards`;
    };

    /**
     * btn hover animation on mouse over
     * @param {*} e - event
     */
    const mouseOverHandler = (e) => {
        if (e.target.classList.contains(params.btnBlackModifier)) {
            toggleBtnClass(e.target, params.btnOrangeModifier, params.mouseooverBtnAnimation);
        }
    };

    /**
     * btn hover animation on mouse leave
     * @param {*} e - event
     */
    const mouseLeaveHandler = (e) => {
        if (e.target.classList.contains(params.btnOrangeModifier)) {
            toggleBtnClass(e.target, params.btnBlackModifier, params.mouseoleaveBtnAnimation);
        }
    };

    /**
     * swap gallery left
     */
    const swapLeft = () => {
        params.counter = params.counter > 1 ? params.counter - 1 : 0;
        const translateValue = params.counter * params.swapCoeff;
        galleryCardsWrapper.style.transform = `translateX(-${translateValue}%)`;
        printCurrentContainer;
    };

    /**
     * swap gallery right
     */
    const swapRight = () => {
        params.counter++;
        const translateValue = params.counter * params.swapCoeff;
        galleryCardsWrapper.style.transform = `translateX(-${translateValue}%)`;
        if (params.counter % params.counterMaxValue == 0) {
            cloneCards();
        }
        printCurrentContainer();
    };

    /**
     * start auto right swap
     */
    const swapAutoStart = () => {
        clearInterval(swapInterval);
        getSwapCoeff();
        swapInterval = setInterval(() => {
            swapRight();
        }, 4000);
    };

    /**
     * stop auto right swap
     */
    const swapAutoPause = () => {
        clearInterval(swapInterval);
        setTimeout(() => {
            swapAutoStart();
        }, 6000);
    };

    /**
     * change innerText of current slide counter
     */
    const printCurrentContainer = () => {
        if (window.innerWidth > params.narrowDisplayWidth) {
            if ((params.counter / params.counterMaxValue) % 2 == 0) {
                currentCounter.textContent = params.initCardQty;
            } else {
                currentCounter.textContent = params.counterMaxValue;
            }
        } else {
            let curValue = (params.counter + 1) % params.initCardQty;
            currentCounter.textContent = curValue == 0 ? params.initCardQty : curValue;
        }
    };

    /**
     * back to default params on resize
     */
    const backToDefaultOnResize = () => {
        params.counter = 0;
        cleanWrapper();
        galleryCardsWrapper.style.transform = `translateX(0%)`;
        getSwapCoeff();
    };

    /**
     * clone cards for infinite animation
     */
    const cloneCards = () => {
        const cloneCards = Array.from(galleryCards).map((card) => card.cloneNode(true));
        cloneCards.forEach((cloneCard) => galleryCardsWrapper.appendChild(cloneCard));
    };

    /**
     * clean wrapper of cloned cards
     */
    const cleanWrapper = () => {
        const cardsCount = galleryCardsWrapper.childElementCount;
        if (cardsCount > params.initCardQty) {
            for (let i = 0; i < cardsCount - params.initCardQty; i++) {
                galleryCardsWrapper.removeChild(galleryCardsWrapper.firstElementChild);
            }
        }
    };

    /**
     * buttons events listeners init
     */
    const buttonsControlInit = () => {
        totalCounter.textContent = params.initCardQty;
        for (let i = 0; i < galleryButtons.length; i++) {
            galleryButtons[i].addEventListener('mouseover', mouseOverHandler);
            galleryButtons[i].addEventListener('mouseleave', mouseLeaveHandler);
        }
        galleryButtons[0].addEventListener('click', swapLeft);
        galleryButtons[0].addEventListener('click', swapAutoPause);
        galleryButtons[1].addEventListener('click', swapRight);
        galleryButtons[1].addEventListener('click', swapAutoPause);
    };

    return {
        buttonsControlInit: buttonsControlInit,
        swapAutoStart: swapAutoStart,
        backToDefaultOnResize: backToDefaultOnResize,
        printCurrentContainer: printCurrentContainer,
    };
})();

export default galleryControl;
