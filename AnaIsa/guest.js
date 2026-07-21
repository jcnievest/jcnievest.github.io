/*
 * Punto de integración para invitaciones personalizadas.
 * En la siguiente etapa, resolveGuest(token) podrá consultar un JSON o endpoint
 * privado y devolver: { token, nombreVisible, lugaresAsignados, activo }.
 * Este archivo no contiene ni publica nombres de invitados.
 */
(function () {
  'use strict';

  const token = new URLSearchParams(window.location.search).get('i');

  function applyGuest(guest) {
    if (!guest || !guest.activo || !guest.nombreVisible) return;
    const panel = document.getElementById('guest-message');
    panel.querySelector('[data-guest-name]').textContent = guest.nombreVisible;
    panel.querySelector('[data-guest-seats]').textContent = guest.lugaresAsignados === 1
      ? '1 lugar reservado'
      : `${guest.lugaresAsignados} lugares reservados`;
    panel.hidden = false;

    const message = `Hola, confirmo mi asistencia a los XV años de Ana Isa. Mi nombre es ${guest.nombreVisible} y confirmo ______ lugares de los ${guest.lugaresAsignados} que tenemos reservados.`;
    document.getElementById('whatsapp-link').href = `https://wa.me/524421864483?text=${encodeURIComponent(message)}`;
  }

  async function resolveGuest() {
    // Integrar aquí la fuente de datos cuando se autorice la etapa de invitados.
    return null;
  }

  window.AnaIsaGuest = { token, applyGuest, resolveGuest };
  if (token) resolveGuest(token).then(applyGuest).catch(function () {
    // La invitación general continúa disponible si falla la personalización.
  });
}());
