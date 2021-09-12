const apikey = '868TLNpZS8ooK19OYaEFOMlNAj6HNSqy'; //ключ авторизации для бекенда
const eventsOnOnePage = 20; // число карточек о событиях на одной странице. ВНИМАНИЕ для экрана размера Tablet должно быть 21 карточка событий
// let searchQuery = 'Martin' // переменная для поиска по ключевому слову 
const country = 'US' // поиск по странам. Здесь нужно указывать код страны (перечень на сайте с API). Подвязать их к выпадающему инпуту.
const page = 1; // номер страницы (для пагинации)
 


class EventService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
     }

    fetchEvents(EventService) {
        console.log (this)

    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=${eventsOnOnePage}&keyword=${this.searchQuery}&countryCode=${country}&page=${this.page}&apikey=${apikey}`)
        .then(response => response.json())
        .then(data => {
            this.incrementPage();
            console.log('data._embedded.events =',
                data._embedded.events)
        })
     }

    incrementPage() {
        this.page += 1;
    };

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
     }
}


export default EventService