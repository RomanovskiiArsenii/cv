const glowingText = (() => {
    const textElement = document.getElementById('glowing_text');
    let coloredText;
    let index = 0;

    const startGlowing = () => {
        setInterval(() => {
            const letters = textElement.textContent.split('');
            if (letters[index] == ' ') {
                index++;
            }
            letters[
                index
            ] = `<span style="color: var(--glowingTextFontColor); text-shadow: var(--glowingTextGlowColor);">${letters[index]}</span>`;

            coloredText = letters.join('');
            textElement.innerHTML = coloredText;
            index = (index + 1) % letters.length;
        }, 500);
    };

    return startGlowing;
})();

export default glowingText;
