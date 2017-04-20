'use strict';

window.common = function () {
  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  return {
    userDialog: document.querySelector('.setup'),

    chooseRandomItem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    
    spliceRandomItem: function (array) {
      return array.splice(Math.floor(Math.random() * array.length), 1)[0];
    },

    fillElement: function (element, color) {
      element.style.fill = color;
    },

    showElement: function (el, nameOfClass) {
      el.classList.remove(nameOfClass);
    },

    hideElement: function (el, nameOfClass) {
      el.classList.add(nameOfClass);
    },

    isEscapeKey: function (evt) {
      return evt.keyCode === ESCAPE_KEY_CODE;
    },

    isActivationKey: function (evt) {
      return evt.keyCode === ENTER_KEY_CODE;
    }
  };
}();
