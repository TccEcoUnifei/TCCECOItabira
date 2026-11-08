(function () {
  'use strict';

  // ----- Menu mobile -----
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('menu');

  function closeMenu() {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeMenu();
  });

  // ----- Destaque da seção ativa no menu -----
  var links = Array.prototype.slice.call(menu.querySelectorAll('a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function setActive() {
    var y = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function (s) { if (s.offsetTop <= y) current = s; });
    // Final da página: ativa a última seção
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }
    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current.id);
    });
  }
  window.addEventListener('scroll', setActive, { passive: true });
  window.addEventListener('resize', setActive);
  setActive();

  // ----- Datas: marca as passadas e a próxima de cada lista -----
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  document.querySelectorAll('.timeline').forEach(function (list) {
    var nextFound = false;
    list.querySelectorAll('li[data-date]').forEach(function (li) {
      var p = li.dataset.date.split('-');
      var d = new Date(+p[0], +p[1] - 1, +p[2]);
      if (d < today) {
        li.classList.add('past');
      } else if (!nextFound) {
        li.classList.add('next');
        nextFound = true;
      }
    });
  });

  // ----- Ano no rodapé -----
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
