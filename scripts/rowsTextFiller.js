const fillText = [
    '  Ars',
    '   enii',
    '    Roma',
    '      nov',
    '    skii',
    '     crea',
    '      tive',
    '     dev',
    '       el',
    '       oper',
];

const rowsTextFiller = ((textArray) => {
    const singleRowTextFiller = (faceContent, backContent, row) => {
        const faceRowsList = document.getElementsByClassName(`f_row${row} `);
        const backRowsList = document.getElementsByClassName(`b_row${row}`);
        const spaceChar = '&nbsp;';

        let faceContentCharArray = [];
        let backContentCharArray = [];

        faceContent && (faceContentCharArray = faceContent.split(''));
        backContent && (backContentCharArray = backContent.split(''));

        faceContentCharArray.push(...Array(16 - faceContentCharArray.length).fill(' '));
        backContentCharArray.push(...Array(16 - backContentCharArray.length).fill(' '));

        const fill = () => {
            for (let i = 0; i < backContentCharArray.length && i < backRowsList.length; i++) {
                backRowsList[i].innerHTML = backContentCharArray[i];
                if (backContentCharArray[i] === ' ') {
                    backRowsList[i].innerHTML = spaceChar;
                }
            }
            for (let j = 0; j < faceContentCharArray.length && j < faceRowsList.length; j++) {
                faceRowsList[j].innerHTML = faceContentCharArray[j];
                if (faceContentCharArray[j] === ' ') {
                    faceRowsList[j].innerHTML = spaceChar;
                }
            }
        };

        return fill; //closure
    };

    const RowTextInit_1 = singleRowTextFiller(textArray[0], textArray[5], 1);
    const RowTextInit_2 = singleRowTextFiller(textArray[1], textArray[6], 2);
    const RowTextInit_3 = singleRowTextFiller(textArray[2], textArray[7], 3);
    const RowTextInit_4 = singleRowTextFiller(textArray[3], textArray[8], 4);
    const RowTextInit_5 = singleRowTextFiller(textArray[4], textArray[9], 5);

    return {
        RowTextInit_1: RowTextInit_1,
        RowTextInit_2: RowTextInit_2,
        RowTextInit_3: RowTextInit_3,
        RowTextInit_4: RowTextInit_4,
        RowTextInit_5: RowTextInit_5,
    };
})(fillText);

export default rowsTextFiller;
