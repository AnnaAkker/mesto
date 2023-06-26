import './index.css';

import FormValidator from '../components/FormValidator';
import initialCards from '../constants/constants.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

const addCardButton = document.querySelector('.profile__button-add');

const editButtonProfilePopup = document.querySelector('.profile__button-edit');
const profilePopup = document.querySelector('.popup_edit-profile');
const formProfilePopup = profilePopup.querySelector('.popup__form');

const cardPopup = document.querySelector('.popup_add-card');
const cardPopupForm = cardPopup.querySelector('.popup__form');
const titleCardPopup = cardPopup.querySelector('.popup__input_type_title');
const urlCardPopup = cardPopup.querySelector('.popup__input_type_link');

const elementsListsSelector = document.querySelector('.elements');
const cardTemplateSelector = '#cards';

const popupProfileSelector = '.popup_edit-profile';
const popupImageSelector = '.popup_open-images';
const popupCardSelector = '.popup_add-card';

const elementsList = '.elements';

const infoConfig = {
  profileNameSelector: '.profile__name',
  profileSubtitleSelector: '.profile__subtitle'
};

const validConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  disabledButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error'
};

const userInfo = new UserInfo(infoConfig)

const popupImage = new PopupWithImage(popupImageSelector);

const popupProfile = new PopupWithForm(popupProfileSelector, (dataUser) => { 
  userInfo.setUserInfo(dataUser) 
  popupProfile.close() 
});

const popupAddCard = new PopupWithForm(popupCardSelector, (data) => {
  section.addItem(data);
  popupAddCard.close();
});

const formValidatorProfilePopup = new FormValidator(validConfig, formProfilePopup);
formValidatorProfilePopup.enableValidation();

const formValidatorCardPopup = new FormValidator(validConfig, cardPopupForm);
formValidatorCardPopup.enableValidation();

const section = new Section({
  items: initialCards,
  renderer: (element) => {
    const card = new Card(element, cardTemplateSelector, popupImage.open);
    return card.generateCard();
  }
}, elementsList);

popupProfile.setEventListeners();
popupImage.setEventListeners();
popupAddCard.setEventListeners();

editButtonProfilePopup.addEventListener('click', () => {
  popupProfile.setInputValue(userInfo.getUserInfo());
  popupProfile.open()
});

addCardButton.addEventListener('click', () => {
  popupAddCard.open()
});

function createCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector, popupImage.open);
  return card.generateCard();
}

function addCardToContainer(cardElement) {
  document.querySelector(elementsList).prepend(cardElement);
}

cardPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const infoCardPopup = { title: titleCardPopup.value, link: urlCardPopup.value };
  const cardElement = createCard(infoCardPopup);
  addCardToContainer(cardElement);
  popupAddCard.close();
});

section.addCardArray();