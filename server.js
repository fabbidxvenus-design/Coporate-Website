/**
 * Payload CMS custom server for Next.js.
 * Wraps Next.js with Payload embedded mode.
 *
 * Usage: replace `next dev` with `node server.js` in dev scripts.
 */

const next = require('next');
const { payload } = require('payload');
const { payloadConfig } = require('./lib/payload/embedded-config');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  await payload.init({
    ...payloadConfig,
    express: require('express'),
    onInit: () => {
      console.log('[Payload] Admin UI ready at http://localhost:3000/admin');
    },
  });

  const express = require('express');
  const payloadExpress = payload.express;

  const server = express();

  // Let Payload handle its own routes
  server.use(payloadExpress);

  // Let Next.js handle everything else
  server.all('*', (req, res) => handle(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});