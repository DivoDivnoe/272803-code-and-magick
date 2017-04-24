'use strict';

window.render = function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarListElement = window.common.userDialog.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var element = similarWizardTemplate.cloneNode(true);
    var wizardElement = element.querySelector('.wizard');

    element.querySelector('.setup-similar-label').textContent = wizard.name;
    window.common.fillElement(wizardElement.querySelector('.wizard-coat'), wizard.colorCoat);
    window.common.fillElement(wizardElement.querySelector('.wizard-eyes'), wizard.colorEyes);
    window.popup(wizardElement, function () {
      return renderWizardArtifacts(wizard);
    });

    return element;
  };

  var renderWizardArtifacts = function (wizard) {
    return wizard.artifacts.map(function (artifact) {
      return artifact.name;
    }).join('<br>');
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
