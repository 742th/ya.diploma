export class MainApi {
  constructor({ url }) {
    this.url = url;
    this.head = {
      'Content-Type': 'application/json'
    }
  }

  signup(email, password, name) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this.head,
      body: JSON.stringify({
        email,
        password,
        name
      })
    })
    .then((res) => {
      if(!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch(err => console.log(err));
  }

  signin(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this.head,
      body: JSON.stringify({
        email,
        password,
      })
    })
    .then((res)=> {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch(err => console.log({err}));
  }

  getUserData(token) {
    return fetch(`${this.url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })
    .then((res)=> {
      if(!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch(err => console.log(err));
  }

  getArticles() {

  }

  createArticle() {

  }

  removeArticle() {

  }
}