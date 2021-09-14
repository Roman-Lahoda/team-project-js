const refs = {
    body: document.querySelector("body"),
    eventsItem: document.querySelector('.events__list'),
    modalOverlay: document.querySelector('.js-modal'),
    modalCloseBtn: document.querySelector('button[data-action="close-modal"]'),
}   


refs.eventsItem.addEventListener('click', onEventClick);

// открытие модального окна при клике на галерею
function onEventClick(e) {
   e.preventDefault();

  refs.modalOverlay.classList.remove("visually-hidden");
  refs.modalOverlay.classList.add("is-open");
  refs.body.classList.add("overflow-hidden");

}


function onModalCloseBtn() {
  refs.modalOverlay.classList.remove("is-open");
  refs.modalOverlay.classList.add("visually-hidden");
  refs.body.classList.remove("overflow-hidden");

  refs.modalOverlay.removeEventListener("click", onModalCloseBtn);
}


// Закрытие по клику на кнопку close и на overlay модального окна
refs.modalOverlay.addEventListener('click', event => {
  const target = event.target;

    if (target.matches('.modal__btn-close') || target.matches('.modal-overlay')) {
      onModalCloseBtn();
  };
});

// Закрытие при нажатии Escape
document.addEventListener("keydown", function (event) {
  if (event.code !== "Escape") {
    return;
  }
  onModalCloseBtn();
});