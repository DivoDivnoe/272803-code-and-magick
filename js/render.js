'use strict';

window.render = function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarListElement = window.common.userDialog.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    window.common.fillElement(wizardElement.querySelector('.wizard-coat'), wizard.colorCoat);
    window.common.fillElement(wizardElement.querySelector('.wizard-eyes'), wizard.colorEyes);

    return wizardElement;
  };

  return function (wizards) {
    var fragment = document.createDocumentFragment();
    wizards = wizards.slice();
    similarListElement.innerHTML = '';

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
    window.common.showElement(window.common.userDialog.querySelector('.setup-similar'), 'hidden');
  };
}();

