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
  const numberHeading = document.getElementById('number-heading');
  const sortIndicator = document.getElementById('sort-indicator');
  let token = '';
  let currentRsvps = [];
  let sortDirection = 'desc';

  function formatDate(value) {
    return new Intl.DateTimeFormat('es-MX', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(value));
  }

  function registrationNumbers(items) {
    const ordered = items.slice().sort(function (a, b) {
      const dateDifference = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (dateDifference !== 0) return dateDifference;
      return String(a.id || a.phone).localeCompare(String(b.id || b.phone));
    });
    const numbers = new Map();
    ordered.forEach(function (item, index) {
      numbers.set(item.id || item.phone, index + 1);
    });
    return numbers;
  }

  function orderedRsvps(items, numbers) {
    const direction = sortDirection === 'asc' ? 1 : -1;
    return items.slice().sort(function (a, b) {
      return (numbers.get(a.id || a.phone) - numbers.get(b.id || b.phone)) * direction;
    });
  }

  function updateSortControl() {
    const ascending = sortDirection === 'asc';
    numberHeading.setAttribute('aria-sort', ascending ? 'ascending' : 'descending');
    sortIndicator.textContent = ascending ? '↑' : '↓';
  }

  function render(data) {
    currentRsvps = data.rsvps || [];
    const numbers = registrationNumbers(currentRsvps);
    const rsvps = orderedRsvps(currentRsvps, numbers);
    totalConfirmations.textContent = String(data.totalConfirmations || 0);
    totalPeople.textContent = String(data.totalPeople || 0);
    list.replaceChildren();
    updateSortControl();

    rsvps.forEach(function (item) {
      const row = document.createElement('tr');
      [String(numbers.get(item.id || item.phone)), item.name, String(item.partySize), item.phone, formatDate(item.updatedAt)].forEach(function (value) {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });
      list.appendChild(row);
    });

    if (!data.rsvps || !data.rsvps.length) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 5;
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

  document.getElementById('sort-by-number').addEventListener('click', function () {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    render({
      rsvps: currentRsvps,
      totalConfirmations: currentRsvps.length,
      totalPeople: currentRsvps.reduce(function (sum, item) { return sum + Number(item.partySize || 0); }, 0)
    });
  });

  document.getElementById('close-session').addEventListener('click', function () {
    token = '';
    document.getElementById('admin-token').value = '';
    dashboard.hidden = true;
    login.hidden = false;
  });
}());
