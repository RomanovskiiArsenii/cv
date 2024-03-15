const mainControl = (() => {
    // content block
    const mainItem1 = document.querySelector('.main__title-item-1');

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
     *join/splits content parts in the block
     */
    const mainItemContentChangeOnNarrowScreen = () => {
        if (window.innerWidth > 1152) {
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
