const ALLOWED_ORIGINS = new Set([
  'https://juancarlosnieves.mx',
  'https://www.juancarlosnieves.mx',
  'https://jcnievest.github.io'
]);

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.has(origin) ? origin : 'https://juancarlosnieves.mx',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(origin),
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

function cleanPhone(value) {
  return String(value || '').replace(/\D/g, '');
}

function authorized(request, env) {
  const header = request.headers.get('Authorization') || '';
  return env.ADMIN_TOKEN && header === `Bearer ${env.ADMIN_TOKEN}`;
}

async function saveRsvp(request, env, origin) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ message: 'La información enviada no es válida.' }, 400, origin);
  }

  if (body.website) return json({ ok: true }, 200, origin);

  const name = String(body.name || '').trim().replace(/\s+/g, ' ');
  const partySize = Number(body.partySize);
  const phone = cleanPhone(body.phone);
  const confirmed = body.confirmed === true;
  const invitationToken = body.invitationToken ? String(body.invitationToken).slice(0, 100) : null;

  if (name.length < 3 || name.length > 100) {
    return json({ message: 'Escribe un nombre válido.' }, 400, origin);
  }
  if (!Number.isInteger(partySize) || partySize < 1 || partySize > 20) {
    return json({ message: 'El número de personas debe estar entre 1 y 20.' }, 400, origin);
  }
  if (phone.length < 10 || phone.length > 15) {
    return json({ message: 'Escribe un número de celular válido.' }, 400, origin);
  }
  if (!confirmed) {
    return json({ message: 'Marca la confirmación de asistencia.' }, 400, origin);
  }

  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  await env.DB.prepare(`
    INSERT INTO rsvps (id, name, party_size, phone, confirmed, invitation_token, created_at, updated_at)
    VALUES (?, ?, ?, ?, 1, ?, ?, ?)
    ON CONFLICT(phone) DO UPDATE SET
      name = excluded.name,
      party_size = excluded.party_size,
      confirmed = 1,
      invitation_token = excluded.invitation_token,
      updated_at = excluded.updated_at
  `).bind(id, name, partySize, phone, invitationToken, now, now).run();

  return json({ ok: true, message: 'Confirmación registrada.' }, 201, origin);
}

async function listRsvps(request, env, origin) {
  if (!authorized(request, env)) {
    return json({ message: 'Clave incorrecta.' }, 401, origin);
  }

  const rows = await env.DB.prepare(`
    SELECT id, name, party_size AS partySize, phone, confirmed,
           invitation_token AS invitationToken, created_at AS createdAt, updated_at AS updatedAt
    FROM rsvps
    WHERE confirmed = 1
    ORDER BY updated_at DESC
  `).all();

  const rsvps = rows.results || [];
  const totalPeople = rsvps.reduce((sum, item) => sum + Number(item.partySize || 0), 0);
  return json({ totalConfirmations: rsvps.length, totalPeople, rsvps }, 200, origin);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      if (!ALLOWED_ORIGINS.has(origin)) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method === 'POST' && url.pathname === '/api/rsvp') {
      if (!ALLOWED_ORIGINS.has(origin)) return json({ message: 'Origen no autorizado.' }, 403, origin);
      return saveRsvp(request, env, origin);
    }

    if (request.method === 'GET' && url.pathname === '/api/admin/rsvps') {
      if (!ALLOWED_ORIGINS.has(origin)) return json({ message: 'Origen no autorizado.' }, 403, origin);
      return listRsvps(request, env, origin);
    }

    if (request.method === 'GET' && url.pathname === '/api/health') {
      return json({ ok: true }, 200, origin);
    }

    return json({ message: 'No encontrado.' }, 404, origin);
  }
};

