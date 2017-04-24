'use strict';

(function () {
  var Wizard = function (data) {
    this.name = data.name;
    this.coatColor = data.colorCoat;
    this.eyesColor = data.colorEyes;
  };

  Wizard.prototype = {
    setName: function (name) {
      if (!name) {
        throw new Error('Имя не задано');
      } else if (name.length > 30) {
        throw new Error('Недопустимое имя мага: ' + name);
      } else {
        this.name = name;

        return name;
      }
    },
    coatColorChange: function () {
      var newColor = window.common.chooseRandomItem(window.constants.COAT_COLORS);
      this.coatColor = newColor;
      this.changeHandler(this);

      return newColor;
    },
    eyesColorChange: function () {
      var newColor = window.common.chooseRandomItem(window.constants.EYES_COLORS);
      this.eyesColor = newColor;
      this.changeHandler(this);

      return newColor;
    },
    changeHandler: function (wizard) {
      return wizard;
    }
  };

  window.Wizard = Wizard;
})();
