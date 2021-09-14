import SelectTemplate from '../templates/countryList.hbs';
import EventService from './events-service';

const eventService = new EventService();
export default class Select {
  constructor(selector, options) {
    this.selectEl = document.querySelector(selector);
    this.options = options;
    this.selectedCode = null;
    this.#render();
    this.#setup();
  }

  #render() {
    this.selectEl.innerHTML = SelectTemplate(this.options);
  }

  #setup() {
    this.handlerClick = this.handlerClick.bind(this);
    this.selectEl.addEventListener('click', this.handlerClick);
    this.arrow = this.selectEl.querySelector('[data-type="arrow"]');
    this.selectValue = this.selectEl.querySelector('.select__current');
  }

  open() {
    this.selectEl.classList.add('open');
    this.arrow.classList.add('close');
    this.arrow.classList.remove('open');
  }
  close() {
    this.selectEl.classList.remove('open');
    this.arrow.classList.add('open');
    this.arrow.classList.remove('close');
  }

  async handlerClick(e) {
    const { type } = e.target.dataset;
    if (type === 'input' || type === 'arrow') {
      this.toggle();
    } else if (type === 'item') {
      eventService.country = e.target.dataset.code;
      this.select(eventService.country);
      eventService.page = 1;
      await eventService.fetchEvents();
    }
  }

  get current() {
    return this.options.data.find(item => item.countryCode === this.selectedCode);
  }
  select(code) {
    this.selectedCode = code;
    this.selectValue.textContent = this.current.name;
    this.selectEl
      .querySelectorAll('[data-type="item"]')
      .forEach(el => el.classList.remove('selected'));
    this.selectEl.querySelector(`[data-code=${code}]`).classList.add('selected');
    this.close();
  }
  get isOpen() {
    return this.selectEl.classList.contains('open');
  }
  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  destroy() {
    this.selectEl.removeEventListener('click', this.handlerClick);
  }
}
