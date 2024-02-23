const setPartsSizesModule = {
    setPartsSizes() {
        const part = Math.ceil(window.innerWidth / 16);
        document.documentElement.style.setProperty('--part', `${part}px`);
        document.documentElement.style.setProperty('--part_dbl', `${part * 2}px`);
    },
};

// handler to set the value of the '--part' variable equal to 1/16th of the page width
export default setPartsSizesModule.setPartsSizes;
