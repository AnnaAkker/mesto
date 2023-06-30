export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    };

    _checkRes(res) {return res.ok ? res.json() : Promise.reject}

    getInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkRes)
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkRes)
    }

    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.username,
                about: data.subtitle,
            })
        })
        .then(this._checkRes);
    }

    setAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',  
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.image,
            })
        })
        .then(this._checkRes);
    }

    addCards(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',  
            headers: this._headers,
            body: JSON.stringify({
                name: data.title,
                link: data.link,
            })
        })
        .then(this._checkRes);
    }
}