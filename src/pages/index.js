import './index.css';

import initialCards from '../constants/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';


const imagePopup = document.querySelector('.profile__image');
const imageButtonEdit = document.querySelector('.profile__image-overlay');

const editButtonProfilePopup = document.querySelector('.profile__button-edit');
const editImagePopup = document.querySelector('.popup_edit-image');
const editeImageForm = editImagePopup.querySelector('.popup__form');

const profilePopup = document.querySelector('.popup_edit-profile');
const formProfilePopup = profilePopup.querySelector('.popup__form');

const addCardButton = document.querySelector('.profile__button-add');
const cardPopup = document.querySelector('.popup_add-card');
const cardPopupForm = cardPopup.querySelector('.popup__form');


const elementsList = '.elements';
const elementsListSelector = '.elements';
const cardTemplateSelector = '#cards';

const popupProfileSelector = '.popup_edit-profile';
const popupImageSelector = '.popup_open-images';
const popupCardSelector = '.popup_add-card';
const popupImageEditSelector = '.popup_edit-image';
const PopupDeleteCardSelector = '.card_delete';

const infoConfig = {
  profileNameSelector: '.profile__name',
  profileSubtitleSelector: '.profile__subtitle'
};

const validConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  disabledButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error'
};

const userInfo = new UserInfo(infoConfig);

const popupImage = new PopupWithImage(popupImageSelector);

const popupProfile = new PopupWithForm(popupProfileSelector, (dataUser) => {
  userInfo.setUserInfo(dataUser);
  popupProfile.close();
});

const popupAddCard = new PopupWithForm(popupCardSelector, (data) => {
  const cardElement = createCard(data);
  section.addItem(cardElement);
  popupAddCard.close();
});

const popupEditImage = new PopupWithForm(popupImageEditSelector, (data) => {
  imagePopup.src = data.image;
  popupEditImage.close()
});


const formValidatorProfilePopup = new FormValidator(validConfig, formProfilePopup);
formValidatorProfilePopup.enableValidation();

const formValidatorCardPopup = new FormValidator(validConfig, cardPopupForm);
formValidatorCardPopup.enableValidation();

const formValidatorEditImage = new FormValidator(validConfig, editeImageForm);
formValidatorEditImage.enableValidation();

const section = new Section( {
    items: initialCards,
    renderer: (element) => {
      const cardElement = createCard(element);
      return cardElement;
    },
  }, elementsList
);

popupProfile.setEventListeners();
popupImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditImage.setEventListeners();

editButtonProfilePopup.addEventListener('click', () => {
  formValidatorProfilePopup.resetError();
  popupProfile.setInputValue(userInfo.getUserInfo());
  popupProfile.open();
});

addCardButton.addEventListener('click', () => {
  formValidatorCardPopup.resetError();
  popupAddCard.open();
});

imageButtonEdit.addEventListener('click', () => {
  formValidatorEditImage.resetError();
  popupEditImage.open()
});

const deleteCardPopup = new PopupDeleteCard(PopupDeleteCardSelector, (element) => {
  element.removeCard();
  deleteCardPopup.close()
});

deleteCardPopup.setEventListeners()

function createCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector, popupImage.open, deleteCardPopup.open);
  return card.generateCard();
}

section.addCardArray();
