export default class UserInfo {
    constructor (infoConfig) {
        this._profileName = document.querySelector(infoConfig.profileNameSelector);
        this._profileSubtitle = document.querySelector(infoConfig.profileSubtitleSelector);
        this._profileImage = document.querySelector(infoConfig.profileImage);
    };

    getUserInfo() {
        return {username: this._profileName.textContent, subtitle: this._profileSubtitle.textContent}
    };

    setUserInfo({username, subtitle, image}) {
        this._profileImage.src = image;
        this._profileName.textContent = username;
        this._profileSubtitle.textContent = subtitle;
    };
}