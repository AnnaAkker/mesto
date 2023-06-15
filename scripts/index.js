import FormValidator from './FormValidator.js';
import initialCards from './constants.js'
import Card from './Card.js';

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

// Валидация форм //

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

// Функция закрытия попапа при нажатии на клавишу Escape //

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// Общая функция открытия попапов //

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

// Общая функция закрытия попапов //

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}

// Закрытие попапа при клике на крестик //

closeButtonList.forEach((button) => {
  const popupClose = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popupClose);
  });
});

// Функция закрытия попапа при клике вне формы //

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget.closest('.popup')) {
    closePopup(evt.currentTarget);
  }
}

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
  const cardElement = createCardElement(infoCardPopup);
  addCardToContainer(cardElement);
  closePopup(cardPopup);
  evt.target.reset();
});

function createCardElement(cardsData) {
  const card = new Card(cardsData, cardTemplateSelector, photoImagePopup, signatureImagePopup, openPopup, imagePopup);
  return card.generateCard();
}

function addCardToContainer(cardElement) {
  elementsCards.prepend(cardElement);
}

// Подключение начальных карточек //

initialCards.forEach((item) => {
  const card = new Card(item, cardTemplateSelector, photoImagePopup, signatureImagePopup, openPopup, imagePopup);
  const cardElement = card.generateCard();
  elementsCards.prepend(cardElement);
});

// Закрытие попапов при клике вне формы //

popupList.forEach((popup) => popup.addEventListener('click', closePopupOverlay));