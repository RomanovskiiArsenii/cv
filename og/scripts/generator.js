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
        htmlCharset: '<meta charset="UTF-8">',
        htmlViewport: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        htmlTitle: undefined,
        htmlDescription: undefined,

        // facebook main
        fbComment: '<!-- Facebook meta tags -->',
        fbPageURL: undefined,
        fbPageType: undefined,
        fbTitle: undefined,
        fbDescription: undefined,
        fbImageURL: undefined,
        fbImageSecureURL: undefined,

        //facebook additional
        fbImageWidth: undefined,
        fbImageHeight: undefined,
        fbLanguageCountry: undefined,
        fbStreet: undefined,
        fbCity: undefined,
        fbState: undefined,
        fbZip: undefined,
        fbCountry: undefined,
        fbPrice: undefined,
        fbCurrency: undefined,

        // twitter
        twComment: '<!-- Twitter meta tags -->',
        twCard: undefined,
        twDomain: undefined,
        twURL: undefined,
        twTitle: undefined,
        twDescription: undefined,
        twSiteAccount: undefined,
        twAuthorAccount: undefined,
        twImageUrl: undefined,
        twImageAlt: undefined,
        twImageWidth: undefined,
        twImageHeight: undefined,
        twMediaPlayer: undefined,
        twMediaPlayerWidth: undefined,
        twMediaPlayerHeight: undefined,

        //book
        bookAuthor: undefined,
        bookISBN: undefined,
        boorDateOfRelease: undefined,
        bookTags: undefined,

        // article
        articleComment: '<!-- Article meta tags -->',
        articleAuthor: undefined,
        articleSection: undefined,
        articleDateOfPublication: undefined,
        articleDateOfModification: undefined,
        articleTags: undefined,
        linkComment: '<!-- Open graph generator: https://romanovskiiarsenii.github.io/cv/og/og.html -->',
    };

    const generateFbTag = (value, index, alternate = undefined) => {
        if (collectedInfo[index] != undefined && collectedInfo[index] != '') {
            return `<meta property="og:${value}" content="${collectedInfo[index]}">`;
        } else if (typeof alternate !== 'undefined') {
            return `<meta property="og:${value}" content="${alternate}">`;
        } else {
            return alternate;
        }
    };

    const generateTwTag = (attribute, value, index, alternate = undefined) => {
        if (collectedInfo[index] != undefined && collectedInfo[index] != '') {
            return `<meta ${attribute}="twitter:${value}" content="${collectedInfo[index]}">`;
        } else if (typeof alternate !== 'undefined') {
            return `<meta ${attribute}="twitter:${value}" content="${alternate}">`;
        } else {
            return alternate;
        }
    };

    const generateBsTag = (value, index) => {
        if (collectedInfo[index] != undefined && collectedInfo[index] != '') {
            return `<meta property="business:contact_data:${value}" content="${collectedInfo[index]}">`;
        } else {
            return undefined;
        }
    };
    const generatePrTag = (value, index) => {
        if (collectedInfo[index] != undefined && collectedInfo[index] != '') {
            return `<meta property="product:price.${value}" content="${collectedInfo[index]}">`;
        } else {
            return undefined;
        }
    };
    const generateBkTag = (value, index) => {
        if (collectedInfo[index] != undefined && collectedInfo[index] != '') {
            return `<meta property="book:${value}" content="${collectedInfo[index]}">`;
        } else {
            return undefined;
        }
    };

    const generateArTag = (value, index) => {
        if (collectedInfo[index] != undefined && collectedInfo[index] != '') {
            return `<meta property="article:${value}" content="${collectedInfo[index]}"></meta>`;
        } else {
            return undefined;
        }
    };

    const transformInformationToHtml = () => {
        // html
        transformedInfo.htmlTitle = `<title>${collectedInfo[1]}</title>`;
        transformedInfo.htmlDescription = `<meta name="description" content="${collectedInfo[2]}">`;

        // facebook main
        transformedInfo.fbPageURL = generateFbTag('url', 0);
        transformedInfo.fbPageType = generateFbTag('type', 33, 'website');
        transformedInfo.fbTitle = generateFbTag('title', 1);
        transformedInfo.fbDescription = generateFbTag('description', 2);

        //facebook image
        transformedInfo.fbImageURL = generateFbTag('image', 3);
        if (typeof collectedInfo[3] != 'undefined' && collectedInfo[3].split(':')[0] == 'https') {
            transformedInfo.fbImageSecureURL = generateFbTag('image:secure_url', 3);
        } else {
            transformedInfo.fbImageSecureURL = undefined;
        }
        transformedInfo.fbImageWidth = generateFbTag('image:width', 4);
        transformedInfo.fbImageHeight = generateFbTag('image:height', 5);

        //facebook language and country
        if (typeof collectedInfo[7] != 'undefined') {
            transformedInfo.fbLanguageCountry = `<meta property="og:locale" content="${collectedInfo[6]}-${collectedInfo[7]}">`;
        } else {
            transformedInfo.fbLanguageCountry = generateFbTag('locale', 6);
        }

        //facebook business
        transformedInfo.fbStreet = generateBsTag('street_address', 8);
        transformedInfo.fbCity = generateBsTag('locality', 9);
        transformedInfo.fbState = generateBsTag('region', 10);
        transformedInfo.fbZip = generateBsTag('postal_code', 11);
        transformedInfo.fbCountry = generateBsTag('country_name', 12);

        //facebook product
        transformedInfo.fbPrice = generatePrTag('amount', 13);
        transformedInfo.fbCurrency = generatePrTag('currency', 14);

        //twitter
        transformedInfo.twCard = generateTwTag('name', 'card', 34, 'summary_large_image');
        if (collectedInfo[0] != undefined) {
            transformedInfo.twDomain = `<meta property="twitter:domain" content="${collectedInfo[0].split('/')[2]}">`;
        }
        transformedInfo.twURL = generateTwTag('property', 'url', 0);
        transformedInfo.twTitle = generateTwTag('name', 'title', 1);
        transformedInfo.twDescription = generateTwTag('name', 'description', 2);

        //twitter accounts
        transformedInfo.twSiteAccount = generateTwTag('property', 'site', 15);
        transformedInfo.twAuthorAccount = generateTwTag('property', 'creator', 16);

        //twitter image
        transformedInfo.twImageUrl = generateTwTag('name', 'image', 17, collectedInfo[3]);
        transformedInfo.twImageAlt = generateTwTag('name', 'image:alt', 18);
        transformedInfo.twImageWidth = generateTwTag('property', 'image:width', 19);
        transformedInfo.twImageHeight = generateTwTag('property', 'image:height', 20);

        //twitter player
        transformedInfo.twMediaPlayer = generateTwTag('property', 'player', 21);
        transformedInfo.twMediaPlayerWidth = generateTwTag('property', 'player:width', 22);
        transformedInfo.twMediaPlayerHeight = generateTwTag('property', 'player:height', 23);

        //book
        transformedInfo.bookAuthor = generateBkTag('author', 24);
        transformedInfo.bookISBN = generateBkTag('isbn', 25);
        transformedInfo.boorDateOfRelease = generateBkTag('release_date', 26);
        transformedInfo.bookTags = generateBkTag('tag', 27);

        //article
        transformedInfo.artAuthor = generateArTag('author', 28);
        transformedInfo.articleSection = generateArTag('section', 29);
        transformedInfo.articleDateOfPublication = generateArTag('published_time', 30);
        transformedInfo.articleDateOfModification = generateArTag('modified_time', 31);
        transformedInfo.articleTags = generateArTag('tag', 32);
    };

    const printInformationToHTML = () => {
        let htmlCode = '';
        for (const key in transformedInfo) {
            if (typeof transformedInfo[key] != 'undefined') {
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
            collectInformation(e, 33);
        });
        cardType.addEventListener('change', (e) => {
            collectInformation(e, 34);
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
