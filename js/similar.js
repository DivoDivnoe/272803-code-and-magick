'use strict';

(function () {
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.myWizard.coatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === window.myWizard.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    window.render(wizards.slice().sort(function (a, b) {
      var rankDiff = getRank(b) - getRank(a);

      if (rankDiff === 0) {
        rankDiff = b.name.localeCompare(a.name);
      }
      return rankDiff;
    }));
  };

  window.myWizard.changeHandler = function () {
    window.debounce(updateWizards);
  };

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var errorHandler = function (message) {
    var node = document.createElement('div');

    node.style.position = 'absolute';
    node.style.left = '0';
    node.style.right = '0';
    node.style.zIndex = '100';
    node.style.fontSize = '30px';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'red';
    node.textContent = message;

    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.loadData(successHandler, errorHandler);
})();
