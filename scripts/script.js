const initPortfolio = () => {
  const navbar = document.getElementById('mainNav');
  const home = document.getElementById('home');
  const social = document.querySelector('.social');
  const socialArrow = document.getElementById('socialArrow');

  const updateOnScroll = () => {
    const scrollY = window.scrollY;
    const homeHeight = home.offsetHeight;
    const navbarHeight = navbar.offsetHeight;

    navbar.classList.toggle('scrolled', scrollY > homeHeight - navbarHeight);
    social?.classList.toggle('heroIconsHidden', scrollY > 50);
    socialArrow?.classList.toggle('heroIconsHidden', scrollY > 50);
  };

  window.addEventListener('scroll', updateOnScroll, { passive: true });
  updateOnScroll();

  // Smooth scrolling for the navbar and hero/footer arrows
  const navbarCollapse = document.getElementById('mainmenu');

  document.querySelectorAll('#mainNav a[href^="#"], #socialArrow a[href^="#"], #upArrow a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();

      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight);
      window.scrollTo({ top, behavior: 'smooth' });

      if (navbarCollapse?.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
      }

      history.pushState(null, '', hash);
    });
  });

  // Magnifier hover only on the clickable image and title
  document.querySelectorAll('.projectGif, .projectTitle').forEach((trigger) => {
    const card = trigger.closest('.projectGifAndMagnifer');
    if (!card) return;

    const magnifier = card.querySelector('.magnifier');
    const image = card.querySelector('.projectGif .card-img-top');

    if (trigger.classList.contains('projectGif')) {
      trigger.setAttribute('role', 'button');
      trigger.setAttribute('tabindex', '0');

      const title = card.querySelector('.projectTitle')?.textContent.trim();
      if (title) trigger.setAttribute('aria-label', `Otwórz podgląd projektu ${title}`);

      trigger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          trigger.click();
        }
      });
    }

    trigger.addEventListener('mouseenter', () => {
      magnifier?.classList.add('magnifierShow');
      image?.classList.add('projectGifOpacity');
    });

    trigger.addEventListener('mouseleave', () => {
      magnifier?.classList.remove('magnifierShow');
      image?.classList.remove('projectGifOpacity');
    });
  });

  // Modal image gallery with previous/next arrows
  const arrowIcon = (direction) => (direction === 'prev' ? 'fa-chevron-left' : 'fa-chevron-right');

  document.querySelectorAll('.modal').forEach((modal) => {
    const mainImage = modal.querySelector('.bImg');
    const thumbnails = Array.from(modal.querySelectorAll('.sImg'));
    if (!mainImage || thumbnails.length < 2) return;

    const preview = document.createElement('div');
    preview.className = 'projectPreview';
    mainImage.parentNode.insertBefore(preview, mainImage);
    preview.appendChild(mainImage);

    const markPreviewLoaded = () => preview.classList.add('is-loaded');

    if (mainImage.complete) {
      markPreviewLoaded();
    }

    mainImage.addEventListener('load', markPreviewLoaded);
    mainImage.addEventListener('error', markPreviewLoaded);

    const createArrow = (direction, label) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `projectPreviewArrow ${direction}`;
      button.setAttribute('aria-label', label);
      button.innerHTML = `<i class="fas ${arrowIcon(direction)}" aria-hidden="true"></i>`;
      return button;
    };

    const prevButton = createArrow('prev', 'Poprzednie zdjęcie');
    const nextButton = createArrow('next', 'Następne zdjęcie');
    preview.append(prevButton, nextButton);

    let currentIndex = Math.max(
      0,
      thumbnails.findIndex((thumbnail) => thumbnail.getAttribute('src') === mainImage.getAttribute('src'))
    );

    const showImage = (index) => {
      currentIndex = (index + thumbnails.length) % thumbnails.length;
      const src = thumbnails[currentIndex].getAttribute('src');
      if (src && src !== mainImage.getAttribute('src')) {
        mainImage.setAttribute('src', src);
      }
    };

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.setAttribute('role', 'button');
      thumbnail.setAttribute('tabindex', '0');
      thumbnail.setAttribute('aria-label', `Pokaż zdjęcie ${index + 1} w galerii`);

      thumbnail.addEventListener('click', () => showImage(index));
      thumbnail.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          showImage(index);
        }
      });
    });

    prevButton.addEventListener('click', () => showImage(currentIndex - 1));
    nextButton.addEventListener('click', () => showImage(currentIndex + 1));
  });

  // Arrow keys navigate the open project gallery
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

    const openModal = document.querySelector('.modal.show');
    if (!openModal) return;

    const button = openModal.querySelector(
      event.key === 'ArrowLeft' ? '.projectPreviewArrow.prev' : '.projectPreviewArrow.next'
    );
    if (button) {
      event.preventDefault();
      button.click();
    }
  });

  // Bootstrap tooltips
  if (window.bootstrap) {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((element) => {
      new bootstrap.Tooltip(element);
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}
