const downloadControl = (() => {
    const downloadContainer = document.querySelector('.download');
    const closeBtn = document.querySelector('.download__hide');

    const hideContainer = () => {
        if (downloadContainer.classList.contains('show')) {
            downloadContainer.classList.toggle('show', false);
            downloadContainer.classList.toggle('hide', true);
            closeBtn.style.transform = 'rotate(180deg)';
        }
    };

    const showContainer = () => {
        if (downloadContainer.classList.contains('hide')) {
            downloadContainer.classList.toggle('hide', false);
            downloadContainer.classList.toggle('show', true);
            closeBtn.style.transform = 'rotate(0deg)';
        }
    };

    const hideOrShowContainer = () => {
        if (downloadContainer.classList.contains('show')) {
            hideContainer();
        } else {
            showContainer();
        }
    };

    const buttonEventsInit = () => {
        closeBtn.addEventListener('click', hideOrShowContainer);
    };

    return {
        buttonEventsInit: buttonEventsInit,
        hideContainer: hideContainer,
        showContainer: showContainer,
    };
})();

export default downloadControl;
