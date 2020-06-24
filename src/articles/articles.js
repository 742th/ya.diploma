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
  }
});

if (localStorage.getItem('token')) {
  articlesMainApi.getUserData(localStorage.getItem('token'))
    .then((data) => {
      if (!data) return;
      EXIT_BUTTON.textContent = data.name;
      EXIT_BUTTON.insertAdjacentHTML('beforeend', '<img class="header__img" src="./images/logout_black.png" alt="logout"></img>');
    });

    articlesMainApi.getArticles()
      .then((arr) => {
        articlesList.renderArticles(arr);
      })
}