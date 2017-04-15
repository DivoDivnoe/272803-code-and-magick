'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarListElement = window.common.userDialog.querySelector('.setup-similar-list');

  var wizardCoat = window.common.userDialog.querySelector('.wizard-coat');
  var wizardEyes = window.common.userDialog.querySelector('.wizard-eyes');
  var fireball = window.common.userDialog.querySelector('.setup-fireball-wrap');

  var generateName = function (names, surnames) {
    var name = window.common.chooseRandomItem(names);
    var surname = window.common.chooseRandomItem(surnames);
    return (Math.random() >= 0.5 ? name + ' ' + surname : surname + ' ' + name);
  };

  var wizards = (function () {
    var res = [];

    for (var i = 0; i < 4; i++) {
      res.push({
        name: generateName(window.constants.WIZARD_NAMES, window.constants.WIZARD_SURNAMES),
        coatColor: window.common.chooseRandomItem(window.constants.COAT_COLORS),
        eyesColor: window.common.chooseRandomItem(window.constants.EYES_COLORS)
      });
    }
    return res;
  })();

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    window.common.fillElement(wizardElement.querySelector('.wizard-coat'), wizard.coatColor);
    window.common.fillElement(wizardElement.querySelector('.wizard-eyes'), wizard.eyesColor);

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
  window.common.showElement(window.common.userDialog.querySelector('.setup-similar'), 'hidden');

  wizardCoat.addEventListener('click', function () {
    window.common.fillElement(wizardCoat, window.common.chooseRandomItem(window.constants.COAT_COLORS));
  });

  wizardEyes.addEventListener('click', function () {
    window.common.fillElement(wizardEyes, window.common.chooseRandomItem(window.constants.EYES_COLORS));
  });

  fireball.addEventListener('click', function () {
    fireball.style.backgroundColor = window.common.chooseRandomItem(window.constants.FIREBALL_COLORS);
  });

})();
