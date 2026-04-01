# Fast Pre-Landing with i18n (Docker Ready)

Static pre-landing page with EN/RU localization, hero gallery, promo section, security headers, and one-tap redirect logic.

## Features

- Auto-localization (EN/RU) by browser language
- Responsive hero gallery (1-4 cards via query param)
- Promo section with 2 local WebP images
- Cookie consent banner and legal modal content
- Security-focused nginx config (CSP, frame deny, permissions policy)
- Cache strategy for static assets and fresh HTML

## Project Structure

- `index.html` - markup and semantic page layout
- `styles.css` - all visual styles and responsive breakpoints
- `app.js` - i18n strings, hero render, redirect and modal logic
- `nginx.conf` - headers, cache policy, static routing
- `Dockerfile` - nginx-based container image
- `assets/` - favicon, fallback SVG and WebP images

## Local Run (Docker)

Build image:

```bash
docker build -t lend-page .
```

Run container:

```bash
docker run -d -p 8080:8080 --name lend-page lend-page
```

Open in browser:

<http://localhost:8080>

Stop container:

```bash
docker stop lend-page
```

Remove container:

```bash
docker rm lend-page
```

## Redirect Control

Query and hash params:

- `?to=N` - redirect to link N (1-17)
- `#N` - hash-based redirect (1-17)
- `?img=1..4` - number of hero images (default 4)

Examples:

- `http://localhost:8080/?to=1`
- `http://localhost:8080/#5`
- `http://localhost:8080/?img=2`

## Localization

Language detection:

- `ru*` browser locale -> Russian
- all other locales -> English

All strings are managed in `app.js` within `i18n` object.

## Security and Performance

Configured in `nginx.conf`:

- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` restrictions
- `Cross-Origin-Opener-Policy: same-origin`

Caching behavior:

- HTML: `no-store`
- Static assets: `public, max-age=31536000, immutable`
- gzip enabled for text-based assets

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- nginx (Chainguard image)
- Docker
