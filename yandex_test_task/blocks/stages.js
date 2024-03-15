const stagesControl = (() => {
    //carousel of stages
    const carousel = document.querySelector('.stages_carousel');
    //butons prev/next
    const stagesButtons = document.querySelectorAll('.round-counter__button');
    //circles - counters of stages
    const stagesCounters = document.querySelectorAll('.round-counter__button-round-counter');

    const params = {
        // slides quantity
        slidesQty: 5,
        // slides counter
        counter: 0,
        //button color modifiers
        btnModifierBlack: 'round-counter__button_color_black',
        btnModifierGray: 'round-counter__button_color_gray',
        btnModifierOrange: 'round-counter__button_color_orange',

        //css animations
        makeBtnBlack: 'blackBtnAnimation',
        makeBtnGrayFromOrange: 'grayBtnAnimationFromOrange',
        mouseoOverBtnAnimation: 'mouseooverBtnAnimation',
        mouseoleaveBtnAnimation: 'mouseoleaveBtnAnimation',

        //counter color modifiers
        counterModifierBlack: 'round-counter__button-round-counter_bgcolor-black',
        counterModifierGray: 'round-counter__button-round-counter_bgcolor-gray',
    };

    /**
     * toggles button modifier from any other color
     * @param {*} button - btn element
     * @param {*} secondColor - modifier to toggle in
     * @param {*} animation - toggle animation css name
     */
    const toggleBtnModifier = (button, secondColor, animation) => {
        button.classList.toggle(params.btnModifierBlack, false);
        button.classList.toggle(params.btnModifierGray, false);
        button.classList.toggle(params.btnModifierOrange, false);
        button.classList.toggle(secondColor, true);
        button.style.animation = `${animation} .8s ease forwards`;
    };

    /**
     *  toggles counter modifier to black (active)
     * @param {*} current - index of counter to toggle modifier
     */
    const toggleCounterModifier = (current) => {
        for (let i = 0; i < stagesCounters.length; i++) {
            stagesCounters[i].classList.toggle(params.counterModifierBlack, false);
            stagesCounters[i].classList.toggle(params.counterModifierGray, true);
        }
        stagesCounters[current].classList.toggle(params.counterModifierBlack, true);
    };

    /**
     * swaps stage to the right
     */
    const swapRight = () => {
        if (params.counter < params.slidesQty - 1) {
            params.counter++;
            carousel.style.transform = `translateX(calc(-${params.counter}00% - ${params.counter * 40}px))`;

            toggleCounterModifier(params.counter);

            if (params.counter == 1) {
                toggleBtnModifier(stagesButtons[0], params.btnModifierBlack, params.makeBtnBlack);
            } else if (params.counter == params.slidesQty - 1) {
                toggleBtnModifier(stagesButtons[1], params.btnModifierGray, params.makeBtnGrayFromOrange);
            }
        }
    };

    /**
     * swaps stage to the left
     */
    const swapLeft = () => {
        if (params.counter > 0) {
            params.counter--;
            carousel.style.transform = `translateX(calc(-${params.counter}00% - ${params.counter * 40}px))`;

            toggleCounterModifier(params.counter);

            if (params.counter == 0) {
                toggleBtnModifier(stagesButtons[0], params.btnModifierGray, params.makeBtnGrayFromOrange);
            } else if (params.counter < params.slidesQty - 1) {
                toggleBtnModifier(stagesButtons[1], params.btnModifierBlack, params.makeBtnBlack);
            }
        }
    };

    /**
     * hover animation onmouseover
     * @param {*} e - event
     */
    const mouseOverHandler = (e) => {
        if (e.target.classList.contains(params.btnModifierBlack)) {
            toggleBtnModifier(e.target, params.btnModifierOrange, params.mouseoOverBtnAnimation);
        }
        console.log('over');
    };

    /**
     * hover animation onmouseleave
     * @param {*} e - event
     */
    const mouseLeaveHandler = (e) => {
        if (e.target.classList.contains(params.btnModifierOrange)) {
            toggleBtnModifier(e.target, params.btnModifierBlack, params.mouseoleaveBtnAnimation);
        }
        console.log('leave');
    };

    /**
     * swap to the fisrt stage and first counter on resize
     */
    const backToDefaultOnResize = () => {
        carousel.style.transform = 'none';
        toggleBtnModifier(stagesButtons[0], params.btnModifierGray, 'none');
        toggleBtnModifier(stagesButtons[1], params.btnModifierBlack, 'none');
        toggleCounterModifier(0);
        params.counter = 0;
    };

    /**
     * btns events listeners init
     */
    const buttonsControlInit = () => {
        for (let i = 0; i < stagesButtons.length; i++) {
            stagesButtons[i].addEventListener('mouseover', mouseOverHandler);
            stagesButtons[i].addEventListener('mouseleave', mouseLeaveHandler);
        }
        stagesButtons[0].addEventListener('click', swapLeft);
        stagesButtons[1].addEventListener('click', swapRight);
    };

    return {
        buttonsControlInit: buttonsControlInit,
        backToDefaultOnResize: backToDefaultOnResize,
    };
})();

export default stagesControl;
