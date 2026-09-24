
/*
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
});*/


document.addEventListener('DOMContentLoaded', () => {
  // Localiza os elementos que já existem no HTML.
  const navDropdown = document.querySelector('.nav-dropdown');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobilePanel = document.querySelector('.mobile-panel');

  // Controla o menu de categorias do computador.
  if (navDropdown) {
    const trigger = navDropdown.querySelector('button');

    trigger?.setAttribute('aria-expanded', 'false');

    // Mantém a aparência e o estado acessível sincronizados.
    const setDropdownOpen = (isOpen) => {
      navDropdown.classList.toggle('is-open', isOpen);
      trigger?.setAttribute('aria-expanded', String(isOpen));
    };

    // Abre ou fecha ao clicar em "Categorias".
    trigger?.addEventListener('click', () => {
      setDropdownOpen(!navDropdown.classList.contains('is-open'));
    });

    // Fecha ao clicar fora.
    document.addEventListener('click', (event) => {
      if (!(event.target instanceof Node)) return;

      if (!navDropdown.contains(event.target)) {
        setDropdownOpen(false);
      }
    });

    // Fecha com a tecla Escape.
    document.addEventListener('keydown', (event) => {
      if (
        event.key === 'Escape' &&
        navDropdown.classList.contains('is-open')
      ) {
        setDropdownOpen(false);
        trigger?.focus();
      }
    });
  }

  // Controla o menu de celular.
  if (menuToggle && mobilePanel) {
    // Centraliza a atualização do painel e do botão.
    const setMobileOpen = (isOpen) => {
      mobilePanel.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Fechar menu' : 'Abrir menu'
      );
    };

    // Abre ou fecha ao tocar nas três barras.
    menuToggle.addEventListener('click', () => {
      setMobileOpen(!mobilePanel.classList.contains('is-open'));
    });

    // Fecha depois de escolher um link.
    mobilePanel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        setMobileOpen(false);
      });
    });

    // Fecha ao tocar fora do painel e do botão.
    document.addEventListener('click', (event) => {
      if (!(event.target instanceof Node)) return;

      if (
        !mobilePanel.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        setMobileOpen(false);
      }
    });

    // Fecha com Escape e devolve o foco ao botão.
    document.addEventListener('keydown', (event) => {
      if (
        event.key === 'Escape' &&
        mobilePanel.classList.contains('is-open')
      ) {
        setMobileOpen(false);
        menuToggle.focus();
      }
    });

    // Fecha o painel ao voltar para o layout de computador.
    const mobileLayout = window.matchMedia('(max-width: 1100px)');

    mobileLayout.addEventListener('change', () => {
      setMobileOpen(false);
    });
  }
});
