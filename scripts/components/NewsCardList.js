export class NewsCardList {
  constructor (showButton, container, months) {
    this.button = showButton;
    this.container = container;
    this.months = months;
    this.cardList = [];
    this.current = 3;
    this.overCurrent = 5;
    this.keywords = [];
  }

  renderResults (arr, key) {
    this._clear();
    this.cardList = arr.articles;
    this.cardList.key = key;
    for (let i = 0; i <= 2; i++) {
      this.addCard(arr.articles[i].urlToImage,
        arr.articles[i].title,
        arr.articles[i].publishedAt,
        arr.articles[i].description,
        arr.articles[i].source.name,
        arr.articles[i].url,
        key);
    }
  }

  _clear() {
    this.cardList = [];
    this.current = 3;
    this.overCurrent = 5;
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  getArr() {
    return this.cardList;
  }

  showMore() {
    if (this.overCurrent >= this.cardList.length) {
      this.button.getAttribute('disabled', true);
      return;
    }
    for (this.current; this.current <= this.overCurrent; this.current++) {
      this.addCard( this.cardList[this.current].urlToImage,
        this.cardList[this.current].title,
        this.cardList[this.current].publishedAt,
        this.cardList[this.current].description,
        this.cardList[this.current].source.name,
        this.cardList[this.current].url,
        this.cardList.key);
    }
    return this.overCurrent += 3;
  }

  _dateParse (date) {
    const parseDate = date.slice(0, -10);
    const year = parseDate.slice(0, 4);
    const month = parseInt(parseDate.slice(6, 7) - 1);
    const day = parseDate.slice(8, 10);
    const parsed = day + ' ' + this.months[month] + ',' + ' ' + year;

    return parsed;
  }

  addCard(urlImg, title, date, text, edition, url, key) {
    const card = document.createElement('div');
    this.container.appendChild(card);
    card.classList.add('card');
    card.insertAdjacentHTML("afterbegin",'<button class="card__button-flag"></button>');
    const el = document.createElement('a');
    card.appendChild(el);
    el.classList.add('card');
    el.setAttribute('href', url);
    el.setAttribute('name', key);
    el.setAttribute('target', '_blank');

    return el.insertAdjacentHTML('beforeend',
      `
          <img class="card__img" src="${urlImg}" alt="card-img">
          <div class="card__container">
            <p class="card__date">${this._dateParse(date)}</p>
            <h3 class="card__title">${title}</h3>
            <p class="card__text">${text}</p>
            <p class="card__edition">${edition}</p>
          </div>
      `);
  }

  addArticles (urlImg, title, date, text, edition, url, key, id) {
    const card = document.createElement('div');
    this.container.appendChild(card);
    card.classList.add('card');
    card.insertAdjacentHTML("afterbegin",`<button class="card__button-flag" id="${id}"></button>`);
    card.insertAdjacentHTML("afterbegin",`<div class="card__keyword">${key}</div>`);
    const el = document.createElement('a');
    card.appendChild(el);
    el.classList.add('card');
    el.setAttribute('href', url);
    el.setAttribute('target', '_blank');

    return el.insertAdjacentHTML('beforeend',
      `
          <img class="card__img" src="${urlImg}" alt="card-img">
          <div class="card__container">
            <p class="card__date">${this._dateParse(date)}</p>
            <h3 class="card__title">${title}</h3>
            <p class="card__text">${text}</p>
            <p class="card__edition">${edition}</p>
          </div>
      `);
  }

  renderArticles (arr) {
    for (const el of arr) {
      if (!this.keywords.includes(el.keyword)) {
        this.keywords.push(el.keyword);
      }
      this.addArticles(el.image, el.title, el.date, el.text, el.source, el.link, el.keyword, el._id);
    }
  }

  getKeywords() {
    return this.keywords;
  }
}