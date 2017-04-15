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
    }
  };
}();