async function apiRequest(path, options) {
  const response = await fetch(path, {
    credentials: 'same-origin',
    cache: 'no-store',
    ...options,
    headers: { ...(options?.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Não foi possível comunicar com o serviço de pagamentos.');
  return data;
}

export function getPaymentConfig() {
  return apiRequest('/api/payment-config', { method: 'GET' });
}

export function getPurchasedCoinBalance() {
  return apiRequest('/api/wallet', { method: 'GET' });
}

export function createCoinCheckout(packId) {
  return apiRequest('/api/create-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ packId })
  });
}

export function getPaymentStatus(orderId) {
  return apiRequest(`/api/payment-status?order_id=${encodeURIComponent(orderId)}`, { method: 'GET' });
}

export function spendPurchasedCoinsOnLife() {
  return apiRequest('/api/spend-coins', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ purchase: 'life' })
  });
}

export function getPendingLifeGrants() {
  return apiRequest('/api/life-grants', { method: 'GET' });
}

export function acknowledgeLifeGrant(grantId) {
  return apiRequest('/api/ack-life-grant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ grantId })
  });
}
