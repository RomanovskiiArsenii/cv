const stagesControl = (() => {
    //carousel of stages
    const carousel = document.querySelector('.stages_carousel');
    //control buttons
    const stagesButtons = document.querySelectorAll('.round-counter__button');
    //visual carousel slide counter elements
    const stagesCounters = document.querySelectorAll('.round-counter__button-round-counter');

    // slides counter
    let counter = 0;

    const params = {
        // slide total count
        slidesQty: 5,

        //button color modifiers
        btnModifierBlack: 'round-counter__button_color_black',
        btnModifierGray: 'round-counter__button_color_gray',
        btnModifierOrange: 'round-counter__button_color_orange',

        //css animations
        makeBtnBlack: 'blackBtnAnimation',
        makeBtnGrayFromOrange: 'grayBtnAnimationFromOrange .8s ease forwards',
        mouseoOverBtnAnimation: 'mouseooverBtnAnimation .8s ease forwards',
        mouseoleaveBtnAnimation: 'mouseoleaveBtnAnimation .8s ease forwards',

        //counter color modifiers
        counterModifierBlack: 'round-counter__button-round-counter_bgcolor-black',
        counterModifierGray: 'round-counter__button-round-counter_bgcolor-gray',

        //minimum width at which all params will be reset to defaut
        narrowDisplayWidth: 1152,
    };

    /**
     * switches the button modifier
     * @param {*} button - button
     * @param {*} modifier - modifier to toggle to
     * @param {*} animation - animation css name
     */
    const toggleBtnModifier = (button, modifier, animation) => {
        button.classList.toggle(params.btnModifierBlack, false);
        button.classList.toggle(params.btnModifierGray, false);
        button.classList.toggle(params.btnModifierOrange, false);
        button.classList.toggle(modifier, true);
        button.style.animation = animation;
    };

    /**
     *  toggles counter modifier to the focused phase
     * @param {*} current - index of the counter to be toggled
     */
    const toggleCounterModifier = (current) => {
        for (let i = 0; i < stagesCounters.length; i++) {
            stagesCounters[i].classList.toggle(params.counterModifierBlack, false);
            stagesCounters[i].classList.toggle(params.counterModifierGray, true);
        }
        stagesCounters[current].classList.toggle(params.counterModifierBlack, true);
    };

    const displacement = () => {
        carousel.style.transform = `translateX(calc(-${counter}00% - ${counter * 40}px))`;
        toggleCounterModifier(counter);
    };

    /**
     * displace stages to the right
     */
    const displacementRight = () => {
        if (counter < params.slidesQty - 1) {
            counter++;
            displacement();
            if (counter == 1) {
                toggleBtnModifier(stagesButtons[0], params.btnModifierBlack, params.makeBtnBlack);
            } else if (counter == params.slidesQty - 1) {
                toggleBtnModifier(stagesButtons[1], params.btnModifierGray, params.makeBtnGrayFromOrange);
            }
        }
    };

    /**
     * displace stages to the left
     */
    const displacementLeft = () => {
        if (counter > 0) {
            counter--;
            displacement();
            if (counter == 0) {
                toggleBtnModifier(stagesButtons[0], params.btnModifierGray, params.makeBtnGrayFromOrange);
            } else if (counter < params.slidesQty - 1) {
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
    };

    /**
     * hover animation onmouseleave
     * @param {*} e - event
     */
    const mouseLeaveHandler = (e) => {
        if (e.target.classList.contains(params.btnModifierOrange)) {
            toggleBtnModifier(e.target, params.btnModifierBlack, params.mouseoleaveBtnAnimation);
        }
    };

    /**
     * resets slides, counters and buttons to their original state
     */
    const backToDefaultOnResize = () => {
        if (window.innerWidth > params.narrowDisplayWidth) {
            carousel.style.transform = 'none';
            toggleBtnModifier(stagesButtons[0], params.btnModifierGray, 'none');
            toggleBtnModifier(stagesButtons[1], params.btnModifierBlack, 'none');
            toggleCounterModifier(0);
            counter = 0;
        }
    };

    /**
     * configuring event handling for control buttons
     */
    const buttonsControlInit = () => {
        for (let i = 0; i < stagesButtons.length; i++) {
            stagesButtons[i].addEventListener('mouseover', mouseOverHandler);
            stagesButtons[i].addEventListener('mouseleave', mouseLeaveHandler);
        }
        stagesButtons[0].addEventListener('click', displacementLeft);
        stagesButtons[1].addEventListener('click', displacementRight);
    };

    return {
        buttonsControlInit: buttonsControlInit,
        backToDefaultOnResize: backToDefaultOnResize,
    };
})();

export default stagesControl;
