export default class UserInfo {
    constructor (infoConfig) {
        this._profileName = document.querySelector(infoConfig.profileNameSelector);
        this._profileSubtitle = document.querySelector(infoConfig.profileSubtitleSelector);
    };

    getUserInfo() {
        return {username: this._profileName.textContent, subtitle: this._profileSubtitle.textContent}
    };

    setUserInfo(dataUser) {
        this._profileName.textContent = dataUser.name;
        this._profileSubtitle.textContent = dataUser.subtitle;
    };
}