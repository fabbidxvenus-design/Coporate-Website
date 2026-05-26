/**
 * Payload CMS client singleton.
 * Lazy-loaded — only initialised when isPayloadDataMode() is true.
 * The require() call lives inside this function so webpack won't try to
 * resolve the 'payload' package at build time.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _payloadInstance: any = null;

export async function initPayloadClient() {
  if (_payloadInstance) return _payloadInstance;

  const config = (await import('./config')).getPayloadConfig();

  // Dynamic require inside function — NOT resolved by webpack at build time
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require('payload') as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getPayload: (opts: { secret: string; local: boolean; url: string }) => Promise<any>;
  };

  _payloadInstance = await mod.getPayload({
    secret: config.secret,
    local: false,
    url: config.url,
  });

  return _payloadInstance;
}