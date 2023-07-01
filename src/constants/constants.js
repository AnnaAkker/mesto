// // Массив карточек //

// const Лестница = new URL('../images/Photo/jack-dong-G9TVFHePumE-unsplash.jpg', import.meta.url);
// const Вид_с_берега = new URL('../images/Photo/kevin-charit-W2MjH-G_lWY-unsplash.jpg', import.meta.url);
// const Монохромпейзаж = new URL('../images/Photo/lesia-cvh_ynQLHho-unsplash.jpg', import.meta.url);
// const Станцияметро = new URL('../images/Photo/markus-spiske-hMAXV7GGe48-unsplash.jpg', import.meta.url);
// const Городскойпейзаж = new URL('../images/Photo/pascal-meier-zwW0p5WQWjA-unsplash.jpg', import.meta.url);
// const Велосипеднаберегу = new URL('../images/Photo/rodrigo-rodrigues-wolf-r-t-naIVVvYbDzU-unsplash.jpg', import.meta.url);


// const initialCards = [
//     { title: 'Лестница', link: Лестница },

//     { title: 'Вид с берега', link: Вид_с_берега },

//     { title: 'Монохром пейзаж', link: Монохромпейзаж },

//     { title: 'Станция метро', link: Станцияметро },

//     { title: 'Городской пейзаж', link: Городскойпейзаж },
    
//     { title: 'Велосипед на берегу', link: Велосипеднаберегу }
// ];

// Константы //

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

const popupProfileSelector = '.popup_edit-profile';
const popupImageSelector = '.popup_open-images';
const popupCardSelector = '.popup_add-card';
const popupImageEditSelector = '.popup_edit-image';

// Объекты валидации //

const infoConfig = {
    profileNameSelector: '.profile__name',
    profileSubtitleSelector: '.profile__subtitle',
    profileImage: '.profile__image'
};

const validConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    disabledButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error'
};

export {
    // initialCards,
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
    infoConfig,
    validConfig
};
