const mainControl = (() => {
    // content block
    const mainItem1 = document.querySelector('.main__title-item-1');

    //width value at which the block is changed
    const minWidth = 1152;

    //content parts
    const content = {
        //part 1
        contentPart1: '<p class="main__title-item">Чтобы поддержать Международный васюкинский турнир ',
        //closing tag
        contentPartClosing: '</p>',
        //part 2
        contentPart2:
            '<span class="main__title-item">посетите лекцию на тему:</span><p class="main__title-item main__title-item_text_red">«Плодотворная дебютная идея»</p>',
    };

    /**
     *Configures the block content based on the screen width
     */
    const mainItemContentChangeOnNarrowScreen = () => {
        if (window.innerWidth > minWidth) {
            mainItem1.innerHTML = content.contentPart1 + content.contentPart2;
        } else {
            mainItem1.innerHTML = content.contentPart1 + content.contentPartClosing;
        }
    };

    return {
        mainItemContentChangeOnNarrowScreen: mainItemContentChangeOnNarrowScreen,
    };
})();

export default mainControl;
