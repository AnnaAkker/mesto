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
const titleCardPopup = cardPopup.querySelector('.popup__input_type_description_title');
const urlCardPopup = cardPopup.querySelector('.popup__input_type_url');

const imagePopup = document.querySelector('.popup_open-images');
const photoImagePopup = document.querySelector('.popup__image-full');
const signatureImagePopup = document.querySelector('.popup__image-signature');

const cards = document.querySelector('#cards').content;
const elementsCards = document.querySelector('.elements');

// Массив карточек //

const initialCards = [
    {
      name: 'Лестница',
      link: './images/Photo/jack-dong-G9TVFHePumE-unsplash.jpg'
    },
    {
      name: 'Вид с берега',
      link: './images/Photo/kevin-charit-W2MjH-G_lWY-unsplash.jpg'
    },
    {
      name: 'Монохром пейзаж',
      link: './images/Photo/lesia-cvh_ynQLHho-unsplash.jpg'
    },
    {
      name: 'Станция метро',
      link: './images/Photo/markus-spiske-hMAXV7GGe48-unsplash.jpg'
    },
    {
      name: 'Городской пейзаж',
      link: './images/Photo/pascal-meier-zwW0p5WQWjA-unsplash.jpg'
    },
    {
      name: 'Велосипед на берегу',
      link: './images/Photo/rodrigo-rodrigues-wolf-r-t-naIVVvYbDzU-unsplash.jpg'
    }
]; 

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
  const infoCardPopup = {name: titleCardPopup.value, link: urlCardPopup.value};
  elementsCards.prepend(createCard(infoCardPopup));
  closePopup(cardPopup);
  evt.target.reset();
});

// Создание карточек // 

function createCard(item) {
  const cardItem = cards.querySelector('.elements__card').cloneNode(true);
  const trashButtonCardItem = cardItem.querySelector('.elements__trash-button');
  const imageCardItem = cardItem.querySelector('.elements__image');
  const likeButtonCardItem = cardItem.querySelector('.elements__like-button');
  imageCardItem.src = item.link;
  imageCardItem.alt = item.name;
  cardItem.querySelector('.elements__description-title').textContent = item.name;

  // Кнопка удаления карточки //

  trashButtonCardItem.addEventListener('click', (evt) => evt.target.closest('.elements__card').remove());

  // Кнопка лайка //

  likeButtonCardItem.addEventListener('click', () => likeButtonCardItem.classList.toggle('elements__like-button_active'));
  
  // Увеличение фото //

  imageCardItem.addEventListener('click', () => {
    photoImagePopup.src =  item.link;
    photoImagePopup.alt =  item.name;
    signatureImagePopup.textContent =  item.name;
    openPopup(imagePopup);
  });

  return cardItem;
};

// Подключение карточек //

initialCards.forEach((item) => {
  const card = createCard(item);
  elementsCards.append(card);
});

popupList.forEach(element => element.addEventListener('click', closePopupOverlay));

enableValidation(validConfig);