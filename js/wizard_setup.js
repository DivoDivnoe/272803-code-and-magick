'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarListElement = common.userDialog.querySelector('.setup-similar-list');

  var wizardCoat = common.userDialog.querySelector('.wizard-coat');
  var wizardEyes = common.userDialog.querySelector('.wizard-eyes');
  var fireball = common.userDialog.querySelector('.setup-fireball-wrap');

  var generateName = function (names, surnames) {
    var name = common.chooseRandomItem(names);
    var surname = common.chooseRandomItem(surnames);
    return (Math.random() >= 0.5 ? name + ' ' + surname : surname + ' ' + name);
  };

  var wizards = (function () {
    var res = [];

    for (var i = 0; i < 4; i++) {
      res.push({
        name: generateName(constants.WIZARD_NAMES, constants.WIZARD_SURNAMES),
        coatColor: common.chooseRandomItem(constants.COAT_COLORS),
        eyesColor: common.chooseRandomItem(constants.EYES_COLORS)
      });
    }
    return res;
  })();

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    common.fillElement(wizardElement.querySelector('.wizard-coat'), wizard.coatColor);
    common.fillElement(wizardElement.querySelector('.wizard-eyes'), wizard.eyesColor);

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
  common.showElement(common.userDialog.querySelector('.setup-similar'), 'hidden');

  wizardCoat.addEventListener('click', function () {
    common.fillElement(wizardCoat, common.chooseRandomItem(constants.COAT_COLORS));
  });

  wizardEyes.addEventListener('click', function () {
    common.fillElement(wizardEyes, common.chooseRandomItem(constants.EYES_COLORS));
  });

  fireball.addEventListener('click', function () {
    fireball.style.backgroundColor = common.chooseRandomItem(constants.FIREBALL_COLORS);
  });

})();








