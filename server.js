const http = require('http');
const path = require('path');

const dir = path.join(__dirname);
const currentPort = parseInt(process.env.PORT, 10) || 3000;

process.env.NODE_ENV = 'production';
process.chdir(__dirname);

// Start the Next.js standalone server
require('./.next/standalone/server.js');

// Built-in keep-alive: ping ourselves every 12 seconds
// This is inside the SAME process so the platform can't kill just the keep-alive
setInterval(() => {
  const req = http.get(`http://localhost:${currentPort}/`, (res) => {
    res.resume();
  });
  req.on('error', () => {});
  req.setTimeout(5000, () => { req.destroy(); });
}, 12000);

console.log(`[Aroyan] Server with keep-alive running on port ${currentPort}`);
