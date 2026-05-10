const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const OUT_DIR = path.join(__dirname, 'out');
const PORT = 3000;

// If out directory doesn't exist, build first
if (!fs.existsSync(OUT_DIR) || !fs.existsSync(path.join(OUT_DIR, 'index.html'))) {
  console.log('Static files not found, building...');
  try {
    execSync('npx next build', { cwd: __dirname, stdio: 'inherit' });
  } catch (e) {
    console.error('Build failed:', e.message);
  }
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.webp': 'image/webp',
  '.map': 'application/json',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];

  let filePath = path.join(OUT_DIR, urlPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    const htmlPath = filePath + '.html';
    if (fs.existsSync(htmlPath)) {
      filePath = htmlPath;
    } else {
      const notFoundPath = path.join(OUT_DIR, '404.html');
      if (fs.existsSync(notFoundPath)) {
        filePath = notFoundPath;
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Not Found</h1>');
        return;
      }
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const maxAge = ext === '.html' ? 0 : 86400;

  res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
  res.setHeader('Content-Type', contentType);

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200);
    res.end(data);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('<h1>Server Error</h1>');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Aroyan static server running at http://localhost:${PORT}`);
});

// Self-ping keep-alive
setInterval(() => {
  http.get(`http://localhost:${PORT}`, (res) => {
    res.resume();
  }).on('error', () => {
    // Server is down, try to restart
    console.log('Self-ping failed, server may be down');
  });
}, 5000);
