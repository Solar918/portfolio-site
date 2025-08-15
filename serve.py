#!/usr/bin/env python3
"""
Simple HTTP server for serving the built Eleventy site.
Usage: python serve.py [port]
Defaults to port 8000 and serves the `_site` directory.
"""
import http.server
import socketserver
import sys
import os

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
HERE = os.path.dirname(os.path.abspath(__file__))
DIRECTORY = os.path.join(HERE, "_site")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    if not os.path.isdir(DIRECTORY):
        print(f"Error: build directory '{DIRECTORY}' not found. Run `npm run build` first.")
        sys.exit(1)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving site at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
            httpd.server_close()
