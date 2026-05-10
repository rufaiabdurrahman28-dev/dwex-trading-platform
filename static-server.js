const http = require('http');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'out');
const PORT = 3000;

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
  let urlPath = req.url.split('?')[0]; // Remove query string

  // Handle Next.js static export URL structure
  let filePath = path.join(OUT_DIR, urlPath);

  // If the path is a directory, try index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // If file doesn't exist, try with .html extension
  if (!fs.existsSync(filePath)) {
    const htmlPath = filePath + '.html';
    if (fs.existsSync(htmlPath)) {
      filePath = htmlPath;
    } else {
      // 404 - serve the 404 page
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

  // Set cache headers for static assets
  const maxAge = ext === '.html' ? 0 : 86400;
  res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
  res.setHeader('Content-Type', contentType);

  const fileStream = fs.createReadStream(filePath);
  fileStream.on('error', () => {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('<h1>Server Error</h1>');
  });
  fileStream.pipe(res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Static server running at http://localhost:${PORT}`);
  console.log(`Serving files from: ${OUT_DIR}`);
});
