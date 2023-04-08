const main = document.querySelector('.page');

const profile = main.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const subtitleProfile = profile.querySelector('.profile__subtitle');

const elements = document.querySelector('.elements');
const likeButtons = elements.querySelectorAll('.elements__like-button');

const popup = main.querySelector('.popup');
const editProfile = document.querySelector('.popup-profile');
const editProfileButton = document.querySelector('.profile__button-edit');
const closeProfileButton = document.querySelector('.popup__button-close');
const popupform = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const subtitleInput = document.querySelector('.popup__input_type_subtitle');

// Попап редактировать профиль //

function openEditePopup(popup) {
    popup.classList.add('popup__opened');
}
  
function closePopup(popup) {
    popup.classList.remove('popup__opened');
}
  
function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    subtitleProfile.textContent = subtitleInput.value;
    closePopup(editProfile);
}
  
function addEventListeners() {
    popupform.addEventListener('submit', handleFormSubmit);
  
    editProfileButton.addEventListener('click', function() {
      nameInput.value = nameProfile.textContent;
      subtitleInput.value = subtitleProfile.textContent;
      openEditePopup(editProfile);
    });
  
    closeProfileButton.addEventListener('click', function() {
      closePopup(editProfile);
    });
}
  
addEventListeners();

// Кнопка нажатия на сердечко//

function toggleLikeButton(event) {
    event.target.classList.toggle('elements__like-button_active');
}
  
likeButtons.forEach(function(button) {
    button.addEventListener('click', toggleLikeButton);
});
