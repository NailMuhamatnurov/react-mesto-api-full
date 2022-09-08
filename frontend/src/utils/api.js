class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._userUrl = `${this._baseUrl}/users/me`;
        this._cardsUrl = `${this._baseUrl}/cards`;
        this._token = headers['authorization'];
    }

    handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(this._cardsUrl, {
            headers: {
                authorization: this._token,
            },
            credentials: 'include',
        })
        .then(res => {
            if(res.ok) {
                const infa = res.json();  
                return infa;
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getUserData() {
        return fetch(this._userUrl, {
            headers: {
                authorization: this._token,
            },
            credentials: 'include',
        })
        .then(res => {
            return this.handleResponse(res);
        })
    }

    changeAvatar(src) {
        return fetch(`${this._userUrl}/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                avatar: src
            })
            })
            .then(res => {
                return this.handleResponse(res);
            })
    }

    saveUserInfo({
        name,
        about
        }) {
        return fetch(this._userUrl, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name: name,
                about: about,
            })
            })
            .then(res => {
                return this.handleResponse(res);
          })
    }

    addNewCard({
        name,
        link
    }) {
        return fetch(this._cardsUrl, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name: name,
                link: link,
            })
            })
            .then(res => {
                return this.handleResponse(res);
            })
    }

    changeLikeCardStatus(cardId, isLiked){
        return fetch(`${this._cardsUrl}/${cardId}/likes`, {
            method: isLiked ? "PUT" : "DELETE",
            headers: {
                authorization: this._token,
            },
            credentials: 'include',
        })
        .then(res => {
            return this.handleResponse(res);
        })
    }

    deleteCard(cardId) {
        return fetch(`${this._cardsUrl}/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
            credentials: 'include',
        })
            .then(res => {
                return this.handleResponse(res);
            })
    }

}

const api = new Api({
    baseUrl: 'https://api.nailm.mesto.students.nomoredomains.sbs',
    headers: {
        'Content-Type': 'application/json'
    },
  });

export default api;