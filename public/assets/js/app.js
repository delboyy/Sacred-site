const navMenu = document.getElementById('navMenu');
const pageLinks = document.querySelectorAll('.nav__link[data-page]');
const scrollLinks = document.querySelectorAll('[data-scroll-target]');
let currentPage = document.querySelector('.page.active')?.id || 'home';

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupScrollLinks();

  if (window.location.hash === '#product') {
    smoothScrollToId('offer');
  }
});

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#product') {
    smoothScrollToId('offer');
  }
});

function setupNavigation() {
  if (!navMenu) {
    return;
  }

  pageLinks.forEach((link) => {
    link.addEventListener('click', handlePageLinkClick);
  });
}

function handlePageLinkClick(event) {
  event.preventDefault();
  const targetPage = event.currentTarget.getAttribute('data-page');
  if (!targetPage) {
    return;
  }

  navigateToPage(targetPage);
}

function navigateToPage(pageName) {
  if (!pageName || pageName === currentPage) {
    return;
  }

  const currentPageElement = document.getElementById(currentPage);
  const nextPageElement = document.getElementById(pageName);

  if (!nextPageElement) {
    return;
  }

  if (currentPageElement) {
    currentPageElement.classList.remove('active');
  }

  nextPageElement.classList.add('active');
  currentPage = pageName;

  updateNavActiveState(pageName);
  updatePageTitle(pageName);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavActiveState(activePage) {
  pageLinks.forEach((link) => {
    if (link.getAttribute('data-page') === activePage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function updatePageTitle(pageName) {
  const titles = {
    home: "Sacred - Natural Menopause Support",
    about: "About Sacred",
  };

  document.title = titles[pageName] || 'Sacred';
}

function setupScrollLinks() {
  scrollLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('data-scroll-target');
      if (targetId) {
        smoothScrollToId(targetId === 'product' ? 'offer' : targetId);
      }
    });
  });
}

function smoothScrollToId(id) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
}

window.navigateToPage = navigateToPage;
