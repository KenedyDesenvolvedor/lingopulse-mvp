import { getPlayerId, handleError, json, requireMethod } from '../server/payment/http.js';
import { selectMany } from '../server/payment/supabase.js';

export default async function handler(req, res) {
  if (!requireMethod(req, res, 'GET')) return;
  try {
    const playerId = getPlayerId(req, res, false);
    if (!playerId) return json(res, 401, { error: 'Sessão de jogo inválida.' });
    const grants = await selectMany('lingopulse_life_grants', { player_id: `eq.${playerId}`, redeemed_at: 'is.null' }, 'id,created_at');
    json(res, 200, { grants: Array.isArray(grants) ? grants : [] });
  } catch (error) { handleError(res, error); }
}
