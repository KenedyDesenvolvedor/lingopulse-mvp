function supabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw Object.assign(new Error('O armazenamento seguro de pagamentos ainda não foi configurado.'), { statusCode: 503 });
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) {
    throw Object.assign(new Error('SUPABASE_URL precisa usar HTTPS.'), { statusCode: 503 });
  }
  return { base: `${parsed.origin}/rest/v1`, key };
}

async function request(path, { method = 'GET', body, prefer } = {}) {
  const { base, key } = supabaseConfig();
  const response = await fetch(`${base}/${path}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {})
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) })
  });
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = null; }
  if (!response.ok) {
    console.error('Supabase request failed:', response.status, data?.message || response.statusText);
    throw Object.assign(new Error('O armazenamento de pagamentos retornou um erro.'), { statusCode: 503 });
  }
  return data;
}

export function selectOne(table, filters, columns = '*') {
  const params = new URLSearchParams({ select: columns, ...filters, limit: '1' });
  return request(`${table}?${params}`);
}

export function selectMany(table, filters, columns = '*') {
  const params = new URLSearchParams({ select: columns, ...filters });
  return request(`${table}?${params}`);
}

export function insertOne(table, row) {
  return request(table, { method: 'POST', body: row, prefer: 'return=representation' });
}

export function patch(table, filters, values) {
  const params = new URLSearchParams(filters);
  return request(`${table}?${params}`, { method: 'PATCH', body: values, prefer: 'return=minimal' });
}

export function callRpc(name, args) {
  return request(`rpc/${name}`, { method: 'POST', body: args });
}
