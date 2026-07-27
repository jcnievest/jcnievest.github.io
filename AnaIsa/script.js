(function () {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const openButtons = document.querySelectorAll('#open-invitation');

  try {
    root.classList.replace('no-js', 'js');
    if (openButtons.length) {
      body.classList.add('is-locked');
      openButtons.forEach(function (openButton) {
        openButton.addEventListener('click', function () {
          const opening = openButton.closest('.opening');
          if (opening) opening.classList.add('is-hidden');
          body.classList.remove('is-locked');
        });
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
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpStatus = document.getElementById('rsvp-status');
    const rsvpSuccess = document.getElementById('rsvp-success');
    const whatsappLink = document.getElementById('whatsapp-link');
    const rsvpEndpoint = 'https://rsvp.juancarlosnieves.mx/api/rsvp';

    if (rsvpForm && rsvpStatus && rsvpSuccess && whatsappLink) {
      rsvpForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        rsvpStatus.textContent = '';

        if (!rsvpForm.checkValidity()) {
          rsvpForm.reportValidity();
          return;
        }

        const data = new FormData(rsvpForm);
        const payload = {
          name: String(data.get('name') || '').trim(),
          partySize: Number(data.get('partySize')),
          phone: String(data.get('phone') || '').trim(),
          confirmed: data.get('confirmed') === 'true',
          website: String(data.get('website') || ''),
          invitationToken: window.AnaIsaGuest ? window.AnaIsaGuest.token : null
        };

        rsvpForm.classList.add('is-sending');
        rsvpStatus.textContent = 'Guardando tu confirmación…';

        try {
          const response = await fetch(rsvpEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const result = await response.json().catch(function () { return {}; });
          if (!response.ok) throw new Error(result.message || 'No fue posible guardar la confirmación.');

          const whatsappMessage = `Hola, les aviso que ya registré mi confirmación para los XV años de Ana Isa. Nombre: ${payload.name}. Asistiremos: ${payload.partySize} persona${payload.partySize === 1 ? '' : 's'}.`;
          whatsappLink.href = `https://wa.me/524421864483?text=${encodeURIComponent(whatsappMessage)}`;
          rsvpForm.hidden = true;
          rsvpSuccess.hidden = false;
          rsvpSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (error) {
          rsvpStatus.textContent = error.message || 'Ocurrió un problema. Intenta nuevamente.';
        } finally {
          rsvpForm.classList.remove('is-sending');
        }
      });
    }
  } catch (error) {
    // El formulario permanece visible si el navegador no admite alguna función.
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
