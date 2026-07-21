(function () {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const opening = document.getElementById('opening');
  const openButton = document.getElementById('open-invitation');

  try {
    root.classList.replace('no-js', 'js');
    if (opening && openButton) {
      body.classList.add('is-locked');
      openButton.addEventListener('click', function () {
        opening.classList.add('is-hidden');
        body.classList.remove('is-locked');
      });
    }
  } catch (error) {
    body.classList.remove('is-locked');
  }

  try {
    const target = new Date('2026-10-03T17:00:00-06:00').getTime();
    const countdown = document.getElementById('countdown');
    const finished = document.getElementById('countdown-finished');
    const fields = {
      days: document.querySelector('[data-days]'), hours: document.querySelector('[data-hours]'),
      minutes: document.querySelector('[data-minutes]'), seconds: document.querySelector('[data-seconds]')
    };
    function updateCountdown() {
      const distance = Math.max(0, target - Date.now());
      if (!countdown || !finished || Object.values(fields).some(function (field) { return !field; })) return false;
      if (distance === 0) { countdown.hidden = true; finished.hidden = false; return false; }
      fields.days.textContent = String(Math.floor(distance / 86400000)).padStart(2, '0');
      fields.hours.textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, '0');
      fields.minutes.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, '0');
      fields.seconds.textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, '0');
      return true;
    }
    if (updateCountdown()) window.setInterval(updateCountdown, 1000);
  } catch (error) {
    const countdown = document.getElementById('countdown');
    if (countdown) countdown.hidden = true;
  }

  try {
    const player = document.getElementById('music-player');
    const loadMusic = document.getElementById('load-music');
    if (player && loadMusic) {
      loadMusic.addEventListener('click', function () {
        const iframe = document.createElement('iframe');
        iframe.title = 'La Bella y la Bestia en Apple Music';
        iframe.loading = 'lazy';
        iframe.allow = 'autoplay *; encrypted-media *; fullscreen *; clipboard-write';
        iframe.sandbox = 'allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation';
        iframe.src = 'https://embed.music.apple.com/mx/album/la-bella-y-la-bestia/1444045745?i=1444046551';
        player.replaceChildren(iframe);
      }, { once: true });
    }
  } catch (error) {
    // El enlace alternativo de Apple Music permanece disponible.
  }

  try {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = document.querySelectorAll('.reveal');
    root.classList.add('reveal-ready');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      reveals.forEach(function (element) { element.classList.add('is-visible'); });
    } else {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
        });
      }, { rootMargin: '120px 0px', threshold: 0.05 });
      reveals.forEach(function (element) { observer.observe(element); });
    }
  } catch (error) {
    root.classList.remove('reveal-ready');
  }

  try {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        registrations.forEach(function (registration) {
          if (registration.scope.indexOf('/AnaIsa/') !== -1) registration.unregister();
        });
      }).catch(function () {});
    }
  } catch (error) {
    // No se necesita service worker para que la invitación funcione.
  }
}());
