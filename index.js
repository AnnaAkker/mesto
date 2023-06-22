import FormValidator from './scripts/components/FormValidator.js';
import initialCards from './scripts/utils/constants.js';
import Card from './scripts/components/Card.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import Section from './scripts/components/Section.js';
import UserInfo from './scripts/components/UserInfo.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';

const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const subtitleProfile = profile.querySelector('.profile__subtitle');

const closeButtonList = document.querySelectorAll('.popup__button-close');

const addCardButton = document.querySelector('.profile__button-add');

const editButtonProfilePopup = document.querySelector('.profile__button-edit');
const profilePopup = document.querySelector('.popup_edit-profile');
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

const popupProfileSelector = '.popup_edit-profile';
const popupImageSelector = '.popup_open-images';
const popupCardSelector = '.popup_add-card';

const elementsList = '.elements';

const infoConfig = {
  profileNameSelector: '.profile__name',
  profileSubtitleSelector: '.profile__subtitle'
}

const validConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  disabledButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error',
};

const userInfo = new UserInfo(infoConfig)


const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const section = new Section({
  items: initialCards,
  renderer: (cardsData) => {
    const card = new Card( cardsData, cardTemplateSelector, photoImagePopup, signatureImagePopup, popupImage.open, imagePopup);
    return card.generateCard()
  }
}, elementsList);

section.addCardArray()

const popupProfile = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputValue())
  popupProfile.close()
});

popupProfile.setEventListeners();

const popupAddCard = new PopupWithForm(popupCardSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupAddCard.getInputValue()));
  popupAddCard.close();
});

popupAddCard.setEventListeners();

const formValidatorProfilePopup = new FormValidator(validConfig, formProfilePopup);
formValidatorProfilePopup.enableValidation();

const formValidatorCardPopup = new FormValidator(validConfig, cardPopupForm);
formValidatorCardPopup.enableValidation();


editButtonProfilePopup.addEventListener('click', () => {
  popupProfile.setInputValue(userInfo.getUserInfo());
  popupProfile.open()
});


addCardButton.addEventListener('click', () => {
  popupAddCard.open()
});

cardPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const infoCardPopup = { title: titleCardPopup.value, link: urlCardPopup.value };
  const cardElement = createCardElement(infoCardPopup);
  addCardToContainer(cardElement);
  closePopup(cardPopup);
  evt.target.reset();
});
