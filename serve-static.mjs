// Minimal static file server for the built portfolio (used with Tailscale funnel).
// Usage: node serve-static.mjs [port]   (default port 4173)
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('./dist', import.meta.url))
const port = Number(process.argv[2]) || 4173

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    if (path.startsWith('/portfolio/')) {
      path = path.slice('/portfolio'.length)
    } else if (path === '/portfolio') {
      path = '/'
    }
    if (path.endsWith('/')) path += 'index.html'
    // prevent path traversal
    const file = normalize(join(root, path))
    if (!file.startsWith(root)) throw new Error('bad path')
    let data
    try {
      data = await readFile(file)
    } catch {
      // SPA fallback
      data = await readFile(join(root, 'index.html'))
      res.writeHead(200, { 'content-type': types['.html'] })
      return res.end(data)
    }
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' })
    res.end(data)
  } catch (err) {
    res.writeHead(400)
    res.end(String(err))
  }
}).listen(port, '0.0.0.0', () => console.log(`serving ${root} on http://localhost:${port}`))
