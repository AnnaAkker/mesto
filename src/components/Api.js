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
}