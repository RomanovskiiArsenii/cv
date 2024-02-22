const placeholders = [
    'Will my wife leave me?',
    'Should I live on an island?',
    'Can I become a rock star?',
    'Is the chicken still edible?',
    'Am I losing my mind?',
    'Should I build a killdozer?',
];
let index = 0;
const placeholderElement = document.getElementById('placeholder');
let inputElement = document.getElementById('textInput');

function changePlaceholder() {
    placeholderElement.style.opacity = 0;

    setTimeout(() => {
        placeholderElement.textContent = placeholders[index];
        index = (index + 1) % placeholders.length;

        placeholderElement.style.opacity = 1;
    }, 500);
}

setInterval(changePlaceholder, 3000);

inputElement.addEventListener('focus', function () {
    placeholderElement.style.display = 'none';
});

inputElement.addEventListener('blur', function () {
    if (inputElement.value === '') {
        placeholderElement.style.display = 'inline';
    }
});
