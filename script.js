document.addEventListener('DOMContentLoaded', () => {
  const navDropdown = document.querySelector('.nav-dropdown');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobilePanel = document.querySelector('.mobile-panel');
  const searchForm = document.querySelector('.search-box');
  const searchInput = searchForm?.querySelector('input');
  const categoryButtons = [...document.querySelectorAll('.category-chip')];
  const productCards = [...document.querySelectorAll('.product-card')];
  const emptyResults = document.querySelector('.empty-results');
  let activeCategory = 'todos';

  const normalize = (value) =>
    value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();

  const filterProducts = () => {
    const searchTerm = normalize(searchInput?.value.trim() ?? '');
    let visibleCount = 0;

    productCards.forEach((card) => {
      const matchesCategory =
        activeCategory === 'todos' || card.dataset.category === activeCategory;
      const matchesSearch = normalize(card.textContent).includes(searchTerm);
      const isVisible = matchesCategory && matchesSearch;

      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (emptyResults) emptyResults.hidden = visibleCount > 0;
  };

  searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    filterProducts();
    document.querySelector('#vitrine')?.scrollIntoView({ behavior: 'smooth' });
  });

  searchInput?.addEventListener('input', filterProducts);

  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category ?? 'todos';

      categoryButtons.forEach((categoryButton) => {
        const isActive = categoryButton === button;
        categoryButton.classList.toggle('active', isActive);
        categoryButton.setAttribute('aria-pressed', String(isActive));
      });

      filterProducts();
    });
  });

  const whatsappNumber = '5512991307272';
  document.querySelectorAll('.buy-button[data-whatsapp]').forEach((button) => {
    const card = button.closest('.product-card');
    const productName = card?.querySelector('h4')?.textContent.trim();
    const productPrice = card?.querySelector('.current-price')?.textContent.trim();

    if (productName && productPrice) {
      const message = `Olá! Tenho interesse no produto: ${productName} (${productPrice})`;
      button.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    }
  });

  if (navDropdown) {
    const trigger = navDropdown.querySelector('button');
    const setDropdownOpen = (isOpen) => {
      navDropdown.classList.toggle('is-open', isOpen);
      trigger?.setAttribute('aria-expanded', String(isOpen));
    };

    trigger?.setAttribute('aria-expanded', 'false');
    trigger?.addEventListener('click', () => {
      setDropdownOpen(!navDropdown.classList.contains('is-open'));
    });

    document.addEventListener('click', (event) => {
      if (event.target instanceof Node && !navDropdown.contains(event.target)) {
        setDropdownOpen(false);
      }
    });
  }

  if (menuToggle && mobilePanel) {
    const setMobileOpen = (isOpen) => {
      mobilePanel.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    };

    menuToggle.addEventListener('click', () => {
      setMobileOpen(!mobilePanel.classList.contains('is-open'));
    });

    mobilePanel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMobileOpen(false));
    });

    document.addEventListener('click', (event) => {
      if (
        event.target instanceof Node &&
        !mobilePanel.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        setMobileOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;

      if (mobilePanel.classList.contains('is-open')) {
        setMobileOpen(false);
        menuToggle.focus();
      }

      if (navDropdown?.classList.contains('is-open')) {
        navDropdown.classList.remove('is-open');
        navDropdown.querySelector('button')?.setAttribute('aria-expanded', 'false');
      }
    });

    window.matchMedia('(max-width: 1100px)').addEventListener('change', () => {
      setMobileOpen(false);
    });
  }

/* Fim do JavaScript */
document.querySelectorAll('.product-media').forEach((media) => {
  if (!media.querySelector('.img-hover')) return;

  media.addEventListener('click', () => {
    media.classList.toggle('mostrar-2');
  });
});





});