const headerControl = (() => {
    //transparent button element
    const headerTransparentBtn = document.querySelector('.header__links-item_bg-color_transparent-black');
    //image element
    const headerBackgroundImg = document.querySelector('.header__background-image');
    //round text
    const roundImageWrappers = document.querySelectorAll('.header__round-text-wrapper');

    const params = {
        //when the width is less than this value, apply the white modifier to the transparent button
        maxWidthBeforeModifyButton: 1280,
        //when the width is less than this value, change image source
        maxWidthBeforeChangeImageSrc: 768,

        //transparent button modifiers postfixes
        modifyTransparent: 'transparent-black',
        modifyWhite: 'white-orange',

        //image sources
        srcForWideScreen: 'images/header/background.png',
        srcForNarrScreen: 'images/header/background_sm.png',
    };

    /**
     * changing buttons behavior when changing the screen width
     */
    const toggleBtnModifierOnNarrowScreen = () => {
        if (window.innerWidth <= params.maxWidthBeforeModifyButton) {
            headerTransparentBtn.classList.toggle(`header__links-item_bg-color_${params.modifyTransparent}`, false);
            headerTransparentBtn.classList.toggle(`header__links-item_bg-color_${params.modifyWhite}`, true);
        } else {
            headerTransparentBtn.classList.toggle(`header__links-item_bg-color_${params.modifyWhite}`, false);
            headerTransparentBtn.classList.toggle(`header__links-item_bg-color_${params.modifyTransparent}`, true);
        }
    };

    /**
     * image source swapping when changing the screen width
     */
    const toggleBackgroundImageSourceOnNarrowScreen = () => {
        if (window.innerWidth <= params.maxWidthBeforeChangeImageSrc) {
            headerBackgroundImg.src = params.srcForNarrScreen;
        } else {
            headerBackgroundImg.src = params.srcForWideScreen;
        }
    };

    return {
        toggleBtnModifierOnNarrowScreen: toggleBtnModifierOnNarrowScreen,
        toggleBackgroundImageSourceOnNarrowScreen: toggleBackgroundImageSourceOnNarrowScreen,
    };
})();

export default headerControl;
