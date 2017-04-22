'use strict';

window.wizard = function () {
  var wizardCoat = window.common.userDialog.querySelector('.wizard-coat');
  var wizardEyes = window.common.userDialog.querySelector('.wizard-eyes');
  var fireball = window.common.userDialog.querySelector('.setup-fireball-wrap');

  var fillElement = function (element, colors) {
    element.style.fill = window.common.chooseRandomItem(colors);
  };

  var changeElementBackground = function (element, colors) {
    element.style.backgroundColor = window.common.chooseRandomItem(colors);
  };

  wizardCoat.addEventListener('click', function () {
    window.colorizeElement(wizardCoat, window.constants.COAT_COLORS, fillElement);
    var newColor = wizardCoat.style.fill;
    window.wizard.coatChangeHandler(newColor);
  });

  wizardEyes.addEventListener('click', function () {
    window.colorizeElement(wizardEyes, window.constants.EYES_COLORS, fillElement);
    var newColor = wizardEyes.style.fill;
    window.wizard.eyesChangeHandler(newColor);
  });

  fireball.addEventListener('click', function () {
    window.colorizeElement(fireball, window.constants.FIREBALL_COLORS, changeElementBackground);
  });

  return {
    wizardCoat: wizardCoat,
    wizardEyes: wizardEyes,
    eyesChangeHandler: function (color) {},
    coatChangeHandler: function (color) {}
  };
}();
