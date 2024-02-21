const animateLinkButtons = (() => {
    const buttons = document.getElementsByClassName('animatedLinkButton');
    let index = 0;
    let previous = 0;
    const OPTIONS = {
        buttonColor1: 'sepia(100%) hue-rotate(125deg) saturate(0%) brightness(70%)',
        buttonColor2: 'sepia(100%) hue-rotate(125deg) saturate(300%) brightness(220%)',
    };

    const startLinkButtonsAnimation = () => {
        setInterval(() => {
            buttons[index].style.filter = OPTIONS.buttonColor2;

            previous = index > 0 ? index - 1 : buttons.length - 1;

            buttons[previous].style.filter = OPTIONS.buttonColor1;

            index = (index + 1) % buttons.length;
        }, 3000);
    };

    return startLinkButtonsAnimation;
})();

export default animateLinkButtons;
