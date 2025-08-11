(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Theme toggle
  const themeToggle = $('#theme-toggle');
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }
  themeToggle?.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  // Footer year
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Intersection animation
  const projects = $$('#project-grid .project');
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) e.target.classList.add('in-view');
  }, { rootMargin: '0px 0px -10% 0px' }) : null;
  projects.forEach((card) => io?.observe(card));

  // Search + filters
  const searchInput = $('#project-search');
  const filterRoot = $('#tech-filters');
  function applyFilter() {
    const q = (searchInput?.value || '').trim().toLowerCase();
    const actives = $$('#tech-filters input:checked').map((i) => i.value);
    projects.forEach((el) => {
      const hay = `${el.dataset.title} ${el.dataset.desc} ${el.dataset.tech}`;
      const matchesQuery = !q || hay.includes(q);
      const matchesTech = !actives.length || actives.every((t) => el.dataset.tech.includes(t));
      el.style.display = matchesQuery && matchesTech ? '' : 'none';
    });
  }
  searchInput?.addEventListener('input', applyFilter);
  filterRoot?.addEventListener('change', applyFilter);

  // Modal for project details
  const modal = $('#project-modal');
  const modalTitle = $('#modal-title');
  const modalDesc = $('#modal-desc');
  const modalImg = $('#modal-image');
  const modalTech = $('#modal-tech');
  const modalLive = $('#modal-live');
  const modalCode = $('#modal-code');
  let lastFocused = null;

  function openModal(slug) {
    lastFocused = document.activeElement;
    const card = $(`.project [data-slug="${CSS.escape(slug)}"]`)?.closest('.project');
    if (!card || !modal) return;
    modalTitle.textContent = $('.card-title', card)?.textContent || '';
    modalDesc.textContent = $('.card-desc', card)?.textContent || '';
    const img = $('img', card);
    if (img) {
      modalImg.src = img.src; modalImg.alt = img.alt; modalImg.hidden = false;
    } else { modalImg.hidden = true; }
    modalTech.innerHTML = '';
    (card.dataset.tech || '').split(' ').filter(Boolean).forEach((t) => {
      const li = document.createElement('li'); li.textContent = t; modalTech.appendChild(li);
    });
    const live = $('a.btn', card); const code = $('a.btn.btn-ghost', card);
    if (live) { modalLive.href = live.href; modalLive.hidden = false; } else modalLive.hidden = true;
    if (code) { modalCode.href = code.href; modalCode.hidden = false; } else modalCode.hidden = true;
    modal.showModal();
    modal.addEventListener('keydown', onModalKeydown);
  }
  function closeModal() {
    if (!modal) return;
    modal.close();
    modal.removeEventListener('keydown', onModalKeydown);
    lastFocused?.focus();
  }
  function onModalKeydown(e) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') trapFocus(e);
  }
  function trapFocus(e) {
    const focusables = $$('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])', modal).filter((el) => !el.hasAttribute('disabled'));
    if (!focusables.length) return;
    const first = focusables[0]; const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  }
  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-modal-open]');
    const closeBtn = e.target.closest('[data-modal-close]');
    if (openBtn) openModal(openBtn.dataset.slug);
    if (closeBtn || e.target === modal) closeModal();
  });

  // Simple prefetch on hover
  const prefetch = (url) => {
    try { const link = Object.assign(document.createElement('link'), { rel: 'prefetch', href: url }); document.head.appendChild(link); } catch (e) {}
  };
  document.addEventListener('mouseover', (e) => {
    const a = e.target.closest('a[href^="http"]'); if (a) prefetch(a.href);
  }, { passive: true });
})();

