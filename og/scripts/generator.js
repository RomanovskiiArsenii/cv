const generator = (() => {
    //inputs
    const inputArray = document.querySelectorAll('input');
    //page type select
    const pageType = document.querySelector('#inp-page_type');
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
    const collectedInfo = Array(inputArray.length + 1);

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
        transformedInfo.htmlTitle = `<title>${collectedInfo[1]}</title>`;
        transformedInfo.htmlDescription = `<meta name="description" content="${collectedInfo[2]}">`;

        // facebook main
        transformedInfo.fbPageURL = `<meta property="og:url" content="${collectedInfo[4]}">`;
        if (collectedInfo[0] != undefined) {
            transformedInfo.fbPageType = `<meta property="og:type" content="${collectedInfo[0]}">`;
        } else {
            transformedInfo.fbPageType = `<meta property="og:type" content="website">`;
        }
        transformedInfo.fbTitle = `<meta property="og:title" content="${collectedInfo[1]}">`;
        transformedInfo.fbDescription = `<meta property="og:description" content="${collectedInfo[2]}">`;
        transformedInfo.fbImageURL = `<meta property="og:image" content="${collectedInfo[3]}">`;
        if (collectedInfo[3] != undefined && collectedInfo[3].split('/')[0] == 'https') {
            transformedInfo.fbImageSecureURL = `<meta property="og:image:secure_url" content="${collectedInfo[3]}">`;
        }
        transformedInfo.fbImageWidth = `<meta property="og:image:width" content="${collectedInfo[11]}"`;
        transformedInfo.fbImageHeight = `<meta property="og:image:height" content="${collectedInfo[12]}"`;

        //facebook additional
        if (collectedInfo[6] != undefined) {
            transformedInfo.fbLanguageCountry = `<meta property="og:locale" content="${collectedInfo[5]}-${collectedInfo[6]}">`;
        } else {
            transformedInfo.fbLanguageCountry = `<meta property="og:locale" content="${collectedInfo[5]}">`;
        }
        transformedInfo.fbAppID = `<meta property="fb:app_id" content="${collectedInfo[7]}">`;
        transformedInfo.fbVideo = `<meta property="og:video" content="${collectedInfo[8]}">`;
        if (collectedInfo[8] != undefined && collectedInfo[8].split('/')[0] == 'https') {
            transformedInfo.fbVideoSecureURL = `<meta property="og:video:secure_url" content="${collectedInfo[8]}"/>`;
        }
        transformedInfo.fbVideoWidth = `<meta property="og:video:width" content="${collectedInfo[9]}"`;
        transformedInfo.fbVideoHeight = `<meta property="og:video:height" content="${collectedInfo[10]}"`;

        //article
        transformedInfo.artAuthor = `<meta property="og:author" content="${collectedInfo[13]}">`;
        transformedInfo.artSection = `<meta property="og:section" content="${collectedInfo[14]}">`;
        if (collectedInfo[16] != undefined) {
            transformedInfo.artDateOfPublication = `<meta property="og:published_time" content="${collectedInfo[15]}T${collectedInfo[16]}:00.000Z">`;
        } else {
            transformedInfo.artDateOfPublication = `<meta property="og:published_time" content="${collectedInfo[15]}T00:00:00.000Z">`;
        }
        if (collectedInfo[18] != undefined) {
            transformedInfo.artDateOfModification = `<meta property="og:modified_time" content="${collectedInfo[17]}T${collectedInfo[18]}:00.000Z">`;
        } else {
            transformedInfo.artDateOfModification = `<meta property="og:modified_time" content="${collectedInfo[17]}T00:00:00.000Z">`;
        }
        transformedInfo.artTags = `<meta property="og:tag" content="${collectedInfo[19]}">`;

        //twitter

        if (collectedInfo[20] != undefined) {
            transformedInfo.twCard = `<meta name="twitter:card" content="${collectedInfo[20]}">`;
        } else {
            transformedInfo.twCard = `<meta name="twitter:card" content="summary">`;
        }

        if (collectedInfo[4] != undefined) {
            transformedInfo.twDomain = `<meta property="twitter:domain" content="${collectedInfo[4].split('/')[2]}"`;
        }

        transformedInfo.twURL = `<meta property="twitter:url" content="${collectedInfo[4]}">`;
        transformedInfo.twTitle = `<meta name="twitter:title" content="${collectedInfo[1]}">`;
        transformedInfo.twDescription = `<meta name="twitter:description" content="${collectedInfo[2]}">`;
        transformedInfo.twSiteAccount = `<meta property="twitter:site" content="${collectedInfo[21]}">`;
        transformedInfo.twAuthorAccount = `<meta property="twitter:creator" content="${collectedInfo[22]}">`;
        if (collectedInfo[23] != undefined) {
            transformedInfo.twImageUrl = `<meta name="twitter:image" content="${collectedInfo[23]}">`;
        } else {
            transformedInfo.twImageUrl = `<meta name="twitter:image" content="${collectedInfo[3]}">`;
        }
        transformedInfo.twImageWidth = `<meta property="twitter:image:width" content="${collectedInfo[24]}">`;
        transformedInfo.twImageHeight = `<meta property="twitter:image:height" content="${collectedInfo[25]}"></meta>`;

        transformedInfo.twMediaPlayer = `<meta property="twitter:player" content="${collectedInfo[26]}">`;
    };

    const printInformationToHTML = () => {
        let htmlCode = '';
        for (const key in transformedInfo) {
            if (!transformedInfo[key].includes('undefined')) {
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
            collectInformation(e, 0);
        });
        for (let i = 0; i < inputArray.length; i++) {
            inputArray[i].addEventListener('input', (e) => {
                collectInformation(e, i + 1);
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
