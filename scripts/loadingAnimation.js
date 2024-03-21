const loadingAnimation = (() => {
    const hidden = document.getElementById('hidden_untill_loaded');
    const showed = document.getElementById('showed_untill_load');
    const cassette = document.getElementById('cassette');
    const introStripArray = document.getElementsByClassName('intro_strip');
    const outroStripArray = document.getElementsByClassName('outro_strip');

    const onLoadMain = () => {
        setTimeout(() => {
            cassette.style.animation = 'cassetteFadeOut .3s ease forwards';
        }, 1000);
        setTimeout(() => {
            showed.style.display = 'none';
            hidden.style.display = 'block';
        }, 1300);
        setTimeout(() => {
            for (let i = 0; i < introStripArray.length; i++) {
                setTimeout(() => {
                    introStripArray[i].style.animation = 'introMove 0.6s ease 0.6s forwards';
                }, i * 100);
            }
        }, 1500);
    };

    const onLeaveMain = (e) => {
        e.preventDefault();

        for (let i = 0; i < outroStripArray.length; i++) {
            setTimeout(() => {
                outroStripArray[i].style.animation = 'outroMove 0.6s ease 0.2s forwards';
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
