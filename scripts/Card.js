export default class Card {
  constructor(cardsData, templateSelector, photoImagePopup, signatureImagePopup, openPopup, imagePopup) {
    this._name = cardsData.name;
    this._link = cardsData.link;
    this._templateSelector = templateSelector;
    this._photoImagePopup = photoImagePopup;
    this._signatureImagePopup = signatureImagePopup;
    this._openPopup = openPopup;
    this._imagePopup = imagePopup;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    return cardTemplate.querySelector('.elements__card').cloneNode(true);
  }

  _handleDeleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeButton = () => {
    this._likeButton.classList.toggle('elements__like-button_active');
  }

  _handleImageClick = () => {
    this._photoImagePopup.src = this._link;
    this._photoImagePopup.alt = this._name;
    this._signatureImagePopup.textContent = this._name;
    this._openPopup(this._imagePopup);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeButton);
    this._trashButton.addEventListener('click', this._handleDeleteCard);
    this._imageElement.addEventListener('click', this._handleImageClick);
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._imageElement = this._cardElement.querySelector('.elements__image');
    this._titleElement = this._cardElement.querySelector('.elements__description-title');
    this._trashButton = this._cardElement.querySelector('.elements__trash-button');
    this._likeButton = this._cardElement.querySelector('.elements__like-button');

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
