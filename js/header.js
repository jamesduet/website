const homePage = document.querySelector('.home-page');
const navbarCollapse = document.querySelector('#navbar-collapse');

function updateHomePage() {
  if (navbarCollapse.classList.contains('show')) {
    homePage.classList.add('navbar-collapse-open');
  } else {
    homePage.classList.remove('navbar-collapse-open');
  }
}

const observer = new MutationObserver(updateHomePage);

observer.observe(navbarCollapse, {
  attributes: true,
  attributeFilter: ['class'],
});

updateHomePage();
