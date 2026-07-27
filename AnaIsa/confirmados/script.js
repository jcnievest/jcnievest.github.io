(function () {
  'use strict';

  const endpoint = 'https://rsvp.juancarlosnieves.mx/api/admin/rsvps';
  const login = document.getElementById('admin-login');
  const loginForm = document.getElementById('admin-login-form');
  const loginStatus = document.getElementById('admin-login-status');
  const dashboard = document.getElementById('admin-dashboard');
  const status = document.getElementById('admin-status');
  const list = document.getElementById('rsvp-list');
  const totalConfirmations = document.getElementById('total-confirmations');
  const totalPeople = document.getElementById('total-people');
  let token = '';

  function formatDate(value) {
    return new Intl.DateTimeFormat('es-MX', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(value));
  }

  function render(data) {
    totalConfirmations.textContent = String(data.totalConfirmations || 0);
    totalPeople.textContent = String(data.totalPeople || 0);
    list.replaceChildren();

    (data.rsvps || []).forEach(function (item) {
      const row = document.createElement('tr');
      [item.name, String(item.partySize), item.phone, formatDate(item.updatedAt)].forEach(function (value) {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });
      list.appendChild(row);
    });

    if (!data.rsvps || !data.rsvps.length) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 4;
      cell.textContent = 'Aún no hay confirmaciones.';
      row.appendChild(cell);
      list.appendChild(row);
    }
  }

  async function loadRsvps() {
    status.textContent = 'Actualizando…';
    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json().catch(function () { return {}; });
    if (!response.ok) throw new Error(data.message || 'No fue posible consultar la lista.');
    render(data);
    status.textContent = `Última actualización: ${new Date().toLocaleTimeString('es-MX')}`;
  }

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    token = document.getElementById('admin-token').value;
    loginStatus.textContent = 'Verificando…';
    try {
      await loadRsvps();
      login.hidden = true;
      dashboard.hidden = false;
      loginStatus.textContent = '';
    } catch (error) {
      token = '';
      loginStatus.textContent = error.message;
    }
  });

  document.getElementById('refresh-list').addEventListener('click', function () {
    loadRsvps().catch(function (error) { status.textContent = error.message; });
  });

  document.getElementById('close-session').addEventListener('click', function () {
    token = '';
    document.getElementById('admin-token').value = '';
    dashboard.hidden = true;
    login.hidden = false;
  });
}());

