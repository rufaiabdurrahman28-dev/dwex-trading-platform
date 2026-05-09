const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  
  // Simple route handler
  if (url === '/test') {
    res.end('OK');
    return;
  }
  
  // For all other routes, try to use Next.js standalone
  res.end('Use Next.js');
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Tiny server on :3000');
});

setInterval(() => {}, 60000);
