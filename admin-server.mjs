import { createServer } from 'node:http';
import { readFile, writeFile, rename } from 'node:fs/promises';
import { createHash, randomBytes } from 'node:crypto';
import { dirname, resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const index = resolve(root, 'index.html');
const token = randomBytes(32).toString('hex');
const hash = html => createHash('sha256').update(html).digest('hex');
const port = Number(process.env.ADMIN_PORT || 3001);
let writing = false;
const json = (res, status, data) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); };

createServer(async (req, res) => {
  try {
    if (![ `localhost:${port}`, `127.0.0.1:${port}` ].includes(req.headers.host)) return json(res, 403, { error: 'Host não autorizado.' });
    const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
    if (pathname === '/api/catalog') {
      if (req.method === 'GET') {
        const html = await readFile(index, 'utf8');
        return json(res, 200, { html, revision: hash(html), token });
      }
      if (req.method !== 'PUT') return json(res, 405, { error: 'Método inválido.' });
      if (req.headers['x-admin-token'] !== token || req.headers.origin !== `http://${req.headers.host}`) return json(res, 403, { error: 'Acesso não autorizado.' });
      if (writing) return json(res, 409, { error: 'Outra gravação está em andamento. Tente novamente.' });
      writing = true;
      try {
        let body = '';
        for await (const chunk of req) { body += chunk; if (Buffer.byteLength(body) > 2_000_000) return json(res, 413, { error: 'Catálogo muito grande.' }); }
        const { html, revision } = JSON.parse(body);
        const previous = await readFile(index, 'utf8');
        if (revision !== hash(previous)) return json(res, 409, { error: 'O index.html mudou fora deste painel. Recarregue o painel antes de editar novamente.' });
        if (typeof html !== 'string' || !html.startsWith('<!doctype html>') || !html.includes('class="product-grid"')) return json(res, 400, { error: 'Catálogo inválido.' });
        await writeFile(resolve(root, 'index.html.admin-backup'), previous, 'utf8');
        const temporary = resolve(root, 'index.html.admin-tmp');
        await writeFile(temporary, html, 'utf8');
        await rename(temporary, index);
        return json(res, 200, { revision: hash(html) });
      } finally { writing = false; }
    }
    if (!['GET', 'HEAD'].includes(req.method)) return json(res, 405, { error: 'Método inválido.' });
    const path = pathname === '/admin' || pathname === '/admin/' ? '/admin.html' : pathname === '/' ? '/index.html' : decodeURIComponent(pathname);
    const file = resolve(root, '.' + path);
    const publicFiles = ['index.html', 'style.css', 'script.js', 'admin.html', 'admin.css', 'admin.js'];
    if (!publicFiles.some(name => file === resolve(root, name)) && !file.startsWith(resolve(root, 'img') + sep)) return json(res, 404, { error: 'Arquivo não encontrado.' });
    const data = await readFile(file);
    const type = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.webp': 'image/webp', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg' }[extname(file)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); res.end(req.method === 'HEAD' ? undefined : data);
  } catch (error) { json(res, error.code === 'ENOENT' ? 404 : 400, { error: error.code === 'ENOENT' ? 'Arquivo não encontrado.' : 'Não foi possível processar ou salvar o catálogo.' }); }
}).listen(port, '127.0.0.1', () => console.log(`Painel: http://127.0.0.1:${port}/admin.html`));
