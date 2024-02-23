import loadingAnimation from './loadingAnimation.js';

const backToMainLink = document.getElementById('back_link');

backToMainLink.addEventListener('click', loadingAnimation.onLeaveMain, false);

window.addEventListener('load', loadingAnimation.onLoadMain, true);
