(function () {
  'use strict';

  const body = document.body;
  const opening = document.getElementById('opening');
  const openButton = document.getElementById('open-invitation');
  const musicButton = document.getElementById('music-control');
  const music = document.getElementById('music');
  const toast = document.getElementById('toast');
  let toastTimer;
  let musicAvailable = true;

  body.classList.add('is-locked');

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
  }

  openButton.addEventListener('click', () => {
    opening.classList.add('is-hidden');
    body.classList.remove('is-locked');
    musicButton.focus({ preventScroll: true });
  });

  music.addEventListener('error', () => {
    musicAvailable = false;
    musicButton.classList.remove('is-playing');
    musicButton.setAttribute('aria-pressed', 'false');
    musicButton.querySelector('.music-control__label').textContent = 'Música pendiente';
  });

  musicButton.addEventListener('click', async () => {
    if (!musicAvailable || music.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      showToast('La pista autorizada se agregará próximamente.');
      return;
    }
    if (music.paused) {
      try {
        await music.play();
        musicButton.classList.add('is-playing');
        musicButton.setAttribute('aria-pressed', 'true');
        musicButton.setAttribute('aria-label', 'Pausar música');
      } catch (_) {
        musicAvailable = false;
        showToast('La pista autorizada se agregará próximamente.');
      }
    } else {
      music.pause();
      musicButton.classList.remove('is-playing');
      musicButton.setAttribute('aria-pressed', 'false');
      musicButton.setAttribute('aria-label', 'Reproducir música');
    }
  });

  const target = new Date('2026-10-04T00:00:00-06:00').getTime();
  const countdown = document.getElementById('countdown');
  const finished = document.getElementById('countdown-finished');
  const fields = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
  };

  function updateCountdown() {
    const distance = Math.max(0, target - Date.now());
    if (distance === 0) {
      countdown.hidden = true;
      finished.hidden = false;
      return false;
    }
    fields.days.textContent = String(Math.floor(distance / 86400000)).padStart(2, '0');
    fields.hours.textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, '0');
    fields.minutes.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, '0');
    fields.seconds.textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, '0');
    return true;
  }

  if (updateCountdown()) window.setInterval(updateCountdown, 1000);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    reveals.forEach((element) => observer.observe(element));
  }
}());
