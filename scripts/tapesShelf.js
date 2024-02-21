import projectsWindowControl from './projectsWindowControl.js';

const tapesShelf = (() => {
    const tapes = document.getElementById('tapes');
    const tapesArray = Array.from(tapes.children);
    let showProjectWindowTimeout;

    const tapesShelfConstruct = () => {
        for (let i = 0; i < tapesArray.length; i++) {
            tapesArray[i].style.left = `${i * 10}%`;
            tapesArray[i].style.top = '0';
            tapesArray[i].style.transform = 'rotate(60deg)';
            tapesArray[i].style.zIndex = i + 2;
            tapesArray[i].onclick = () => {
                clearInterval(showProjectWindowTimeout);
                tapeOff(tapesArray[i]);
                showProjectWindowTimeout = setTimeout(() => {
                    projectsWindowControl.showProjectsWindow(i);
                }, 1200);
            };
            tapesArray[i].onmouseover = () => {
                tapesArray[i].style.transform = 'translate(0%, -20%) rotate(60deg)';
            };
            tapesArray[i].onmouseleave = () => {
                tapesArray[i].style.transform = 'rotate(60deg)';
            };
        }
    };

    function tapeOff(el) {
        tapesShelfConstruct();
        el.style.left = `50%`;
        el.style.top = `-250%`;
        el.style.transform = `translate(-50%, 0) rotate(0deg) scale(1.2)`;
        el.onmouseover = null;
        el.onmouseleave = null;
        el.onclick = () => {
            tapesShelfConstruct();
        };
    }

    return tapesShelfConstruct;
})();

export default tapesShelf;
