export default class FormValidator {
  constructor(validConfig, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = validConfig.inputSelector;
    this._submitButtonSelector = validConfig.submitButtonSelector;
    this._disabledButtonClass = validConfig.disabledButtonClass;
    this._inputErrorClass = validConfig.inputErrorClass;
    this._errorClass = validConfig.errorClass;
  };

  // Показ ошибки //

  _showInputError(formObject, inputObject, errorMessage) {
    const errorElement = formObject.querySelector(`.${inputObject.id}-error`);
    inputObject.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
    inputObject.classList.add(this._inputErrorClass);
  };
  
  // Скрытие ошибки // 

  _hideInputError(formObject, inputObject) {
    const errorElement = formObject.querySelector(`.${inputObject.id}-error`);
    inputObject.classList.remove(this._errorClass);
    errorElement.textContent = '';
    inputObject.classList.remove(this._inputErrorClass);
  };

  // Валидность инпутов //

  _checkInputValidity(formObject, inputObject) {
    if (!inputObject.validity.valid) {
      this._showInputError(formObject, inputObject, inputObject.validationMessage);
    } else {
      this._hideInputError(formObject, inputObject);
    }
  };

  _toggleButtonState(formObject) {
    const inputList = Array.from(formObject.querySelectorAll(this._inputSelector));
    const buttonElement = formObject.querySelector(this._submitButtonSelector);
    const hasInvalidInput = inputList.some((inputObject) => !inputObject.validity.valid);

    buttonElement.disabled = hasInvalidInput;
    buttonElement.classList.toggle(this._disabledButtonClass, hasInvalidInput);
  };

  _setEventListeners(formObject) {
    const inputList = Array.from(formObject.querySelectorAll(this._inputSelector));

    inputList.forEach((inputObject) => {
      inputObject.addEventListener('input', () => {
        this._checkInputValidity(formObject, inputObject);
        this._toggleButtonState(formObject);
      });
    });

    formObject.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._toggleButtonState(formObject);
    });
  };

  enableValidation() {
    const formsList = Array.from(document.querySelectorAll(this._formSelector));
    formsList.forEach((formObject) => {
      formObject.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formObject);

      const buttonElement = formObject.querySelector(this._submitButtonSelector);
      buttonElement.disabled = true;
      buttonElement.classList.add(this._disabledButtonClass);
    });
  };
};
