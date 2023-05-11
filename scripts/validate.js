const validConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    disabledButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: '.popup__input_error',
    popupErrorClass: 'popup__input_error_type_'
};

// Валидность инпутов //

const hasInvalidInput = (inputList) => {
  return inputList.some((inputObject) => {
    return !inputObject.validity.valid
  });
};

// Показ ошибки //

const showInputError = (validConfig, formObject, inputObject, errorMessage) => {
  const errorElement = formObject.querySelector(`${validConfig.popupErrorClass}${inputObject.name}`);
  inputObject.classList.add(validConfig.errorClass);
  errorElement.textContent = errorMessage;
  inputObject.classList.add(validConfig.inputErrorClass);
};

// Скрытие ошибки // 

const hideInputError = (validConfig, formObject, inputObject) => {
  const errorElement = formObject.querySelector(`${validConfig.popupErrorClass}${inputObject.name}`);
  inputObject.classList.remove(validConfig.errorClass);
  errorElement.textContent = '';
  inputObject.classList.remove(validConfig.inputErrorClass);
};

// Валидность //

const isValid = (validConfig, formObject, inputObject, inputList) => {
  if (!inputObject.validity.valid) {
    showInputError(validConfig, formObject, inputObject, inputObject.validationMessage);
  } else { 
    hideInputError(validConfig, formObject, inputObject);
  };

  inputList.forEach((inputObject) => {
    inputObject.addEventListener('input', function () {
      isValid(validConfig, formObject, inputObject, inputList);
      toggleButtonState(validConfig, inputList, buttonElement);
    });
  });
};

// Функция состояния кнопки //

function toggleButtonState(validConfig, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validConfig.disabledButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(validConfig.disabledButtonClass);
  };
};

// Функция для добавления обработчиков событий на все поля формы //

const setEventListeners = (validConfig, formObject) => {
  const inputList = Array.from(formObject.querySelectorAll(validConfig.inputSelector));
  const buttonElement = formObject.querySelector(validConfig.submitButtonSelector);

  formObject.addEventListener('submit', (evt) => {
      evt.preventDefault();
      formObject.reset();
      toggleButtonState(validConfig, inputList, buttonElement);
  });

  toggleButtonState(validConfig, inputList, buttonElement);

  inputList.forEach((inputObject) => {
    inputObject.addEventListener('input', function () {
      isValid(validConfig, formObject, inputObject, inputList);
      toggleButtonState(validConfig, inputList, buttonElement);
    });
  });
};

const enableValidation = (validConfig) => {
  const formsList = Array.from(document.querySelectorAll(validConfig.formSelector));
  formsList.forEach((formObject) => {
    setEventListeners(validConfig, formObject);
  });
};
  
enableValidation(validConfig);


// // Функция валидации //

// function enableValidation(config) {
//   const forms = Array.from(config.allforms);
//   forms.forEach((form) => {
//     const inputList = form.querySelectorAll(config.inputSelector);
//     const submitButton = form.querySelector(config.submitButtonSelector);
//     handEventListener(inputList, submitButton, config.popupErrorClass, config.inactiveButtonClass, config.inputErrorClass, config.popupErrorClassActv);
//   });
// };

// // Функция слушателя инпутов //

// function handEventListener(inputList, submitButton, popupErrorClass, inactiveButtonClass, inputErrorClass, popupErrorClassActv) {
//   inputList.forEach((input) => {
//     input.addEventListener('input', () => {
//       checkInputValidity(input, popupErrorClass, inputErrorClass, popupErrorClassActv);
//       toggleButtonState(input, submitButton, inactiveButtonClass);
//     })
//   })
// };

// // Функция валидации инпутов //

// function checkInputValidity(input, popupErrorClass, inputErrorClass, popupErrorClassActv) {
//   const errorText = document.querySelector(`${popupErrorClass}${input.name}`)
//   input.validity.valid ? hideInputError(input, errorText, inputErrorClass, popupErrorClassActv) : showInputError(input, errorText, inputErrorClass, popupErrorClassActv);
// };

// // Функция показа ошибки //

// function showInputError(input, errorText, inputErrorClass, popupErrorClassActv) {
//   input.classList.add(inputErrorClass);
//   errorText.textContent = input.validationMessage;
//   errorText.classList.add(popupErrorClassActv);
// };

// // Функция скрытия ошибки // 

// function hideInputError(input, errorText, inputErrorClass, popupErrorClassActv) {
//   input.classList.remove(inputErrorClass);
//   errorText.textContent = '';
//   errorText.classList.remove(popupErrorClassActv);
// };

// // Функция состояния кнопки //

// function toggleButtonState(input, submitButton, inactiveButtonClass) {
//   validInput(input) ? enableButton(submitButton, inactiveButtonClass) : inactiveButton(submitButton, inactiveButtonClass);
// };

// // Функция валидности инпутов //

// function validInput(inputList) {
//   return Array.from(inputList).some((input) => !input.validity.valid);
// };

// // Функция активации кнопки //

// function activeButton(submitButton, inactiveButtonClass) {
//   submitButton.classList.remove(inactiveButtonClass);
//   submitButton.disabled = false;
// };

// // Функция выключения кнопки //

// function inactiveButton(submitButton, inactiveButtonClass) {
//   submitButton.classList.add(inactiveButtonClass);
//   submitButton.disabled = true; 
// }; 

// // Функция проверки сброса валидации //

// function resetErrorForm(form, config) {
//   const submitButton = form.querySelector(config.submitButtonSelector);
//   form.querySelectorAll(config.inputSelector).forEach((input) => {
//     const errorTextObject = form.querySelector(`${config.popupErrorClass}${input.name}`)
//     if (!input.validity.valid) {
//       hideInputErrorForm(input, errorTextObject, config.inputErrorClass);
//     }
//   });
//   toggleButtonState(form.querySelectorAll(config.inputSelector), submitButton, config.inactiveButtonClass);
// };

// enableValidation(validConfig);

// // Функция для проверки всех полей в форме //

// const hasInvalidInput = (inputList) => {
//     return inputList.some((inputElement) => {
//       return !inputElement.validity.valid;
//     });
// };

// // Функция для включения и отключения submit //

// function toggleButtonState (validConfig, inputList, buttonElement) {
//     if (hasInvalidInput(inputList)) {
//         buttonElement.classList.add(validConfig.inactiveButtonClass);
//         buttonElement.setAttribute('disabled', true);
//     } else {
//         buttonElement.classList.remove(validConfig.inactiveButtonClass);
//         buttonElement.removeAttribute('disabled');
//     }
// };

// // Функция для показа ошибки валидации //

// const showInputError = (validConfig, formElement, inputElement, errorMessage) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
//     inputElement.classList.add(validConfig.inputErrorClass);
//     errorElement.textContent = errorMessage;
//     inputElement.classList.add(validConfig.errorClass);
//   }

// // Функция для скрытия ошибки валидации //

// const hideInputError = (validConfig, formElement, inputElement) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(validConfig.inputErrorClass);
//     inputElement.classList.remove(validConfig.errorClass);
//     errorElement.textContent = '';
// };

// // Функция для проверки валидности поля //

// function checkValidity (validConfig, formElement, inputElement) {
//     if (!inputElement.validity.valid) {
//       showInputError(validConfig, formElement, inputElement, inputElement.validationMessage);
//     } else {
//       hideInputError(validConfig, formElement, inputElement);
//     }
// };

// // Функция для добавления обработчиков событий на все поля формы //

// const setEventListeners = (validConfig, formElement) => {
//     const inputList = Array.from(formElement.querySelectorAll(validConfig.inputSelector));
//     const buttonElement = formElement.querySelector(validConfig.submitButtonSelector);

//     toggleButtonState(validConfig, inputList, buttonElement);

//     formElement.addEventListener('submit', (evt) => {
//         evt.preventDefault();
//         formElement.reset();
//         toggleButtonState(validConfig, inputList, buttonElement);
//     });

//     inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', function () {
//         checkValidity(validConfig, formElement, inputElement);
//         toggleButtonState(validConfig, inputList, buttonElement);
//       });
//     });
// };

// const enableValidation = (validConfig) => {
//     const formsList = Array.from(document.querySelectorAll(validConfig.formsSelector));

//     formsList.forEach((formElement) => {
//         setEventListeners(validConfig, formElement);
//     });
// };



