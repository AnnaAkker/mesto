// const validConfig = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__submit-button',
//     disabledButtonClass: 'popup__submit-button_disabled',
//     inputErrorClass: 'popup__input_invalid',
//     errorClass: 'popup__input-error'
// };

// // Валидность инпутов //

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputObject) => {
//     return !inputObject.validity.valid;
//   });
// };

// // Функция состояния кнопки //

// function toggleButtonState(validConfig, inputList, buttonElement) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(validConfig.disabledButtonClass);
//     buttonElement.setAttribute('disabled', true);
//   } else {
//     buttonElement.removeAttribute('disabled');
//     buttonElement.classList.remove(validConfig.disabledButtonClass);
//   };
// };

// // Показ ошибки //

// const showInputError = (validConfig, formObject, inputObject, errorMessage) => {
//   const errorElement = formObject.querySelector(`.${inputObject.id}-error`);
//   inputObject.classList.add(validConfig.errorClass);
//   errorElement.textContent = errorMessage;
//   inputObject.classList.add(validConfig.inputErrorClass);
// };

// // Скрытие ошибки // 

// const hideInputError = (validConfig, formObject, inputObject) => {
//   const errorElement = formObject.querySelector(`.${inputObject.id}-error`);
//   inputObject.classList.remove(validConfig.errorClass);
//   errorElement.textContent = '';
//   inputObject.classList.remove(validConfig.inputErrorClass);
// };

// // Валидность //

// const isValid = (validConfig, formObject, inputObject, inputList, buttonElement) => {
//   if (!inputObject.validity.valid) {
//     showInputError(validConfig, formObject, inputObject, inputObject.validationMessage);
//   } else { 
//     hideInputError(validConfig, formObject, inputObject);
//   };

//   inputList.forEach((inputObject) => {
//     inputObject.addEventListener('input', function () {
//       isValid(validConfig, formObject, inputObject, inputList, buttonElement);
//       toggleButtonState(validConfig, inputList, buttonElement);
//     });
//   });
// };

// // Функция для добавления обработчиков событий на все поля формы //

// const setEventListeners = (validConfig, formObject) => {
//   const inputList = Array.from(formObject.querySelectorAll(validConfig.inputSelector));
//   const buttonElement = formObject.querySelector(validConfig.submitButtonSelector);

//   formObject.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//       formObject.reset();
//       toggleButtonState(validConfig, inputList, buttonElement);
//   });

//   toggleButtonState(validConfig, inputList, buttonElement);

//   inputList.forEach((inputObject) => {
//     inputObject.addEventListener('input', function () {
//       isValid(validConfig, formObject, inputObject, inputList, buttonElement);
//       toggleButtonState(validConfig, inputList, buttonElement);
//     });
//   });
// };

// const enableValidation = (validConfig) => {
//   const formsList = Array.from(document.querySelectorAll(validConfig.formSelector));
  
//   formsList.forEach((formObject) => {
//     setEventListeners(validConfig, formObject);
//   });
// };

// enableValidation(validConfig);

class FormValidator {
  constructor(validConfig) {
    this._formSelector = validConfig.formSelector;
    this._inputSelector = validConfig.inputSelector;
    this._submitButtonSelector = validConfig.submitButtonSelector;
    this._disabledButtonClass = validConfig.disabledButtonClass;
    this._inputErrorClass = validConfig.inputErrorClass;
    this._errorClass = validConfig.errorClass;
  };

  _showInputError(formObject, inputObject, errorMessage) {
    const errorElement = formObject.querySelector(`.${inputObject.id}-error`);
    inputObject.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
    inputObject.classList.add(this._inputErrorClass);
  };

  _hideInputError(formObject, inputObject) {
    const errorElement = formObject.querySelector(`.${inputObject.id}-error`);
    inputObject.classList.remove(this._errorClass);
    errorElement.textContent = '';
    inputObject.classList.remove(this._inputErrorClass);
  };

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
    });
  }
};

const validConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  disabledButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error'
};

const formValidator = new FormValidator(validConfig);
formValidator.enableValidation();