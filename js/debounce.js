'use strict';

window.debounce = function () {
  var lastIimeout;

  return function (func) {
    if (lastIimeout) {
      window.clearTimeout(lastIimeout);
    }

    lastIimeout = window.setTimeout(function () {
      func();
    }, 300);
  };
}();
