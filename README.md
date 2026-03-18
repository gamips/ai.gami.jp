
  # オリジナルデザイン作成

  This is a code bundle for オリジナルデザイン作成. The original project is available at https://www.figma.com/design/jwq4Z7Kuu1RVwqxPrQsH4Q/%E3%82%AA%E3%83%AA%E3%82%B8%E3%83%8A%E3%83%AB%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E4%BD%9C%E6%88%90.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Deploying to Xserver

  Run `npm run build` and upload the contents of `dist/` to your domain's `public_html/`.

  This project uses React Router with browser history, so a `.htaccess` file is included in `public/` and copied to `dist/` during build. That rewrite rule sends non-file requests to `index.html` so routes like `/about` and `/contact` work on Xserver.
  
