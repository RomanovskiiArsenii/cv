const glowingText = (() => {
    const textElement = document.getElementById('glowing_text');
    let coloredText = '';
    let index = 0;

    const startGlowing = () => {
        setInterval(() => {
            const letters = textElement.textContent.split('');
            if (letters[index] == ' ') {
                index++;
            }
            letters[index] = `<span style="text-shadow: 0 0 5px rgb(28 109 105);">${letters[index]}</span>`;
            letters[index] = `<span style="color: rgb(190 255 252);">${letters[index]}</span>`;
            coloredText = letters.join('');
            textElement.innerHTML = coloredText;
            index = (index + 1) % letters.length;
        }, 500);
    };

    return startGlowing;
})();

export default glowingText;
