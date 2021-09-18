import './sass/main.scss';
import EventService from './js/events-service';
import { Pagination } from './js/pagination';
import eventTpl from './templates/eventTpl.hbs';
import countries from './js/data/countryList.json';
import Select from './js/search-fields';
import onEventClick from './js/modal.js';

import refs from './js/refs';

import './js/scrollUp';
import './js/team-modal';
import './js/theme-switch';

const eventService = new EventService();
const debounce = require('lodash.debounce');
import {
  alert,
  error,
  success,
  info,
  defaults,
} from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
defaults.delay = 2000;

refs.searchInput.addEventListener('input', debounce(onInputChange, 500));

// start Пагинация и первичная отрисовка

// создаем новый экземпляр класса
const pagination = new Pagination({
  numberPerPage: 20,
  paginationContainer: refs.paginationContainer,
});

// Первичная отрисовка. Просто передать данные на пагинацию
eventService.fetchEventsFirstLoad().then(data => pagination.getData(data));

// end Пагинация и первичная отрисовка

//Логика поиска стран
const options = {
  placeholder: 'Choose country',
  data: countries,
};

const selectCountry = new Select('#select', options);

// // ----------------------
const countrySelectorRef = document.querySelector('#select');
countrySelectorRef.addEventListener('click', selectCountry.handlerClick);
// // ----------------------------

//  -------------- Первая загрузка сайта   ------------------

// document.addEventListener('DOMContentLoaded', () => {
//   //Проверка ширины экрана. Если Tablet-версия, то грузим 21 картинку, для остальных версий 20 картинок
//   if (document.documentElement.clientWidth > 768 && document.documentElement.clientWidth < 1280) {
//     console.log('document.documentElement.clientWidth');
//     eventService.eventsOnOnePage = 21;
//   } else {
//     eventService.eventsOnOnePage = 20;
//   }

//   // Загрузка происходит по событию  DOMContentLoaded
//   //console.log('DOM полностью загружен и разобран');
//   eventService.fetchEventsFirstLoad().then(Events => {
//     clearEventsContainer();
//     eventsMarkUp(Events);
//   });
// });

// Функция поиска по заданному слову
function onInputChange(e) {
  e.preventDefault();


   // в этой строке связывает выбранную страну с классом, который отправляет запрос на бекенд
  eventService.сountryQueryKey = selectCountry.countryCode;

eventService.query = e.target.value.trim('');

  eventService.resetPage();
  eventService
    .fetchEvents(EventService)
    .then(events => {
      clearEventsContainer();
      renderEventsList(events);
    })
    .catch(error => onFetchError(error));
}

function renderEventsList(events) {
  if (eventService.query === '') {
    return info({

    text: `Пожалуйста, введите ваш запрос в поле поиска ...`
    });
    
  }
  else if (events === undefined) {
    return error({
      text: `По запросу ничего не найдено`
    })
   }
  else {

    eventsMarkUp(events);
    checkingScreenWidth();
    success({
      text: `Результаты поиска:`,
    });
  }
}

function onFetchError(error) {
  if (error.status === 404) {
    return error({
      text: `Упс! Событий с заданным поисковым словом не найдено!`,
    });
  }
}

//Проверка ширины экрана. Если Tablet-версия, то грузим 21 картинку, для остальных версий 20 картинок
export function checkingScreenWidth() {
  if (document.documentElement.clientWidth > 768 && document.documentElement.clientWidth < 1280) {
    console.log('document.documentElement.clientWidth');
    eventService.eventsOnOnePage = 21;
  } else {
    eventService.eventsOnOnePage = 20;
  }
}

//  Функция рендеринга(отрисовки) массива событий/концертов
export function eventsMarkUp(array) {
  refs.eventsContainer.insertAdjacentHTML('beforeend', eventTpl(array));
}
// Функция для очистки галереи событий (вызывается при вводе нового поискового слова)
export function clearEventsContainer() {
  refs.eventsContainer.innerHTML = '';
}

// ==================== Тестовые функции.  ============

// Функция для пагинации, когда кликаем на СЛЕДУЮЩУЮ страничку и догружаем
// следующую порцию карточек с событиями / концертами
function onNextPage() {
  eventService.incrementPage();
  eventService.fetchEvents(EventService).then(eventsMarkUp);
}

// Функция для пагинации, когда кликаем на ПРЕДЫДУЩУЮ страничку
function onPreviousPage() {
  if (eventService.page < 1) {
    eventService.decrementPage();
  }
  eventService.fetchEvents(EventService).then(eventsMarkUp);
}

// if (eventService.page > 1) {
//   eventService.decrementPage();
// }
// eventService.fetchEvents(EventService).then(eventsMarkUp);
