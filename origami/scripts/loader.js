const loaderControl = () => {
    const loader = document.querySelector('.loader');
    const wrapper = document.querySelector('.body-wrapper');
    const headerInner = document.querySelector('.header-inner');

    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.display = 'none';
        wrapper.style.opacity = '1';
        headerInner.style.animation = 'scaleIn 2s ease forwards';
    }, 2000);
};

export default loaderControl;
