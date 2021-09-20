import './sass/main.scss';
import EventService from './js/events-service';
import eventTpl from './templates/eventTpl.hbs';
import countries from './js/data/countryList.json';
import Select from './js/search-fields';
import onEventClick from './js/modal.js';

import refs from './js/refs';

import './js/scrollUp';
import './js/team-modal';
import './js/pagination';
import './js/theme-switch';
import './js/animation-cards';

const eventService = new EventService();

refs.searchForm.addEventListener('submit', onSearchForm);
// refs.loadMore.addEventListener('click', onLoadMore);

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
function onSearchForm(e) {
  e.preventDefault();

  eventService.query = e.currentTarget.elements.query.value;

  //Проверка ширины экрана. Если Tablet-версия, то грузим 21 картинку, для остальных версий 20 картинок
  if (document.documentElement.clientWidth > 768 && document.documentElement.clientWidth < 1280) {
    console.log('document.documentElement.clientWidth');
    eventService.eventsOnOnePage = 21;
  } else {
    eventService.eventsOnOnePage = 20;
  }

  // в этой строке связывает выбранную страну с классом, который отправляет запрос на бекенд
  eventService.сountryQueryKey = selectCountry.countryCode;

  if (eventService.query === '') {
    return alert('Введите что-то нормальное');
  }
  eventService.resetPage();
  eventService.fetchEvents(EventService).then(Events => {
    clearEventsContainer();
    eventsMarkUp(Events);
  });
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
