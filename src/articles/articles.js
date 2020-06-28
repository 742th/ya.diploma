import './articles.css';
import '../../vendor/fonts.css';


import {MainApi} from '../../scripts/api/MainApi.js';
import {NewsCardList} from '../../scripts/components/NewsCardList.js';
import {
  RESULT_BOX,
  SERVER_URL,
  MONTHS,
  BUTTON_MORE,
  EXIT_BUTTON,
  ARTICLES_TEXT,
  ARTICLES_VALUE,
  MOBILE_MENU,
  BUTTON_OPEN_MOBILE,
  BUTTON_CLOSE_MOBILE,
  MOBILE_EXIT,

} from '../../scripts/consts.js';

const articlesList = new NewsCardList (BUTTON_MORE, RESULT_BOX, MONTHS);
const articlesMainApi = new MainApi ({
  url: SERVER_URL
});

RESULT_BOX.addEventListener('click', (e) => {
  if (e.target.classList.value === 'card__button-flag' && localStorage.getItem('token')) {
    articlesMainApi.removeArticle(e.target.id)
      .then((res) => {
        RESULT_BOX.removeChild(e.target.offsetParent);
      })
      .catch(e => console.log(e));
  }
});

BUTTON_OPEN_MOBILE.addEventListener('click', (e) => {
  MOBILE_MENU.classList.add('active');
});

BUTTON_CLOSE_MOBILE.addEventListener('click', (e) => {
  MOBILE_MENU.classList.remove('active');
});

MOBILE_EXIT.addEventListener('click', (e) => {
  localStorage.removeItem('token');
  window.location.href= './index.html';
});

EXIT_BUTTON.addEventListener('click', (e) => {
  localStorage.removeItem('token');
  window.location.href= './index.html';
});

if (localStorage.getItem('token')) {
  articlesMainApi.getUserData(localStorage.getItem('token'))
    .then((data) => {
      if (!data) return;
      EXIT_BUTTON.textContent = data.name;
      EXIT_BUTTON.insertAdjacentHTML('beforeend', '<img class="header__img" src="./images/logout_black.png" alt="logout"></img>');
      MOBILE_EXIT.textContent = data.name;
      MOBILE_EXIT.insertAdjacentHTML('beforeend', '<img class="header__img" src="./images/logout_white.png" alt="logout"></img>');
    })
    .catch(e => console.log(e));

    articlesMainApi.getArticles()
      .then((arr) => {
        articlesList.renderArticles(arr);
        const name = EXIT_BUTTON.textContent.slice(0, 1).toUpperCase() + EXIT_BUTTON.textContent.slice(1);
        ARTICLES_VALUE.textContent = `${name}, у вас ${arr.length} сохранённых статей`;
        const words = articlesList.getKeywords();
        switch (arr.length) {
          case 0:
            ARTICLES_TEXT.childNodes.forEach(el => el.textContent = '');
            break;
          case 1:
            ARTICLES_VALUE.textContent = `${name}, у вас ${arr.length} сохранённая статья`;
            ARTICLES_TEXT.childNodes[3].textContent = `${words[0]}`;
            ARTICLES_TEXT.childNodes[5].textContent = ``;
            break;
          case 2:
            ARTICLES_VALUE.textContent = `${name}, у вас ${arr.length} сохранённых статьи`;
            ARTICLES_TEXT.childNodes[3].textContent = `${words[0]}`;
            ARTICLES_TEXT.childNodes[7].textContent = `${words[1]}`;
            break;
          default:
            ARTICLES_TEXT.childNodes[3].textContent = `${words[0]}, ${words[1]}`;
            ARTICLES_TEXT.childNodes[7].textContent = `${words.slice(2).length} другим`;

        }
      })
      .catch(e => console.log(e));
}