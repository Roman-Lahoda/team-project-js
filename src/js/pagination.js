import EventService from './events-service';
import { clearEventsContainer, eventsMarkUp } from '../index';
import refs from './refs';

const eventService = new EventService();

class Pagination {
  constructor({ numberPerPage, paginationContainer }) {
    this.currentPage = 1;
    this.numberOfItems = 0;
    this.numberPerPage = numberPerPage;
    this.paginationContainer = paginationContainer;
    this.numberOfPages = 0;
    this.respData = [];
    this.paginationContainer.addEventListener('click', this.onPaginationBtnClick.bind(this));
  }

  async getData() {
    const data = await eventService.fetchEventsFirstLoad();
    this.respData.push(...data);

    this.numberOfItems = data.length;

    this.displayList(this.respData);
    this.displayPagination(this.respData);
  }

  displayList(data) {
    clearEventsContainer(); //? neue Funktion schaffen

    const start = (this.currentPage - 1) * this.numberPerPage;
    const end = start + this.numberPerPage;
    const paginatedEvents = data.slice(start, end);

    eventsMarkUp(paginatedEvents); //? neue Funktion schaffen
  }

  displayPagination(data) {
    this.numberOfPages = Math.ceil(this.numberOfItems / this.numberPerPage);

    for (let i = 1; i < this.numberOfPages + 1; i += 1) {
      let button = this.createPaginationButton(i, data);
      this.paginationContainer.appendChild(button);
    }
  }

  createPaginationButton(page, data) {
    let button = document.createElement('button');
    button.innerText = page;
    button.dataset.number = page;

    if (this.currentPage === page) button.classList.add('active');

    return button;
  }

  onPaginationBtnClick(e) {
    if (e.target.nodeName !== 'BUTTON') {
      return;
    }

    this.currentPage = e.target.dataset.number;

    this.displayList(this.respData, this.currentPage);
  }
}

const pagination = new Pagination({
  numberPerPage: 20,
  paginationContainer: refs.paginationContainer,
});

pagination.getData();
