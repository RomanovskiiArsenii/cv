window.addEventListener('load', function() {
    const intro = document.querySelector('.intro');
    const gifUrl = `images/header_ink.gif?${new Date().getTime()}`;
  
    function restartGif() {
      intro.style.backgroundImage = 'none';
      void intro.offsetWidth; // Принудительная перезагрузка стиля для эффекта сброса
      intro.style.backgroundImage = `url(${gifUrl})`;
    }
  
    restartGif(); // Запустить при загрузке страницы
  });
  