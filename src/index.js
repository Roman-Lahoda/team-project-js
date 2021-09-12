import './sass/main.scss';
import EventService from './js/events-service';
import eventTpl from './templates/eventTpl.hbs';
import countries from './js/data/countryList.json';
import Select from './js/search-fields';

import refs from './js/refs';

const eventService = new EventService();

// refs.searchForm.addEventListener('submit', onSearchForm);
// refs.loadMore.addEventListener('click', onLoadMore);

//Логика поиска стран
const options = {
  placeholder: 'Choose country',
  data: countries,
};

const selectCountry = new Select('#select', options);
