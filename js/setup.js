'use strict';

var showElement = function (el, nameOfClass) {
  return el.classList.remove(nameOfClass);
};

var userDialog = document.querySelector('.setup');
showElement(userDialog, 'hidden');

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
  var name = chooseRandomItem(names);
  var surname = chooseRandomItem(surnames);
  return (Math.random() >= 0.5 ? name + ' ' + surname : surname + ' ' + name);
};

var generateWizardsArray = function () {
  var wizards = [];

  for (var i = 0; i < 4; i++) {
    wizards.push({
      name: generateName(WIZARD_NAMES, WIZARD_SURNAMES),
      coatColor: chooseRandomItem(COAT_COLORS),
      eyesColor: chooseRandomItem(EYES_COLORS)
    });
  }
  return wizards;
};

var wizards = generateWizardsArray();

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
showElement(userDialog.querySelector('.setup-similar'), 'hidden');
