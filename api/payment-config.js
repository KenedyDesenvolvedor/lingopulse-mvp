import { COIN_PACKS, formatBrl } from '../js/coin-packs.js';
import { json, requireMethod } from '../server/payment/http.js';

export default function handler(req, res) {
  if (!requireMethod(req, res, 'GET')) return;
  const enabled = Boolean(
    process.env.MP_ACCESS_TOKEN && process.env.MP_WEBHOOK_SECRET && process.env.APP_URL &&
    process.env.APP_SESSION_SECRET?.length >= 32 && process.env.SUPABASE_URL &&
    (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)
  );
  json(res, 200, {
    enabled,
    provider: 'mercado_pago',
    packs: COIN_PACKS.map(pack => ({ id: pack.id, name: pack.name, coins: pack.coins, price: formatBrl(pack.priceCents) }))
  });
}
