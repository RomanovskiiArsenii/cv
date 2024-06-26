import setPartsSizes from './setPartsSizes.js';
import loadingAnimation from './loadingAnimation.js';
import switchingAnimation from './switchingAnimation.js';
import rowsTextFiller from './rowsTextFiller.js';
import projectsWindowControl from './projectsWindowControl.js';
import tapesShelf from './tapesShelf.js';
import dateDecompose from './dateDecomposer.js';
import glowingText from './glowingText.js';
import animateLinkButtons from './animateLinkButtons.js';

const pauseBtn = document.getElementById('pause');
const nextBtnSlide = document.getElementById('next_btn');
const previousBtnSlide = document.getElementById('previous_btn');
const closeProjectsWindowBtn = document.getElementById('cross_btn');
const certificatesLink = document.getElementById('certificates_link');
const projects = document.getElementById('projects');

rowsTextFiller.RowTextInit_1();
rowsTextFiller.RowTextInit_2();
rowsTextFiller.RowTextInit_3();
rowsTextFiller.RowTextInit_4();
rowsTextFiller.RowTextInit_5();

window.addEventListener('load', loadingAnimation.onLoadMain, false);
window.addEventListener('load', setPartsSizes, false);
window.addEventListener('load', animateLinkButtons, false);
window.addEventListener('load', dateDecompose, false);
window.addEventListener('load', tapesShelf, false);
window.addEventListener('load', switchingAnimation.startSwitching, false);
window.addEventListener('load', glowingText, false);
window.addEventListener('resize', setPartsSizes, false);

pauseBtn.addEventListener('click', switchingAnimation.toggleSwitching, false);
nextBtnSlide.addEventListener('click', projectsWindowControl.nextSlide, false);
previousBtnSlide.addEventListener('click', projectsWindowControl.previousSlide, false);
closeProjectsWindowBtn.addEventListener('click', projectsWindowControl.hideProjectsWindow, false);
certificatesLink.addEventListener('click', loadingAnimation.onLeaveMain, false);
closeProjectsWindowBtn.addEventListener('click', tapesShelf, false);

document.addEventListener('keyup', (e) => {
    if (window.getComputedStyle(projects).display !== 'none') {
        if (e.key === 'ArrowLeft' || e.keyCode === 65) {
            projectsWindowControl.previousSlide();
        }
        if (e.key === 'ArrowRight' || e.keyCode === 68) {
            projectsWindowControl.nextSlide();
        }
    }
    if (e.key === 'w' || e.keyCode === 87) {
        projectsWindowControl.showProjectsWindow(7);
    }
    if (e.key === 's' || e.keyCode === 83) {
        projectsWindowControl.hideProjectsWindow();
    }
});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
        switchingAnimation.stopSwitching();
    } else {
        switchingAnimation.startSwitching();
    }
});
