'use strict';

(function () {
  var dialogOpen = document.querySelector('.setup-open-icon');
  var dialogClose = window.common.userDialog.querySelector('.setup-close');

  var escapePressHandler = function (evt) {
    if (window.common.isEscapeKey(evt)) {
      window.common.hideElement(window.common.userDialog, 'hidden');
    }
  };

  dialogClose.addEventListener('keydown', function (evt) {
    if (window.common.isActivationKey(evt)) {
      window.common.hideElement(window.common.userDialog, 'hidden');
      window.common.userDialog.removeEventListener('keydown', escapePressHandler);
    }
  });

  dialogClose.addEventListener('click', function () {
    window.common.hideElement(window.common.userDialog, 'hidden');
    window.common.userDialog.removeEventListener('keydown', escapePressHandler);
  });

  var openPopup = function () {
    window.common.showElement(window.common.userDialog, 'hidden');
    document.addEventListener('keydown', escapePressHandler);
    document.querySelector('.setup-user-name').addEventListener('keydown', function (evt) {
      if (window.common.isEscapeKey(evt)) {
        evt.stopPropagation();
      }
    });
  };

  dialogOpen.addEventListener('click', function () {
    openPopup();
  });

  dialogOpen.addEventListener('keydown', function (evt) {
    if (window.common.isActivationKey(evt)) {
      openPopup();
    }
  });
})();
