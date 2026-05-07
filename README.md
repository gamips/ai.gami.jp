# オリジナルデザイン作成

This is a code bundle for オリジナルデザイン作成. The original project is available at https://www.figma.com/design/jwq4Z7Kuu1RVwqxPrQsH4Q/%E3%82%AA%E3%83%AA%E3%82%B8%E3%83%8A%E3%83%AB%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E4%BD%9C%E6%88%90.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Local PHP preview

After `npm run build`, run:
- `npm run preview:php`

This starts PHP built-in server on `http://127.0.0.1:4173` and serves `dist/` with shared `header.php` / `footer.php` injection.

## Deploying to Xserver

Run `npm run build` and upload the contents of `dist/` to your domain's `public_html/`.
The deployed `dist/` uses a PHP front-controller (`index.php`) for route dispatch.
Requests are resolved in this order:
1. The requested route is matched to a pre-rendered HTML file (for example `dist/about/index.html`).
2. Shared partials are included from `public/partials` (`header.php`, `footer.php`) so every page keeps the common frame.
3. If no route file exists, `dist/index.html` is used as fallback.

This project uses React Router with browser history, and a `.htaccess` file is included in `public/` and copied to `dist/` during build.
`public/.htaccess` rewrites non-file requests to `index.php` for PHP-side dispatch.

## Sveltia CMS

The news CMS is served from `/admin/index.html`.

- CMS config: `public/admin/config.yml`
- News entries: `src/app/content/news-items/*.json`
- Uploaded media: `public/uploads/`

Local editing:
1. Run `npm run dev`.
2. Open `http://localhost:5173/admin/index.html` in a Chromium-based browser.
3. Choose local repository editing and select this project root.
4. Edit news entries, then run `npm run build` to verify the generated static pages and sitemap.

Production editing:
Sveltia CMS commits changes to the GitHub repository. Pushes to `master` run `.github/workflows/deploy-xserver.yml`, build the site, and deploy `dist/` to Xserver by FTP.

OAuth login uses the Sveltia CMS Authenticator Worker:

- Worker: `ai-gami-sveltia-cms-auth`
- URL: `https://ai-gami-sveltia-cms-auth.gamips.workers.dev`
- GitHub OAuth callback URL: `https://ai-gami-sveltia-cms-auth.gamips.workers.dev/callback`

After creating the GitHub OAuth app, set these Cloudflare Worker secrets:

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `ALLOWED_DOMAINS=ai.gami.jp`

The GitHub repository also needs these Actions secrets for deployment:

- `XSERVER_FTP_SERVER`
- `XSERVER_FTP_USERNAME`
- `XSERVER_FTP_PASSWORD`
- `XSERVER_FTP_PORT`
- `XSERVER_FTP_REMOTE_PATH`
