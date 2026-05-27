/**
 * Payload CMS client singleton.
 * Lazy-loaded — only initialised when isPayloadDataMode() is true.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _payloadInstance: any = null;

export type PayloadClient = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  find(opts: any): Promise<{ docs: any[]; totalDocs?: number }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(opts: any): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findByID(opts: any): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(opts: any): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete(opts: any): Promise<any>;
};

export async function initPayloadClient(): Promise<PayloadClient> {
  if (_payloadInstance) return _payloadInstance;

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require('payload') as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getPayload: (opts: { secret: string; local: boolean; url: string }) => Promise<PayloadClient>;
  };

  const config = (await import('./config')).getPayloadConfig();

  _payloadInstance = await mod.getPayload({
    secret: config.secret,
    local: false,
    url: config.url,
  });

  return _payloadInstance;
}