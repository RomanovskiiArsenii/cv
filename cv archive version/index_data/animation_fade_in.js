function onEntry(entry) {                         //функция обратного вызова, аргумент - массив записей
    entry.forEach(change => {                     //обходим массив записей и если элемент пересекается
      if (change.isIntersecting) {                //с видимой областью экрана, 
       change.target.classList.add('show');       //добавляем класс show к его классам
      }
    });
  }
  
  let options = {                                 //объект с опциями для Intersection Observer. 
    threshold: [0.1] };                           //10% элемента находится в видимой области
  

  //новый экземпляр IntersectionObserver, который будет вызывать функцию onEntry при 
  //изменении видимости объектов с учетом опций
  let observer = new IntersectionObserver(onEntry, options);  
                                                            
  //Выбираются все элементы с классом fade-in с использованием querySelectorAll
  let elements = document.querySelectorAll('.fade-in');
  
  //перебор всех выбранных элементов
  for (let elm of elements) {
    observer.observe(elm);
  } 