export default class Card { 
  constructor(cardsData, cardTemplateSelector, photoImagePopup, openDeleteCardPopup) { 
    this._cardsData = cardsData;
    this._title = cardsData.title; 
    this._link = cardsData.link; 
    this._cardTemplateSelector = cardTemplateSelector; 
    this._photoImagePopup = photoImagePopup; 
    this._openDeleteCardPopup = openDeleteCardPopup
  };
 
  _getTemplate() { 
    return document.querySelector(this._cardTemplateSelector).content.querySelector('.elements__card').cloneNode(true);
  };
 
  _handleDeleteCard = () => { 
    this._openDeleteCardPopup(this)
  };
 
  _handleLikeButton = () => { 
    this._likeButton.classList.toggle('elements__like-button_active'); 
  };
 
  _handleImageClick = () => {  
    this._photoImagePopup(this._cardsData)
  };
 
  _setEventListeners() { 
    this._likeButton.addEventListener('click', this._handleLikeButton); 
    this._trashButton.addEventListener('click', this._handleDeleteCard); 
    this._imageElement.addEventListener('click', this._handleImageClick); 
  };

  removeCard() {
    this._cardElement.remove(); 
    this._cardElement = null;
  }

  generateCard() { 
    this._cardElement = this._getTemplate(); 
    this._imageElement = this._cardElement.querySelector('.elements__image'); 
    this._titleElement = this._cardElement.querySelector('.elements__description-title'); 
    this._trashButton = this._cardElement.querySelector('.elements__trash-button'); 
    this._likeButton = this._cardElement.querySelector('.elements__like-button'); 
 
    this._imageElement.src = this._link; 
    this._imageElement.alt = this._title; 
    this._titleElement.textContent = this._title; 
 
    this._setEventListeners(); 
 
    return this._cardElement; 
  };
} 
