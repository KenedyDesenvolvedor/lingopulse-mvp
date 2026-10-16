import { randomUUID } from 'node:crypto';
import { COIN_PACKS, getCoinPack } from '../js/coin-packs.js';
import { getAppUrl, getPlayerId, handleError, json, readJson, requireMethod, requireSameOrigin } from '../server/payment/http.js';
import { callRpc, insertOne, patch } from '../server/payment/supabase.js';

export default async function handler(req, res) {
  if (!requireMethod(req, res, 'POST') || !requireSameOrigin(req, res)) return;
  try {
    if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
      throw Object.assign(new Error('Formato de requisição inválido.'), { statusCode: 415 });
    }
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) throw Object.assign(new Error('O checkout ainda não está configurado.'), { statusCode: 503 });
    const playerId = getPlayerId(req, res, true);
    const body = await readJson(req);
    const pack = getCoinPack(body.packId);
    if (!pack || !COIN_PACKS.includes(pack)) throw Object.assign(new Error('Pacote inválido.'), { statusCode: 400 });

    const rateLimit = await callRpc('guard_lingopulse_checkout', { p_player_id: playerId });
    const rateRow = Array.isArray(rateLimit) ? rateLimit[0] : rateLimit;
    if (!rateRow?.allowed) {
      const retryAfter = Math.max(1, Number(rateRow?.retry_after_seconds) || 300);
      return json(res, 429, { error: 'Muitas tentativas de checkout. Aguarde alguns minutos e tente novamente.' }, { 'Retry-After': String(retryAfter) });
    }

    const orderId = randomUUID();
    const appUrl = getAppUrl();
    await insertOne('lingopulse_coin_orders', {
      id: orderId,
      player_id: playerId,
      pack_id: pack.id,
      coin_amount: pack.coins,
      amount_cents: pack.priceCents,
      currency: 'BRL',
      status: 'pending'
    });

    const preferenceResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': orderId
      },
      body: JSON.stringify({
        items: [{ id: pack.id, title: `LingoPulse · ${pack.coins} LingoCoins`, quantity: 1, currency_id: 'BRL', unit_price: pack.priceCents / 100 }],
        external_reference: orderId,
        notification_url: `${appUrl}/api/mercadopago-webhook`,
        back_urls: {
          success: `${appUrl}/?payment=success&order_id=${orderId}`,
          pending: `${appUrl}/?payment=pending&order_id=${orderId}`,
          failure: `${appUrl}/?payment=failure&order_id=${orderId}`
        },
        auto_return: 'approved'
      })
    });
    const preference = await preferenceResponse.json().catch(() => ({}));
    if (!preferenceResponse.ok || !preference.init_point) {
      await patch('lingopulse_coin_orders', { id: `eq.${orderId}` }, { status: 'checkout_error' });
      throw Object.assign(new Error('O Mercado Pago não conseguiu abrir o checkout.'), { statusCode: 502 });
    }
    await patch('lingopulse_coin_orders', { id: `eq.${orderId}` }, { preference_id: preference.id });
    json(res, 200, { checkoutUrl: preference.init_point, orderId });
  } catch (error) { handleError(res, error); }
}
