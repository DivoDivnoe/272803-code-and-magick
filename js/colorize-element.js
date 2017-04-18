'use strict';

window.colorizeElement = function () {
  return function (element, colors, func) {
    return func(element, colors);
  };
}();
