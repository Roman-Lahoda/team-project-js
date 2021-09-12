import './sass/main.scss';
import EventService from './js/events-service'


console.log('Test')

/*   868TLNpZS8ooK19OYaEFOMlNAj6HNSqy  */

// Search for events sourced by Universe in the United States with keyword “devjam”
// https://app.ticketmaster.com/discovery/v2/events.json?keyword=devjam&source=universe&countryCode=US&apikey={apikey}
  
// Get a list of all events in the United States
// https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey={apikey}


// const apikey = '868TLNpZS8ooK19OYaEFOMlNAj6HNSqy'; //ключ авторизации для бекенда
// const eventsOnOnePage = 20; // число карточек о событиях на одной странице. ВНИМАНИЕ для экрана размера Tablet должно быть 21 карточка событий
// let searchQuery = 'Martin' // переменная для поиска по ключевому слову 
// const country = 'US' // поиск по странам. Здесь нужно указывать код страны (перечень на сайте с API). Подвязать их к выпадающему инпуту.
// const page = 1; // номер страницы (для пагинации)

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    searchInput: document.querySelector('.js-search-input'),
    searchButton: document.querySelector('.js-search-button'),
    eventsContainer: document.querySelector('.js-events-container'),
    loadMore: document.querySelector('.js-load-more'),
}

const eventService = new EventService();


refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearchForm (e) {
    e.preventDefault();
  
    eventService.query = e.currentTarget.elements.query.value;
    eventService.fetchEvents(EventService)
   
}


function onLoadMore() {
     eventService.fetchEvents(EventService)
 }

    