'use strict';

(function () {
  var dialogOpen = document.querySelector('.setup-open-icon');
  var dialogClose = common.userDialog.querySelector('.setup-close');

  var hideElement = function (el, nameOfClass) {
    el.classList.add(nameOfClass);
    el.removeEventListener('keydown', escapePressHandler);
  };

  var escapePressHandler = function (evt) {
    if (isEscapeKey(evt)) {
      hideElement(common.userDialog, 'hidden');
    }
  };

  var isEscapeKey = function (evt) {
    return evt.keyCode === 27;
  };

  var isActivationKey = function (evt) {
    return evt.keyCode === 13;
  };

  dialogClose.addEventListener('keydown', function (evt) {
    if (isActivationKey(evt)) {
      hideElement(common.userDialog, 'hidden');
    }
  });
  dialogClose.addEventListener('click', function () {
    hideElement(common.userDialog, 'hidden');
  });
  var openPopup = function () {
    common.showElement(common.userDialog, 'hidden');
    document.addEventListener('keydown', escapePressHandler);
    document.querySelector('.setup-user-name').addEventListener('keydown', function (evt) {
      if (isEscapeKey(evt)) {
        evt.stopPropagation();
      }
    });
  };

  dialogOpen.addEventListener('click', function () {
    openPopup();
  });

  dialogOpen.addEventListener('keydown', function (evt) {
    if (isActivationKey(evt)) {
      openPopup();
    }
  });
})();
