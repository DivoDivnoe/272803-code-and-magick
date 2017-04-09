'use strict';

var showElement = function (el, nameOfClass) {
  el.classList.remove(nameOfClass);
};

var hideElement = function (el, nameOfClass) {
  el.classList.add(nameOfClass);
  el.removeEventListener('keydown', escapePressHandler);
};

var userDialog = document.querySelector('.setup');
var dialogOpen = document.querySelector('.setup-open-icon');
var dialogClose = userDialog.querySelector('.setup-close');

var isEscapeKey = function (evt) {
  return evt.keyCode === 27;
};

var isActivationKey = function (evt) {
  return evt.keyCode === 13;
};

var escapePressHandler = function (evt) {
  if (isEscapeKey(evt)) {
    hideElement(userDialog, 'hidden');
  }
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

dialogOpen.addEventListener('click', function () {
  openPopup();
});

dialogOpen.addEventListener('keydown', function (evt) {
  if (isActivationKey(evt)) {
    openPopup();
  }
});

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var chooseRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var fillElement = function (element, color) {
  element.style.fill = color;
};

userDialog.querySelector('.wizard-coat').addEventListener('click', function () {
  fillElement(this, chooseRandomItem(COAT_COLORS));
});

userDialog.querySelector('.wizard-eyes').addEventListener('click', function () {
  fillElement(this, chooseRandomItem(EYES_COLORS));
});

userDialog.querySelector('.setup-fireball-wrap').addEventListener('click', function () {
  this.style.backgroundColor = chooseRandomItem(FIREBALL_COLORS);
});

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
