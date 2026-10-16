import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'lp_player';
const MAX_BODY_BYTES = 8 * 1024;

export function json(res, statusCode, payload, headers = {}) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  for (const [name, value] of Object.entries(headers)) res.setHeader(name, value);
  res.end(JSON.stringify(payload));
}

export function fail(res, statusCode, error) {
  json(res, statusCode, { error });
}

export async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  let length = 0;
  for await (const chunk of req) {
    length += chunk.length;
    if (length > MAX_BODY_BYTES) throw Object.assign(new Error('Requisição muito grande.'), { statusCode: 413 });
    chunks.push(chunk);
  }
  if (!length) return {};
  try {
    const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('JSON precisa ser um objeto.');
    return parsed;
  } catch {
    throw Object.assign(new Error('Corpo JSON inválido.'), { statusCode: 400 });
  }
}

export function requireMethod(req, res, method) {
  if (req.method === method) return true;
  json(res, 405, { error: 'Método não permitido.' }, { Allow: method });
  return false;
}

export function requireSameOrigin(req, res) {
  const origin = req.headers.origin;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const forwardedProto = String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim();
  const protocol = forwardedProto || (process.env.NODE_ENV === 'production' ? 'https' : 'http');
  if (!origin || !host) {
    fail(res, 403, 'Origem não autorizada.');
    return false;
  }
  try {
    const parsed = new URL(origin);
    if (`${parsed.protocol}//${parsed.host}` !== `${protocol}://${host}`) {
      fail(res, 403, 'Origem não autorizada.');
      return false;
    }
  } catch {
    fail(res, 403, 'Origem não autorizada.');
    return false;
  }
  return true;
}

function signSession(sessionId, secret) {
  return createHmac('sha256', secret).update(sessionId).digest('base64url');
}

export function getPlayerId(req, res, create = false) {
  const secret = process.env.APP_SESSION_SECRET;
  if (!secret || secret.length < 32) throw Object.assign(new Error('O serviço de pagamentos ainda não está configurado.'), { statusCode: 503 });
  const cookieHeader = req.headers.cookie || '';
  const rawCookie = cookieHeader.split(';').map(part => part.trim()).find(part => part.startsWith(`${COOKIE_NAME}=`));
  const value = rawCookie?.slice(COOKIE_NAME.length + 1);
  const [candidateId, suppliedSignature, ...rest] = value?.split('.') || [];
  if (!rest.length && candidateId && suppliedSignature && /^[0-9a-f-]{36}$/i.test(candidateId)) {
    const expected = signSession(candidateId, secret);
    const suppliedBuffer = Buffer.from(suppliedSignature);
    const expectedBuffer = Buffer.from(expected);
    if (suppliedBuffer.length === expectedBuffer.length && timingSafeEqual(suppliedBuffer, expectedBuffer)) return candidateId;
  }
  if (!create) return null;
  const sessionId = randomUUID();
  const secure = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${sessionId}.${signSession(sessionId, secret)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000${secure}`);
  return sessionId;
}

export function getAppUrl() {
  const value = process.env.APP_URL;
  if (!value) throw Object.assign(new Error('O endereço público do site ainda não foi configurado.'), { statusCode: 503 });
  const parsed = new URL(value);
  if (!['https:', 'http:'].includes(parsed.protocol) || parsed.username || parsed.password) {
    throw Object.assign(new Error('APP_URL inválida.'), { statusCode: 500 });
  }
  if ((process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') && parsed.protocol !== 'https:') {
    throw Object.assign(new Error('APP_URL precisa usar HTTPS em produção.'), { statusCode: 500 });
  }
  return parsed.origin;
}

export function handleError(res, error) {
  const statusCode = Number(error?.statusCode) || 500;
  if (statusCode >= 500) console.error('LingoPulse API error:', error?.message || error);
  fail(res, statusCode, statusCode >= 500 && statusCode !== 503 ? 'Não foi possível concluir a operação agora.' : error.message);
}
