// a method of creating animation of changing slides once per interval
const SwitchingAnimation = ((intervalValue, durationValue) => {
    const pauseBtn = document.getElementById('pause');
    const nextBtnSlide = document.getElementById('next_btn');

    const switcherSetup = () => {
        const faces = document.getElementsByClassName('face');
        const backs = document.getElementsByClassName('back');
        const slides_container = document.getElementById('slides_container');
        const OPTIONS = {
            forwards: 'face-slide',
            backwards: 'back-slide',
            faceColor: 'rgb(47, 62, 58)',
            backColor: 'rgb(224, 242, 237)',
            duration: durationValue,
        };

        const setup = () => {
            const { forwards, backwards, faceColor, backColor, duration } = OPTIONS;
            slides_container.style.backgroundColor = faceColor;

            for (let i = 0; i < faces.length; i++) {
                setTimeout(() => {
                    faces[i].style.animation = `${forwards} ${duration}s ease-in forwards`;
                    backs[i].style.animation = `${backwards} ${duration}s ease-in forwards`;
                }, i * 100);
            }

            [OPTIONS.forwards, OPTIONS.backwards, OPTIONS.faceColor, OPTIONS.backColor] = [
                backwards,
                forwards,
                backColor,
                faceColor,
            ];
        };

        return setup; //closure
    };

    const switcherInit = switcherSetup();
    let switchingIntervalStatus;
    let switchingInterval;

    const startSwitching = () => {
        if (!switchingIntervalStatus) {
            switchingInterval = setInterval(() => {
                switcherInit();
            }, intervalValue);
            console.log(`Switching started with id №${switchingInterval}; interval = ${intervalValue} ms`); //debug
            switchingIntervalStatus = true;
            pauseBtn.src = 'images/buttons_images/pause_ico.png';
        }
    };

    const stopSwitching = () => {
        if (switchingIntervalStatus) {
            clearInterval(switchingInterval);
            switchingIntervalStatus = false;
            pauseBtn.src = 'images/buttons_images/play_ico.png';
            console.log(`Switching stopped with id №${switchingInterval}; interval = ${intervalValue} ms`); //debug
        }
    };

    const toggleSwitching = () => {
        if (switchingIntervalStatus) {
            stopSwitching();
        } else {
            startSwitching();
        }
    };

    //closure
    return {
        startSwitching: startSwitching,
        stopSwitching: stopSwitching,
        toggleSwitching: toggleSwitching,
    };
})(5500, 3.5);
// first argument (milliseconds) minimum 1500ms longer than second argument (seconds)

export default SwitchingAnimation;
