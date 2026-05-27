/**
 * Payload CMS connectivity smoke test.
 * Validates DATABASE_URL, PAYLOAD_SECRET, and admin accessibility.
 *
 * Usage: pnpm payload:smoke
 *
 * Exit codes:
 *   0 — all checks pass
 *   1 — one or more checks failed
 */

import pg from 'postgres';
import { initPayloadClient } from '../lib/payload/client';

async function checkDatabase(): Promise<boolean> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('[Smoke] FAIL: DATABASE_URL not set in environment');
    return false;
  }
  const safeUrl = databaseUrl.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
  console.log(`[Smoke] Checking Postgres at ${safeUrl}...`);

  try {
    const sql = pg(databaseUrl, { idle_timeout: 5 });
    const result = await sql`SELECT version()`;
    const pgVersion = (result[0]?.version ?? '').match(/PostgreSQL (\d+\.\d+)/)?.[1] ?? 'unknown';
    console.log(`[Smoke] OK: Postgres connected (v${pgVersion})`);
    await sql.end();
    return true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('ECONNREFUSED') || msg.includes('Connection refused')) {
      console.error(`[Smoke] FAIL: Cannot connect to Postgres. Is it running on port 5432?`);
    } else if (msg.includes('authentication failed')) {
      console.error(`[Smoke] FAIL: Postgres authentication failed. Check DATABASE_URL credentials.`);
    } else if (msg.includes('does not exist')) {
      console.error(`[Smoke] FAIL: Database does not exist. Create it with: createdb <dbname>`);
    } else {
      console.error(`[Smoke] FAIL: Postgres connection error: ${msg}`);
    }
    return false;
  }
}

async function checkPayloadSecret(): Promise<boolean> {
  const secret = process.env.PAYLOAD_SECRET;
  if (!secret) {
    console.error('[Smoke] FAIL: PAYLOAD_SECRET not set in environment');
    return false;
  }
  if (secret.length < 20) {
    console.error('[Smoke] FAIL: PAYLOAD_SECRET is too short (minimum 20 characters)');
    return false;
  }
  console.log(`[Smoke] OK: PAYLOAD_SECRET configured (${secret.length} chars)`);
  return true;
}

async function checkPayloadAdmin(): Promise<boolean> {
  console.log('[Smoke] Checking Payload admin route...');
  const siteUrl = process.env.PAYLOAD_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const adminUrl = `${siteUrl.replace(/\/$/, '')}/admin`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const response = await fetch(adminUrl, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'manual',
    });
    clearTimeout(timeout);

    if (response.status < 500) {
      console.log(`[Smoke] OK: Payload admin route reachable (HTTP ${response.status})`);
      return true;
    }
    console.error(`[Smoke] WARN: Payload admin returned HTTP ${response.status}`);
    return false;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[Smoke] FAIL: Payload admin check timed out (5s). Is pnpm dev:payload running?');
    } else {
      console.error(`[Smoke] FAIL: Payload admin unreachable: ${err instanceof Error ? err.message : String(err)}`);
    }
    return false;
  }
}

async function checkPayloadClient(): Promise<boolean> {
  console.log('[Smoke] Checking Payload client initialization...');
  try {
    const client = await initPayloadClient();
    await client.find({ collection: 'jobs', limit: 1 });
    console.log('[Smoke] OK: Payload client initialized and collections accessible');
    return true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('relation') && msg.includes('does not exist')) {
      console.error('[Smoke] FAIL: Payload tables missing. Run: pnpm payload:init');
    } else {
      console.error(`[Smoke] FAIL: Payload client error: ${msg}`);
    }
    return false;
  }
}

export async function check(): Promise<boolean> {
  console.log('[Smoke] Running Payload CMS smoke tests...\n');

  const results = await Promise.all([
    checkDatabase(),
    checkPayloadSecret(),
    checkPayloadAdmin(),
    checkPayloadClient(),
  ]);

  const passed = results.filter(Boolean).length;
  const total = results.length;

  console.log(`\n[Smoke] Results: ${passed}/${total} checks passed`);

  if (passed === total) {
    console.log('[Smoke] All checks PASSED');
    return true;
  }

  console.error('[Smoke] Some checks FAILED. Fix the issues above before running seed.');
  return false;
}

// Self-execute when run directly
check().then(ok => process.exit(ok ? 0 : 1)).catch(err => {
  console.error('[Smoke] Fatal:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});