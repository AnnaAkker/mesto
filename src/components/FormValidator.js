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

  _showInputError(errorText, input) {
    errorText.classList.add(this._inputErrorClass);
    errorText.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  }

  _hideInputError(errorText, input) {
    errorText.classList.remove(this._inputErrorClass);
    errorText.textContent = '';
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
    const errorText = this._form.querySelector(`#${input.id}-error`);
    input.validity.valid ? this._hideInputError(errorText, input) : this._showInputError(errorText, input);
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


