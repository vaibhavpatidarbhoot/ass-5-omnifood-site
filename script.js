// ========== Mobile Navigation ==========
const mobileNavBtn = document.querySelector('.mobile-nav-btn');
const nav = document.querySelector('.nav');

mobileNavBtn.addEventListener('click', function () {
  nav.classList.toggle('nav-open');
  mobileNavBtn.classList.toggle('nav-open');
});

// ========== Smooth Scrolling ==========
const allLinks = document.querySelectorAll('a:link');

allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    const href = link.getAttribute('href');

    // Scroll to top
    if (href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Scroll to section
    if (href !== '#' && href.startsWith('#')) {
      e.preventDefault();
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }

    // Close mobile nav
    if (link.classList.contains('nav-link')) {
      nav.classList.remove('nav-open');
      mobileNavBtn.classList.remove('nav-open');
    }
  });
});

// ========== Sticky Navigation ==========
const sectionHeroEl = document.querySelector('.hero');

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add('sticky');
    } else {
      document.body.classList.remove('sticky');
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-80px',
  }
);

obs.observe(sectionHeroEl);

// ========== Form Submission ==========
const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(signupForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const source = formData.get('source');

  if (!name || !email || !source) {
    alert('Please fill in all fields');
    return;
  }

  alert('Thank you for signing up! We will contact you soon.');
  signupForm.reset();
});

// ========== Animate Sections on Scroll ==========
const allSections = document.querySelectorAll('section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// ========== Inject Animation and Navigation Styles ==========
const style = document.createElement('style');

style.textContent = `
  .section--hidden {
    opacity: 0;
    transform: translateY(8rem);
  }

  section {
    transition: transform 1s, opacity 1s;
  }

  .nav-open .nav {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
    transform: translateX(0);
  }

  .nav-open .mobile-nav-icon {
    background-color: transparent;
  }

  .nav-open .mobile-nav-icon::before {
    top: 0;
    transform: rotate(135deg);
  }

  .nav-open .mobile-nav-icon::after {
    top: 0;
    transform: rotate(-135deg);
  }

  @media (max-width: 59em) {
    .nav {
      background-color: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(5px);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      transform: translateX(100%);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.5s ease-in;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }

    .nav-list {
      flex-direction: column;
      gap: 4.8rem;
    }

    .nav-link:link,
    .nav-link:visited {
      font-size: 3rem;
    }
  }

  .sticky .header {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 8rem;
    padding-top: 0;
    padding-bottom: 0;
    background-color: rgba(255, 255, 255, 0.97);
    z-index: 999;
    box-shadow: 0 1.2rem 3.2rem rgba(0, 0, 0, 0.03);
  }

  .sticky .hero {
    margin-top: 9.6rem;
  }
`;

document.head.appendChild(style);
