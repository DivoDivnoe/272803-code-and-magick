'use strict';

(function () {
  var dialogOpen = document.querySelector('.setup-open-icon');
  var dialogClose = window.common.userDialog.querySelector('.setup-close');
  var dialogHandle = document.querySelector('.setup-user-pic');
  var dialogCoords = {
    x: window.common.userDialog.getAttribute('left'),
    y: window.common.userDialog.getAttribute('top')
  };

  var escapePressHandler = function (evt) {
    if (window.common.isEscapeKey(evt)) {
      closeDialog(dialogCoords);
    }
  };

  var closeDialog = function (dialogCoords) {
    window.common.hideElement(window.common.userDialog, 'hidden');
    window.common.userDialog.style.left = dialogCoords.x;
    window.common.userDialog.style.top = dialogCoords.y;
    window.common.userDialog.removeEventListener('keydown', escapePressHandler);
  };

  dialogClose.addEventListener('keydown', function (evt) {
    if (window.common.isActivationKey(evt)) {
      closeDialog(dialogCoords);
    }
  });

  dialogClose.addEventListener('click', function () {
    closeDialog(dialogCoords);
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

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.common.userDialog.style.left = (window.common.userDialog.offsetLeft - shift.x) + 'px';
      window.common.userDialog.style.top = (window.common.userDialog.offsetTop - shift.y) + 'px';
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  });
})();
