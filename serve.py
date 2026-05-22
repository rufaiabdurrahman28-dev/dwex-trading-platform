#!/usr/bin/env python3
"""Ultra-fast static file server for Aroyan Muslim School"""
import http.server
import os
import sys

PORT = 3000
DIRECTORY = "/home/z/my-project/out"

class AroyanHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        path = self.path.split('?')[0]

        # Try exact file first
        filepath = os.path.join(DIRECTORY, path.lstrip('/'))
        
        if os.path.isdir(filepath):
            filepath = os.path.join(filepath, 'index.html')
        
        if not os.path.exists(filepath):
            # Try with .html extension
            html_path = filepath + '.html'
            if os.path.exists(html_path):
                filepath = html_path
            else:
                # Fallback to index.html for SPA routing
                filepath = os.path.join(DIRECTORY, 'index.html')

        try:
            with open(filepath, 'rb') as f:
                content = f.read()
            
            # Determine content type
            ext = os.path.splitext(filepath)[1].lower()
            content_types = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.svg': 'image/svg+xml',
                '.ico': 'image/x-icon',
                '.woff': 'font/woff',
                '.woff2': 'font/woff2',
                '.ttf': 'font/ttf',
                '.webp': 'image/webp',
                '.map': 'application/json',
            }
            
            self.send_response(200)
            self.send_header('Content-Type', content_types.get(ext, 'application/octet-stream'))
            
            # Cache static assets but not HTML
            if ext == '.html':
                self.send_header('Cache-Control', 'no-cache')
            else:
                self.send_header('Cache-Control', 'public, max-age=86400')
            
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)
        except FileNotFoundError:
            self.send_error(404, 'File not found')

    def log_message(self, format, *args):
        pass  # Suppress logging for speed

if __name__ == '__main__':
    with http.server.HTTPServer(('0.0.0.0', PORT), AroyanHandler) as httpd:
        print(f'Aroyan server running on port {PORT}', flush=True)
        httpd.serve_forever()
