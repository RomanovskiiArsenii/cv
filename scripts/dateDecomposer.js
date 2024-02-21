const dateDecomposeModule = {
    dateDecompose() {
        const date = new Date();
        const daysContainer = document.getElementById('week');
        const daysArray = Array.from(daysContainer.children);
        daysArray[date.getDay()].style.textDecoration = 'none';
    },
};

// a method that decomposes current date and undu day crossline
export default dateDecomposeModule.dateDecompose;
