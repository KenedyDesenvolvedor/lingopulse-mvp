import { json, getPlayerId, handleError, requireMethod } from '../server/payment/http.js';
import { selectOne } from '../server/payment/supabase.js';

export default async function handler(req, res) {
  if (!requireMethod(req, res, 'GET')) return;
  try {
    const playerId = getPlayerId(req, res, true);
    const rows = await selectOne('lingopulse_coin_wallets', { player_id: `eq.${playerId}` }, 'balance');
    json(res, 200, { purchasedCoins: Number(rows?.[0]?.balance) || 0 });
  } catch (error) { handleError(res, error); }
}
