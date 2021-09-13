import './sass/main.scss';
import EventService from './js/events-service';
import eventTpl from './templates/eventTpl.hbs';
import countries from './js/data/countryList.json';
import Select from './js/search-fields';

import refs from './js/refs';

const eventService = new EventService();


refs.searchForm.addEventListener('submit', onSearchForm);
// refs.loadMore.addEventListener('click', onLoadMore);



//Логика поиска стран
const options = {
  placeholder: 'Choose country',
  data: countries,
};


// // Пример доступа к фотографии события/концерта c  ID = 'vvG10Zpi2x1xYd'
// eventService.fetchEventById('vvG10Zpi2x1xYd').then(data => {
//     console.log('Это ссылка на фоторграфию события с указанным ID : ', data[0].images[0].url)
// })


const selectCountry = new Select('#select', options);


//  -------------- первая загрузка сайта   ------------------
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM полностью загружен и разобран');
    eventService.fetchEventsFirstLoad().then(Events => {
        clearEventsContainer();
        eventsMarkUp(Events);
        console.log(Events);
    });
});


// Функция поиска по заданному слову
function onSearchForm (e) {
    e.preventDefault();
    
    eventService.query = e.currentTarget.elements.query.value;

    if (eventService.query === '') { return alert ('Введите что-то нормальное')}
    eventService.resetPage();
    eventService.fetchEvents(EventService).then(Events => {
        clearEventsContainer();
        eventsMarkUp(Events);
        console.log(Events);
    })
}


 //  Функция рендеринга(отрисовки) массива событий/концертов
function eventsMarkUp(array) {
    console.log('eventsMarkUp  array = ', array)
    refs.eventsContainer.insertAdjacentHTML ('beforeend', eventTpl (array) )
}

// Функция для очистки галереи событий (вызывается при вводе нового поискового слова)
function clearEventsContainer() {
    refs.eventsContainer.innerHTML = '';
}

function onLoadMore() {
     eventService.fetchEvents(EventService).then(eventsMarkUp)
 }
