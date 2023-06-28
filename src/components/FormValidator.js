export default class FormValidator {
  constructor(validConfig, form) {
    this._inputSelector = validConfig.inputSelector;
    this._submitButtonSelector = validConfig.submitButtonSelector;
    this._disabledButtonClass = validConfig.disabledButtonClass;
    this._inputErrorClass = validConfig.inputErrorClass;
    this._errorClass = validConfig.errorClass;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(errorElement, input) {
    errorElement.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  }

  _hideInputError(errorElement, input) {
    errorElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    input.classList.remove(this._inputErrorClass); 
  }

  _disableButton() {
    this._buttonElement.classList.add(this._disabledButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._disabledButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  _hasInvalidInput() {
    return this._inputList.some(input => !input.validity.valid);
  }

  _toggleButtonState() {
    this._hasInvalidInput() ? this._disableButton() : this._enableButton();
  }

  _checkInputValidity(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.validity.valid ? this._hideInputError(errorElement, input) : this._showInputError(errorElement, input);
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    this._toggleButtonState();
  }

  resetError() {
    this._inputList.forEach((input) => {
      const errorTextElement = this._form.querySelector(`#${input.id}-error`);
      this._hideInputError(errorTextElement, input);
    });
    this._disableButton();
  }
}


