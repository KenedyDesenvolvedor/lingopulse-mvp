import { getPlayerId, handleError, json, readJson, requireMethod, requireSameOrigin } from '../server/payment/http.js';
import { callRpc } from '../server/payment/supabase.js';

const LIFE_REFILL_COST = 15;

export default async function handler(req, res) {
  if (!requireMethod(req, res, 'POST') || !requireSameOrigin(req, res)) return;
  try {
    if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
      return json(res, 415, { error: 'Formato de requisição inválido.' });
    }
    const playerId = getPlayerId(req, res, false);
    if (!playerId) return json(res, 401, { error: 'Sessão de jogo inválida.' });
    const body = await readJson(req);
    if (body.purchase !== 'life') return json(res, 400, { error: 'Compra inválida.' });
    // The server chooses the price. Never trust a coin amount supplied by the browser.
    const result = await callRpc('spend_lingopulse_paid_coins', { p_player_id: playerId, p_amount: LIFE_REFILL_COST });
    const row = Array.isArray(result) ? result[0] : result;
    if (!row?.spent) return json(res, 409, { error: 'Saldo comprado insuficiente.', purchasedCoins: Number(row?.balance) || 0 });
    json(res, 200, { ok: true, purchasedCoins: Number(row.balance) || 0, lifeGrantId: row.life_grant_id });
  } catch (error) { handleError(res, error); }
}
