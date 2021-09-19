const bodyTheme = document.querySelector('body');
const checkbox = document.querySelector('.theme-switch__toggle');
const team = document.querySelector('.team');
const footerTextColor = document.querySelector('.footer-content');
const scrollUpToTop = document.querySelector('.scroll-up');

// const paginationColor = document.getElementById('#pagenumbers');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
  // STYLE: 'color-title',
};

checkbox.addEventListener('change', changeTheme);

function changeTheme(event) {
  event.currentTarget.checked ? checkedInput() : notCheckedInput();
}

function checkedInput() {
  bodyTheme.classList.add(Theme.LIGHT);

  team.classList.add(Theme.STYLE);
  footerTextColor.classList.add(Theme.STYLE);
  scrollUpToTop.classList.add(Theme.LIGHT);
  localStorage.setItem('theme', Theme.LIGHT);

  checkbox.checked = true;
}

function notCheckedInput() {
  bodyTheme.classList.remove(Theme.LIGHT);
  team.classList.remove(Theme.STYLE);
  footerTextColor.classList.remove(Theme.STYLE);
  scrollUpToTop.classList.remove(Theme.LIGHT);
  localStorage.setItem('theme', Theme.DARK);
  checkbox.checked = false;
}

function currentTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === Theme.LIGHT) {
    checkedInput();
    return;
  }
  if (savedTheme === Theme.DARK || savedTheme === null) {
    notCheckedInput();
    return;
  }
}

currentTheme();

// -----------------

// export default function changeAllColorTitle(dates, locations) {
//   if (body.className === Theme.LIGHT) {
//     for (const date of dates) {
//       date.classList.add(Theme.STYLE);
//     }
//     for (const location of locations) {
//       console.log(location);
//       location.classList.add(Theme.STYLE);
//     }
//   }
// }
