# Interactive Eleventy Portfolio

An accessible, highly interactive personal portfolio built with Eleventy (11ty), plain HTML/CSS/JS, and content-driven projects.

## Quick start

1. Install Node.js (18+):
   - macOS: `brew install node`
   - Ubuntu/Debian: `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs`
   - Fedora/RHEL: `sudo dnf module install nodejs:18`
   - Windows: Download and run installer from https://nodejs.org/
2. Install deps: `npm install`.
3. Run local dev server: `npm run dev`.
4. Build for production: `npm run build` (outputs to `_site`).
5. Serve production build: `python3 serve.py [port]` (default port 8000).

### Alternative (no local npm)
6. Install Eleventy globally: `npm install -g @11ty/eleventy`.
7. Build without `npm run`: `eleventy` (outputs to `_site`).
8. Serve with Python: `python3 serve.py [port]`.

## Content model

- Projects live in `src/projects/*.md` with front matter: `title`, `description`, `tech`, `url`, `repo`, `image`, `date`.
- Site-wide metadata in `src/_data/site.json`.

## Features

- Dark/light theme with toggle and `prefers-color-scheme` support
- Client-side project filtering (by tech) and search
- On-scroll animations respecting `prefers-reduced-motion`
- Keyboard-accessible modal for project details
- SEO metadata, sitemap, and social tags

## Deploy

- GitHub Pages: build with Eleventy and publish `_site/`.
- Netlify/Vercel/Cloudflare: connect repo; set build command `npm run build`, publish directory `_site`.
