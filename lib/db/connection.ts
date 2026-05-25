import postgres from 'postgres';

/**
 * TIP-022: PostgreSQL connection module.
 *
 * IMPORTANT: This module is the active runtime DB module.
 * When USE_MOCK_DATA=true, repository loaders should NOT import this module —
 * they should use the mock data paths in lib/db/repositories/* instead.
 */

let _sql: ReturnType<typeof postgres> | null = null;

function getPool(): ReturnType<typeof postgres> {
  if (process.env.USE_MOCK_DATA === 'true') {
     // Boundary check: mock mode should not reach here if isolation is respected
     throw new Error('Database initialized in mock mode. Check your data-source boundary logic.');
  }

  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL is not configured. Set DATABASE_URL in your .env.local or set USE_MOCK_DATA=true to use mock data mode.'
    );
  }
  if (!_sql) {
    _sql = postgres(process.env.DATABASE_URL, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10000,
    });
  }
  return _sql;
}

/**
 * Parameterized query template tag.
 * Usage: await sql`SELECT * FROM jobs WHERE status = ${status}`
 */
export const sql: ReturnType<typeof postgres> = ((...args: [any, ...any[]]) => {
  return (getPool() as any)(...args);
}) as any;

// Attach methods to the wrapper
Object.setPrototypeOf(sql, {
  begin: (...args: any[]) => (getPool() as any).begin(...args),
  end: (...args: any[]) => (getPool() as any).end(...args),
  unsafe: (...args: any[]) => (getPool() as any).unsafe(...args)
});

/**
 * Compatibility shim: repositories currently call getDb() expecting better-sqlite3.
 */
export const getDb = () => getPool() as any;

/**
 * Backward-compat: some code calls closeDb()
 */
export async function closeDb(): Promise<void> {
  if (_sql) {
    await _sql.end();
    _sql = null;
  }
}
