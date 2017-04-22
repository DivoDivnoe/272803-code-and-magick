'use strict';

(function () {
  var shopElement = window.common.userDialog.querySelector('.setup-artifacts-shop');
  var artifactsElement = window.common.userDialog.querySelector('.setup-artifacts');
  var draggedItem = null;

  var dragStartHandler = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      draggedItem.addEventListener('drag', function () {
        window.common.userDialog.querySelector('div[dropzone="move"]').style.outline = '2px dashed red';
      });
      draggedItem.addEventListener('dragend', function () {
        window.common.userDialog.querySelector('div[dropzone="move"]').style.outline = 'none';
      });
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  };

  shopElement.addEventListener('dragstart', function (evt) {
    dragStartHandler(evt);
  });

  artifactsElement.addEventListener('dragstart', function (evt) {
    dragStartHandler(evt);
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    window.common.userDialog.querySelector('div[dropzone="move"]').style.outline = 'none';
    if (!evt.target.firstChild) {
      if (draggedItem.parentElement.parentElement === shopElement) {
        evt.target.appendChild(draggedItem.cloneNode(true));
      } else {
        evt.target.appendChild(draggedItem);
      }
    }
  });
})();
