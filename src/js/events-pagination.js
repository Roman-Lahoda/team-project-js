import { clearEventsContainer, eventsMarkUp } from '../index';
import Pagination from 'tui-pagination';
import EventService from './events-service';
import 'tui-pagination/dist/tui-pagination.css';

const eventService = new EventService();

export class EventsPagination {
  constructor({ visiblePages, page, centerAlign, paginationContainer }) {
    this.visiblePages = visiblePages;
    this.page = page;
    this.centerAlign = centerAlign;
    this.paginationContainer = paginationContainer;
  }

  setOptions(data) {
    return {
      totalItems: data?.page?.totalElements,
      itemsPerPage: data?.page?.size,
      visiblePages: this.visiblePages,
      page: this.page,
      centerAlign: this.centerAlign,

      template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
          '<a href="#" class="tui-page-btn tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</a>',
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</span>',
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</a>',
      },
    };
  }

  createPagination(data) {
    this.resetPagination();

    this.renderMarkup(data);
    this.renderPagination(data);
  }

  renderPagination(data) {
    const obj = this.setOptions(data);
    const pagination = new Pagination('pagination', obj);
    pagination.on('beforeMove', e => {
      const { page } = e;
      eventService.page = page;
      eventService.fetchEvents().then(data => this.renderMarkup(data));
    });
  }

  renderMarkup(data) {
    clearEventsContainer();
    eventsMarkUp(data?._embedded?.events);
  }

  resetPagination() {
    eventService.number = 1;
  }

  onPaginationClick(e) {
    const { page } = e;
    eventService.page = page;
    eventService.fetchEvents().then(data => this.renderMarkup(data));
  }
}
