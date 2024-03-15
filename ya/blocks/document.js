import headerControl from './header.js';
import mainControl from './main.js';
import stagesControl from './stages.js';
import galleryControl from './gallery.js';

// header button transparent-white switch
window.addEventListener('load', headerControl.toggleBtnModifierOnNarrowScreen);
window.addEventListener('resize', headerControl.toggleBtnModifierOnNarrowScreen);

// header bg image src switch
window.addEventListener('load', headerControl.toggleBackgroundImageSourceOnNarrowScreen);
window.addEventListener('resize', headerControl.toggleBackgroundImageSourceOnNarrowScreen);

//main block splitter/joiner
window.addEventListener('load', mainControl.mainItemContentChangeOnNarrowScreen);
window.addEventListener('resize', mainControl.mainItemContentChangeOnNarrowScreen);

//stages block and it's buttons hover and click events
window.addEventListener('load', stagesControl.buttonsControlInit);

//stages block and it's buttons resize event
window.addEventListener('resize', stagesControl.backToDefaultOnResize);

//gallery control buttons events
window.addEventListener('load', galleryControl.buttonsControlInit);

//gallery autoswap on load
window.addEventListener('load', galleryControl.swapAutoStart);

//gallery clean and drop to defaults on resize
window.addEventListener('resize', galleryControl.backToDefaultOnResize);

//gallery counter of current card in DOM element
window.addEventListener('load', galleryControl.printCurrentContainer);
window.addEventListener('resize', galleryControl.printCurrentContainer);
