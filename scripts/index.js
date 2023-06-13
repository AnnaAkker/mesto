import initialCards from './constants.js';
import Card from './Сard.js';

const popupList = document.querySelectorAll('.popup');

const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const subtitleProfile = profile.querySelector('.profile__subtitle');

const closeButtonList = document.querySelectorAll('.popup__button-close');

const addCardButton = document.querySelector('.profile__button-add');

const profilePopup = document.querySelector('.popup_edit-profile');
const editButtonProfilePopup = document.querySelector('.profile__button-edit');
const formProfilePopup = profilePopup.querySelector('.popup__form');
const nameInputProfilePopup = profilePopup.querySelector('.popup__input_type_name');
const subtitleInputProfilePopup = profilePopup.querySelector('.popup__input_type_subtitle');

const cardPopup = document.querySelector('.popup_add-card');
const cardPopupForm = cardPopup.querySelector('.popup__form');
const titleCardPopup = cardPopup.querySelector('.popup__input_type_title');
const urlCardPopup = cardPopup.querySelector('.popup__input_type_url');

const imagePopup = document.querySelector('.popup_open-images');
const photoImagePopup = document.querySelector('.popup__image-full');
const signatureImagePopup = document.querySelector('.popup__image-signature');

const elementsCards = document.querySelector('.elements');
const cardTemplateSelector = '#cards';

// Функция закрытия попапа на Escape //

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

// Общая функция открытия попапов //

function openPopup(popupList) {
  popupList.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
};

// Общая функция закрытия попапов //

function closePopup(popupList) {
  popupList.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
};

// Закрытие на крестик для всех попапов //

closeButtonList.forEach((element) => {
  const popupClose = element.closest('.popup');
  element.addEventListener('click', () => {
    closePopup(popupClose)
  });
});

// Функция закрытия попапа вне формы //

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget.closest('.popup')) {
    closePopup(evt.currentTarget);
  }
};

// Попап "Редактировать профиль" //

editButtonProfilePopup.addEventListener('click', () => {
  nameInputProfilePopup.value = nameProfile.textContent;
  subtitleInputProfilePopup.value = subtitleProfile.textContent;
  openPopup(profilePopup);
});

formProfilePopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInputProfilePopup.value;
  subtitleProfile.textContent = subtitleInputProfilePopup.value;
  closePopup(profilePopup);
});

// Кнопка "Добавить карточку" //

addCardButton.addEventListener('click', () => {
  openPopup(cardPopup);
});

// Форма для добавления карточек //

cardPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const infoCardPopup = { name: titleCardPopup.value, link: urlCardPopup.value };
  const card = new Card(infoCardPopup, cardTemplateSelector, photoImagePopup, signatureImagePopup);
  const cardElement = card.generateCard();
  elementsCards.prepend(cardElement);
  closePopup(cardPopup);
  evt.target.reset();
});

// Функция открытия фото //

function openImage(item) {
  photoImagePopup.src = item.link;
  photoImagePopup.alt = item.name;
  signatureImagePopup.textContent = item.name;
  openPopup(imagePopup);
}

// Слушатель открытия фото //
  
function addImageClickListener(image, item) {
  image.addEventListener('click', () => openImage(item));
}

// Подключение карточек //

initialCards.forEach((item) => {
  const card = new Card(item, cardTemplateSelector, photoImagePopup, signatureImagePopup);
  const cardElement = card.generateCard();
  elementsCards.append(cardElement);
  const imageCardItem = cardElement.querySelector('.elements__image');
  addImageClickListener(imageCardItem, item);
});

popupList.forEach(element => element.addEventListener('click', closePopupOverlay));

// const validConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit-button',
//   disabledButtonClass: 'popup__submit-button_disabled',
//   inputErrorClass: 'popup__input_invalid',
//   errorClass: 'popup__input-error'
// };

// const formValidator = new formValidatior(validConfig);
// formValidator.enableValidation();



// class formValidatior {
//   constructor(validConfig) {
//     this._formSelector = validConfig.formSelector;
//     this._inputSelector = validConfig.inputSelector;
//     this._submitButtonSelector = validConfig.submitButtonSelector;
//     this._disabledButtonClass = validConfig.disabledButtonClass;
//     this._inputErrorClass = validConfig.inputErrorClass;
//     this._errorClass = validConfig.errorClass;
//   };

//   _showInputError(formObject, inputObject, errorMessage) {
//     const errorElement = formObject.querySelector(.${inputObject.id}-error);
//     inputObject.classList.add(this._errorClass);
//     errorElement.textContent = errorMessage;
//     inputObject.classList.add(this._inputErrorClass);
//   };

//   _hideInputError(formObject, inputObject) {
//     const errorElement = formObject.querySelector(.${inputObject.id}-error);
//     inputObject.classList.remove(this._errorClass);
//     errorElement.textContent = '';
//     inputObject.classList.remove(this._inputErrorClass);
//   };

//   _checkInputValidity(formObject, inputObject) {
//     if (!inputObject.validity.valid) {
//     this._showInputError(formObject, inputObject, inputObject.validationMessage);
//     } else {
//     this._hideInputError(formObject, inputObject);
//     };
//   };

//   _toggleButtonState(formObject) {
//       const inputList = Array.from(formObject.querySelectorAll(this._inputSelector));
//       const buttonElement = formObject.querySelector(this._submitButtonSelector);
//       const hasInvalidInput = inputList.some((inputObject) => !inputObject.validity.valid);

//       buttonElement.disabled = hasInvalidInput;
//       buttonElement.classList.toggle(this._disabledButtonClass, hasInvalidInput);
//   };

//   _setEventListeners(formObject) {
//     const inputList = Array.from(formObject.querySelectorAll(this._inputSelector));
//     inputList.forEach((inputObject) => {
//       inputObject.addEventListener('input', () => {
//         this._checkInputValidity(formObject, inputObject);
//         this._toggleButtonState(formObject);
//       });
//     });
//   };

  
//   formObject.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     this._toggleButtonState(formObject);
//   });
  
//   enableValidation() {
//     const formsList = Array.from(document.querySelectorAll(this._formSelector));
//     formsList.forEach((formObject) => {
//     formObject.noValidate = true;
//     this._setEventListeners(formObject);
//     });
//   };
// };