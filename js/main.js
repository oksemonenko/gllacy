'use strict';

(function() {
  var link = document.querySelector('.main-contacts-feedback');
  var overlay = document.querySelector('.modal-content-overlay');
  var popup = overlay.querySelector('.modal-content');
  var closeButton = popup.querySelector('.modal-content-close');
  var form = popup.querySelector('.feedback-form');
  var userName = form.querySelector('.user-name');
  var userEmail = form.querySelector('.user-email');
  var userComment = form.querySelector('.user-comment');
  
  //Запись данных в localStorage
  var storageUserName = localStorage.getItem('userName');
  var storageUserEmail = localStorage.getItem('userEmail');

  //Функция, показывающая попап
  function showPopup() {
    overlay.classList.add('modal-content-show');
    popup.classList.add('animation');
  }

  //Функция, скрывающая попап
  function hidePopup() {
    overlay.classList.remove('modal-content-show');
    popup.classList.remove('animation');
    removeError();
  }

  //Функция, добавляющая ошибку
  function setError() {
    popup.classList.add('modal-error');
  }

  //Функция, удаляющая ошибку
  function removeError() {
    popup.classList.remove('modal-error');
  }

  //Добавляет обработчик события кнопке обратной связи
  link.addEventListener('click', function(evt) {
    evt.preventDefault();
    showPopup();
    if (storageUserName) {
      userName.value = storageUserName;
      if (storageUserEmail) {
        userEmail.value = storageUserEmail;
        userComment.focus();
      } else {
        userEmail.focus();
      }
    } else {
      userName.focus();
    }
  });

  //Добавляет обработчик события закрывающей кнопке
  closeButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    hidePopup();
  });

  //Обработчик события: закрытие попапа по нажатию клавиши esc
  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      if (overlay.classList.contains('modal-content-show')) {
        hidePopup();
      }
    }
  });

  //Обработчик события: форма не отправляется с пустыми полями.
  form.addEventListener('submit', function(evt) {
    if (!userName.value || !userEmail.value) {
      evt.preventDefault();
      setError();
    } else {
      localStorage.setItem('userName', userName.value);
      localStorage.setItem('userEmail', userEmail.value);
    }
  });
})();
