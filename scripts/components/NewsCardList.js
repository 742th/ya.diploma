export class NewsCardList {
  constructor (showButton, container, months) {
    this.button = showButton;
    this.container = container;
    this.months = months;
    this.cardList = [];
    this.current = 3;
    this.overCurrent = 5;
  }

  renderResults (arr) {
    this._clear();
    this.cardList = arr.articles;
    for (let i = 0; i <= 2; i++) {
      this.addCard(arr.articles[i].urlToImage,
        arr.articles[i].title,
        arr.articles[i].publishedAt,
        arr.articles[i].description,
        arr.articles[i].source.name);
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

  renderLoader () {

  }

  renderError() {

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
        this.cardList[this.current].source.name);
    }
    return this.overCurrent += 3;
  }

  addCard(url, title, date, text, edition) {
    const parseDate = date.slice(0, -10);
    const year = parseDate.slice(0, 4);
    const month = parseInt(parseDate.slice(6, 7) - 1);
    const day = parseDate.slice(8, 10);
    const parsed = day + ' ' + this.months[month] + ',' + ' ' + year;

    return this.container.insertAdjacentHTML('beforeend',
    `
      <div class="card">
        <img class="card__img" src="${url}" alt="card-img">

        <button class="card__button-flag"></button>
        <div class="card__container">
          <p class="card__date">${parsed}</p>
          <h3 class="card__title">${title}</h3>
          <p class="card__text">${text}</p>
          <p class="card__edition">${edition}</p>
        </div>
      </div>
    `);
  }
}