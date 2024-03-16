const galleryControl = (() => {
    //the cards container is used to calculate the displacement factor
    const galleryCardsContainer = document.querySelector('.gallery__cards');
    //the cards container is used to calculate the displacement factor and to implement the displacement animation
    const galleryCardsWrapper = document.querySelector('.gallery__card__wrapper');
    //card array
    let galleryCards = document.querySelectorAll('.gallery__card');
    //control buttons
    const galleryButtons = document.querySelectorAll('.ctnums-counter-btns__btn');
    //current card number
    const currentCounter = document.querySelector('.ctnums-counter-btns-counter-current');
    //total number of cards
    const totalCounter = document.querySelector('.ctnums-counter-btns-counter-total');

    //displacement length
    let translateValue = 0;
    //automatic animation interval
    let autoDisplacementInterval;
    //width of the cards container
    let galleryCardsContainerWidth;
    //width of the card
    let galleryCardWidth;
    //swipes counter is used to calculate the displacement factor
    let counter = 0;
    //displacement factor is used for displacement animation
    let displacemenFactor;
    //wrapper column gap is used to calculate the displacement factor
    let wrapperGapWidth;

    const params = {
        //initial number of cards
        initCardQty: galleryCards.length,
        //three cards can be placed simultaneously on a wide screen
        counterMaxValue: 3,

        // transition function of wrapper used on resize
        transitionFunction: window.getComputedStyle(galleryCardsWrapper).getPropertyValue('transition'),

        //button modifiers
        btnBlackModifier: 'ctnums-counter-btns__btn_color_black',
        btnOrangeModifier: 'ctnums-counter-btns__btn_color_orange',

        //css animation
        mouseooverBtnAnimation: 'mouseooverBtnAnimationGallery .8s ease forwards',
        mouseoleaveBtnAnimation: 'mouseoleaveBtnAnimationGallery .8s ease forwards',

        //minimum width at which three cards are displayed on the screen
        narrowDisplayWidth: 1152,
    };

    /**
     * toggle button modifier
     * @param {*} button modified button
     * @param {*} modifier modifier to toggle to
     * @param {*} animation modifing animation
     */
    const toggleBtnModifier = (button, modifier, animation) => {
        button.classList.toggle(params.btnBlackModifier, false);
        button.classList.toggle(params.btnOrangeModifier, false);
        button.classList.toggle(modifier, true);
        button.style.animation = animation;
    };

    /**
     * btn hover animation on mouse over
     * @param {*} e - event
     */
    const mouseOverHandler = (e) => {
        if (e.target.classList.contains(params.btnBlackModifier)) {
            toggleBtnModifier(e.target, params.btnOrangeModifier, params.mouseooverBtnAnimation);
        }
    };

    /**
     * btn hover animation on mouse leave
     * @param {*} e - event
     */
    const mouseLeaveHandler = (e) => {
        if (e.target.classList.contains(params.btnOrangeModifier)) {
            toggleBtnModifier(e.target, params.btnBlackModifier, params.mouseoleaveBtnAnimation);
        }
    };

    /**
     * the displacement factor calculation based on screen width
     */
    const getDisplacementFactor = () => {
        galleryCards = document.querySelectorAll('.gallery__card');
        galleryCardsContainerWidth = galleryCardsContainer.offsetWidth;
        galleryCardWidth = galleryCards[0].offsetWidth;
        wrapperGapWidth = parseInt(window.getComputedStyle(galleryCardsWrapper).getPropertyValue('column-gap'));
        if (window.innerWidth > params.narrowDisplayWidth) {
            displacemenFactor = galleryCardWidth + wrapperGapWidth;
        } else {
            displacemenFactor = galleryCardsContainerWidth;
        }
    };

    /**
     * horizontal cards wraper displacement
     * @param {*} translateValue translateX value
     */
    const displacement = (translateValue) => {
        getDisplacementFactor();
        translateValue = counter * displacemenFactor;
        galleryCardsWrapper.style.transform = `translateX(-${translateValue}px)`;
    };

    /**
     * cloning cards for infinite animation
     */
    const cloneCards = () => {
        const galleryCardsClone = Array.from(galleryCards).map((card) => card.cloneNode(true));
        galleryCardsClone.forEach((cloneCard) => galleryCardsWrapper.appendChild(cloneCard));
        if (galleryCardsWrapper.childElementCount > params.initCardQty * 30) {
            console.log('reset');
            backToDefaultOnResize();
        }
    };

    /**
     * changes the values of the client's slides counter
     */
    const printCurrentContainer = () => {
        if (window.innerWidth > params.narrowDisplayWidth) {
            if ((counter - params.counterMaxValue) % params.initCardQty == 0) {
                currentCounter.textContent = params.initCardQty;
            } else {
                currentCounter.textContent = params.counterMaxValue;
            }
        } else {
            let curValue = (counter + 1) % params.initCardQty;
            currentCounter.textContent = curValue == 0 ? params.initCardQty : curValue;
        }
    };

    /**
     * displacement to the left
     */
    const displacementLeft = () => {
        counter = counter > 1 ? counter - 1 : 0;
        displacement(translateValue);
        printCurrentContainer();
    };

    /**
     * displacement to the right
     */
    const displacementRight = () => {
        counter++;
        displacement(translateValue);
        if ((counter % params.initCardQty) - 1 == 0) {
            cloneCards();
        }
        printCurrentContainer();
    };

    /**
     * start automatic animation of the displacement
     */
    const autoDisplacementStart = () => {
        clearInterval(autoDisplacementInterval);
        autoDisplacementInterval = setInterval(() => {
            displacementRight();
        }, 4000);
    };

    /**
     * pause automatic animation of the displacement
     */
    const autoDisplacementPause = () => {
        clearInterval(autoDisplacementInterval);
        setTimeout(() => {
            autoDisplacementStart();
        }, 6000);
    };

    /**
     * remove cloned cards
     */
    const removeClonedCards = () => {
        const cardsCount = galleryCardsWrapper.childElementCount;
        if (cardsCount > params.initCardQty) {
            for (let i = 0; i < cardsCount - params.initCardQty; i++) {
                galleryCardsWrapper.removeChild(galleryCardsWrapper.firstElementChild);
            }
        }
    };

    /**
     * back to default params on resize
     */
    const backToDefaultOnResize = () => {
        galleryCardsWrapper.style.transition = `none`;
        galleryCardsWrapper.style.transform = `translateX(0px)`;
        removeClonedCards();
        counter = 0;
        setTimeout(() => {
            galleryCardsWrapper.style.transition = params.transitionFunction;
        }, 10);
    };

    /**
     * configuring event handling for control buttons
     */
    const buttonsControlInit = () => {
        totalCounter.textContent = params.initCardQty;
        for (let i = 0; i < galleryButtons.length; i++) {
            galleryButtons[i].addEventListener('mouseover', mouseOverHandler);
            galleryButtons[i].addEventListener('mouseleave', mouseLeaveHandler);
        }
        galleryButtons[0].addEventListener('click', displacementLeft);
        galleryButtons[0].addEventListener('click', autoDisplacementPause);
        galleryButtons[1].addEventListener('click', displacementRight);
        galleryButtons[1].addEventListener('click', autoDisplacementPause);
    };

    return {
        buttonsControlInit: buttonsControlInit,
        autoDisplacementStart: autoDisplacementStart,
        autoDisplacementPause: autoDisplacementPause,
        backToDefaultOnResize: backToDefaultOnResize,
        printCurrentContainer: printCurrentContainer,
    };
})();

export default galleryControl;
