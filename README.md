# Fast Pre-Landing with i18n (Docker Ready)

High-performance pre-landing page with:

- **Auto-localization**: EN/RU by browser language (no selector button)
- **4 hero images**: Responsive grid layout (4 columns → mobile stack)
- **2 promo images**: Below-fold section with distinct photos
- **Legal disclaimers**: Third-party links, no liability clauses
- **Security hardening**: CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy
- **Performance**: WebP images, width/height for CLS, lazy-load, fetchPriority
- **Cookie consent**: GDPR-compliant pre-rendered consent banner
- **nginx cache strategy**: no-store for HTML, immutable for static assets
- **One-tap redirect**: Random or parameterized target links

## Targets

Configured in `app.js` (`redirectLinks` array):

- <https://lp3.joi.com/reg>
- <https://lp3.joi.com/chamomile-boy>
- <https://lp3.joi.com/general-boy>
- <https://lp3.joi.com/offer>
- <https://lp3.joi.com/bot-wizard>
- <https://lp3.joi.com/bot-wizard-stepsister>
- <https://lp3.joi.com/bot-wizard-goth>
- <https://lp3.joi.com/bot-wizard-busty>
- <https://lp3.joi.com/bot-wizard-office>
- <https://lp3.joi.com/quizshort>
- <https://lp3.joi.com/mesh-video2>
- <https://lp2.joi.com/mesh-video>
- <https://lp2.joi.com/haru_video>
- <https://lp2.joi.com/marielle_video>
- <https://lp1.joi.com/anime>
- <https://lp2.joi.com/kaida-sato/3>
- <https://lp2.joi.com/kaida-sato/5>

## Image Setup

Hero section (4 images in grid):
- `m0.webp`
- `m01.webp`
- `m110.webp`
- `m20.webp`

Promo section (2 images):
- `m110.webp`
- `m20.webp`

Images use `object-fit: cover` with `object-position: center top` to show faces and crop legs.
:
```bash
docker build -t lend-page .
```

Run:
```bash
docker run -d -p 8080:8080 --name lend-page lend-page
```

Visiter run --rm -p 8080:8080 joi-prelanding
```

Open: <http://localhost:8080>

## Redirect control

DefQuery Parameters

- `?to=N` — redirect to link N (1–17)
- `#N` — hash-based redirect (1–17)
- `?img=1..4` — show 1, 2, 3, or 4 hero images (default: 4)

Examples:
- `http://localhost:8080/?to=1`
- `http://localhost:8080/#5`
- `http://localhost:8080/?img=2erformance notes

1. Replace external images with local optimized files (`.webp` or `.avif`) to remove third-party latency.
2. Keep image width close to display size (for example 700-900 px).
3. Serve files behind CDN with brotli/gzip enabled.
4. Keep JS minimal and avoid heavy trackers on first paint.
5. Measure with Lighthouse and optimize only bottlenecks.
Localization

Browser language auto-detection (EN/RU):
- English (default for all other locales)
- Russian (navigator.language starts with "ru")

Strings in `app.js` under `i18n` object.

Legal modals (Help, Terms, Privacy) display localized disclaimer text explicitly stating:
- All buttons/links lead to third-party sites
- This page does not process user data
- No liability for third-party content/services

## nginx Security & Performance

**Security headers:**
- `Content-Security-Policy`: restrict to same-origin (script, style, font, img)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`: disable camera, microphone, geolocation, payment, usb
- `Cross-Origin-Opener-Policy: same-origin`

**Caching:**
- HTML: `no-store` (always fresh)
- Static (CSS, JS, images): `public, max-age=31536000, immutable` (1 year, CDN-friendly)
- Compression: gzip on (level 5), min-length 256 bytes

## Production notes

1. Images are local WebP (900×1200px) to avoid third-party latency
2. All text, buttons, meta tags include localization keys
3. Cookie consent and legal modals are pre-rendered (no external dependencies)
4. CSP and security headers protect against XSS and clickjacking
5. docker build/run works with chainguard nginx (minimal, hardened)
6. Test Lighthouse after CDN deployment to validate performance

## Tech Stack

- **HTML5**: semantic + ARIA labels
- **CSS3**: gradient, grid, aspect-ratio, sticky nav
- **JavaScript**: vanilla, no frameworks (script is deferred)
- **Images**: WebP (900×1200)
- **Docker**: chainguard/nginx:latest
- **nginx**: 1.27+ with etag, gzip, security headers