export default class FormValidator {
  constructor(validConfig, form) {
    this._form = form;
    this._inputSelector = validConfig.inputSelector;
    this._submitButtonSelector = validConfig.submitButtonSelector;
    this._disabledButtonClass = validConfig.disabledButtonClass;
    this._inputErrorClass = validConfig.inputErrorClass;
    this._errorClass = validConfig.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputObject, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputObject.id}-error`);
    inputObject.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputObject) {
    const errorElement = this._form.querySelector(`.${inputObject.id}-error`);
    inputObject.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputObject) {
    if (!inputObject.validity.valid) {
      this._showInputError(inputObject, inputObject.validationMessage);
    } else {
      this._hideInputError(inputObject);
    }
  }

  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some((inputObject) => !inputObject.validity.valid);

    this._buttonElement.disabled =  !this._form.checkValidity();
    this._buttonElement.classList.toggle( this._disabledButtonClass, !this._form.checkValidity()  ); 
  }  
  

  _setEventListeners() {
    this._inputList.forEach((inputObject) => {
      inputObject.addEventListener('input', () => {
        this._checkInputValidity(inputObject);
        this._toggleButtonState();
      });
    });

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._toggleButtonState();
    });
  }

  enableValidation() {
    this._setEventListeners();

    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._disabledButtonClass);

    this._toggleButtonState();
  }
}