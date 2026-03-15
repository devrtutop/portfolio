(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var navLinks = document.querySelector('.nav-links');
  var navToggle = document.querySelector('.nav-toggle');
  var sections = document.querySelectorAll('section[id]');
  var yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('is-open');
    });

    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function setActiveLink() {
    var scrollY = window.scrollY || window.pageYOffset;
    var innerHeight = window.innerHeight;
    var threshold = innerHeight * 0.35;

    var current = null;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      if (scrollY >= top - threshold && scrollY < top + height - threshold) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        var id = href.slice(1);
        if (id === current) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  window.addEventListener('resize', setActiveLink);
  setActiveLink();
})();
