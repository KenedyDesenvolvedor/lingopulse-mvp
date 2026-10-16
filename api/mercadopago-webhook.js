import { createHmac, timingSafeEqual } from 'node:crypto';
import { callRpc, selectOne } from '../server/payment/supabase.js';

const MAX_WEBHOOK_BODY_BYTES = 8 * 1024;

export function verifySignature(req, dataId, secret) {
  const signature = req.headers['x-signature'];
  const requestId = req.headers['x-request-id'];
  if (typeof signature !== 'string' || typeof requestId !== 'string' || !dataId) return false;
  const fields = Object.fromEntries(signature.split(',').map(part => part.trim().split('=', 2)));
  if (!/^\d{1,16}$/.test(fields.ts || '') || !/^[0-9a-f]{64}$/i.test(fields.v1 || '')) return false;
  const manifest = `id:${String(dataId).toLowerCase()};request-id:${requestId};ts:${fields.ts};`;
  const expected = createHmac('sha256', secret).update(manifest).digest();
  let received;
  try { received = Buffer.from(fields.v1, 'hex'); } catch { return false; }
  return received.length === expected.length && timingSafeEqual(received, expected);
}

function webhookDataId(req, body) {
  return new URL(req.url, 'http://localhost').searchParams.get('data.id') || body?.data?.id || null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    return res.end('Method not allowed.');
  }
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    const webhookSecret = process.env.MP_WEBHOOK_SECRET;
    if (!accessToken || !webhookSecret) throw Object.assign(new Error('Webhook ainda não configurado.'), { statusCode: 503 });
    let body = req.body && typeof req.body === 'object' ? req.body : {};
    if (!Object.keys(body).length) {
      try {
        const chunks = [];
        let bytes = 0;
        for await (const chunk of req) {
          bytes += chunk.length;
          if (bytes > MAX_WEBHOOK_BODY_BYTES) {
            res.statusCode = 413;
            return res.end('Payload too large.');
          }
          chunks.push(chunk);
        }
        body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {};
      } catch { return res.end(''); }
    }
    const type = body.type || new URL(req.url, 'http://localhost').searchParams.get('topic');
    if (type !== 'payment') return res.end('');
    const paymentId = webhookDataId(req, body);
    if (!verifySignature(req, paymentId, webhookSecret)) {
      res.statusCode = 401;
      return res.end('Invalid signature.');
    }

    const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!paymentResponse.ok) throw Object.assign(new Error('Não foi possível consultar o pagamento.'), { statusCode: 503 });
    const payment = await paymentResponse.json();
    const orderId = payment.external_reference;
    if (!orderId || !/^[0-9a-f-]{36}$/i.test(orderId)) return res.end('');
    const rows = await selectOne('lingopulse_coin_orders', { id: `eq.${orderId}` }, 'id,amount_cents,currency,status,mp_payment_id');
    const order = rows?.[0];
    if (!order || String(payment.id) !== String(paymentId)) return res.end('');

    if (payment.status === 'approved') {
      const amountCents = Math.round(Number(payment.transaction_amount) * 100);
      if (payment.currency_id !== order.currency || amountCents !== Number(order.amount_cents)) return res.end('');
      await callRpc('fulfill_lingopulse_coin_order', {
        p_order_id: order.id,
        p_payment_id: String(payment.id),
        p_amount_cents: amountCents,
        p_currency: payment.currency_id
      });
    } else if (['refunded', 'charged_back'].includes(payment.status) && order.status === 'approved' && String(order.mp_payment_id) === String(payment.id)) {
      await callRpc('reverse_lingopulse_coin_order', { p_order_id: order.id, p_payment_id: String(payment.id) });
    }
    res.statusCode = 200;
    res.end('OK');
  } catch (error) {
    const statusCode = Number(error?.statusCode) || 500;
    if (statusCode >= 500) console.error('LingoPulse webhook error:', error?.message || error);
    res.statusCode = statusCode;
    res.end(statusCode === 503 ? 'Temporarily unavailable.' : 'Webhook processing failed.');
  }
}
