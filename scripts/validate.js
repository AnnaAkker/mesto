const validConfig = {
    formsSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error'
};

// Функция для проверки всех полей в форме //

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
};

// Функция для включения и отключения submit //

function toggleButtonState (validConfig, inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validConfig.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(validConfig.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

// Функция для показа ошибки валидации //

const showInputError = (validConfig, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
    inputElement.classList.add(validConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(validConfig.errorClass);
  }

// Функция для скрытия ошибки валидации //

const hideInputError = (validConfig, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validConfig.inputErrorClass);
    inputElement.classList.remove(validConfig.errorClass);
    errorElement.textContent = '';
};

// Функция для проверки валидности поля //

function checkValidity (validConfig, formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(validConfig, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(validConfig, formElement, inputElement);
    }
};

// Функция для добавления обработчиков событий на все поля формы //

const setEventListeners = (validConfig, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validConfig.inputSelector));
    const buttonElement = formElement.querySelector(validConfig.submitButtonSelector);

    toggleButtonState(validConfig, inputList, buttonElement);

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        formElement.reset();
        toggleButtonState(validConfig, inputList, buttonElement);
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkValidity(validConfig, formElement, inputElement);
        toggleButtonState(validConfig, inputList, buttonElement);
      });
    });
};

const enableValidation = (validConfig) => {
    const formsList = Array.from(document.querySelectorAll(validConfig.formsSelector));

    formsList.forEach((formElement) => {
        setEventListeners(validConfig, formElement);
    });
};



