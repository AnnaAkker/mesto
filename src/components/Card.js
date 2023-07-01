export default class Card { 
  constructor(cardData, cardTemplateSelector, photoImagePopup, deleteCardPopup, likesCheck) { 
    this._cardData = cardData;
    this._title = cardData.name;
    this._myId = cardData.myid;
    this._likes = cardData.likes;
    this._likesLength = cardData.likes.length;
    this._likesCheck = likesCheck;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._link = cardData.link; 
    this._cardTemplateSelector = cardTemplateSelector; 
    this._photoImagePopup = photoImagePopup; 
    this._deleteCardPopup = deleteCardPopup;
    this._cloneElementSelector = document.querySelector(this._cardTemplateSelector).content.querySelector('.elements__card').cloneNode(true);
    this._trashButton = this._cloneElementSelector.querySelector('.elements__trash-button'); 
    this._likeButton = this._cloneElementSelector.querySelector('.elements__like-button'); 
    this._counter =  this._cloneElementSelector.querySelector('.elements__counter');
  };
 
  _handleDeleteCard = () => { 
    this._deleteCardPopup(this)
  };
 
  _handleLikeButton = () => { 
    this._counterLike(this._likeButton, this._cardId) 
  };
 
  _handleImageClick = () => {  
    this._photoImagePopup(this._cardData)
  };
 
  _setEventListeners() { 
    this._likeButton.addEventListener('click', this._handleLikeButton); 
    this._trashButton.addEventListener('click', this._handleDeleteCard); 
    this._imageElement.addEventListener('click', this._handleImageClick); 
  };

  _checkVisTrashButton() {
    if (this._myId === this._ownerId) {
      this._trashButton.style.display = 'block';
    } else {
      this._trashButton.style.display = 'none';
    }
  }

  _counterLike() {
    this._likes.forEach(item => {
      if (item._id === this._myId) {
        this._likeButton.classList.toggle('elements__like-button_active')
        return
      }
    });
    this._counter.textContent = this._likesLength;
  }

  toggleLikes(likes) {
    this._likeButton.classList.toggle('elements__like-button_active');
    this._counter.textContent = likes.length;
  }

  removeCard() {
    this._cloneElementSelector.remove(); 
    this._cloneElementSelector = null;
  }

  generateCard() { 
    this._imageElement = this._cloneElementSelector.querySelector('.elements__image');
    this._titleElement = this._cloneElementSelector.querySelector('.elements__description-title');

    this._imageElement.src = this._link; 
    this._imageElement.alt = this._title; 
    this._titleElement.textContent = this._title; 

    this._counterLike()
    this._checkVisTrashButton(); 
    this._setEventListeners();
 
    return this._cloneElementSelector; 
  };
}
