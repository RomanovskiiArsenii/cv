const generator = (() => {
    //inputs
    const inputArray = document.querySelectorAll('input');
    //page type select
    const pageType = document.querySelector('#inp-page_type');
    //card type select
    const cardType = document.querySelector('#inp-twcard_type');
    //output textarea
    const textarea = document.querySelector('#output-text');
    //copy button
    const copyBtn = document.querySelector('#copy-btn');
    //copy button content
    const btnContent = document.querySelector('#button-content');
    //copy button animation timeout
    let btnContentTransitionTimeout;
    // note with help msg on hover
    const noteHelp = document.querySelector('.note_help');
    // help msg
    const noteHelpMsg = document.querySelector('.note_help_msg');
    //data collection array
    const collectedInfo = Array(inputArray.length + 2);

    //object for collecting transformed information
    const transformedInfo = {
        // html
        htmlComment: '<!-- HTML meta tags -->',
        htmlTitle: '',
        htmlDescription: '',

        // facebook main
        fbComment: '<!-- Facebook meta tags -->',
        fbPageURL: '',
        fbPageType: '',
        fbTitle: '',
        fbDescription: '',
        fbImageURL: '',
        fbImageSecureURL: '',

        //facebook additional
        fbLanguageCountry: '',
        fbAppID: '',
        fbVideoURL: '',
        fbVideoSecureURL: '',
        fbVideoWidth: '',
        fbVideoHeight: '',
        fbImageWidth: '',
        fbImageHeight: '',

        // twitter
        twComment: '<!-- Twitter meta tags -->',
        twCard: '',
        twDomain: '',
        twURL: '',
        twTitle: '',
        twDescription: '',
        twSiteAccount: '',
        twAuthorAccount: '',
        twImageUrl: '',
        twImageWidth: '',
        twImageHeight: '',
        twMediaPlayer: '',

        // article
        articleComment: '<!-- Article meta tags -->',
        artAuthor: '',
        artSection: '',
        artDateOfPublication: '',
        artDateOfModification: '',
        artTags: '',
        linkComment: '<!-- Open graph generator: https://romanovskiiarsenii.github.io/cv/og/og.html -->',
    };

    const transformInformationToHtml = () => {
        // html
        transformedInfo.htmlTitle = `<title>${collectedInfo[0]}</title>`;
        transformedInfo.htmlDescription = `<meta name="description" content="${collectedInfo[1]}">`;

        // facebook main
        transformedInfo.fbPageURL = `<meta property="og:url" content="${collectedInfo[3]}">`;
        if (collectedInfo[25] != undefined && collectedInfo[25] != '') {
            transformedInfo.fbPageType = `<meta property="og:type" content="${collectedInfo[25]}">`;
        } else {
            transformedInfo.fbPageType = `<meta property="og:type" content="website">`;
        }
        transformedInfo.fbTitle = `<meta property="og:title" content="${collectedInfo[0]}">`;
        transformedInfo.fbDescription = `<meta property="og:description" content="${collectedInfo[1]}">`;
        transformedInfo.fbImageURL = `<meta property="og:image" content="${collectedInfo[2]}">`;
        if (collectedInfo[2] != undefined && collectedInfo[2] != '' && collectedInfo[2].split(':')[0] == 'https') {
            transformedInfo.fbImageSecureURL = `<meta property="og:image:secure_url" content="${collectedInfo[2]}">`;
        } else {
            transformedInfo.fbImageSecureURL = '';
        }
        transformedInfo.fbImageWidth = `<meta property="og:image:width" content="${collectedInfo[10]}">`;
        transformedInfo.fbImageHeight = `<meta property="og:image:height" content="${collectedInfo[11]}">`;

        //facebook additional
        if (collectedInfo[4] != undefined) {
            transformedInfo.fbLanguageCountry = `<meta property="og:locale" content="${collectedInfo[4].toLowerCase()}">`;
        }
        if (collectedInfo[4] != undefined && collectedInfo[5] != undefined) {
            transformedInfo.fbLanguageCountry = `<meta property="og:locale" content="${collectedInfo[4].toLowerCase()}-${collectedInfo[5].toUpperCase()}">`;
        }
        transformedInfo.fbAppID = `<meta property="fb:app_id" content="${collectedInfo[6]}">`;
        transformedInfo.fbVideoURL = `<meta property="og:video:url" content="${collectedInfo[7]}">`;
        if (collectedInfo[7] != undefined && collectedInfo[7] != '' && collectedInfo[7].split(':')[0] == 'https') {
            transformedInfo.fbVideoSecureURL = `<meta property="og:video:secure_url" content="${collectedInfo[7]}"/>`;
        } else {
            transformedInfo.fbVideoSecureURL = '';
        }
        transformedInfo.fbVideoWidth = `<meta property="og:video:width" content="${collectedInfo[8]}">`;
        transformedInfo.fbVideoHeight = `<meta property="og:video:height" content="${collectedInfo[9]}">`;

        //article
        transformedInfo.artAuthor = `<meta property="og:author" content="${collectedInfo[12]}">`;
        transformedInfo.artSection = `<meta property="og:section" content="${collectedInfo[13]}">`;
        if (collectedInfo[15] != undefined && collectedInfo[15] != '') {
            transformedInfo.artDateOfPublication = `<meta property="og:published_time" content="${collectedInfo[14]}T${collectedInfo[15]}:00.000Z">`;
        } else {
            transformedInfo.artDateOfPublication = `<meta property="og:published_time" content="${collectedInfo[14]}T00:00:00.000Z">`;
        }
        if (collectedInfo[17] != undefined && collectedInfo[17] != '') {
            transformedInfo.artDateOfModification = `<meta property="og:modified_time" content="${collectedInfo[16]}T${collectedInfo[17]}:00.000Z">`;
        } else {
            transformedInfo.artDateOfModification = `<meta property="og:modified_time" content="${collectedInfo[16]}T00:00:00.000Z">`;
        }
        transformedInfo.artTags = `<meta property="og:tag" content="${collectedInfo[18]}">`;

        //twitter

        if (collectedInfo[26] != undefined && collectedInfo[26] != '') {
            transformedInfo.twCard = `<meta name="twitter:card" content="${collectedInfo[26]}">`;
        } else {
            transformedInfo.twCard = `<meta name="twitter:card" content="summary_large_image">`;
        }

        if (collectedInfo[3] != undefined) {
            transformedInfo.twDomain = `<meta property="twitter:domain" content="${collectedInfo[3].split('/')[2]}">`;
        }

        transformedInfo.twURL = `<meta property="twitter:url" content="${collectedInfo[3]}">`;
        transformedInfo.twTitle = `<meta name="twitter:title" content="${collectedInfo[0]}">`;
        transformedInfo.twDescription = `<meta name="twitter:description" content="${collectedInfo[1]}">`;
        transformedInfo.twSiteAccount = `<meta property="twitter:site" content="${collectedInfo[19]}">`;
        transformedInfo.twAuthorAccount = `<meta property="twitter:creator" content="${collectedInfo[20]}">`;
        if (collectedInfo[21] != undefined && collectedInfo[21] != '') {
            transformedInfo.twImageUrl = `<meta name="twitter:image" content="${collectedInfo[21]}">`;
        } else if (collectedInfo[2] != '') {
            transformedInfo.twImageUrl = `<meta name="twitter:image" content="${collectedInfo[2]}">`;
        }
        transformedInfo.twImageWidth = `<meta property="twitter:image:width" content="${collectedInfo[22]}">`;
        transformedInfo.twImageHeight = `<meta property="twitter:image:height" content="${collectedInfo[23]}">`;

        transformedInfo.twMediaPlayer = `<meta property="twitter:player" content="${collectedInfo[24]}">`;
        console.log(collectedInfo);
        console.log(transformedInfo);
    };

    const printInformationToHTML = () => {
        let htmlCode = '';
        for (const key in transformedInfo) {
            if (
                !transformedInfo[key].includes('undefined') &&
                !transformedInfo[key].includes('content=""') &&
                transformedInfo[key] != ''
            ) {
                htmlCode += `${transformedInfo[key]}\n`;
            }
        }
        textarea.value = htmlCode;
    };

    const collectInformation = (e, index) => {
        collectedInfo[index] = e.target.value;
        transformInformationToHtml();
        printInformationToHTML();
    };

    const copyinformationToClipboard = () => {
        textarea.select();
        document.execCommand('copy');
        textarea.setSelectionRange(0, 0);
        btnContent.style.transform = 'translateY(-2rem)';

        clearInterval(btnContentTransitionTimeout);
        btnContentTransitionTimeout = setTimeout(() => {
            btnContent.style.transform = 'none';
        }, 4000);
    };

    const inputsListenersInit = () => {
        pageType.addEventListener('change', (e) => {
            collectInformation(e, 25);
        });
        cardType.addEventListener('change', (e) => {
            collectInformation(e, 26);
        });
        for (let i = 0; i < inputArray.length; i++) {
            inputArray[i].addEventListener('input', (e) => {
                collectInformation(e, i);
            });
        }
        copyBtn.addEventListener('click', copyinformationToClipboard);
    };

    const helpMsgListenersInit = () => {
        noteHelp.addEventListener('mouseover', () => {
            noteHelpMsg.style.opacity = 1;
        });
        noteHelp.addEventListener('mouseleave', () => {
            noteHelpMsg.style.opacity = 0;
        });
    };

    return {
        inputsListenersInit: inputsListenersInit,
        helpMsgListenersInit: helpMsgListenersInit,
    };
})();

window.addEventListener('load', generator.inputsListenersInit);
window.addEventListener('load', generator.helpMsgListenersInit);
