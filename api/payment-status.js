import { getPlayerId, handleError, json, requireMethod } from '../server/payment/http.js';
import { selectOne } from '../server/payment/supabase.js';

export default async function handler(req, res) {
  if (!requireMethod(req, res, 'GET')) return;
  try {
    const playerId = getPlayerId(req, res, false);
    const orderId = new URL(req.url, 'http://localhost').searchParams.get('order_id');
    if (!playerId || !orderId || !/^[0-9a-f-]{36}$/i.test(orderId)) {
      return json(res, 404, { error: 'Compra não encontrada.' });
    }
    const rows = await selectOne('lingopulse_coin_orders', { id: `eq.${orderId}`, player_id: `eq.${playerId}` }, 'id,coin_amount,status');
    if (!rows?.length) return json(res, 404, { error: 'Compra não encontrada.' });
    json(res, 200, { orderId: rows[0].id, status: rows[0].status, coins: Number(rows[0].coin_amount) || 0 });
  } catch (error) { handleError(res, error); }
}
