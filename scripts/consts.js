const BUTTON_AUTH = document.querySelector('.header__button');
const BUTTON_CLOSE = document.querySelector('.popup__close');
const POPUP_REG = document.querySelector('.overlay-reg');
const POPUP_AUTH = document.querySelector('.overlay');
const EXIT_BUTTON = document.querySelector('.header__logout');
const SAVED_ARTICLES = document.querySelector('.header__articles');

const RESULT_BLOCK = document.querySelector('.result');
const BUTTON_MORE = document.querySelector('.result__button');
const RESULT_MAIN = document.querySelector('.result__box');
const RESULT_BOX = document.querySelector('.result__container');
const LOADER = document.querySelector('.result__load');
const NOT_FOUND = document.querySelector('.result__notfound');

const BUTTON_REG = document.querySelector('.popup__url');
const BUTTON_CLOSE_REG = document.querySelector('.close-reg');
const BUTTON_OPEN_ENTER = document.querySelector('.enter');

const BUTTON_OPEN_MOBILE = document.querySelector('.header__mobile');
const BUTTON_CLOSE_MOBILE = document.querySelector('.mobile__close');
const MOBILE_MENU = document.querySelector('.overlay-mobile');
const MOBILE_AUTH = document.querySelector('.mobile__button');
const MOBILE_EXIT = document.querySelector('.mobile__logout');
const MOBILE_ARTICLES = document.querySelector('.mobile__articles');

const ARTICLES_VALUE = document.querySelector('.saved__value');
const ARTICLES_TEXT = document.querySelector('.saved__text');

const AUTH_FORM = document.forms.enter;
const REG_FORM = document.forms.reg;
const SEARCH_FORM = document.forms.search;

const ERRORS = {
  tooShort: 'Должно быть от 2 до 30 символов',
  tooLong: 'Должно быть от 2 до 30 символов',
  missInput: 'Это обязательное поле',
  minPass: 'Должно быть от 8 до 30 символов',
  noError: ''
};
const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

const SERVER_URL = 'https://www.alxst-api.site';
const GET_NEWS = 'https://praktikum.tk/news/v2/everything?q=';
const API_KEY = '&apiKey=77e5586b00254c848ae9a6a44a6b239b';


export {
  BUTTON_AUTH,
  BUTTON_CLOSE,
  POPUP_AUTH,
  POPUP_REG,
  RESULT_BLOCK,
  ERRORS,
  SERVER_URL,
  GET_NEWS,
  BUTTON_REG,
  BUTTON_CLOSE_REG,
  BUTTON_OPEN_ENTER,
  BUTTON_OPEN_MOBILE,
  BUTTON_CLOSE_MOBILE,
  MOBILE_MENU,
  MOBILE_AUTH,
  REG_FORM,
  AUTH_FORM,
  API_KEY,
  SEARCH_FORM,
  BUTTON_MORE,
  RESULT_BOX,
  MONTHS,
  RESULT_MAIN,
  LOADER,
  NOT_FOUND,
  EXIT_BUTTON,
  SAVED_ARTICLES,
  MOBILE_EXIT,
  MOBILE_ARTICLES,
  ARTICLES_VALUE,
  ARTICLES_TEXT,
};