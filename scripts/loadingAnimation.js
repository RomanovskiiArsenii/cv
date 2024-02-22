const loadingAnimation = (() => {
    const hidden = document.getElementById('hidden_untill_loaded');
    const introStripArray = document.getElementsByClassName('intro_strip');
    const outroStripArray = document.getElementsByClassName('outro_strip');

    const onLoadMain = () => {
        hidden.style.display = 'block';
        setTimeout(() => {
            for (let i = 0; i < introStripArray.length; i++) {
                setTimeout(() => {
                    introStripArray[i].style.animation = 'introMoveUp 0.8s ease 0.2s forwards';
                }, i * 100);
            }
        }, 500);
    };

    const onLeaveMain = (e) => {
        e.preventDefault();

        for (let i = 0; i < outroStripArray.length; i++) {
            setTimeout(() => {
                outroStripArray[i].style.animation = 'outroMoveDown 0.8s ease 0.2s forwards';
            }, i * 200);
        }

        setTimeout(() => {
            window.location.href = e.target.href;
        }, 2000);
    };

    return {
        onLoadMain: onLoadMain,
        onLeaveMain: onLeaveMain,
    };
})();

export default loadingAnimation;
