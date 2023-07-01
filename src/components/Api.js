export default class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    };

    _checkRes(res) {return res.ok ? res.json() : Promise.reject}

    getInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkRes)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkRes)
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
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
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',  
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.image,
            })
        })
        .then(this._checkRes);
    }

    addCards(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',  
            headers: this._headers,
            body: JSON.stringify({
                name: data.title,
                link: data.link,
            })
        })
        .then(this._checkRes);
    }

    addLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: `PUT`,
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkRes);
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: `DELETE`,
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkRes);
    }
}