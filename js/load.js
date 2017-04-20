'use strict';

window.loadData = function () {
  var xhr = new XMLHttpRequest();
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/code-and-magick/data';

  return function (successHandler, errorHandler) {
    xhr.open('GET', URL);
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successHandler(xhr.response);
      } else {
        errorHandler('Незвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('время запроса превысило ' + xhr.timeout + ' мс');
    });

    xhr.send();
  };
}();
