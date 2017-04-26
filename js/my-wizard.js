'use strict';

window.myWizard = function () {
  var wizardName = window.common.userDialog.querySelector('.setup-user-name');
  var wizardCoat = window.common.userDialog.querySelector('.wizard-coat');
  var wizardEyes = window.common.userDialog.querySelector('.wizard-eyes');
  var fireball = window.common.userDialog.querySelector('.setup-fireball-wrap');

  var changeElementBackground = function (element, colors) {
    element.style.backgroundColor = window.common.chooseRandomItem(colors);
  };

  var wizard = new window.Wizard({});
  wizard.setName(wizardName.value);

  wizardCoat.addEventListener('click', function () {
    wizard.coatColorChange();
    window.common.fillElement(wizardCoat, wizard.coatColor);
  });

  wizardEyes.addEventListener('click', function () {
    wizard.eyesColorChange();
    window.common.fillElement(wizardEyes, wizard.eyesColor);
  });

  fireball.addEventListener('click', function () {
    window.colorizeElement(fireball, window.constants.FIREBALL_COLORS, changeElementBackground);
  });

  return wizard;
}();
