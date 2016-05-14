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
  var storageUserName = localStorage.getItem('userName');
  var storageUserEmail = localStorage.getItem('userEmail');

  function showPopup() {
    overlay.classList.add('modal-content-show');
    popup.classList.add('animation');
  }

  function hidePopup() {
    overlay.classList.remove('modal-content-show');
    popup.classList.remove('animation');
    removeError();
  }

  function setError() {
    popup.classList.add('modal-error');
  }

  function removeError() {
    popup.classList.remove('modal-error');
  }


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

  closeButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    hidePopup();
  });

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      if (overlay.classList.contains('modal-content-show')) {
        hidePopup();
      }
    }
  });

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
