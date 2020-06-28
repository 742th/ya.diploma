export class NewsApi {
  constructor({ baseUrl, key, headers}) {
    this.key = key;
    this.url = baseUrl;
    this.head = headers;
  }

  getNews (word, date) {
    return fetch(`${this.url}${word}${date}pageSize=100${this.key}`, {
      headers: this.head
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Ошибка запроса')
        }
        return res.json();
      })
  }
}