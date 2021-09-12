import './sass/main.scss';
import EventService from './js/events-service'
import eventTpl from './templates/eventTpl.hbs'
import refs from './js/refs'


const eventService = new EventService();

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMore.addEventListener('click', onLoadMore);



    