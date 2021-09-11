import './sass/main.scss';


console.log('Test')

/*   868TLNpZS8ooK19OYaEFOMlNAj6HNSqy  */

// Search for events sourced by Universe in the United States with keyword “devjam”
// https://app.ticketmaster.com/discovery/v2/events.json?keyword=devjam&source=universe&countryCode=US&apikey={apikey}
  
// Get a list of all events in the United States
// https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey={apikey}


const apikey = '868TLNpZS8ooK19OYaEFOMlNAj6HNSqy'; //ключ авторизации для бекенда
const eventsOnOnePage = 20; // число карточек о событиях на одной странице. ВНИМАНИЕ для экрана размера Tablet должно быть 21 карточка событий
let searchQuery = 'Martin' // переменная для поиска по ключевому слову 
const country = 'US' // поиск по странам. Здесь нужно указывать код страны (перечень на сайте с API). Подвязать их к выпадающему инпуту.
const page = 1; // номер страницы (для пагинации)

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    searchInput: document.querySelector('.js-search-input'),
    searchButton: document.querySelector('.js-search-button'),
    eventsContainer: document.querySelector('.js-events-container'),
    searchMore: document.querySelector('.js-search-more'),
}

// fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=${eventsOnOnePage}&keyword=${searchQuery}&countryCode=${country}&page=${page}&apikey=${apikey}`)
//     .then(response => response.json())
//     .then(data => console.log('data._embedded.events =', data._embedded.events))



refs.searchForm.addEventListener('submit', onSearchForm);

function onSearchForm (e) {
    e.preventDefault();

  searchQuery =  refs.searchForm.elements.query.value
    //  searchQuery = e.currentTarget.elements.query.value;
  
console.log(searchQuery)
    // fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=${eventsOnOnePage}&keyword=${searchQuery}&countryCode=${country}&page=${page}&apikey=${apikey}`)
   
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=${eventsOnOnePage}&keyword=${searchQuery}&countryCode=${country}&page=${page}&apikey=${apikey}`)
    .then(response => response.json())
    .then(data => console.log('data._embedded.events =', data._embedded.events))

    
}

    