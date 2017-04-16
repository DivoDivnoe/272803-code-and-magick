'use strict';

window.common = function () {
  return {
    userDialog: document.querySelector('.setup'),

    chooseRandomItem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
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
      return evt.keyCode === 27;
    },

    isActivationKey: function (evt) {
      return evt.keyCode === 13;
    }
  };
}();
