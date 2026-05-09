const { spawn } = require('child_process');
const http = require('http');

function startServer() {
  console.log('[Wrapper] Starting Next.js server...');
  const child = spawn('npx', ['next', 'start', '-p', '3000', '-H', '0.0.0.0'], {
    stdio: 'inherit',
    shell: true
  });
  
  child.on('exit', (code, signal) => {
    console.log(`[Wrapper] Server exited with code ${code}, signal ${signal}. Restarting in 3s...`);
    setTimeout(startServer, 3000);
  });
  
  child.on('error', (err) => {
    console.error(`[Wrapper] Error: ${err.message}`);
    setTimeout(startServer, 3000);
  });
}

startServer();

// Keep this process alive
setInterval(() => {
  // Health check - try to connect to port 3000
  const req = http.get('http://localhost:3000/', (res) => {
    console.log(`[Wrapper] Health check: ${res.statusCode}`);
  });
  req.on('error', () => {
    console.log('[Wrapper] Health check failed');
  });
  req.setTimeout(5000, () => {
    req.destroy();
  });
}, 30000);
