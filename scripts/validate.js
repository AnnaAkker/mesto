const validConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    disabledButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input_error'
};

// Валидность инпутов //

const hasInvalidInput = (inputList) => {
  return inputList.some((inputObject) => {
    return !inputObject.validity.valid;
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

// Показ ошибки //

const showInputError = (validConfig, formObject, inputObject, errorMessage) => {
  const errorElement = formObject.querySelector(`.${inputObject.id}-error`);
  inputObject.classList.add(validConfig.errorClass);
  errorElement.textContent = errorMessage;
  inputObject.classList.add(validConfig.inputErrorClass);
};

// Скрытие ошибки // 

const hideInputError = (validConfig, formObject, inputObject) => {
  const errorElement = formObject.querySelector(`.${inputObject.id}-error`);
  inputObject.classList.remove(validConfig.errorClass);
  errorElement.textContent = '';
  inputObject.classList.remove(validConfig.inputErrorClass);
};

// Валидность //

const isValid = (validConfig, formObject, inputObject, inputList, buttonElement) => {
  if (!inputObject.validity.valid) {
    showInputError(validConfig, formObject, inputObject, inputObject.validationMessage);
  } else { 
    hideInputError(validConfig, formObject, inputObject);
  };

  inputList.forEach((inputObject) => {
    inputObject.addEventListener('input', function () {
      isValid(validConfig, formObject, inputObject, inputList, buttonElement);
      toggleButtonState(validConfig, inputList, buttonElement);
    });
  });
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
      isValid(validConfig, formObject, inputObject, inputList, buttonElement);
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