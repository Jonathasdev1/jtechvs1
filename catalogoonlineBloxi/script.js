document.addEventListener('DOMContentLoaded', () => {
  const navDropdown = document.querySelector('.nav-dropdown');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobilePanel = document.querySelector('.mobile-panel');

  if (navDropdown) {
    const trigger = navDropdown.querySelector('button');

    trigger?.addEventListener('click', () => {
      navDropdown.classList.toggle('is-open');
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      if (!navDropdown.contains(target)) {
        navDropdown.classList.remove('is-open');
      }
    });
  }

  if (menuToggle && mobilePanel) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobilePanel.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobilePanel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobilePanel.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      if (!mobilePanel.contains(target) && !menuToggle.contains(target)) {
        mobilePanel.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
