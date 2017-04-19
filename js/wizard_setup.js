'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarListElement = window.common.userDialog.querySelector('.setup-similar-list');

  var shopElement = window.common.userDialog.querySelector('.setup-artifacts-shop');
  var artifactsElement = window.common.userDialog.querySelector('.setup-artifacts');
  var draggedItem = null;

  var wizardCoat = window.common.userDialog.querySelector('.wizard-coat');
  var wizardEyes = window.common.userDialog.querySelector('.wizard-eyes');
  var fireball = window.common.userDialog.querySelector('.setup-fireball-wrap');

  var fillElement = function (element, colors) {
    element.style.fill = window.common.chooseRandomItem(colors);
  };

  var changeElementBackground = function (element, colors) {
    element.style.backgroundColor = window.common.chooseRandomItem(colors);
  };

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
    window.colorizeElement(wizardCoat, window.constants.COAT_COLORS, fillElement);
  });

  wizardEyes.addEventListener('click', function () {
    window.colorizeElement(wizardEyes, window.constants.EYES_COLORS, fillElement);
  });

  fireball.addEventListener('click', function () {
    window.colorizeElement(fireball, window.constants.FIREBALL_COLORS, changeElementBackground);
  });

  var dragStartHandler = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      draggedItem.addEventListener('drag', function () {
        window.common.userDialog.querySelector('div[dropzone="move"]').style.outline = '2px dashed red';
      });
      draggedItem.addEventListener('dragend', function () {
        window.common.userDialog.querySelector('div[dropzone="move"]').style.outline = 'none';
      });
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  };

  shopElement.addEventListener('dragstart', function (evt) {
    dragStartHandler(evt);
  });

  artifactsElement.addEventListener('dragstart', function (evt) {
    dragStartHandler(evt);
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    window.common.userDialog.querySelector('div[dropzone="move"]').style.outline = 'none';
    if (!evt.target.firstChild) {
      if (draggedItem.parentElement.parentElement === shopElement) {
        evt.target.appendChild(draggedItem.cloneNode(true));
      } else {
        evt.target.appendChild(draggedItem);
      }
    }
  });
})();
