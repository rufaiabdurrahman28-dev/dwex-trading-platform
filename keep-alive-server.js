// Custom server with built-in keep-alive so the platform never kills it
const { createServer } = require('http');
const next = require('next');
const http = require('http');

const port = parseInt(process.env.PORT || '3000', 10);

// Start the standalone Next.js server
async function startServer() {
  // Import and start the standalone server
  const server = require('./.next/standalone/server.js');
}

startServer();

// Built-in keep-alive: ping ourselves every 15 seconds
// This prevents the platform from killing the process due to inactivity
setInterval(() => {
  const req = http.get('http://localhost:3000/', (res) => {
    res.resume(); // consume response data
  });
  req.on('error', () => {
    // Server might be down, try to restart
    console.log('Keep-alive detected server down, restarting...');
    try { startServer(); } catch(e) {}
  });
}, 15000);

console.log('Keep-alive server started - pinging every 15 seconds');
