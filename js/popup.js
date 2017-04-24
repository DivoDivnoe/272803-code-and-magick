'use strict';

window.popup = function () {
  var OFFSET = 10;
  var popupElement = document.createElement('div');

  popupElement.classList.add('wizard-artifacts');
  popupElement.style.display = 'none';
  document.body.appendChild(popupElement);

  return function (target, callback) {
    var mouseEnterHandler = function () {
      popupElement.innerHTML = callback();
      popupElement.style.display = 'block';
      target.addEventListener('mousemove', mouseMoveHandler);
      target.addEventListener('mouseleave', mouseLeaveHandler);
    };

    var mouseMoveHandler = function (evt) {
      popupElement.style.top = evt.pageY + OFFSET + 'px';
      popupElement.style.left = evt.pageX + OFFSET + 'px';
    };
    var mouseLeaveHandler = function () {
      popupElement.style.display = 'none';
      target.removeEventListener('mousemove', mouseMoveHandler);
      target.removeEventListener('mouseleave', mouseLeaveHandler);
    };

    target.addEventListener('mouseenter', mouseEnterHandler);
  };
}();
