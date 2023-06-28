export default class FormValidator {
  constructor(validConfig, form) {
    this.inputSelector = validConfig.inputSelector;
    this.submitButtonSelector = validConfig.submitButtonSelector;
    this.disabledButtonClass = validConfig.disabledButtonClass;
    this.inputErrorClass = validConfig.inputErrorClass;
    this.errorClass = validConfig.errorClass;
    this.form = form;
    this.inputList = Array.from(this.form.querySelectorAll(this.inputSelector));
    this.buttonElement = this.form.querySelector(this.submitButtonSelector);
  }

  _showInputError(errorElement, input) {
    errorElement.textContent = input.validationMessage;
    input.classList.add(this.inputErrorClass);
  }

  _hideInputError(errorElement, input) {
    errorElement.textContent = '';
    input.classList.remove(this.inputErrorClass);
  }

  _disableButton() {
    this.buttonElement.classList.add(this.disabledButtonClass);
    this.buttonElement.setAttribute('disabled', true);
  }

  _enableButton() {
    this.buttonElement.classList.remove(this.disabledButtonClass);
    this.buttonElement.removeAttribute('disabled');
  }

  _hasInvalidInput() {
    return this.inputList.some(input => !input.validity.valid);
  }

  _toggleButtonState() {
    this._hasInvalidInput() ? this._disableButton() : this._enableButton();
  }

  _checkInputValidity(input) {
    const errorElement = this.form.querySelector(`#${input.id}-error`);
    input.validity.valid ? this._hideInputError(errorElement, input) : this._showInputError(errorElement, input);
  }

  _setEventListeners() {
    this.inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    this._toggleButtonState();
  }

  resetError() {
    this.inputList.forEach((input) => {
      const errorTextElement = this.form.querySelector(`#${input.id}-error`);
      this._hideInputError(errorTextElement, input);
    });
    this._disableButton();
  }
}


