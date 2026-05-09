const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json',
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function serveFile(filePath, res) {
  const mimeType = getMimeType(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  console.log(`[${new Date().toISOString()}] ${req.method} ${urlPath}`);
  
  // Handle _next/static files
  if (urlPath.startsWith('/_next/')) {
    const filePath = path.join(BASE_DIR, urlPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      serveFile(filePath, res);
      return;
    }
  }
  
  // Handle public files (images, etc)
  const publicPath = path.join(BASE_DIR, 'public', urlPath);
  if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
    serveFile(publicPath, res);
    return;
  }
  
  // Route mapping for HTML pages
  const routeMap = {
    '/': '.next/server/app/index.html',
    '/about': '.next/server/app/about.html',
    '/admission': '.next/server/app/admission.html',
    '/login': '.next/server/app/login.html',
    '/signup': '.next/server/app/signup.html',
  };
  
  if (routeMap[urlPath]) {
    const htmlPath = path.join(BASE_DIR, routeMap[urlPath]);
    if (fs.existsSync(htmlPath)) {
      serveFile(htmlPath, res);
      return;
    }
  }
  
  // Dynamic routes - redirect to admission page for now (needs client-side JS)
  const applyMatch = urlPath.match(/^\/admission\/apply\/(primary|junior|senior)$/);
  if (applyMatch) {
    // Read the admission.html and modify it to show the apply form
    const htmlPath = path.join(BASE_DIR, '.next/server/app/admission.html');
    if (fs.existsSync(htmlPath)) {
      serveFile(htmlPath, res);
      return;
    }
  }
  
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>404 - Page Not Found</h1>');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Static server running on http://0.0.0.0:${PORT}`);
});

setInterval(() => {}, 60000);
