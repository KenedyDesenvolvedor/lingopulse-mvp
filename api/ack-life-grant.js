import { getPlayerId, handleError, json, readJson, requireMethod, requireSameOrigin } from '../server/payment/http.js';
import { callRpc } from '../server/payment/supabase.js';

export default async function handler(req, res) {
  if (!requireMethod(req, res, 'POST') || !requireSameOrigin(req, res)) return;
  try {
    if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
      return json(res, 415, { error: 'Formato de requisição inválido.' });
    }
    const playerId = getPlayerId(req, res, false);
    if (!playerId) return json(res, 401, { error: 'Sessão de jogo inválida.' });
    const body = await readJson(req);
    if (!/^[0-9a-f-]{36}$/i.test(body.grantId || '')) return json(res, 400, { error: 'Recompensa inválida.' });
    await callRpc('ack_lingopulse_life_grant', { p_player_id: playerId, p_grant_id: body.grantId });
    json(res, 200, { ok: true });
  } catch (error) { handleError(res, error); }
}
