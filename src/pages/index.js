// Импорты //

import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import Api from '../components/Api.js';
import {
  initialCards,
  imagePopup,
  imageButtonEdit,
  editButtonProfilePopup,
  editImagePopup,
  editeImageForm,
  profilePopup,
  formProfilePopup,
  addCardButton,
  cardPopup,
  cardPopupForm,
  popupProfileSelector,
  popupImageSelector,
  popupCardSelector,
  popupImageEditSelector,
  PopupDeleteCardSelector,
  infoConfig,
  validConfig
} from '../constants/constants.js'

// Константы // 

const elementsList = '.elements';
const cardTemplateSelector = '#cards';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '0c57c3de-de42-467b-8dac-900fb3a946d3',
    'Content-Type': 'application/json'
  }
}); 

const userInfo = new UserInfo(infoConfig);

const popupImage = new PopupWithImage(popupImageSelector);

// Функция создания карточки//

function createCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector, popupImage.open, deleteCardPopup.open, (likeItem, cardId) => {
    if (likeItem.classList.contains('elements__like-button_active')) {
      api.deleteLike(cardId)
        .then(res => {
          card.toggleLikes(res.likes);
        })
    } else {
      api.addLike(cardId)
        .then(res => {
          card.toggleLikes(res.likes)
        })
        .catch((error => console.error(`Ошибка добавления лайка ${error}`)))
    }
  });
  return card.generateCard();
}

const section = new Section((cardData) => {
  section.addItemAppend(createCard(cardData));
}, elementsList);


const popupProfile = new PopupWithForm(popupProfileSelector, (dataUser) => {
  api.setUserInfo(dataUser)
    .then(res => {
    userInfo.setUserInfo( {username: res.name, subtitle: res.about, image: res.avatar} )
    popupProfile.close();
  })
  .catch((error => console.error(`Ошибка редактирования ${error}`)))
  .finally()
});

const popupAddCard = new PopupWithForm(popupCardSelector, (data) => {
  Promise.all([api.getInfo(), api.addCards(data)])
    .then(([dataUser, dataCard]) => {
      dataCard.myId = dataUser._id;
      section.addItemPrepend(createCard(element))
      popupAddCard.close();
  })
  .catch((error => console.error(`Ошибка создания карточки ${error}`)))
  .finally()
  popupAddCard.close()
});

const popupEditImage = new PopupWithForm(popupImageEditSelector, (data) => {
  api.setAvatar(data)
    .then(res => {
      console.log(res);
      userInfo.setUserInfo({ username: res.name, subtitle: res.about, image: res.avatar });
    })
    .catch(error => console.error(`Ошибка редактирования аватара ${error}`))
    .finally(() => {
    });
    popupEditImage.close()
});


const formValidatorProfilePopup = new FormValidator(validConfig, formProfilePopup);
formValidatorProfilePopup.enableValidation();

const formValidatorCardPopup = new FormValidator(validConfig, cardPopupForm);
formValidatorCardPopup.enableValidation();

const formValidatorEditImage = new FormValidator(validConfig, editeImageForm);
formValidatorEditImage.enableValidation();

// Слушатели//

popupProfile.setEventListeners();
popupImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditImage.setEventListeners();

// Редактирование профиля//

editButtonProfilePopup.addEventListener('click', () => {
  formValidatorProfilePopup.resetError();
  popupProfile.setInputValue(userInfo.getUserInfo());
  popupProfile.open();
});

// Редактироания изображения профиля //

imageButtonEdit.addEventListener('click', () => {
  formValidatorEditImage.resetError();
  popupEditImage.open()
});

// Добавление карточки //

addCardButton.addEventListener('click', () => {
  formValidatorCardPopup.resetError();
  popupAddCard.open();
});

// Удаление карточки // 

const deleteCardPopup = new PopupDeleteCard(PopupDeleteCardSelector, (element) => {
  element.removeCard();
  deleteCardPopup.close()
});

deleteCardPopup.setEventListeners()


Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach(element => element.myid = dataUser._id);
    userInfo.setUserInfo({ username: dataUser.name, subtitle: dataUser.about, image: dataUser.avatar })
    section.addCardArray(dataCard)
  })
  .catch((error) => console.error(`Ошибка создания ${error}`))
