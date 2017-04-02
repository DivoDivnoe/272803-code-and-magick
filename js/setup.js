'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var chooseRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};
var generateName = function (names, surnames) {
  return (Math.random() >= 0.5 ? chooseRandomItem(names) + ' ' + chooseRandomItem(surnames) : chooseRandomItem(surnames) + ' ' + chooseRandomItem(names));
};

var wizards = [
  {
    name: generateName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: chooseRandomItem(COAT_COLORS),
    eyesColor: chooseRandomItem(EYES_COLORS)
  },
  {
    name: generateName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: chooseRandomItem(COAT_COLORS),
    eyesColor: chooseRandomItem(EYES_COLORS)
  },
  {
    name: generateName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: chooseRandomItem(COAT_COLORS),
    eyesColor: chooseRandomItem(EYES_COLORS)
  },
  {
    name: generateName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: chooseRandomItem(COAT_COLORS),
    eyesColor: chooseRandomItem(EYES_COLORS)
  }
];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fillSimilarList = function (items) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < items.length; i++) {
    fragment.appendChild(renderWizard(items[i]));
  }
  similarListElement.appendChild(fragment);
};

fillSimilarList(wizards);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
