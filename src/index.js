import './sass/main.scss';
import EventService from './js/events-service'
import eventTpl from './templates/eventTpl.hbs'
import refs from './js/refs'


const eventService = new EventService();

/*
refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMore.addEventListener('click', onLoadMore);
*/



// Пример доступа к фотографии события/концерта c  ID = 'vvG10Zpi2x1xYd'
eventService.fetchEventById('vvG10Zpi2x1xYd').then(data => {
    console.log('Это ссылка на фоторграфию события с указанным ID : ', data[0].images[0].url)
})

