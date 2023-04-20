const main = document.querySelector('.page');

const profile = main.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const subtitleProfile = profile.querySelector('.profile__subtitle');
const addCardButton = profile.querySelector('.profile__button-add');
const popup = main.querySelector('.popup');

const EditePopup = document.querySelector('.popup_edit-profile');
const editProfileButton = document.querySelector('.profile__button-edit');
const closeButton = EditePopup.querySelector('.popup__button-close');
const popupform = EditePopup.querySelector('.popup__form');

const nameInput = EditePopup.querySelector('.popup__input_type_name');
const subtitleInput = EditePopup.querySelector('.popup__input_type_subtitle');

const CardPopup = document.querySelector('.popup_add-card');
const cardPopupForm = CardPopup.querySelector('.popup__form');
const titleCardPopup = CardPopup.querySelector('.popup__input_type_description-title');
const urlCardPopup = CardPopup.querySelector('.popup__input_type-url');
const closeCardButton = CardPopup.querySelector('.popup__button-close');

// Массив карточек //

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 



// Попап "Редактировать профиль" //

function openEditePopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    subtitleProfile.textContent = subtitleInput.value;
    closePopup(EditePopup);
}

popupform.addEventListener('submit', handleEditFormSubmit);

editProfileButton.addEventListener('click', function() {
    nameInput.value = nameProfile.textContent;
    subtitleInput.value = subtitleProfile.textContent;
    openEditePopup(EditePopup);
});

closeButton.addEventListener('click', function() {
    closePopup(EditePopup);
});


// Попап "Добавить карточку" //

function openCardPopup(popup) {
    popup.classList.add('popup_opened');
}

function closeCardPopup(popup) {
    popup.classList.remove('popup_opened');
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    
    const newCard = createCard(titleCardPopup.value, urlCardPopup.value);
    const cardsList = document.querySelector('.cards__list');
    cardsList.prepend(newCard);
    closeCardPopup(CardPopup);
}

cardPopupForm.addEventListener('submit', handleCardFormSubmit);

addCardButton.addEventListener('click', function() {
    openCardPopup(CardPopup);
});

closeCardButton.addEventListener('click', function() {
    closeCardPopup(CardPopup);
});

