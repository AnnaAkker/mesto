import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image-full');
        this._popupImageSignature = this._popup.querySelector('.popup__image-signature');
    };

    open = (cardData) => {
        this._popupImage.src = cardData.link;
        this._popupImage.alt = cardData.title;
        this._popupImageSignature.textContent = cardData.title;
        super.open()
    };
};