import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { COIN_PACKS, formatBrl, getCoinPack } from '../js/coin-packs.js';
import { verifySignature } from '../api/mercadopago-webhook.js';
import createPayment from '../api/create-payment.js';
import spendCoins from '../api/spend-coins.js';
import { getPlayerId, requireSameOrigin } from '../server/payment/http.js';

test('catálogo tem pacotes e valores aprovados pelo usuário', () => {
  assert.deepEqual(COIN_PACKS.map(({ id, coins, priceCents }) => ({ id, coins, priceCents })), [
    { id: 'starter', coins: 50, priceCents: 490 },
    { id: 'practice', coins: 150, priceCents: 990 },
    { id: 'immersion', coins: 400, priceCents: 1990 }
  ]);
  assert.equal(formatBrl(490), 'R$ 4,90');
  assert.equal(getCoinPack('practice').coins, 150);
  assert.equal(getCoinPack('unknown'), null);
});

test('assinatura do webhook exige HMAC válido e detecta alteração do pedido', () => {
  const secret = 'teste-secreto-webhook';
  const dataId = '123456789';
  const requestId = 'request-abc';
  const timestamp = '1792150000';
  const manifest = `id:${dataId};request-id:${requestId};ts:${timestamp};`;
  const v1 = createHmac('sha256', secret).update(manifest).digest('hex');
  const req = { headers: { 'x-signature': `ts=${timestamp},v1=${v1}`, 'x-request-id': requestId } };
  assert.equal(verifySignature(req, dataId, secret), true);
  assert.equal(verifySignature(req, '987654321', secret), false);
  assert.equal(verifySignature({ headers: {} }, dataId, secret), false);
  assert.equal(verifySignature({ headers: { ...req.headers, 'x-signature': `ts=x,v1=${v1}` } }, dataId, secret), false);
});

test('sessão assinada rejeita cookies adulterados e usa cookie HttpOnly', () => {
  const previousSecret = process.env.APP_SESSION_SECRET;
  const previousVercel = process.env.VERCEL;
  process.env.APP_SESSION_SECRET = 's'.repeat(40);
  process.env.VERCEL = '1';
  try {
    const response = { headers: {}, setHeader(name, value) { this.headers[name] = value; } };
    const playerId = getPlayerId({ headers: {} }, response, true);
    const cookie = response.headers['Set-Cookie'];
    assert.match(cookie, /HttpOnly/);
    assert.match(cookie, /SameSite=Lax/);
    assert.match(cookie, /Secure/);
    assert.equal(getPlayerId({ headers: { cookie } }, {}, false), playerId);
    const cookieValue = cookie.split(';')[0];
    const [name, value] = cookieValue.split('=');
    const [id, signature] = value.split('.');
    const tamperedCookie = `${name}=${id}.${signature.slice(0, -1)}x`;
    assert.equal(getPlayerId({ headers: { cookie: tamperedCookie } }, {}, false), null);
  } finally {
    if (previousSecret === undefined) delete process.env.APP_SESSION_SECRET;
    else process.env.APP_SESSION_SECRET = previousSecret;
    if (previousVercel === undefined) delete process.env.VERCEL;
    else process.env.VERCEL = previousVercel;
  }
});

test('endpoints de compra bloqueiam origem externa', () => {
  const response = { headers: {}, setHeader(name, value) { this.headers[name] = value; }, end(body) { this.body = body; } };
  const allowed = requireSameOrigin({ headers: { origin: 'https://lingopulse.example', host: 'lingopulse.example', 'x-forwarded-proto': 'https' } }, response);
  assert.equal(allowed, true);
  const blocked = requireSameOrigin({ headers: { origin: 'https://attacker.example', host: 'lingopulse.example', 'x-forwarded-proto': 'https' } }, response);
  assert.equal(blocked, false);
  assert.equal(response.statusCode, 403);
});

test('servidor cobra sempre 15 moedas compradas por vida, mesmo com valor adulterado', async () => {
  const envNames = ['APP_SESSION_SECRET', 'SUPABASE_URL', 'SUPABASE_SECRET_KEY'];
  const saved = Object.fromEntries(envNames.map(name => [name, process.env[name]]));
  const originalFetch = globalThis.fetch;
  process.env.APP_SESSION_SECRET = 's'.repeat(40);
  process.env.SUPABASE_URL = 'https://database.example';
  process.env.SUPABASE_SECRET_KEY = 'secret-test-key';
  let rpcBody;
  globalThis.fetch = async (url, options = {}) => {
    assert.match(String(url), /rpc\/spend_lingopulse_paid_coins$/);
    rpcBody = JSON.parse(options.body);
    return new Response(JSON.stringify([{ balance: 85, spent: true, life_grant_id: '123e4567-e89b-12d3-a456-426614174000' }]), { status: 200 });
  };
  const cookieResponse = { headers: {}, setHeader(name, value) { this.headers[name] = value; } };
  const playerId = getPlayerId({ headers: {} }, cookieResponse, true);
  const response = { headers: {}, setHeader(name, value) { this.headers[name] = value; }, end(body) { this.body = body; } };
  try {
    await spendCoins({
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000', host: 'localhost:3000', 'content-type': 'application/json',
        cookie: cookieResponse.headers['Set-Cookie']
      },
      body: { purchase: 'life', amount: 1 }
    }, response);
    assert.equal(response.statusCode, 200);
    assert.equal(rpcBody.p_player_id, playerId);
    assert.equal(rpcBody.p_amount, 15);
    assert.equal(JSON.parse(response.body).purchasedCoins, 85);
  } finally {
    for (const name of envNames) {
      if (saved[name] === undefined) delete process.env[name];
      else process.env[name] = saved[name];
    }
    globalThis.fetch = originalFetch;
  }
});

test('checkout usa catálogo fixo do servidor e ignora preço e moedas enviados pelo navegador', async () => {
  const envNames = ['MP_ACCESS_TOKEN', 'APP_SESSION_SECRET', 'SUPABASE_URL', 'SUPABASE_SECRET_KEY', 'SUPABASE_SERVICE_ROLE_KEY', 'APP_URL'];
  const saved = Object.fromEntries(envNames.map(name => [name, process.env[name]]));
  const originalFetch = globalThis.fetch;
  process.env.MP_ACCESS_TOKEN = 'token-de-teste';
  process.env.APP_SESSION_SECRET = 's'.repeat(40);
  process.env.SUPABASE_URL = 'https://database.example';
  process.env.SUPABASE_SECRET_KEY = 'secret-test-key';
  process.env.APP_URL = 'https://lingopulse.example';
  let insertedOrder;
  let preferenceSent;
  globalThis.fetch = async (url, options = {}) => {
    const destination = String(url);
    if (destination.includes('/rpc/guard_lingopulse_checkout')) {
      return new Response(JSON.stringify([{ allowed: true, retry_after_seconds: 0 }]), { status: 200 });
    }
    if (destination.includes('/rest/v1/lingopulse_coin_orders') && options.method === 'POST') {
      insertedOrder = JSON.parse(options.body);
      return new Response(JSON.stringify([insertedOrder]), { status: 201 });
    }
    if (destination === 'https://api.mercadopago.com/checkout/preferences') {
      preferenceSent = JSON.parse(options.body);
      return new Response(JSON.stringify({ id: 'pref-test', init_point: 'https://www.mercadopago.com.br/checkout/test' }), { status: 201 });
    }
    if (destination.includes('/rest/v1/lingopulse_coin_orders') && options.method === 'PATCH') {
      return new Response(null, { status: 204 });
    }
    throw new Error(`Unexpected fetch in test: ${destination}`);
  };
  const response = { headers: {}, setHeader(name, value) { this.headers[name] = value; }, end(body) { this.body = body; } };
  try {
    await createPayment({
      method: 'POST',
      url: '/api/create-payment',
      headers: { origin: 'http://localhost:3000', host: 'localhost:3000', 'content-type': 'application/json' },
      body: { packId: 'starter', coins: 999999, amount: 1, priceCents: 1 }
    }, response);
    assert.equal(response.statusCode, 200);
    assert.equal(insertedOrder.coin_amount, 50);
    assert.equal(insertedOrder.amount_cents, 490);
    assert.equal(preferenceSent.items[0].unit_price, 4.9);
    assert.equal(preferenceSent.items[0].title, 'LingoPulse · 50 LingoCoins');
    assert.match(response.body, /mercadopago\.com\.br/);
  } finally {
    for (const name of envNames) {
      if (saved[name] === undefined) delete process.env[name];
      else process.env[name] = saved[name];
    }
    globalThis.fetch = originalFetch;
  }
});

test('crédito de compra usa RPC transacional com bloqueio e pagamento único', async () => {
  const { readFile } = await import('node:fs/promises');
  const schema = await readFile(new URL('../supabase/schema.sql', import.meta.url), 'utf8');
  assert.match(schema, /fulfill_lingopulse_coin_order/);
  assert.match(schema, /for update/i);
  assert.match(schema, /mp_payment_id text unique/i);
  assert.match(schema, /balance = public\.lingopulse_coin_wallets\.balance \+ excluded\.balance/);
  assert.match(schema, /spend_lingopulse_paid_coins/);
  assert.match(schema, /if p_amount <> 15 then raise exception 'unsupported_purchase'/);
  assert.match(schema, /reverse_lingopulse_coin_order/);
  assert.match(schema, /guard_lingopulse_checkout/);
  assert.match(schema, /where id = p_grant_id and player_id = p_player_id and redeemed_at is null/);
  assert.match(schema, /attempt_count >= 3/);
});
