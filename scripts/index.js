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
  subtitleInputProfilePopup.value =  subtitleProfile.textContent;
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
  photoImagePopup.src =  item.link;
  photoImagePopup.alt =  item.name;
  signatureImagePopup.textContent =  item.name;
  openPopup(imagePopup);
};

// Слушатель открытия фото //
  
function addImageClickListener(image, item) {
  image.addEventListener('click', () => openImage(item));
};

// Подключение карточек //

initialCards.forEach((item) => {
  const card = new Card(item, cardTemplateSelector, photoImagePopup, signatureImagePopup);
  const cardElement = card.generateCard();
  elementsCards.append(cardElement);
  const imageCardItem = cardElement.querySelector('.elements__image');
  addImageClickListener(imageCardItem, item);
});

popupList.forEach(element => element.addEventListener('click', closePopupOverlay));