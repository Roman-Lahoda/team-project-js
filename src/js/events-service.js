const apikey = '868TLNpZS8ooK19OYaEFOMlNAj6HNSqy'; //ключ авторизации для бекенда
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2'
  


class EventService {
    constructor() {
        this.searchQuery = '';      //поиск по ключевому слову. Проверял на именах исполнителей: Bob, Martim, Iglesias
        this.country = 'US';        // поиск по странам. Пока по умолчанию США. Здесь нужно указывать код страны (перечень на сайте с API). Подвязать их к выпадающему инпуту.
        this.page = 1;              // номер страницы (для пагинации)
        this.eventsOnOnePage = 20;  // число карточек о событиях на одной странице. ВНИМАНИЕ для экрана размера Tablet должно быть 21 карточка событий
        this.eventID =''
    }

    //Эта функция возвращает промис с массивом данных (события/концерты)
    fetchEvents() {
        // console.log (this)
        return fetch(`${BASE_URL}/events.json?size=${this.eventsOnOnePage}&keyword=${this.searchQuery}&countryCode=${this.country}&page=${this.page}&apikey=${apikey}`)
        .then(response => response.json())
        .then(data => {
            this.incrementPage();
            // console.log('data._embedded.events =');
            return data._embedded.events
        })
        .catch(error => console.log(error))

    }
    

    //Функция для получения промиса с одним объектом события/концерта по его ID
    fetchEventById(searchId) {
        // console.log (this)
        this.eventID = searchId;
        return fetch(`${BASE_URL}/events.json?&id=${this.eventID}&apikey=${apikey}`)
        .then(response => response.json())
        .then(data => {
            console.log('Event searched by Id', data._embedded.events);
            return data._embedded.events
        })
        .catch(error => console.log(error))
     }


    incrementPage() {
        this.page += 1;
    };

    resetPage() {
         this.page = 1;
     }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    get queryByCountry() {
        return this.country;
    }

    set queryByCountry(newCountry) {
        this.country = newCountry;
    }
    
    get numberOfPage() {
         return this.page;
     };

    set numberOfPage(newPage) {
        this.page = newPage;
     };
        
    get numberOfEventsOnOnePage() {
        return this.numberOfEventsOnOnePage;
    }
        
    set numberOfEventsOnOnePage(newValue) {
        this.eventsOnOnePage = newValue;
    }

}

export default EventService;