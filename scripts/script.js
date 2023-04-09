const main = document.querySelector('.page');

const profile = main.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const subtitleProfile = profile.querySelector('.profile__subtitle');

const popup = main.querySelector('.popup');
const editProfileButton = document.querySelector('.profile__button-edit');
const closeProfileButton = document.querySelector('.popup__button-close');
const popupform = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const subtitleInput = document.querySelector('.popup__input_type_subtitle');

// Попап редактировать профиль //

function openEditePopup(popup) {
    popup.classList.add('popup_opened');
}
  
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
  
function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    subtitleProfile.textContent = subtitleInput.value;
    closePopup(popup);
}
  

popupform.addEventListener('submit', handleFormSubmit);

editProfileButton.addEventListener('click', function() {
    nameInput.value = nameProfile.textContent;
    subtitleInput.value = subtitleProfile.textContent;
    openEditePopup(popup);
});

closeProfileButton.addEventListener('click', function() {
    closePopup(popup);
});
