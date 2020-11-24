$(document).ready(function(){

  $('.test__phone-input').mask("9(999)999-99-99");

  // функция для скролла в квиз
  const scrollToQuiz = () => {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#quiz").offset().top
    }, 1000);
  }

  // Скролл в квиз по клику на кнопку на первом экране
  document.querySelector('.sale__button').addEventListener('click', (e)=>{
    e.preventDefault();
    scrollToQuiz()
  }); 

  /* Запрос на сервер с данными для отправки письма на почту */
  async function send(body){
    console.log(body);
    let res = false;
    let response = await fetch('mail.php', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(response => response.json())
    .then( result => res = result.res);
    return res;
  }

  /* Обработка клика по кнопке в квизе */
  const testButton = document.querySelector('.test__button');
  const preActive = document.querySelector('.test-pre_active');

  testButton.addEventListener('click', (e) =>{
    e.preventDefault();
    let phone = document.querySelector('.test__phone-input');
    let text = document.querySelector('.answer__radio:checked+.answer__title').innerText;
    if(phone.value.trim() == "") {
      phone.classList.add('test__phone-input--error');
      phone.focus();
      phone.addEventListener('click', ()=>phone.classList.remove('test__phone-input--error'));
      return false;
    }
    phone.classList.remove('test__phone-input--error')
    if (send({phone: phone.value, radio: text})){
      scrollToQuiz(e);
      preActive.classList.add('test-pre_active-animate');
      let current = document.querySelector('.test-current');
      current.classList.add('test-current-away');
      setInterval(()=>{
        preActive.classList.add('test-current');
        preActive.classList.remove('test-pre_active', 'test-pre_active-animate');
        current.classList.remove('test-current', 'test-current-away');
        current.classList.add('test-noactive');
      }, 1000);
    } else {
      alert('Произошла ошибка сервера!')
    }

  });
  /* BNA: Обработка клика по кнопке в квизе */
  /* BNA */                                                                                                                                                                                                                                                                                                                               /* B*N*A */
  
  /* Анимированный круг */
  const circleTest = document.querySelector('.circle__text');
  document.querySelector('.circle__layer-2').classList.add('circle__layer-2--active');

  for(let i = 0; i<=100; i++){
    setTimeout(()=>{
      circleTest.innerHTML = i+'%';
    }, 500+i*i/2);
  }

  setTimeout(()=>{
    document.querySelector('.circle__ready').classList.add('circle__ready--active');
    circleTest.classList.add('circle__text--noactive');
  }, 6600);
  /* BNA: Анимированный круг */





});