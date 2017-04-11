'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');

var chooseRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var fillElement = function (element, color) {
  element.style.fill = color;
};

var showElement = function (el, nameOfClass) {
  el.classList.remove(nameOfClass);
};

window.createDialog = (function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var generateName = function (names, surnames) {
    var name = chooseRandomItem(names);
    var surname = chooseRandomItem(surnames);
    return (Math.random() >= 0.5 ? name + ' ' + surname : surname + ' ' + name);
  };

  var wizards = (function () {
    var res = [];

    for (var i = 0; i < 4; i++) {
      res.push({
        name: generateName(WIZARD_NAMES, WIZARD_SURNAMES),
        coatColor: chooseRandomItem(COAT_COLORS),
        eyesColor: chooseRandomItem(EYES_COLORS)
      });
    }
    return res;
  })();

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    fillElement(wizardElement.querySelector('.wizard-coat'), wizard.coatColor);
    fillElement(wizardElement.querySelector('.wizard-eyes'), wizard.eyesColor);

    return wizardElement;
  };

  return function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
    showElement(userDialog.querySelector('.setup-similar'), 'hidden');
  };
})();

window.setupEvents = (function () {
  var dialogOpen = document.querySelector('.setup-open-icon');
  var dialogClose = userDialog.querySelector('.setup-close');
  var wizardCoat = userDialog.querySelector('.wizard-coat');
  var wizardEyes = userDialog.querySelector('.wizard-eyes');
  var fireball = userDialog.querySelector('.setup-fireball-wrap');

  var hideElement = function (el, nameOfClass) {
    el.classList.add(nameOfClass);
    el.removeEventListener('keydown', escapePressHandler);
  };

  var escapePressHandler = function (evt) {
    if (isEscapeKey(evt)) {
      hideElement(userDialog, 'hidden');
    }
  };

  var isEscapeKey = function (evt) {
    return evt.keyCode === 27;
  };

  var isActivationKey = function (evt) {
    return evt.keyCode === 13;
  };

  var openPopup = function () {
    showElement(userDialog, 'hidden');
    document.addEventListener('keydown', escapePressHandler);
    document.querySelector('.setup-user-name').addEventListener('keydown', function (evt) {
      if (isEscapeKey(evt)) {
        evt.stopPropagation();
      }
    });
    dialogClose.addEventListener('keydown', function (evt) {
      if (isActivationKey(evt)) {
        hideElement(userDialog, 'hidden');
      }
    });
    dialogClose.addEventListener('click', function () {
      hideElement(userDialog, 'hidden');
    });
  };

  return function () {
    dialogOpen.addEventListener('click', function () {
      openPopup();
    });

    dialogOpen.addEventListener('keydown', function (evt) {
      if (isActivationKey(evt)) {
        openPopup();
      }
    });
    wizardCoat.addEventListener('click', function () {
      fillElement(wizardCoat, chooseRandomItem(COAT_COLORS));
    });

    wizardEyes.addEventListener('click', function () {
      fillElement(wizardEyes, chooseRandomItem(EYES_COLORS));
    });

    fireball.addEventListener('click', function () {
      fireball.style.backgroundColor = chooseRandomItem(FIREBALL_COLORS);
    });
  };
})();

createDialog();
setupEvents();
