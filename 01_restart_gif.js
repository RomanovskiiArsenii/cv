window.addEventListener('load', function() {
    const intro = document.querySelector('.intro');
    const gifUrl = `images/header_ink.gif?${new Date().getTime()}`;
  
    function restartGif() {
      intro.style.backgroundImage = 'none';
      void intro.offsetWidth;
      intro.style.backgroundImage = `url(${gifUrl})`;
    }
  
    restartGif();
  });
  