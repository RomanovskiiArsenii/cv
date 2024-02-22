let projectDescriptions;

const fetchProjectDescriptions = fetch('projects_description.JSON')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        projectDescriptions = data;
    })
    .catch((error) => {
        console.error('JSON file loading error:', error);
    });

const projectsWindowControl = (() => {
    const previousBtnSlide = document.getElementById('previous_btn');
    const projects = document.getElementById('projects');
    const projOuter = document.getElementById('proj_outer');
    const projGallery = document.getElementById('proj_gallery');
    const projDescriber = document.getElementById('proj_decriber_text');

    let nosignalInterval;
    const nosignalURL = 'url(images/gallery_images/nosignal.gif)';
    const galleryImg = new Image();
    let galleryIndex = -1;

    const tapes = document.getElementById('tapes');
    const tapesQty = tapes.children.length;

    const changeSlideContent = (index) => {
        clearInterval(nosignalInterval);
        galleryImg.src = `images/gallery_images/gallery_${index}.jpg`;

        galleryImg.onload = function () {
            projDescriber.innerHTML = projectDescriptions[`id${index}`];
            projGallery.style.backgroundImage = `url(${galleryImg.src})`;

            nosignalInterval = setInterval(() => {
                projGallery.style.backgroundImage = `url(${galleryImg.src})`;
                setTimeout(() => {
                    projGallery.style.backgroundImage = nosignalURL;
                }, 2500);
            }, 3000);

            if (projectDescriptions[`id${index}`]) {
                projDescriber.innerHTML = projectDescriptions[`id${index}`];
            } else {
                projDescriber.innerHTML = projectDescriptions['nothing'];
            }
        };
        galleryImg.onerror = function () {
            projDescriber.innerHTML = projectDescriptions['nothing'];
            projGallery.style.backgroundImage = nosignalURL;
        };
    };

    const nextSlide = () => {
        galleryIndex = (galleryIndex + 1) % tapesQty;
        changeSlideContent(galleryIndex);
    };

    const previousSlide = () => {
        galleryIndex = galleryIndex - 1 < 0 ? tapesQty - 1 : (galleryIndex - 1) % tapesQty;
        changeSlideContent(galleryIndex);
    };

    const showProjectsWindow = (index) => {
        galleryIndex = index;

        changeSlideContent(galleryIndex);

        projects.style.display = 'block';

        setTimeout(() => {
            projects.style.opacity = '1';
            projects.style.pointerEvents = 'auto';
            projects.style.transform = 'translateX(0)';
            projOuter.style.height = '90vh';
            projOuter.style.width = '90vw';
            projOuter.style.top = '0';
            projOuter.style.left = '0';
            previousBtnSlide.style.opacity = '1';
        }, 500);
    };

    const hideProjectsWindow = () => {
        projects.style.opacity = '0';
        projects.style.pointerEvents = 'none';
        projects.style.transform = 'translateX(-20vw)';
        projOuter.style.height = '86vh';
        projOuter.style.width = '86vw';
        projOuter.style.top = '4vh';
        projOuter.style.left = '4vw';
        previousBtnSlide.style.opacity = '0';
        projGallery.style.backgroundImage = nosignalURL;

        setTimeout(() => {
            projects.style.display = 'none';
        }, 1000);
    };

    return {
        nextSlide: nextSlide,
        previousSlide: previousSlide,
        showProjectsWindow: showProjectsWindow,
        hideProjectsWindow: hideProjectsWindow,
    };
})();

export default projectsWindowControl;
