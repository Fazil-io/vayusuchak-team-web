// VayuSuchak Showcase Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // 1. STICKY RAIL SCROLL BEHAVIOR
  const rail = document.querySelector('.rail');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      rail?.classList.add('stuck');
    } else {
      rail?.classList.remove('stuck');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. SCROLL SPY NAVIGATION
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
        mobileNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  // 3. MOBILE DRAWER TOGGLE
  const railToggle = document.querySelector('.rail-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  if (railToggle && mobileDrawer) {
    railToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      railToggle.setAttribute('aria-expanded', isOpen);
      railToggle.textContent = isOpen ? 'CLOSE' : 'MENU';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        railToggle.setAttribute('aria-expanded', 'false');
        railToggle.textContent = 'MENU';
        document.body.style.overflow = '';
      });
    });
  }

  // 4. SYSTEM IN ACTION TABS
  const tabBtns = document.querySelectorAll('.tab-btn');
  const systemPanes = document.querySelectorAll('.system-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      systemPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 5. LIGHTBOX MODAL FOR SCREENSHOTS
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const zoomableImages = document.querySelectorAll('[data-zoomable]');

  zoomableImages.forEach(el => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-zoom-src') || el.querySelector('img')?.src;
      const caption = el.getAttribute('data-zoom-caption') || el.querySelector('img')?.alt || 'VayuSuchak System Screenshot';

      if (src && lightbox && lightboxImg) {
        lightboxImg.src = src;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 6. COPY SHA-256 HASH HELPER
  const copyBtns = document.querySelectorAll('.copy-hash-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const hash = btn.getAttribute('data-hash') || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
      navigator.clipboard.writeText(hash).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'COPIED!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      });
    });
  });

  // 7. DASHBOARD THEME VIEW TOGGLES (SIDE-BY-SIDE, LIGHT, DARK)
  const dashToggleBtns = document.querySelectorAll('.dash-toggle-btn');
  const heroDualContainer = document.getElementById('heroDualContainer');

  dashToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      dashToggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (heroDualContainer) {
        heroDualContainer.classList.remove('view-dual', 'view-light', 'view-dark');
        heroDualContainer.classList.add(`view-${view}`);
      }
    });
  });
});
