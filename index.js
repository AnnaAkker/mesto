import FormValidator from './scripts/components/FormValidator.js';
import initialCards from './scripts/utils/constants.js';
import Card from './scripts/components/Card.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import Section from './scripts/components/Section.js';

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
const popupImageSelector = '.popup_open-images';

const elementsList = '.elements';

const validConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  disabledButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error',
};

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

// const formValidatorProfilePopup = new FormValidator(validConfig, formProfilePopup);
// formValidatorProfilePopup.enableValidation();

// const formValidatorCardPopup = new FormValidator(validConfig, cardPopupForm);
// formValidatorCardPopup.enableValidation();


editButtonProfilePopup.addEventListener('click', () => {
  nameInputProfilePopup.value = nameProfile.textContent;
  subtitleInputProfilePopup.value = subtitleProfile.textContent;
  // open(profilePopup);
});

formProfilePopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInputProfilePopup.value;
  subtitleProfile.textContent = subtitleInputProfilePopup.value;
  // close(profilePopup);
});

addCardButton.addEventListener('click', () => {
  openPopup(cardPopup);
});

cardPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const infoCardPopup = { name: titleCardPopup.value, link: urlCardPopup.value };
  const cardElement = createCardElement(infoCardPopup);
  addCardToContainer(cardElement);
  closePopup(cardPopup);
  evt.target.reset();
});

// function createCardElement(cardsData) {
//   const card = new Card(
//     cardsData,
//     cardTemplateSelector,
//     photoImagePopup,
//     signatureImagePopup,
//     // openPopup,
//     imagePopup
//   );
//   return card.generateCard();
// }

// function addCardToContainer(cardElement) {
//   elementsCards.prepend(cardElement);
// }

// initialCards.forEach((item) => {
//   const cardElement = createCardElement(item);
//   addCardToContainer(cardElement);
// });
