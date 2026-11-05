(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  var top = document.getElementById('top');
  function onScroll() { top.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var targets = document.querySelectorAll('.block-head, .offer, .skill, .timeline li, .split > *, .contact-inner > *');
  targets.forEach(function (el) { el.classList.add('reveal'); });

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (e.target.dataset.d || 0) + 'ms';
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  // gestaffelt innerhalb einer Gruppe
  document.querySelectorAll('.offers, .skills').forEach(function (g) {
    g.querySelectorAll('.reveal').forEach(function (el, i) { el.dataset.d = i * 90; });
  });
  targets.forEach(function (el) { io.observe(el); });
})();
