// стили
import './style.css';

// картинки
import './images/author.jpg';
import './images/logout_black.png';
import './images/logout_white.png';
import './images/menu_black.svg';
import './images/test-card.jpg';
import './images/trash.png';
import './images/close.svg';
import './images/not-found_v1.png';

// классы

import {Popup} from '../scripts/Popup.js';
import {Header} from '../scripts/components/Header.js';
import {Form} from '../scripts/components/Form.js';
import {NewsApi} from '../scripts/api/NewsApi.js';
import {MainApi} from '../scripts/api/MainApi.js';
import {NewsCardList} from '../scripts/components/NewsCardList.js';

// переменные

import {
  BUTTON_AUTH,
  BUTTON_CLOSE,
  POPUP_AUTH,
  BUTTON_REG,
  POPUP_REG,
  BUTTON_CLOSE_REG,
  BUTTON_OPEN_ENTER,
  BUTTON_CLOSE_MOBILE,
  BUTTON_OPEN_MOBILE,
  MOBILE_MENU,
  MOBILE_AUTH,
  REG_FORM,
  AUTH_FORM,
  ERRORS,
  API_KEY,
  GET_NEWS,
  SEARCH_FORM,
  BUTTON_MORE,
  RESULT_BOX,
  MONTHS,
  RESULT_BLOCK,
  SERVER_URL,
  RESULT_MAIN,
  LOADER,
  NOT_FOUND,
  EXIT_BUTTON,
  SAVED_ARTICLES,

} from '../scripts/consts.js';

const auth = new Popup ( POPUP_AUTH, BUTTON_AUTH, BUTTON_CLOSE, POPUP_REG, BUTTON_REG, BUTTON_CLOSE_REG, BUTTON_OPEN_ENTER, MOBILE_AUTH );
auth.open();
auth.close();


const header = new Header ( MOBILE_MENU, BUTTON_OPEN_MOBILE, BUTTON_CLOSE_MOBILE );
header.openHead();
header.closeHead();

const authForm = new Form ( AUTH_FORM, ERRORS, POPUP_AUTH );
const regForm = new Form ( REG_FORM, ERRORS, POPUP_REG );

const newsApi = new NewsApi ({
  baseUrl: GET_NEWS,
  key: API_KEY,
  headers: {
    'Content-Type': 'application/json'
  }
});

const mainApi = new MainApi ({
  url: SERVER_URL
});

const cardList = new NewsCardList(BUTTON_MORE, RESULT_BOX, MONTHS);


SEARCH_FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!e.target.elements.request.value) return;
  let date = new Date();
  let parseDate = ('&from=' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() - 7) + '&to=' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
  let value = e.target.elements.request.value;
  RESULT_BLOCK.classList.add('active');
  NOT_FOUND.classList.remove('active');
  RESULT_MAIN.classList.remove('active');
  LOADER.classList.add('active');
  newsApi.getNews(value, parseDate)
    .then((arr) => {
      cardList.renderResults(arr);
      RESULT_MAIN.classList.add('active');
      LOADER.classList.remove('active');
    })
    .catch((e) => {
      NOT_FOUND.classList.add('active');
      LOADER.classList.remove('active');
    });

});

BUTTON_MORE.addEventListener('click', (e) => {
  cardList.showMore();
});

AUTH_FORM.addEventListener('submit', (e) => {
  const data = authForm.getData();
  mainApi.signin(data.email, data.password)
    .then((res) => {
      localStorage.setItem('token', res.token);
      mainApi.getUserData(res.token)
        .then((el) => {
          EXIT_BUTTON.textContent = el.name;
          SAVED_ARTICLES.removeAttribute('hidden');
          BUTTON_AUTH.setAttribute('hidden', true);
          EXIT_BUTTON.removeAttribute('hidden');
          EXIT_BUTTON.insertAdjacentHTML('beforeend', '<img class="header__img" src="./images/logout_white.png"></img>');
        });
    });


});

EXIT_BUTTON.addEventListener('click', (e) => {
  localStorage.removeItem('token');
  SAVED_ARTICLES.setAttribute('hidden', true);
  EXIT_BUTTON.setAttribute('hidden', true);
  BUTTON_AUTH.removeAttribute('hidden');
});

REG_FORM.addEventListener('submit', (e) => {
  const data = regForm.getData();
  mainApi.signup(data.email, data.password, data.name);
});

if (localStorage.getItem('token')) {
  mainApi.getUserData(localStorage.getItem('token'))
    .then((data) => {
      if (!data) return;
      EXIT_BUTTON.textContent = data.name;
      SAVED_ARTICLES.removeAttribute('hidden');
      BUTTON_AUTH.setAttribute('hidden', true);
      EXIT_BUTTON.removeAttribute('hidden');
      EXIT_BUTTON.insertAdjacentHTML('beforeend', '<img class="header__img" src="./images/logout_white.png"></img>');
    })
}