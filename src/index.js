import './sass/main.scss';


console.log('Test')

/*   868TLNpZS8ooK19OYaEFOMlNAj6HNSqy  */

// Search for events sourced by Universe in the United States with keyword “devjam”
// https://app.ticketmaster.com/discovery/v2/events.json?keyword=devjam&source=universe&countryCode=US&apikey={apikey}
  
// Get a list of all events in the United States
// https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey={apikey}


const apikey = '868TLNpZS8ooK19OYaEFOMlNAj6HNSqy'; //ключ авторизации для бекенда
const eventsOnOnePage = 20; // число карточек о событиях на одной странице. ВНИМАНИЕ для экрана размера Tablet должно быть 21 карточка событий
const keyword = 'martin' // переменная для поиска по ключевому слову 
const country = 'US' // поиск по странам. Здесь нужно указывать код страны (перечень на сайте с API). Подвязать их к выпадающему инпуту.
const page = 1; // номер страницы (для пагинации)

fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=${eventsOnOnePage}&keyword=${keyword}&countryCode=${country}&page=${page}&apikey=${apikey}`)
    .then(response => response.json())
    .then(data => console.log('data._embedded.events =', data._embedded.events))

    

    