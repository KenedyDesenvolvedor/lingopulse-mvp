import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('.', import.meta.url)));
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 3000);

if (!Number.isInteger(port) || port < 0 || port > 65535) {
  throw new Error('PORT deve ser um número entre 0 e 65535.');
}

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
};

const apiRoutes = new Map([
  ['/api/payment-config', './api/payment-config.js'],
  ['/api/wallet', './api/wallet.js'],
  ['/api/create-payment', './api/create-payment.js'],
  ['/api/payment-status', './api/payment-status.js'],
  ['/api/spend-coins', './api/spend-coins.js'],
  ['/api/life-grants', './api/life-grants.js'],
  ['/api/ack-life-grant', './api/ack-life-grant.js'],
  ['/api/mercadopago-webhook', './api/mercadopago-webhook.js'],
]);

const server = createServer(async (request, response) => {
  let requestedPath;
  let requestUrl;
  try {
    requestUrl = new URL(request.url || '/', `http://${host}:${port || 3000}`);
    requestedPath = decodeURIComponent(requestUrl.pathname);
  } catch {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Endereço inválido.');
    return;
  }

  const apiModule = apiRoutes.get(requestedPath);
  if (apiModule) {
    try {
      const { default: handler } = await import(new URL(apiModule, import.meta.url));
      await handler(request, response);
    } catch (error) {
      console.error('Erro na API local:', error?.message || error);
      if (!response.headersSent) response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      if (!response.writableEnded) response.end(JSON.stringify({ error: 'Falha no serviço local.' }));
    }
    return;
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Método não permitido.');
    return;
  }

  let filePath = resolve(projectRoot, `.${requestedPath}`);
  if (filePath !== projectRoot && !filePath.startsWith(`${projectRoot}${sep}`)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Acesso negado.');
    return;
  }

  try {
    if (statSync(filePath).isDirectory()) filePath = resolve(filePath, 'index.html');
    const fileStats = statSync(filePath);
    if (!fileStats.isFile()) throw new Error('Não é um arquivo.');

    response.writeHead(200, {
      'Content-Length': fileStats.size,
      'Content-Type': contentTypes[extname(filePath).toLowerCase()] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
    });

    if (request.method === 'HEAD') {
      response.end();
      return;
    }

    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Arquivo não encontrado.');
  }
});

server.listen(port, host, () => {
  const address = server.address();
  const actualPort = typeof address === 'object' && address ? address.port : port;
  console.log(`LingoPulse disponível em http://${host}:${actualPort}/`);
  console.log('Deixe este processo aberto enquanto usa o app. Pressione Ctrl+C para encerrar.');
});
