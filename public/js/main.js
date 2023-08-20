const main_menu = document.getElementById('main_menu');
const menu_icon = document.getElementById('menu_icon');
menu_icon.addEventListener('click', () => {
  main_menu.classList.toggle('active');
})

const theme_icon = document.querySelector('#theme_icon');
const sun_icon = document.querySelector('.bx-sun');
const moon_icon = document.querySelector('.bx-moon');

theme_icon.addEventListener('click', () => {
  const theme_color = localStorage.getItem('theme_color');
  if (theme_color == null || theme_color == 'Dark') {
    localStorage.setItem('theme_color', 'Light');
    sun_icon.classList.add('hide');
    moon_icon.classList.remove('hide');
    document.querySelector('html').classList.add('Light');
    document.querySelector('html').classList.remove('Dark');
  } else {
    localStorage.setItem('theme_color', 'Dark');
    moon_icon.classList.add('hide');
    sun_icon.classList.remove('hide');
    document.querySelector('html').classList.add('Dark');
    document.querySelector('html').classList.remove('Light');
  }
})

// dropdown

document.addEventListener("click", e => {
  const isDropdownButton = e.target.closest("[data-dropdown-button]")
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return

  let currentDropdown
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]")
    currentDropdown.classList.toggle("active")
  }

  document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
    if (dropdown === currentDropdown) return
    dropdown.classList.remove("active")
  })
})

//popup
function ShowPopup() {
  const popup = document.getElementById('popup');
  popup.classList.toggle('active');
}