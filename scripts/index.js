
const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const subtitleProfile = profile.querySelector('.profile__subtitle');


const popups = document.querySelector('.popup');
const closeButton = document.querySelectorAll('.popup__button-close');

const addCardButton = document.querySelector('.profile__button-add');

const EditeProfilePopup = document.querySelector('.popup_edit-profile');
const editProfileButton = document.querySelector('.profile__button-edit');
const popupProfileform = EditeProfilePopup.querySelector('.popup__form');
const nameInput = EditeProfilePopup.querySelector('.popup__input_type_name');
const subtitleInput = EditeProfilePopup.querySelector('.popup__input_type_subtitle');

const CardPopup = document.querySelector('.popup_add-card');
const cardPopupForm = CardPopup.querySelector('.popup__form');
const titleCardPopup = CardPopup.querySelector('.popup__input_type_description-title');
const urlCardPopup = CardPopup.querySelector('.popup__input_type-url');

const cardElements = document.querySelector('#cards').content;
const elementsCard = cardElements.querySelector('.elements__card');


console.log(elementsCard);

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


// Общая функция открытия Попапов //

function openPopup() {
  popups.classList.add('popup_opened');
}


// Общая функция закрытия Попапов //

function closePopup() {
  popups.classList.remove('popup_opened');
}


// Закрытие на крестик для всех Попапов //

closeButton.forEach((element) => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => {
    closePopup(popup)
  });
});


// Попап "Редактировать профиль" //


editProfileButton.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  subtitleInput.value =  subtitleProfile.textContent;
  openPopup(EditeProfilePopup);
});

popupProfileform.addEventListener('submit', (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  subtitleProfile.textContent = subtitleInput.value;
  closePopup(EditeProfilePopup);
});


addCardButton.addEventListener('click', () => {
  openPopup(CardPopup);
});



function createCard(item) {
  const cardItem = cardElements.querySelector('.elements__card').cloneNode(true);
  const trashElementsButton = cardItem.querySelector('.elements__trash-button');
  const imageElements = cardItem.querySelector('.elements__image');
  const likeElementsButton = cardItem.querySelector('.elements__like-button');

  imageElements.scr = item.link;
  imageElements.alt = item.name;
  cardItem.querySelector('.elements__description-title').textContent = item.name;

  // Кнопка удаления карточки //

  trashElementsButton.addEventListener('click', (evt) =>
  evt.target.closest('.elements__card').remove());

  // Кнопка лайка //

  likeElementsButton.addEventListener('click', (evt) =>
  evt.target.classList.toggle('.elements__like-button_active'));

  return cardItem;

}


// Подключение карточек //

// initialCards.forEach((object) => {
//   const card = createCard(object);
//   elementsCard.append(card);

// });

cardPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = {name: titleCardPopup.value, link: urlCardPopup.value};
  titleCardPopup.value = '';
  urlCardPopup.value = '';
  elementsCard.prepend(createCard(newCard));
  closePopup(CardPopup);
});


